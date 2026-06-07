'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import gsap from "gsap"

// interface NavbarProps {
//   currentTab: 'professional' | 'personal'
// }

const SKIP_HOME_LOADER_KEY = "portfolio:skip-home-loader"

type ActivePageTransition = {
  href: string
  wipe: HTMLDivElement
  fallbackTimer: number | null
  isFinishing: boolean
}

let activePageTransition: ActivePageTransition | null = null

function finishPageTransition() {
  const transition = activePageTransition
  if (!transition || transition.isFinishing) return

  transition.isFinishing = true

  if (transition.fallbackTimer) {
    window.clearTimeout(transition.fallbackTimer)
  }
  
  setTimeout(() => {
    gsap.killTweensOf(transition.wipe)
    gsap.to(transition.wipe, {
      xPercent: -100,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        transition.wipe.remove()
        activePageTransition = null
      },
    })
  }, 600)
}

function AnimatedTabLink({ href, children, className, onClick }: {
  href: string
  children: React.ReactNode
  className: string
  onClick?: () => void
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    router.prefetch(href)
  }, [href, router])

  useEffect(() => {
    if (activePageTransition?.href !== pathname) return

    const frame = window.requestAnimationFrame(finishPageTransition)
    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick?.()

    if (pathname === href) return
    if (activePageTransition) return

    const wipe = document.createElement('div')
    wipe.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: var(--primary);
      transform: translateX(100%);
      pointer-events: auto;
      will-change: transform;
      display: flex;
      align-items: center;
      justify-content: center;
    `
    wipe.setAttribute("aria-hidden", "true")
    document.body.appendChild(wipe)
    activePageTransition = {
      href,
      wipe,
      fallbackTimer: null,
      isFinishing: false,
    }

    gsap.to(wipe, {
      xPercent: 0,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        setTimeout(() => {
          if (href === "/") {
            sessionStorage.setItem(SKIP_HOME_LOADER_KEY, "true")
          }
          router.push(href)
          if (activePageTransition) {
            activePageTransition.fallbackTimer = window.setTimeout(finishPageTransition, 5000)
          }
        }, 200)
      },
    })

    const text = document.createElement('p')
    text.textContent = 'marianne.dev'
    text.style.cssText = `
      color: var(--primary-foreground);
      font-family: monospace;
      font-size: 14px;
      letter-spacing: 0.15em;
      opacity: 0;
      transition: opacity 0.2s ease;
    `
    wipe.appendChild(text)
    document.body.appendChild(wipe)
    setTimeout(() => { text.style.opacity = '1' }, 150)
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  )
}

export function onTransitionComplete(callback: () => void) {
  const existing = activePageTransition
  if (!existing) {
    // No transition in progress, run immediately with slight delay
    setTimeout(callback, 50)
    return
  }
  // Poll until transition is done
  const interval = setInterval(() => {
    if (!activePageTransition) {
      clearInterval(interval)
      callback()
    }
  }, 16)
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const pathname = usePathname();
  const currentTab = pathname === '/personal' ? 'personal' : 'professional'


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      if (window.scrollY > 20) setMenuOpen(false)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const tabClass = (tab: string) =>
    `px-4 py-1 rounded-full text-sm transition-all duration-200 ${
      currentTab === tab
        ? 'bg-foreground text-background'
        : 'text-muted-foreground hover:text-foreground'
    }`

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  return (
    <>
      <div className="h-16" />

      {/* ── DESKTOP full navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          
          <div className="flex items-center gap-2">
            <Image src="/logo_nav.png" alt="logo" width={28} height={28} className="rounded-full" />
            <p className="font-medium text-sm tracking-wide">Marianne</p>
          </div>

          <div className="hidden sm:flex items-center gap-1 border border-border rounded-full p-1">
            <AnimatedTabLink href="/" className={tabClass('professional')}>Professional</AnimatedTabLink>
            <AnimatedTabLink href="/personal" className={tabClass('personal')}>Personal</AnimatedTabLink>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={toggleTheme} className="w-9 h-9 rounded-full">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => setMenuOpen(prev => !prev)}
              className="w-9 h-9 rounded-full sm:hidden" aria-label="Toggle menu">
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`sm:hidden transition-all duration-300 ease-out overflow-hidden ${
          menuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col gap-1 px-4 pb-4 bg-background/95 backdrop-blur-md border-b border-border">
            <AnimatedTabLink href="/" onClick={() => setMenuOpen(false)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${currentTab === 'professional' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}>
              Professional
            </AnimatedTabLink>
            <AnimatedTabLink href="/personal" onClick={() => setMenuOpen(false)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${currentTab === 'personal' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}>
              Personal
            </AnimatedTabLink>
          </div>
        </div>
      </nav>

      {/* ── Floating pill ── */}
      <div className={`hidden sm:block fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}>
        <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 backdrop-blur-md px-1 py-1 shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
          <AnimatedTabLink href="/" className={tabClass('professional')}>Professional</AnimatedTabLink>
          <AnimatedTabLink href="/personal" className={tabClass('personal')}>Personal</AnimatedTabLink>
          <div className="w-px h-4 bg-border mx-1" />
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-8 h-8 rounded-full">
            <Sun className="h-[1rem] w-[1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1rem] w-[1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      {/* ── Mobile scrolled navbar ── */}
      <div className={`sm:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="flex items-center justify-between px-4 py-3 bg-background/90 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-2">
            <Image src="/logo_nav.png" alt="logo" width={24} height={24} className="rounded-full" />
            <p className="font-medium text-sm tracking-wide">Marianne</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-8 h-8 rounded-full">
              <Sun className="h-[1rem] w-[1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1rem] w-[1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => setMenuOpen(prev => !prev)} className="w-8 h-8 rounded-full">
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile scrolled dropdown */}
        <div className={`transition-all duration-300 ease-out overflow-hidden ${
          menuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col gap-1 px-4 pb-4 bg-background/95 backdrop-blur-md border-b border-border">
            <AnimatedTabLink href="/" onClick={() => setMenuOpen(false)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${currentTab === 'professional' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}>
              Professional
            </AnimatedTabLink>
            <AnimatedTabLink href="/personal" onClick={() => setMenuOpen(false)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${currentTab === 'personal' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}>
              Personal
            </AnimatedTabLink>
          </div>
        </div>
      </div>
    </>
  )
}
