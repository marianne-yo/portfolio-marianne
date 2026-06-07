'use client'

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const wipeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Wipe comes in from right, then exits to left
    tl.fromTo(wipeRef.current,
      { xPercent: 100 },
      {
        xPercent: 0,
        duration: 0.5,
        ease: "power4.inOut",
      }
    )
    .to(wipeRef.current, {
      xPercent: -100,
      duration: 0.5,
      ease: "power4.inOut",
    })
    // Fade in content after wipe exits
    .fromTo(contentRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.2"  // slight overlap with wipe exit
    )
  }, [])

  return (
    <>
      {/* Wipe overlay */}
      <div
        ref={wipeRef}
        className="fixed inset-0 z-[9999] bg-background pointer-events-none"
        style={{ transform: 'translateX(100%)' }}
      />

      {/* Page content */}
      <div ref={contentRef} style={{ opacity: 0 }}>
        {children}
      </div>
    </>
  )
}
