"use client";
import { useEffect } from "react";

export default function EnableJs() {
  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);
  return null;
}
