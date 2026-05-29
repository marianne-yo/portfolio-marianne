'use client'

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(ready: boolean = true) {
  useEffect(() => {
    if (!ready) return  // don't run until loading is done

    // Small delay to let the DOM settle after loading screen exits
    const timer = setTimeout(() => {

      const fadeUpElements = gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']")
      fadeUpElements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            }
          }
        )
      })

      const staggerGroups = gsap.utils.toArray<HTMLElement>("[data-animate='stagger']")
      // Stagger groups
      staggerGroups.forEach((group) => {
        const children = Array.from(group.children) as HTMLElement[]
        gsap.fromTo(children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "transform",  // ← add this
            scrollTrigger: {
              trigger: group,
              start: "top 88%",
              toggleActions: "play none none none",
            }
          }
        )
      })

      ScrollTrigger.refresh()  // recalculate all positions after DOM is ready

    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }

  }, [ready])  // re-runs when ready flips from false to true
}