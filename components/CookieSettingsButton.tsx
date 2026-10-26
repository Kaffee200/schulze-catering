"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="link-button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
    >
      Cookie-Einstellungen
    </button>
  );
}
