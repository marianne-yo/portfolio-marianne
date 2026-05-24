"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

type TypewriterProps = {
  text: string[];
  speed?: number;
  deleteSpeed?: number;
  waitTime?: number;
  cursorChar?: string;
  className?: string;
};

export default function Typewriter({
  text,
  speed = 70,
  deleteSpeed = 40,
  waitTime = 1500,
  cursorChar = "|",
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentText, setCurrentText] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = text[currentText];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(word.substring(0, displayText.length + 1));

          if (displayText === word) {
            setTimeout(() => setIsDeleting(true), waitTime);
          }
        } else {
          setDisplayText(word.substring(0, displayText.length - 1));

          if (displayText === "") {
            setIsDeleting(false);
            setCurrentText((prev) => (prev + 1) % text.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    currentText,
    text,
    speed,
    deleteSpeed,
    waitTime,
  ]);

  return (
    <span className={clsx(className)}>
      {displayText}
      <span className="animate-pulse">{cursorChar}</span>
    </span>
  );
}