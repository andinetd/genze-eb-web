"use client";
import { useRef, useState } from "react";

const MIN_BUSY = 400;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function resolveDownload() {
  const res = await fetch("/download", { method: "GET", redirect: "manual", cache: "no-store" });
  const location = res.headers.get("location");
  if (!location) throw new Error("download route did not redirect");
  return new URL(location, window.location.href).href;
}

export default function DownloadButton({ className = "", children }) {
  const [state, setState] = useState("idle");
  const busyRef = useRef(false);

  async function handleClick(e) {
    e.preventDefault();
    if (busyRef.current) return;
    busyRef.current = true;
    setState("preparing");
    const started = performance.now();

    try {
      const url = await resolveDownload();
      const elapsed = performance.now() - started;
      if (elapsed < MIN_BUSY) await sleep(MIN_BUSY - elapsed);

      const a = document.createElement("a");
      a.href = url;
      a.rel = "noopener";
      a.download = "faranka.apk";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setState("done");
      setTimeout(() => {
        busyRef.current = false;
        setState("idle");
      }, 2600);
    } catch {
      busyRef.current = false;
      setState("idle");
      window.location.href = "/download";
    }
  }

  return (
    <a
      href="/download"
      download="faranka.apk"
      onClick={handleClick}
      aria-busy={state === "preparing"}
      className={className}
    >
      {state === "preparing" ? (
        <span className="dl-progress">
          <span className="dl-spinner" aria-hidden="true" />
          Preparing…
        </span>
      ) : state === "done" ? (
        <span className="dl-progress">Download started</span>
      ) : (
        children
      )}
    </a>
  );
}
