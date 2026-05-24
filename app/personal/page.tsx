"use client";
import { useEffect, useRef } from "react";
import { GraduationCap, UserStar, MailIcon, Ghost, ArrowRight, Mail } from "lucide-react";
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react";
import Link from "next/link";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator";
import Typewriter from "@/components/ui/Typewriter";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Personal() {
  const [activeTab, setActiveTab] = useState<'professional' | 'personal'>('personal')
  const { setTheme, resolvedTheme } = useTheme();
  
  const navItems = [
    { logo: <GraduationCap />, name: "Professional", link: "#professional" },
    { logo: <UserStar />,      name: "Personal",     link: "#personal"      },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hobbies = [
  {
    title: "Digital Art",
    description: "Drawing characters, portraits, and illustrations.",
    image: "/wuxian.png",
    emoji: "🎨",
    color: "var(--text-purple)",
  },
  {
    title: "Fitness",
    description: "Staying active and taking care of my body.",
    image: "/gym.jpg",
    emoji: "🏋️",
    color: "var(--text-orange)",
  },
  {
    title: "Music",
    description: "Listening to playlists that match my mood.",
    image: "/music.jpg",
    emoji: "🎵",
    color: "var(--text-yellow)",
  },
  {
    title: "Reading",
    description: "Books, articles, anything that feeds curiosity.",
    image: "/books2.jpg",
    emoji: "📚",
    color: "var(--text-pink)",
  },
  {
    title: "Gaming",
    description: "Unwinding with games after a long day.",
    image: "/games2.jpeg",
    emoji: "🎮",
    color: "var(--text-orange)",
  },
]

  return (
    <div className={`flex flex-col flex-1 items-center justify-start font-sans bg-background ${montserrat.className}`}>
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-start py-10 px-10 sm:items-start bg-background">

        <div className="relative w-full">
          <Navbar>
            <NavBody>
            <NavbarLogo />
            {/* Tab switcher in the center */}
            <div className="flex items-center gap-1 border border-border rounded-full p-1">
                <Link href="/">
                    <Button variant={'ghost'} className={`px-4 py-1 rounded-full text-sm transition-all duration-200
                    ${activeTab === 'professional' ? 'bg-foreground text-background' : 'text-(--text-muted) hover:text-foreground'}`}>
                    Professional
                    </Button>
                </Link>
                <Link href="/personal">
                    <Button variant={'ghost'} className={`px-4 py-1 rounded-full text-sm transition-all duration-200
                    ${activeTab === 'personal' ? 'bg-foreground text-background' : 'text-(--text-muted) hover:text-foreground'}`}>
                    Personal
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4">
              <NavbarButton variant="primary">English</NavbarButton>
              <NavbarButton
                as="button"
                variant="primary"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="relative flex items-center justify-center w-9 h-9 p-0"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </NavbarButton>
            </div>
          </NavBody>
            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </MobileNavHeader>
              <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
  
                {/* Tab switcher for mobile */}
                <div className="flex w-full gap-2">
                  <Button
                    onClick={() => { setActiveTab('professional'); setIsMobileMenuOpen(false); }}
                    className={`flex-1 py-2 rounded-lg text-sm border transition-all
                      ${activeTab === 'professional'
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border text-(--text-muted)'
                      }`}
                  >
                    Professional
                  </Button>
                  <Button
                    onClick={() => { setActiveTab('personal'); setIsMobileMenuOpen(false); }}
                    className={`flex-1 py-2 rounded-lg text-sm border transition-all
                      ${activeTab === 'personal'
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border text-(--text-muted)'
                      }`}
                  >
                    Personal
                  </Button>
                </div>

                {navItems.map((item, idx) => (
                  <a key={idx} href={item.link} onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-(--text-soft) dark:text-neutral-300">
                    <span className="block">{item.name}</span>
                  </a>
                ))}
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </div>

        <section className="flex flex-col mt-16 w-full items-center justify-center gap-6 min-h-[60vh]">
            <Badge variant={'outline'} className="flex items-center gap-2 px-4 py-4 text-sm text-(--text-muted)">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Open for commissions & collaborations
            </Badge>

            <div className="flex flex-col items-center text-center gap-3">
                <h1 className="text-6xl font-bold leading-tight">
                Hi! I&apos;m <span className="text-(--text-yellow)">Marianne</span>
                </h1>
                <h2 className="text-4xl font-medium text-(--text-secondary)">
                I&apos;m born to{" "}
                <Typewriter
                    text={["experience", "dance", "love", "be alive", "create things", "explore"]}
                    speed={90}
                    deleteSpeed={50}
                    waitTime={3000}
                    cursorChar="_"
                    className="text-(--text-yellow)"
                />
                </h2>
            </div>

            <p className="text-base text-(--text-muted) max-w-lg text-center leading-relaxed">
                Designer, developer, and digital artist from Tarlac. 
                This is the side of me that exists beyond the resume.
            </p>

            <div className="flex flex-col items-center gap-1 mt-6 text-(--text-soft)">
                <p className="text-xs tracking-widest font-light">SCROLL</p>
                <div className="w-px h-10 bg-border" />
            </div>
        </section>
        
        {/* about */}
        <section className="flex flex-col-reverse gap-10 mt-100 w-full items-center sm:flex-row sm:justify-between sm:gap-16">
        
            <div className="flex flex-col gap-6 max-w-lg">
                <p className="font-light tracking-widest text-xs text-(--text-muted)">ABOUT ME</p>
                
                <h2 className="text-5xl font-bold leading-tight">
                A creative who <br />
                <span className="font-serif italic font-medium text-(--text-yellow)">codes & draws.</span>
                </h2>

                <p className="text-sm text-(--text-secondary) leading-relaxed text-pretty">
                I&apos;m Marianne, a fresh graduate from Tarlac State University with a passion for building things that are both functional and beautiful. I sit at the intersection of design, development, and art — and I love every bit of it.
                </p>

                <p className="text-sm text-(--text-secondary) leading-relaxed text-pretty">
                When I&apos;m not pushing pixels or writing code, you&apos;ll find me drawing characters, listening to music, or finding beauty in the little things around me.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-(--text-soft) tracking-wider">BASED IN</p>
                    <p className="text-sm font-medium">Paniqui, Tarlac, Philippines</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-(--text-soft) tracking-wider text-pretty">DEGREE</p>
                    <p className="text-sm font-medium">Bachelor of Science in Information Technology specialized in Web and Mobile Applicaton</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-(--text-soft) tracking-wider">SPECIALIZES IN</p>
                    <p className="text-sm font-medium">Design · Dev · Art</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-(--text-soft) tracking-wider">BIRTHDAY</p>
                    <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium">September 21, 2003</p>
                    </div>
                </div>
                </div>
            </div>

            <div className="relative shrink-0">
                
                <div className="absolute -top-3 -right-3 w-full h-full rounded-2xl bg-(--primary)/20 border border-(--primary)/30" />
                
                <div className="relative w-72 h-80 rounded-2xl overflow-hidden border border-border">
                <Image
                    src="/marianne_2.jpg"
                    alt="Marianne"
                    className="w-full h-full object-cover object-top"
                    height={800}
                    width={800}
                />
                </div>

                <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-4 py-2 shadow-sm">
                <p className="text-xs text-(--text-muted)">Fresh Graduate</p>
                <p className="text-sm font-medium">Class of 2026 🎓</p>
                </div>

            </div>
        </section>

        {/* hobbies */}
        <section className="flex flex-col justify-center align-middle gap-5 mt-100 w-full items-center">
            <div className="w-full max-w-5xl flex flex-col items-start justify-start">
                <p className="font-light tracking-wider text-pretty">MY HOBBIES</p>

                <h2 className="text-6xl font-bold tracking-tight text-pretty leading-tight">
                COMPONENTS OF MY LIFE
                </h2>

                <p className="font-normal tracking-wide text-pretty py-5">
                Here are my other activities outside of professional life.
                </p>
            </div>
            <div className="flex flex-col w-full justify-center align-middle h-full">
                <Carousel 
                className="w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                    delay: 3000,
                    }),
                ]}
                >
                    <CarouselContent className="-ml-1">
                        {hobbies.map((hobby) => (
                        <CarouselItem key={hobby.title} className="basis-1/2 pl-2 lg:basis-1/3 h-full">
                            <div className="p-1 h-full">
                                <Card className="overflow-hidden h-full p-0 gap-0">
                                    <div className="relative w-full h-150">
                                        <Image
                                        src={hobby.image}
                                        alt={hobby.title}
                                        fill
                                        className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        <div className="relative p-5 flex flex-col gap-1">
                                            <p className="text-(--accent-foreground) font-bold text-2xl leading-tight ">{hobby.title}</p>
                                            <p className="text-muted dark:text-(--muted-foreground) text-xs line-clamp-2">{hobby.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            
        </section>

        {/* mood board */}
        <section className="flex flex-col justify-center align-middle gap-5 mt-100 w-full items-center">
            <div className="w-full max-w-5xl flex flex-col items-start justify-start">
                <p className="font-light tracking-wider text-pretty">THINGS I LOVE</p>

                <h2 className="text-6xl font-bold tracking-tight text-pretty leading-tight">
                MOOD BOARD
                </h2>

                <p className="font-normal tracking-wide text-pretty py-5">
                Here are the things I love
                </p>
            </div>

            <div className="grid grid-cols-6 grid-rows-5 w-full max-w-5xl gap-2">
                {/* div1 — spans col 1-4, row 1-3 MY FAVORTIE PLAYLISTS*/}
                <div className="bg-card border-2 border-muted col-span-4 row-span-3 rounded-lg p-5">
                    <h2 className="text-lg font-medium font-mono">MY FAVORTIE PLAYLISTS</h2>
                    <div className="flex flex-col gap-2 justify-center">
                        <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/playlist/3p26j8qStmyl81R8KqjgDz?utm_source=generator"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        />
                        
                        <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/playlist/42rTJvd7cs9VU7ZH30IOqf?utm_source=generator"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        />

                        <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/playlist/2q7u0uYPRLC0iq077D3gi1?utm_source=generator"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        />

                        <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/playlist/6AT86MZmC60G1h26Wn6Rij?utm_source=generator"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        />

                    </div>
                </div>


                {/* div5 — col 5, row 1 open meteo api, time and weather*/} 
                <div className="bg-card border-2 border-muted col-start-5 col-span-2 row-start-1 rounded-lg p-5"><p>5</p></div>

                {/* div6 — col 5, row 2 */}
                <div className="bg-card border-2 border-muted col-start-5 col-span-2  row-start-2 rounded-lg p-5"><p>6</p></div>

                {/* div7 — col 5, row 3-4 MY DAILY ROUTINE, THIS WILL BE A LIST*/}
                <div className="bg-card border-2 border-muted col-start-5 col-span-2  row-start-3 row-span-2 rounded-lg p-5">
                    <h2 className="text-lg font-medium font-mono">Marianne&apos;s Daily Routine</h2>
                </div>

                {/* div2 — col 1-2, row 4 MY FAVORTIE COLORS*/}
                <div className="bg-card border-2 border-muted col-span-2 col-start-1 row-start-4 rounded-lg p-5">
                    <h2 className="text-lg font-medium font-mono">MY FAVORTIE COLORS</h2>
                </div>

                {/* div3 — col 3-4, row 4 MY FAVORTIE ARTIST*/}
                <div className="bg-card border-2 border-muted col-span-2 col-start-3 row-start-4 rounded-lg p-5">
                    <h2 className="text-lg font-medium font-mono">MY FAVORTIE ARTISTS</h2>
                    <div className="flex flex-col gap-2 justify-center">
                        <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/artist/3pc0bOVB5whxmD50W79wwO?utm_source=generator"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        />
                        
                        <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/artist/0GAYGBzZBTtYKkHIZs9ADH?utm_source=generator"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        />

                        <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/artist/2F4oTJOWkcD1JaTeKEa9h6?utm_source=generator"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        />


                    </div>
                </div>

                {/* div4 — col 1-4, row 5 DOODLE*/}
                <div className="bg-card border-2 border-muted col-span-4 col-start-1 row-start-5 rounded-lg p-5">
                    <h2 className="text-lg font-medium font-mono">MY OWN DOODLE</h2>
                </div>

                {/* div8 — col 5, row 5 */}
                <div className="bg-card border-2 border-muted col-start-5 col-span-2 row-start-5 rounded-lg p-5">
                    <h2 className="text-lg font-medium font-mono">MY FAVORITE QUOTE</h2>
                </div>
            </div>
            
        </section>


        {/* Contact */}
        <section className="flex flex-col justify-center mt-100 w-full mb-20">
          <div className="w-full max-w-5xl flex flex-col items-center justify-center">
            <p className="font-light tracking-wider text-pretty">LET&apos;S CONNECT</p>

            <h2 className="text-6xl font-medium tracking-tight text-pretty leading-tight">
              Want to make something <br /><span className="font-serif font-bold italic flex justify-center">together?</span>
            </h2>

            <p className="font-normal tracking-wide text-pretty py-10">
              I&apos;m a designer, developer, and digital artist — I can take your idea from a rough sketch all the way to a live product.
            </p>

            <Button variant={"outline"} size={'lg'} className=" font-light tracking-tight gap-2 cursor-pointer py-5">
              <Mail/> Send me an Email
            </Button>

            <div className="w-24 mx-auto">
              <Separator className="mt-10" />
            </div>

            <div className="flex flex-row gap-3 mt-10 mb-20">
              <Button variant={"outline"} size={'sm'} className="font-light tracking-tight gap-2 cursor-pointer py-5 rounded-md">
                <IconBrandFacebook /> Facebook
              </Button>
              <Button variant={"outline"} size={'sm'} className="font-light tracking-tight gap-2 cursor-pointer py-5 rounded-md">
                <IconBrandInstagram /> Instagram
              </Button>
              <Button variant={"outline"} size={'sm'} className="font-light tracking-tight gap-2 cursor-pointer py-5 rounded-md">
                <IconBrandLinkedin /> LinkedIn
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Usually responds within 24 hours · Based in the Philippines</p>
          </div>
        </section>
        <footer className="w-full border-t border-border py-6 px-10">
          <div className="flex items-center justify-between text-xs text-(--text-muted)">
            
            <p className="font-mono">
              designed & built by <span className="text-(--foreground)] font-medium">Marianne</span>
            </p>

            {/* Center — nav links
            <div className="flex gap-6">
              <button className="hover:text-[var(--foreground)] transition-colors">About</button>
              <button className="hover:text-[var(--foreground)] transition-colors">Projects</button>
              <button className="hover:text-[var(--foreground)] transition-colors">Services</button>
              <button className="hover:text-[var(--foreground)] transition-colors">Contact</button>
            </div> */}

            <p className="font-mono">© {new Date().getFullYear()} · All rights reserved</p>

          </div>
        </footer>
      </main>
    </div>
  );
}
