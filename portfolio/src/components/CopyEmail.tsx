"use client";

import { useState } from "react";

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText("martta.xu@outlook.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="copy-email-wrapper">
      <button onClick={handleClick} className="copy-email-btn">
        let&apos;s talk
      </button>
      <span className="copy-email-tooltip">
        <span className="copy-email-arrow" />
        <span className="copy-email-box">
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "copied!" : "copy email"}
        </span>
      </span>
    </span>
  );
}
