"use client";
import { useEffect, useRef } from "react";

export default function PreservedHtmlClient({ html, containerId }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    // Replace contents on client only to avoid hydration mismatch
    ref.current.innerHTML = html || "";
    // Execute any inline scripts in the injected HTML safely
    const scripts = Array.from(ref.current.querySelectorAll("script"));
    scripts.forEach((oldScript) => {
      const script = document.createElement("script");
      Array.from(oldScript.attributes).forEach((a) => script.setAttribute(a.name, a.value));
      script.text = oldScript.textContent;
      oldScript.replaceWith(script);
    });
  }, [html]);

  return <div id={containerId} ref={ref} />;
}
