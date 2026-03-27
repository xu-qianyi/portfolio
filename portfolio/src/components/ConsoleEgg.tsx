"use client";

import { useEffect } from "react";

/** Styled console message for curious devs/designers who inspect the page. */
export default function ConsoleEgg() {
  useEffect(() => {
    console.log(
      "%c ✦ hey, you found the back of the canvas. ",
      [
        "background: #EC4523",
        "color: #fff",
        "font-size: 13px",
        "font-weight: 600",
        "padding: 4px 10px",
        "border-radius: 3px",
      ].join("; ")
    );
    console.log(
      "%c curious about the build? let's talk → martta.xu@outlook.com ",
      "color: #EC4523; font-size: 12px;"
    );
  }, []);

  return null;
}
