// src/pixel.ts
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export function trackCustom(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }
}

export function trackStandard(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, params);
  }
}
