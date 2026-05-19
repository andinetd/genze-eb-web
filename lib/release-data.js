import localUpdateData from "../update.json";

export const RELEASE_JSON_URL =
  process.env.RELEASE_JSON_URL ||
  "https://raw.githubusercontent.com/andinetd/genze-eb-web/main/update.json";

function parseReleaseCacheSeconds(value) {
  const parsedSeconds = Number(value);

  if (!Number.isFinite(parsedSeconds) || parsedSeconds <= 0) {
    return 60;
  }

  return Math.floor(parsedSeconds);
}

export const RELEASE_CACHE_SECONDS = parseReleaseCacheSeconds(
  process.env.RELEASE_CACHE_SECONDS,
);

function normalizeReleaseData(data) {
  return {
    ...localUpdateData,
    ...(data && typeof data === "object" ? data : {}),
  };
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