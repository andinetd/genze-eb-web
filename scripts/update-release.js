#!/usr/bin/env node
/**
 * Sync release metadata from the genzeb project to the website.
 * Fetches the latest release from GitHub and updates update.json.
 *
 * Usage: node scripts/update-release.js [--repo OWNER/REPO]
 *
 * Environment variables:
 *   GITHUB_TOKEN (optional) - For higher rate limits on the GitHub API
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const genzebPath = path.join(projectRoot, "..", "genzeb");
const pubspecPath = path.join(genzebPath, "pubspec.yaml");
const updateJsonPath = path.join(projectRoot, "update.json");

function getGitHubRepoFromGit(repoPath) {
  try {
    const url = execSync("git config --get remote.origin.url", {
      cwd: repoPath,
      encoding: "utf-8",
    }).trim();

    // Parse git@github.com:owner/repo.git or https://github.com/owner/repo.git
    const match = url.match(/github\.com[:/]([^/]+)\/(.+?)(\.git)?$/);
    if (match) {
      return `${match[1]}/${match[2]}`;
    }
  } catch {
    return null;
  }
}

function parsePubspec(content) {
  const versionMatch = content.match(/^version:\s*(.+?)(?:\+|$)/m);
  if (!versionMatch) {
    throw new Error("Could not find version in pubspec.yaml");
  }

  const versionPart = versionMatch[1].trim();
  const buildMatch = content.match(/^version:\s*[^+]+\+(\d+)$/m);

  return {
    version_name: versionPart,
    version_code: buildMatch ? parseInt(buildMatch[1], 10) : 1,
  };
}

async function getLatestGitHubReleaseAPK(repo) {
  const apiUrl = `https://api.github.com/repos/${repo}/releases/latest`;
  const headers = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(apiUrl, { headers });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`No releases found for ${repo}`);
    }
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    );
  }

  const release = await response.json();

  // Find APK asset (prioritize app-release.apk or similar)
  const apkAsset = release.assets?.find((asset) =>
    asset.name.toLowerCase().includes(".apk"),
  );

  if (!apkAsset) {
    throw new Error(
      `No APK asset found in latest release of ${repo}. Release: ${release.tag_name}`,
    );
  }

  return {
    url: apkAsset.browser_download_url,
    name: apkAsset.name,
    size: apkAsset.size,
    tag: release.tag_name,
  };
}

async function updateRelease() {
  try {
    // 1. Read pubspec.yaml from genzeb
    if (!fs.existsSync(pubspecPath)) {
      throw new Error(`pubspec.yaml not found at ${pubspecPath}`);
    }

    const pubspecContent = fs.readFileSync(pubspecPath, "utf-8");
    const versionData = parsePubspec(pubspecContent);

    // 2. Get GitHub repo info from genzeb
    const repoArgIndex = process.argv.indexOf("--repo");
    let repo = repoArgIndex >= 0 ? process.argv[repoArgIndex + 1] : null;
    if (!repo) {
      repo = getGitHubRepoFromGit(genzebPath);
    }

    if (!repo) {
      throw new Error(
        "Could not determine GitHub repo. Provide with --repo OWNER/REPO",
      );
    }

    console.log(`📦 Fetching latest release from ${repo}...`);

    // 3. Fetch APK from latest GitHub release
    const apkInfo = await getLatestGitHubReleaseAPK(repo);

    // 4. Read current update.json
    let currentData = {};
    if (fs.existsSync(updateJsonPath)) {
      currentData = JSON.parse(fs.readFileSync(updateJsonPath, "utf-8"));
    }

    // 5. Create updated data
    const updatedData = {
      ...currentData,
      version_code: versionData.version_code,
      version_name: versionData.version_name,
      apk_url: apkInfo.url,
      last_updated: new Date().toISOString(),
    };

    // 6. Write back to update.json
    fs.writeFileSync(updateJsonPath, JSON.stringify(updatedData, null, 2) + "\n");

    console.log("✅ Release metadata updated:");
    console.log(`   Repo: ${repo}`);
    console.log(`   Version: ${versionData.version_name} (build ${versionData.version_code})`);
    console.log(`   Release tag: ${apkInfo.tag}`);
    console.log(`   APK: ${apkInfo.name} (${(apkInfo.size / 1024 / 1024).toFixed(1)} MB)`);
    console.log(`   Download URL: ${apkInfo.url}`);
  } catch (error) {
    console.error("❌ Failed to update release metadata:");
    console.error(error.message);
    process.exit(1);
  }
}

updateRelease();
