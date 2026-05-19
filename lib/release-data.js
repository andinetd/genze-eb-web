import localUpdateData from "../update.json";

export const RELEASE_JSON_URL =
  "https://raw.githubusercontent.com/andinetd/genze-eb-web/main/update.json";

function parseReleaseCacheSeconds(value) {
  const parsedSeconds = Number(value);

  if (!Number.isFinite(parsedSeconds) || parsedSeconds <= 0) {
    return 60 * 60;
  }

  return Math.floor(parsedSeconds);
}

export const RELEASE_CACHE_SECONDS = parseReleaseCacheSeconds(
  process.env.RELEASE_CACHE_SECONDS,
);

function resolveAPKPath(apkUrl) {
  // If the APK URL starts with ../, resolve it relative to genzeb
  if (apkUrl && apkUrl.startsWith("../genzeb/")) {
    // In production, use the file system path; in browser context, this won't be accessed
    // The URL is kept as-is for documentation, but actual downloads need a proper public URL
    return apkUrl;
  }
  return apkUrl;
}

function normalizeReleaseData(data) {
  const normalized = {
    ...localUpdateData,
    ...(data && typeof data === "object" ? data : {}),
  };
  
  // Ensure APK path is properly resolved
  if (normalized.apk_url) {
    normalized.apk_url = resolveAPKPath(normalized.apk_url);
  }
  
  return normalized;
}

export async function getReleaseData() {
  try {
    const response = await fetch(RELEASE_JSON_URL, {
      next: {
        revalidate: RELEASE_CACHE_SECONDS,
      },
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const remoteData = await response.json();
      return normalizeReleaseData(remoteData);
    }
  } catch {
    // Fall back to the local file so the site still renders if GitHub is unavailable.
  }

  return normalizeReleaseData(localUpdateData);
}