#!/usr/bin/env node
/**
 * Sync a release from the genzeb project to the website.
 * Mirrors what the CI workflow (.github/workflows/build-release.yml) does:
 *   - reads version (name + code) from genzeb/pubspec.yaml
 *   - copies the freshly built arm64 APK into public/faranka.apk
 *   - writes update.json with the canonical schema
 *   - commits and pushes to genze-eb-web so Vercel redeploys
 *
 * Usage: node scripts/update-release.js
 *
 * Requires:
 *   - a release build present at ../genzeb/build/app/outputs/flutter-apk/
 *   - the genzeb-website repo checked out on its default branch with a pushable origin
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
const publicApkPath = path.join(projectRoot, "public", "faranka.apk");

const APK_URL =
  "https://raw.githubusercontent.com/andinetd/genze-eb-web/main/public/faranka.apk";

function parsePubspec(content) {
  const versionLine = content.match(/^version:\s*(.+)$/m);
  if (!versionLine) {
    throw new Error("Could not find version in pubspec.yaml");
  }

  const [versionName, buildPart] = versionLine[1].trim().split("+");
  const versionCode = Number(buildPart);

  if (!versionName || !Number.isInteger(versionCode) || versionCode <= 0) {
    throw new Error(`Invalid version in pubspec.yaml: "${versionLine[1].trim()}"`);
  }

  return { version_name: versionName, version_code: versionCode };
}

function findBuiltApk() {
  const candidates = [
    path.join(genzebPath, "build", "app", "outputs", "flutter-apk", "app-release.apk"),
    path.join(
      genzebPath,
      "build",
      "app",
      "outputs",
      "flutter-apk",
      "app-arm64-v8a-release.apk",
    ),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  throw new Error(
    "No release APK found. Build it first:\n" +
      "  cd ../genzeb\n" +
      "  flutter build apk --release --target-platform android-arm64",
  );
}

function git(args) {
  return execSync(`git ${args}`, { cwd: projectRoot, encoding: "utf-8" }).trim();
}

function updateRelease() {
  try {
    if (!fs.existsSync(pubspecPath)) {
      throw new Error(`pubspec.yaml not found at ${pubspecPath}`);
    }

    const versionData = parsePubspec(fs.readFileSync(pubspecPath, "utf-8"));
    const apkSource = findBuiltApk();

    if (fs.existsSync(updateJsonPath)) {
      const existing = JSON.parse(fs.readFileSync(updateJsonPath, "utf-8"));
      if (
        typeof existing.version_code === "number" &&
        existing.version_code > versionData.version_code
      ) {
        throw new Error(
          `Published version_code ${existing.version_code} is newer than pubspec ${versionData.version_code}. Bump pubspec.yaml first.`,
        );
      }
      if (existing.version_code === versionData.version_code) {
        console.log(
          `ℹ️ Re-publishing same version_code ${versionData.version_code} to repair/fix this version.`,
        );
      }
    }

    fs.mkdirSync(path.dirname(publicApkPath), { recursive: true });
    fs.copyFileSync(apkSource, publicApkPath);

    const updatedData = {
      version_code: versionData.version_code,
      version_name: versionData.version_name,
      release_notes: `Automated Build for version ${versionData.version_name}`,
      apk_url: APK_URL,
      last_updated: new Date().toISOString(),
    };
    fs.writeFileSync(updateJsonPath, JSON.stringify(updatedData, null, 2) + "\n");

    console.log("✅ Release metadata updated:");
    console.log(
      `   Version: ${versionData.version_name} (build ${versionData.version_code})`,
    );
    console.log(
      `   APK copied to public/faranka.apk (${(fs.statSync(publicApkPath).size / 1024 / 1024).toFixed(1)} MB)`,
    );

    const branch = git("rev-parse --abbrev-ref HEAD");
    git("add public/faranka.apk update.json");
    git(`commit -m "Release version ${versionData.version_code}"`);
    git(`push origin ${branch}`);
    console.log(`   Pushed to origin/${branch}`);
  } catch (error) {
    console.error("❌ Failed to update release metadata:");
    console.error(error.message);
    process.exit(1);
  }
}

updateRelease();
