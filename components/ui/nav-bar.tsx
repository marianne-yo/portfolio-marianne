'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

interface NavbarProps {
  activeTab: 'professional' | 'personal'
}

export default function Navbar({ activeTab }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      if (window.scrollY > 20) setMenuOpen(false) // close menu on scroll
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const tabClass = (tab: string) =>
    `px-4 py-1 rounded-full text-sm transition-all duration-200 ${
      activeTab === tab
        ? 'bg-foreground text-background'
        : 'text-muted-foreground hover:text-foreground'
    }`

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  return (
    <>
      {/* Spacer */}
      <div className="h-16" />

      {/* ── DESKTOP full navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            <Image src="/logo_nav.png" alt="logo" width={28} height={28} className="rounded-full" />
            <p className="font-medium text-sm tracking-wide">Marianne</p>
          </div>

          {/* Desktop tabs — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1 border border-border rounded-full p-1">
            <Link href="/"><Button variant="ghost" className={tabClass('professional')}>Professional</Button></Link>
            <Link href="/personal"><Button variant="ghost" className={tabClass('personal')}>Personal</Button></Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Hamburger — only on mobile */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMenuOpen(prev => !prev)}
              className="w-9 h-9 rounded-full sm:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`sm:hidden transition-all duration-300 ease-out overflow-hidden ${
          menuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col gap-1 px-4 pb-4 bg-background/95 backdrop-blur-md border-b border-border">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className={`w-full justify-start ${tabClass('professional')}`}>
                Professional
              </Button>
            </Link>
            <Link href="/personal" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className={`w-full justify-start ${tabClass('personal')}`}>
                Personal
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Floating pill — desktop only ── */}
      <div className={`hidden sm:block fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}>
        <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 backdrop-blur-md px-1 py-1 shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
          <Link href="/"><Button variant="ghost" className={tabClass('professional')}>Professional</Button></Link>
          <Link href="/personal"><Button variant="ghost" className={tabClass('personal')}>Personal</Button></Link>
          <div className="w-px h-4 bg-border mx-1" />
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-8 h-8 rounded-full">
            <Sun className="h-[1rem] w-[1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1rem] w-[1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      {/* ── Mobile scrolled navbar (replaces pill on mobile) ── */}
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
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMenuOpen(prev => !prev)}
              className="w-8 h-8 rounded-full"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile scrolled dropdown */}
        <div className={`transition-all duration-300 ease-out overflow-hidden ${
          menuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col gap-1 px-4 pb-4 bg-background/95 backdrop-blur-md border-b border-border">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className={`w-full justify-start ${tabClass('professional')}`}>Professional</Button>
            </Link>
            <Link href="/personal" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className={`w-full justify-start ${tabClass('personal')}`}>Personal</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}