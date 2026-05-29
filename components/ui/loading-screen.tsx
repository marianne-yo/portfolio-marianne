'use client'

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const wipeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    })

    // Hold for a moment then wipe up
    tl.to(wipeRef.current, {
      duration: 0,
      yPercent: 0,
    })
    .to(wipeRef.current, {
      delay: 0.5,
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
    })
  }, [onComplete])

  return (
    <div
      ref={wipeRef}
      className="fixed inset-0 z-[9999] bg-foreground flex items-center justify-center"
    >
      <p className="text-background font-mono text-sm tracking-widest animate-pulse">
        marianne.dev
      </p>
    </div>
  )
}