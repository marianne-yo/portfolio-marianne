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
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import { Textarea } from "@/components/ui/textarea"
import Image from "next/image";
import Navbar from "@/components/ui/nav-bar";
import gsap from "gsap";
import LoadingScreen from "@/components/ui/loading-screen"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
const montserrat = Montserrat({ subsets: ["latin"] });

const SKIP_HOME_LOADER_KEY = "portfolio:skip-home-loader"
import { onTransitionComplete } from "@/components/ui/nav-bar"

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return true

    const shouldSkipLoader = sessionStorage.getItem(SKIP_HOME_LOADER_KEY) === "true"
    if (shouldSkipLoader) {
      sessionStorage.removeItem(SKIP_HOME_LOADER_KEY)
    }

    return !shouldSkipLoader
  })
  useScrollAnimation(!loading)  // passes true only when loading is false


  const services = [
    { 
      service: 'UI/UX Design', 
      desc: "Clean, intuitive interfaces designed in Figma — from wireframes to polished high-fidelity screens.", 
      tag: 'Design',
      featured: false,
      deliverables: ['Wireframes & prototypes', 'Design system & components', 'Mobile & desktop screens'],
      cta: "Let's build something"
    },
    { 
      service: 'Web and App Development', 
      desc: "Responsive, performant websites and apps built from scratch or from your existing designs.", 
      tag: 'Development',
      featured: false,
      deliverables: ['Responsive web apps', 'Mobile app development', 'Design-to-code handoff'],
      cta: 'Start a project'
    },
    { 
      service: 'Digital Illustration', 
      desc: "Custom digital artwork — character art, portraits, concept art, or illustrations for branding and content.", 
      tag: 'Art',
      featured: false,
      deliverables: ['Character & portrait art', 'Brand illustrations', 'High-res export files'],
      cta: 'Starting at ₱1,500'
    },
    { 
      service: 'Full Creative Pipeline', 
      desc: "The complete package — I design, illustrate, and build your product end to end, no handoffs needed.", 
      tag: 'My specialty',
      featured: true,
      deliverables: ['Concept to live product', 'Custom art & branding', 'Ongoing support'],
      cta: "Let's create together"
    },
  ];

  const titleRef = useRef(null);
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)

  // Pass loading state to the animation
  useEffect(() => {
    if (loading) return
    onTransitionComplete(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      )
    })
  }, [loading])

  useEffect(() => {
    if (loading) return

    gsap.from([titleRef.current, subtitleRef.current, buttonsRef.current], {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.2,
    })
  }, [loading])

  return (
    <>
      {loading && <LoadingScreen onComplete={()=> setLoading(false)}/>}
      <div ref={contentRef} style={{ opacity: 0 }}>
        <div className={`min-h-screen flex flex-col items-center font-sans bg-background ${montserrat.className}`}>

          <Navbar />

          <main className="w-full max-w-6xl flex flex-col items-center justify-start px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 sm:items-start">

            <section className="min-h-[90vh] grid w-full grid-cols-1 items-center justify-center gap-10 mt-12 sm:mt-16 md:grid-cols-3 md:gap-8">
              <div className="flex flex-col gap-5 text-center sm:gap-6 md:col-span-2 md:text-left">
                <h1 ref={titleRef} className="text-4xl font-medium tracking-tight text-pretty leading-tight sm:text-5xl lg:text-6xl">
                  Hi, my name <br /> is{" "}
                  <span className="text-primary font-bold">Marianne</span>
                </h1>

                <p className="text-lg text-(--text-soft) dark:text-neutral-300 sm:text-xl lg:text-2xl">
                  Explore my projects, skills, and experience in web development.
                </p>

                <div className="flex flex-row justify-center w-full gap-2 md:justify-start">
                  <Link href="https://github.com/marianne-yo" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="rounded-md cursor-pointer" aria-label="GitHub">
                      <IconBrandGithub />
                    </Button>
                  </Link>
                  <Link href="https://www.linkedin.com/in/marianne-balen-066185264/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="rounded-md cursor-pointer" aria-label="LinkedIn">
                      <IconBrandLinkedin />
                    </Button>
                  </Link>
                  <Link
                    href="mailto:yourname@gmail.com?subject=Portfolio Inquiry&body=Hi Mari, I saw your portfolio..."
                  >
                    <Button variant="outline" size="lg" className="rounded-md cursor-pointer" aria-label="Email">
                      <MailIcon/>
                    </Button>
                  </Link>
                  <Link href="/RESUME_V2.pdf" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="default" size="lg" className="rounded-md cursor-pointer font-bold">
                      Resume
                    </Button>
                  </Link>
                </div>
              </div>

                <div className="relative flex justify-center items-end md:justify-end">
                  <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[280px] lg:h-[280px]">

                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="animate-border-spin absolute -inset-[100%] origin-center"
                        style={{
                          background: `conic-gradient(
                            from 0deg,
                            transparent 0deg,
                            var(--primary) 60deg,
                            var(--secondary) 120deg,
                            var(--accent) 180deg,
                            transparent 220deg
                          )`
                        }}
                      />
                    </div>

                    <div className="absolute inset-[3px] rounded-full bg-background z-10" />

                    <div className="relative z-20 rounded-full overflow-hidden m-[3px] w-[calc(100%-6px)] h-[calc(100%-6px)]">
                      <Image
                        src="/marianne_2.jpg"
                        alt="Marianne"
                        fill
                        className="object-cover object-top"
                        priority
                      />
                    </div>

                  </div>
                </div>
              <p className="text-xs tracking-widest text-(--text-soft) md:col-span-3">SCROLL</p>
            </section>

            {/* my works */}
            <section className="flex flex-col justify-center mt-24 w-full sm:mt-32 lg:mt-56">
              <div className="w-full max-w-5xl">
                <p ref={subtitleRef} data-animate="fade-up" className="font-light tracking-wider text-pretty">MY WORKS</p>

                <h2 data-animate="fade-up" className="text-4xl font-bold tracking-tight text-pretty leading-tight sm:text-5xl lg:text-6xl">
                  Projects
                </h2>

                <p ref={subtitleRef} data-animate="fade-up" className="font-normal tracking-wide text-pretty pb-5">
                  Things I&apos;ve designed, built, and shipped.
                </p>
              </div>

              <div data-animate="stagger" className="grid w-full grid-cols-1 gap-3 max-w-5xl md:grid-cols-2">
                {/* card 1 */}
                <Card className="relative w-full pt-0 bg-card border-2 border-ring md:col-span-2
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl">
                  <div className="absolute inset-0 z-30 aspect-video bg-black/10" />
                  <Image
                    src="/17.png"
                    alt="Event cover"
                    className="relative  aspect-video w-full object-cover"
                    width={5000}
                    height={5000}
                  />
                  <CardHeader className="grid grid-cols-[1fr_auto] gap-3">
                    <CardTitle className="font-bold text-pretty tracking-sm text-base sm:text-lg">Revio: A Review Material Generator Using Natural Language Processing with Acronym Mnemonic, Leitner, and Pomodoro Techniques </CardTitle>
                    
                    <CardAction>
                      <Badge variant="secondary" className="bg-slate-600/30">2025</Badge>
                    </CardAction>
                    <p className="col-span-2 font-light text-sm text-secondary-foreground tracking-wider sm:text-base">Mobile App Developer | UI/UX Designer - Capstone Project</p>         
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      A web and mobile application that generates study materials to flashcards and summaries.
                    </CardDescription>
                  </CardContent>
                  
                  <CardContent className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-blue-600/30">React</Badge>
                      <Badge variant="outline" className="bg-sky-500/30">React Native</Badge>
                      <Badge variant="outline" className="bg-slate-100/20">OpenAI</Badge>
                      <Badge variant="outline" className="bg-orange-500/30">Firebase</Badge>
                      <Badge variant="outline" className="bg-cyan-300/30">Tailwind CSS</Badge>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-2 w-full">
                    <Link
                      href="https://drive.google.com/drive/folders/1YqXcD1w_3YGOGzaQY_na1gtyOo1f6amC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant={"outline"} className="w-full rounded-md bg-primary cursor-pointer hover:border hover:border-primary">
                        Download the APK
                      </Button>
                    </Link>

                    <Link
                      href="https://revio-web-ebon.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full rounded-md bg-primary cursor-pointer hover:border hover:border-primary">
                        Website
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                {/* card 2 */}
                <Card className="relative w-full pt-0 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:z-10">
                  <div className="absolute inset-0 z-30 aspect-video bg-black/10" />
                  <Image
                    src="/faced_ss.png"
                    alt="Event cover"
                    className="relative z-20 aspect-video w-full object-cover"
                    width={1000}
                    height={1000}
                  />
                  <CardHeader className="grid grid-cols-[1fr_auto] gap-3">
                    <CardTitle className="font-bold text-pretty tracking-sm text-base sm:text-lg">Family Assistance Card in Emergencies and Disasters</CardTitle>

                    <CardAction>
                      <Badge variant="secondary" className="bg-slate-600/30">2026</Badge>
                    </CardAction>
                    <p className="col-span-2 font-light text-sm text-secondary-foreground tracking-wider sm:text-base">Full-Stack Developer | UI/UX Designer - Internship Project</p>         
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      A public survey form for DSWD assistance with an admin dashboard.
                    </CardDescription>
                  </CardContent>
                  
                  <CardContent className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-slate-400/10">Next.js</Badge>
                      <Badge variant="outline" className="bg-blue-600/30">React</Badge>
                      <Badge variant="outline" className="bg-blue-500/30">Typescript</Badge>
                      <Badge variant="outline" className="bg-green-400/20">Supabase</Badge>
                      <Badge variant="outline" className="bg-yellow-500/50">Daisy UI</Badge>
                  </CardContent>
                  <CardFooter className="flex justify-center w-full sm:flex-row">
                    <Link href="https://faced-six.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex w-full">
                    <Button className="w-full rounded-md cursor-pointer bg-primary hover:border hover:border-primary">
                      Website
                    </Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* card 3 */}
                <Card className="relative w-full pt-0 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:z-10">
                  <div className="absolute inset-0 z-30 aspect-video bg-black/10" />
                  <Image
                    src="/frva_ss.png"
                    alt="Event cover"
                    className="relative z-20 aspect-video w-full object-cover"
                    width={1000}
                    height={1000}
                    loading="eager"
                  />
                  <CardHeader className="grid grid-cols-[1fr_auto] gap-3">
                    <CardTitle className="font-bold text-pretty tracking-sm text-base sm:text-lg">Family Risk Assessment and Vulnerability Assessment</CardTitle>

                    <CardAction>
                      <Badge variant="secondary" className="bg-slate-600/30">2026</Badge>
                    </CardAction>
                    <p className="col-span-2 font-light text-sm text-secondary-foreground tracking-wider sm:text-base">Full-Stack Developer | UI/UX Designer - Internship Project</p>         
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      A public survey form for surveying the risk of each households with an admin dashboard that monitors the responses of each barangay.
                    </CardDescription>
                  </CardContent>
                  
                  <CardContent className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-slate-400/10">Next.js</Badge>
                      <Badge variant="outline" className="bg-blue-600/30">React</Badge>
                      <Badge variant="outline" className="bg-blue-500/30">Typescript</Badge>
                      <Badge variant="outline" className="bg-green-400/20">Supabase</Badge>
                      <Badge variant="outline" className="bg-mauve-700/20">Shadcn</Badge>
                  </CardContent>
                  <CardFooter className="flex justify-center w-full sm:flex-row">
                    <Link href="https://frva-pnq.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex w-full">
                      <Button className="w-full rounded-md cursor-pointer bg-primary hover:border-1 hover:border-secondary">
                        Website
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* card 4 */}
                {/* <Card className="relative w-full pt-0">
                  <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                  <img
                    src="https://avatar.vercel.sh/shadcn1"
                    alt="Event cover"
                    className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                  />
                  <CardHeader className="grid grid-cols-[1fr_auto] gap-3">
                    <CardTitle className="font-bold text-pretty tracking-sm text-base sm:text-lg">Festverse</CardTitle>
                    <CardAction>
                      <Badge variant="secondary" className="bg-slate-600/30">2025</Badge>
                    </CardAction>
                    <p className="col-span-2 font-light text-sm text-secondary-foreground tracking-wider sm:text-base">Front-End Developer | UI/UX Designer - School Project</p>         
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      FestVerse is a website designed to promote music festivals, specifically Coachella 2025. It serves as a centralized, interactive website providing information about the festival, such as schedules, artist lineups, maps, and travel guides, to enhance the user experience for festival-goers.
                    </CardDescription>
                  </CardContent>
                  
                  <CardContent className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-orange-700/30">HTML</Badge>
                      <Badge variant="outline" className="bg-sky-500/30">Tailwind CSS</Badge>
                      <Badge variant="outline" className="bg-yellow-500/30">Javascript</Badge>
                      <Badge variant="outline" className="bg-purple-400/20">PHP</Badge>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button variant={'outline'} className="w-full rounded-md cursor-pointer sm:w-1/2">Github</Button>
                    <Button className="w-full rounded-md cursor-pointer bg-primary sm:w-1/2">Website</Button>
                  </CardFooter>
                </Card> */}

                {/* card 5 */}
                {/* <Card className="relative w-full pt-0">
                  <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                  <img
                    src="https://avatar.vercel.sh/shadcn1"
                    alt="Event cover"
                    className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                  />
                  <CardHeader className="grid grid-cols-[1fr_auto] gap-3">
                    <CardTitle className="font-bold text-pretty tracking-sm text-base sm:text-lg">Cafe Ka Dito</CardTitle>
                    <CardAction>
                      <Badge variant="secondary" className="bg-slate-600/30">2023</Badge>
                    </CardAction>
                    <p className="col-span-2 font-light text-sm text-secondary-foreground tracking-wider sm:text-base">Front-End Developer | UI/UX Designer - School Project</p>         
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Cafe Ka Dito is a simple ordering system made with Java and Java Swing.
                    </CardDescription>
                  </CardContent>
                  
                  <CardContent className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-red-700/30">Java</Badge>
                      <Badge variant="outline" className="bg-red-400/30">Java Swing</Badge>
                      
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button variant={'outline'} className="w-full rounded-md cursor-pointer sm:w-1/2">Github</Button>
                    <Button disabled className="w-full rounded-md cursor-pointer bg-primary sm:w-1/2">Website</Button>
                  </CardFooter>
                </Card> */}
              </div>
            </section>

            {/* skills and tools section */}
            <section className="flex flex-col justify-center mt-24 w-full sm:mt-32 lg:mt-56">
              <div className="w-full max-w-5xl">
                <p ref={subtitleRef} data-animate="fade-up" className="font-light tracking-wider text-pretty">MY STACK</p>

                <h2 ref={titleRef} data-animate="fade-up" className="text-4xl font-bold tracking-tight text-pretty leading-tight sm:text-5xl lg:text-6xl">
                  Skills and Tools
                </h2>

                <p ref={subtitleRef} data-animate="fade-up" className="font-normal tracking-wide text-pretty pb-5">
                  Things I use in development and designing.
                </p>
              </div>

              <div className="flex flex-col w-full">
                <div className="bg-(--console-nav) border border-muted h-10 flex items-center justify-center rounded-t-lg px-3 gap-2 sm:px-5">
                  <div className="w-3 h-3 bg-red-500 rounded-full sm:w-4 sm:h-4"/>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full sm:w-4 sm:h-4"/>
                  <div className="w-3 h-3 bg-green-500 rounded-full sm:w-4 sm:h-4"/>
                  <p className="text-xs text-foreground mx-auto pr-8 font-mono sm:pr-16">skills.tsx</p>
                </div>
                <div className="bg-(--console) overflow-x-auto p-4 rounded-b-lg border border-muted font-mono text-xs leading-7 sm:p-5 sm:text-sm sm:leading-8">
                <div className="min-w-max">

                  <div className="flex gap-4">
                    <span className="text-[var(--text-soft)] select-none w-4">1</span>
                    <code>
                      <span className="text-[var(--text-purple)]">export default function </span>
                      <span className="text-[var(--text-yellow)]">Skills</span>
                      <span className="text-[var(--foreground)]">() {"{"}</span>
                    </code>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-[var(--text-soft)] select-none w-4">2</span>
                    <code></code>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-[var(--text-soft)] select-none w-4">3</span>
                    <code className="pl-6">
                      <span className="text-[var(--text-purple)]">const </span>
                      <span className="text-[var(--text-orange)]">design </span>
                      <span className="text-[var(--foreground)]">= [</span>
                      <span className="text-[var(--text-yellow)]">&quot;Figma&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;Rive&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;Canva&quot;</span>
                      <span className="text-[var(--foreground)]">]</span>
                    </code>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-[var(--text-soft)] select-none w-4">4</span>
                    <code className="pl-6">
                      <span className="text-[var(--text-purple)]">const </span>
                      <span className="text-[var(--text-orange)]">art </span>
                      <span className="text-[var(--foreground)]">= [</span>
                      <span className="text-[var(--text-yellow)]">&quot;Medibang&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;Clip Studio Paint&quot;</span>
                      <span className="text-[var(--foreground)]">]</span>
                    </code>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-[var(--text-soft)] select-none w-4">5</span>
                    <code className="pl-6">
                      <span className="text-[var(--text-purple)]">const </span>
                      <span className="text-[var(--text-orange)]">languages </span>
                      <span className="text-[var(--foreground)]">= [</span>
                      <span className="text-[var(--text-yellow)]">&quot;HTML/CSS&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;JavaScript&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;TypeScript&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;Java&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;PHP&quot;</span>
                      <span className="text-[var(--foreground)]">]</span>
                    </code>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-[var(--text-soft)] select-none w-4">6</span>
                    <code className="pl-6">
                      <span className="text-[var(--text-purple)]">const </span>
                      <span className="text-[var(--text-orange)]">frameworks </span>
                      <span className="text-[var(--foreground)]">= [</span>
                      <span className="text-[var(--text-yellow)]">&quot;React&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;Next.js&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;React Native&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;Laravel&quot;</span>
                      <span className="text-[var(--foreground)]">]</span>
                    </code>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-[var(--text-soft)] select-none w-4">7</span>
                    <code className="pl-6">
                      <span className="text-[var(--text-purple)]">const </span>
                      <span className="text-[var(--text-orange)]">databases </span>
                      <span className="text-[var(--foreground)]">= [</span>
                      <span className="text-[var(--text-yellow)]">&quot;MySQL&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;Firebase&quot;</span><span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;Supabase&quot;</span>
                      <span className="text-[var(--foreground)]">]</span>
                    </code>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-[var(--text-soft)] select-none w-4">8</span>
                    <code className="pl-6">
                      <span className="text-[var(--text-purple)]">const </span>
                      <span className="text-[var(--text-orange)]">tools </span>
                      <span className="text-[var(--foreground)]">= [</span>
                      <span className="text-[var(--text-yellow)]">&quot;VS Code&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;Git&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;GitHub&quot;</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-yellow)]">&quot;Notion&quot;</span>
                      <span className="text-[var(--foreground)]">]</span>
                    </code>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-[var(--text-soft)] select-none w-4">9</span>
                    <code></code>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-(--text-soft) select-none w-4">10</span>
                    <code className="pl-6">
                      <span className="text-(--text-purple)">return </span>
                      <span className="text-foreground">{"{ "}</span>
                      <span className="text-[var(--text-orange)]">design</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-(--text-orange)">art</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-orange)]">languages</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-orange)]">frameworks</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-orange)]">databases</span>
                      <span className="text-[var(--foreground)]">, </span>
                      <span className="text-[var(--text-orange)]">tools</span>
                      <span className="text-[var(--foreground)]">{" }"}</span>
                    </code>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-(--text-soft) select-none w-4">11</span>
                    <code>
                      <span className="text-foreground">{"}"}</span>
                    </code>
                  </div>

                  <div className="flex gap-4 mt-1">
                    <span className="text-(--text-soft) select-none w-4">12</span>
                    {/* <span className="inline-block w-2 h-4 bg-[var(--primary)] animate-pulse duration-fast mt-1"/> */}
                  </div>

                  {/* Line 13 - run command */}
                  <div className="flex gap-4">
                    <span className="text-(--text-soft) select-none w-4">13</span>
                    <code>
                      <span className="text-(--text-orange)">Skills</span>
                      <span className="text-foreground">()</span>
                    </code>
                  </div>
                </div>
                </div>
              </div>
              
              <br />
              {/* Output panel - OUTPUT THE LOGOS*/}
              <div className="border border-muted rounded-lg p-4 bg-(--surface-secondary) sm:p-5">
                <p className="text-xs text-[var(--text-soft)] font-mono mb-4"> Output</p>

                <div className="flex flex-col gap-4">

                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-2 font-mono">design</p>
                    <div className="flex flex-wrap gap-3">
                      {["Figma", "Rive", "Canva"].map(tool => (
                        <div key={tool} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-muted bg-(--surface)">
                        
                          <span className="text-sm">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-2 font-mono">art</p>
                    <div className="flex flex-wrap gap-3">
                      {["Medibang", "Clip Studio Paint"].map(tool => (
                        <div key={tool} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-muted bg-(--surface)">
                          
                          <span className="text-sm">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* repeat for languages, frameworks, databases, tools */}

                </div>
              </div>
            </section>

            {/* experience and education section */}
            <section className="flex flex-col justify-center mt-24 w-full sm:mt-32 lg:mt-56">
              <div className="w-full max-w-5xl">
                <p ref={subtitleRef} data-animate="fade-up" className="font-light tracking-wider text-(--text-muted)">MY JOURNEY</p>
                <h2 ref={titleRef} data-animate="fade-up" className="text-4xl font-bold tracking-tight text-pretty leading-tight sm:text-5xl lg:text-6xl">
                  Experience
                </h2>
                <p ref={subtitleRef} data-animate="fade-up" className="font-normal tracking-wide text-(--text-secondary) pb-10">
                  Where I&apos;ve been, what I&apos;ve built, and what shaped me.
                </p>
              </div>

              <div ref={buttonsRef} data-animate="fade-up" className="relative w-full max-w-5xl">

                {/* Vertical line */}
                <div className="absolute left-3 top-5 bottom-2 w-px bg-border" />

                <div className="flex flex-col gap-10 pl-7 sm:pl-8">

                <div className="relative">
                    <div className="absolute -left-6.25 top-1.5 w-3 h-3 rounded-full bg-foreground border-2 border-foreground" />
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-(--text-soft) font-mono">Present</span>
                      <Badge variant={'outline'} className="text-xs px-2 py-0.5 border-(--text-orange)/40 text-(--text-orange)">Freelance</Badge>
                      <Badge variant={'outline'} className="text-xs px-2 py-0.5 border-(--text-yellow)/40 text-(--text-yellow)">Now</Badge>
                    </div>
                    <p className="text-base font-bold tracking-wider text-(--foreground)] sm:text-lg">Freelance Web Developer</p>
                    <p className="text-sm text-(--text-secondary) mb-2 sm:text-base">Self-employed</p>
                    <p className="text-sm text-(--text-muted) leading-relaxed text-pretty max-w-xl">
                      Taking on digital art commissions — character art, portraits, and illustrations for clients online.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["Web Development", "UI/UX Designer", "Figma"].map(s => (
                        <Badge key={s} variant={'default'} className="text-xs px-2 py-1 bg-(--surface-secondary) text-(--text-muted) ">{s}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6.25 top-1.5 w-3 h-3 rounded-full bg-foreground border-2 border-foreground" />
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-(--text-soft) font-mono">2020 — Present</span>
                      <Badge variant={'outline'} className="text-xs px-2 py-0.5 border-(--text-orange)/40 text-(--text-orange)">Freelance</Badge>
                      <Badge variant={'outline'} className="text-xs px-2 py-0.5 border-(--text-yellow)/40 text-(--text-yellow)">Now</Badge>
                    </div>
                    <p className="text-base font-bold tracking-wider text-(--foreground)] sm:text-lg">Freelance Digital Artist</p>
                    <p className="text-sm text-(--text-secondary) mb-2 sm:text-base">Self-employed</p>
                    <p className="text-sm text-(--text-muted) leading-relaxed text-pretty max-w-xl">
                      Taking on digital art commissions — character art, portraits, and illustrations for clients online.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["Medibang", "Clip Studio Paint", "Procreate"].map(s => (
                        <Badge key={s} variant={'default'} className="text-xs px-2 py-1 bg-(--surface-secondary) text-(--text-muted) ">{s}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* OJT*/}
                  <div data-animate="fade-up" className="relative">
                    <div className="absolute -left-6.25 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-border" />
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-(--text-soft) font-mono">2024</span>
                      <Badge variant={'outline'} className="text-xs px-2 py-0.5 border-(--text-pink)/40 text-(--text-pink)">Internship</Badge>
                    </div>
                    <p className="text-base font-bold tracking-wider text-(--foreground)] sm:text-lg">IT Intern / OJT</p>
                    <p className="text-sm text-(--text-secondary) mb-2 sm:text-base">Municipality of Paniqui · Paniqui, Tarlac</p>
                    <p className="text-sm text-(--text-muted) leading-relaxed text-pretty max-w-xl">
                      Developed two internal systems used by the municipality. Assisted in both technical and non-technical operations within the office, and served the community directly by supporting financial assistance payout operations.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["System Development", "Technical Support", "Community Service"].map(s => (
                        <Badge key={s} variant={'default'} className="text-xs px-2 py-1 bg-(--surface-secondary) text-(--text-muted) ">{s}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* ── CAPSTONE ── */}
                  <div data-animate="fade-up" className="relative">
                    <div className="absolute -left-6.25 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-border" />
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-(--text-soft) font-mono">2023 — 2024</span>
                      <Badge variant={'outline'} className="text-xs px-2 py-0.5 border-(--text-purple)/40 text-(--text-purple)">Capstone</Badge>
                    </div>
                    <p className="text-base font-bold tracking-wider text-(--foreground)] sm:text-lg">Revio: A Review Material Generator Using Natural Language Processing with Acronym Mnemonic, Leitner and Pomodoro Techniques</p>
                    <p className="text-sm text-(--text-secondary) mb-2 sm:text-base">University Capstone · Tarlac State University</p>
                    <p className="text-sm text-(--text-muted) leading-relaxed text-pretty max-w-xl">
                      Revio is an AI-powered learning and reviewer generation platform designed to help students study more efficiently through automated summaries, flashcards, and structured review materials. It allows users to upload or input content and instantly transforms it into organized study resources tailored for better retention. The system focuses on simplifying complex topics and improving study productivity through content processing and spaced-learning friendly outputs.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["React", "React Native", "Firebase", "Tailwind CSS", "Figma"].map(s => (
                        <Badge key={s} variant={'default'} className="text-xs px-2 py-1 bg-(--surface-secondary) text-(--text-muted) ">{s}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* ── EDUCATION ── */}
                  <div data-animate="fade-up" className="relative">
                    <div className="absolute -left-6.25 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-border" />
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-(--text-soft) font-mono">2022 — 2026</span>
                      <Badge variant={'outline'} className="text-xs px-2 py-0.5 border-(--text-purple)/40 text-(--text-purple)">Education</Badge>
                    </div>
                    <p className="text-base font-bold tracking-wider text-(--foreground)] sm:text-lg">Bachelor of Science in Information Technology specialized in Web and Mobile Application</p>
                    <p className="text-sm text-(--text-secondary) mb-2 sm:text-base">Tarlac State University · Tarlac</p>
                    <p className="text-sm text-(--text-muted) leading-relaxed text-pretty max-w-xl">
                      Studied BSIT with a focus on design and development. Led class projects, and built things I&apos;m proud of.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["Web Development", "App Development", "UI/UX Design","Digital Art"].map(s => (
                        <Badge key={s} variant={'default'} className="text-xs px-2 py-1 bg-(--surface-secondary) text-(--text-muted) ">{s}</Badge>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Services */}
            <section className="flex flex-col justify-center mt-24 w-full sm:mt-32 lg:mt-56">
              <div className="w-full max-w-5xl">
                <p ref={subtitleRef} data-animate="fade-up" className="font-light tracking-wider text-pretty">MY SERVICES</p>

                <h2 ref={titleRef} data-animate="fade-up" className="text-4xl font-bold tracking-tight text-pretty leading-tight sm:text-5xl lg:text-6xl">
                  Services
                </h2>

                <p ref={subtitleRef} data-animate="fade-up" className="font-normal tracking-wide text-pretty pb-5">
                  From concept to code - I handle the the full creative pipeline.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {services.map(c =>(
                    <Card key={c.service} className={c.featured ? "border-2 border-primary rounded-md" : "rounded-md"}>
                      <CardHeader>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <CardTitle className="text-base">{c.service}</CardTitle>
                          <span className="text-xs px-2 py-0.5 rounded-full border border-border text-(--text-muted)">
                            {c.tag}
                          </span>
                        </div>
                        <CardDescription>{c.desc}</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex flex-col gap-2">
                          {c.deliverables.map(d => (
                            <div key={d} className="flex items-center gap-2 text-sm text-(--text-secondary)">
                              <Check className="w-3.5 h-3.5 text-(--text-muted) shrink-0" />
                              {d}
                            </div>
                          ))}
                        </div>
                      </CardContent>

                      <CardFooter className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-xs text-(--text-soft) italic">
                          {c.cta}
                        </span>
                        <Button asChild variant="ghost" className="text-xs text-(--text-secondary) flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
                          <a
                            href={`mailto:yourname@gmail.com?subject=${encodeURIComponent(
                              `Inquiry: ${c.service}`
                            )}&body=${encodeURIComponent(
                              `Hi Mari,\n\nI’m interested in your ${c.service} service.\n\nProject details:\n-`
                            )}`}
                          >
                            Inquire <ArrowRight />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="flex flex-col justify-center mt-24 w-full mb-16 sm:mt-32 sm:mb-20 lg:mt-56">
              <div className="w-full max-w-5xl flex flex-col items-center justify-center text-center">
                <p ref={subtitleRef} data-animate="fade-up" className="font-light tracking-wider text-pretty">LET&apos;S CONNECT</p>

                <h2 ref={titleRef} data-animate="fade-up" className="text-4xl font-medium tracking-tight text-pretty leading-tight sm:text-5xl lg:text-6xl">
                  Want to make something <br className="hidden sm:block" /><span className="font-serif font-bold italic inline-flex justify-center">together?</span>
                </h2>

                <p ref={subtitleRef} data-animate="fade-up" className="font-normal tracking-wide text-pretty py-8 sm:py-10">
                  I&apos;m a designer, developer, and digital artist — I can take your idea from a rough sketch all the way to a live product.
                </p>

                <Button variant={"outline"} size={'lg'} className=" font-light tracking-tight gap-2 cursor-pointer py-5">
                  <Mail/> Send me an Email
                </Button>

                <div className="w-24 mx-auto">
                  <Separator className="mt-10" />
                </div>

                <div className="flex flex-col w-full gap-3 mt-10 mb-16 sm:w-auto sm:flex-row sm:mb-20">
                  <Link href="https://www.facebook.com/marianeee123/" target="_blank" rel="noopener noreferrer">
                    <Button variant={"outline"} size={'sm'} className="font-light tracking-tight gap-2 cursor-pointer py-5 rounded-md">
                      <IconBrandFacebook /> Facebook
                    </Button>
                  </Link>
                  <Link href="https://www.instagram.com/marianne.ee/" target="_blank" rel="noopener noreferrer">
                    <Button variant={"outline"} size={'sm'} className="font-light tracking-tight gap-2 cursor-pointer py-5 rounded-md">
                      <IconBrandInstagram /> Instagram
                    </Button>
                  </Link>
                  <Link href="https://www.linkedin.com/in/marianne-balen-066185264/" target="_blank" rel="noopener noreferrer">
                    <Button variant={"outline"} size={'sm'} className="font-light tracking-tight gap-2 cursor-pointer py-5 rounded-md">
                      <IconBrandLinkedin /> LinkedIn
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground">Usually responds within 24 hours · Based in the Philippines</p>
              </div>
            </section>
            <footer className="w-full border-t border-border py-6 px-0 sm:px-10">
              <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-(--text-muted) sm:flex-row sm:text-left">
                
                <p className="font-mono">
                  designed & built by <span className="text-foreground font-medium">Marianne</span>
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
      </div>
    </>
  );
}
