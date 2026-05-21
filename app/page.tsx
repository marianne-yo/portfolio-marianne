"use client";
import { useEffect, useRef } from "react";
import { GraduationCap, UserStar, MailIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

const montserrat = Montserrat({ subsets: ["latin"] });

const LEFT_EYE  = { cx: 105.354, cy: 202.694 };
const RIGHT_EYE = { cx: 203.354, cy: 202.694 };
const MAX_DIST  = 7; // max pupil travel in SVG units

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function Home() {
  const { setTheme, resolvedTheme } = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);

  const cur = useRef({ lx: LEFT_EYE.cx, ly: LEFT_EYE.cy, rx: RIGHT_EYE.cx, ry: RIGHT_EYE.cy });
  const tgt = useRef({ lx: LEFT_EYE.cx, ly: LEFT_EYE.cy, rx: RIGHT_EYE.cx, ry: RIGHT_EYE.cy });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    function getEyeTarget(eyeCx: number, eyeCy: number, cursorX: number, cursorY: number) {
      const rect = svg!.getBoundingClientRect();
      const scaleX = 323 / rect.width;
      const scaleY = 399 / rect.height;
      const px = (cursorX - rect.left) * scaleX;
      const py = (cursorY - rect.top)  * scaleY;
      const dx = px - eyeCx;
      const dy = py - eyeCy;
      const angle = Math.atan2(dy, dx);
      const dist  = Math.min(MAX_DIST, Math.hypot(dx, dy));
      return { x: eyeCx + Math.cos(angle) * dist, y: eyeCy + Math.sin(angle) * dist };
    }

    function onMove(clientX: number, clientY: number) {
      const l = getEyeTarget(LEFT_EYE.cx,  LEFT_EYE.cy,  clientX, clientY);
      const r = getEyeTarget(RIGHT_EYE.cx, RIGHT_EYE.cy, clientX, clientY);
      tgt.current = { lx: l.x, ly: l.y, rx: r.x, ry: r.y };
    }

    function handleMouse(e: MouseEvent) { onMove(e.clientX, e.clientY); }
    function handleTouch(e: TouchEvent) {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }

    window.addEventListener("mousemove", handleMouse);
    svg.addEventListener("touchmove", handleTouch, { passive: false });

    function animate() {
      const c = cur.current;
      const t = tgt.current;
      c.lx = lerp(c.lx, t.lx, 0.1);
      c.ly = lerp(c.ly, t.ly, 0.1);
      c.rx = lerp(c.rx, t.rx, 0.1);
      c.ry = lerp(c.ry, t.ry, 0.1);

      const iL  = svg!.getElementById("iris-left");
      const pL  = svg!.getElementById("pupil-left");
      const sL  = svg!.getElementById("shine-left");
      const iR  = svg!.getElementById("iris-right");
      const pR  = svg!.getElementById("pupil-right");
      const sR  = svg!.getElementById("shine-right");

      [iL, pL].forEach(el => {
        el?.setAttribute("cx", String(c.lx));
        el?.setAttribute("cy", String(c.ly));
      });
      sL?.setAttribute("cx", String(c.lx + 5));
      sL?.setAttribute("cy", String(c.ly - 3.5));

      [iR, pR].forEach(el => {
        el?.setAttribute("cx", String(c.rx));
        el?.setAttribute("cy", String(c.ry));
      });
      sR?.setAttribute("cx", String(c.rx + 5));
      sR?.setAttribute("cy", String(c.ry - 3.5));

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      svg.removeEventListener("touchmove", handleTouch);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const navItems = [
    { logo: <GraduationCap />, name: "Professional", link: "#professional" },
    { logo: <UserStar />,      name: "Personal",     link: "#personal"      },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`flex flex-col flex-1 items-center justify-start font-sans bg-background ${montserrat.className}`}>
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-start py-10 px-10 sm:items-start bg-background">
        {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}

        <div className="relative w-full">
          <Navbar>
            <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
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
                {navItems.map((item, idx) => (
                  <a key={idx} href={item.link} onClick={() => setIsMobileMenuOpen(false)}
                     className="relative text-neutral-600 dark:text-neutral-300">
                    <span className="block">{item.name}</span>
                  </a>
                ))}
                <div className="flex w-full flex-col gap-4">
                  <NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant="primary" className="w-full">
                    En
                  </NavbarButton>
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
           <div className="absolute top-2 right-0 z-[9999] flex items-center gap-4">
              {/* <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button> */}
            </div>
        </div>

        <section className="grid grid-cols-3 gap-8 mt-16 w-full items-center justify-center ">
          <div className="col-span-2 flex flex-col gap-6">
            <h1 className="text-6xl font-medium tracking-tight text-pretty leading-tight">
              Hi, my name <br /> is{" "}
              <span className="text-primary font-bold">Marianne</span>
            </h1>

            <p className="text-2xl text-neutral-600 dark:text-neutral-300">
              Explore my projects, skills, and experience in web development.
            </p>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="lg" className="rounded-md cursor-pointer" aria-label="GitHub">
                <IconBrandGithub />
              </Button>
              <Button variant="outline" size="lg" className="rounded-md cursor-pointer" aria-label="LinkedIn">
                <IconBrandLinkedin />
              </Button>
              <Button variant="outline" size="lg" className="rounded-md cursor-pointer" aria-label="Email">
                <MailIcon />
              </Button>
              <Button variant="outline" size="lg" className="rounded-md cursor-pointer font-bold">
                Resume
              </Button>
            </div>
          </div>

          {/* Right — your character with eye tracking */}
          <div className="flex justify-center items-end">
            <svg
              ref={svgRef}
              width="100%"
              viewBox="0 0 323 399"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-[280px] drop-shadow-md"
              aria-label="Illustrated portrait of Marianne"
            >
              {/* ── All original paths (unchanged) ── */}
              <path d="M119.854 328.694C122.2 319.62 119.854 304.694 119.854 304.694L84.3536 279.694L69.3536 243.694L39.3536 213.694L24.8536 230.194C24.8536 230.194 28.6173 260.487 26.3536 279.694C24.0303 299.406 12.8536 314.527 12.8536 328.694V373.694C12.8536 373.694 18.5202 388.527 21.3536 394.694C24.1869 400.861 37.3536 397.694 37.3536 397.694C37.3536 397.694 46.8536 361.194 51.3536 357.194C55.8536 353.194 112.354 344.694 112.354 344.694C112.354 344.694 118.126 335.375 119.854 328.694Z" fill="black"/>
              <path d="M196.854 328.694C194.092 318.923 196.854 302.694 196.854 302.694L234.854 275.694L243.854 242.194L256.354 233.694L270.354 219.194L286.354 227.694L303.354 263.194C303.354 263.194 316.993 295.645 318.854 317.694C320.318 335.05 322.603 346.137 315.854 362.194C308.415 379.89 281.854 397.694 281.854 397.694C281.854 397.694 273.354 361.694 268.854 357.194C264.354 352.694 204.854 344.694 204.854 344.694C204.854 344.694 198.753 335.417 196.854 328.694Z" fill="black"/>
              <path d="M82.3536 276.694C71.3536 260.694 52.8536 177.194 52.8536 177.194L153.354 61.694L255.854 177.194C255.854 177.194 242.854 259.694 233.354 276.694C223.854 293.694 153.354 320.694 153.354 320.694C153.354 320.694 93.3536 292.694 82.3536 276.694Z" fill="#FFFCF6" stroke="black"/>
              <path d="M189.854 224.694L201.354 227.194L216.854 224.694" stroke="black"/>
              <path d="M184.354 197.194C184.354 197.194 182.24 206.128 183.354 211.694C184.467 217.26 189.854 224.694 189.854 224.694" stroke="white"/>
              <path d="M228.854 216.694L222.854 221.694L216.854 225.194" stroke="white"/>
              <path d="M118.854 223.194L107.354 225.694L91.8536 223.194" stroke="black"/>
              <path d="M124.354 195.694C124.354 195.694 126.467 204.628 125.354 210.194C124.24 215.76 118.854 223.194 118.854 223.194" stroke="white"/>
              <path d="M79.8536 215.194L85.8536 220.194L91.8536 223.694" stroke="white"/>

              {/* ── Eyes (ids required for JS) ── */}
              <ellipse id="iris-left"   cx="105.354" cy="202.694" rx="16.5" ry="18"  fill="#230436"/>
              <ellipse id="pupil-left"  cx="105.354" cy="202.694" rx="7.5"  ry="8"   fill="#160321"/>
              <circle  id="shine-left"  cx="110.354" cy="199.194" r="3.5"            fill="#E4E2E6"/>
              <ellipse id="iris-right"  cx="203.354" cy="202.694" rx="16.5" ry="18"  fill="#230436"/>
              <ellipse id="pupil-right" cx="203.354" cy="202.694" rx="7.5"  ry="8"   fill="#160321"/>
              <circle  id="shine-right" cx="208.354" cy="199.194" r="3.5"            fill="#E4E2E6"/>

              <path d="M147.354 252.694L154.354 257.694" stroke="black"/>
              <path d="M138.354 160.694C140.854 164.194 138.354 169.694 138.354 169.694C138.354 169.694 122.854 158.194 111.354 156.194C99.8536 154.194 96.0943 153.714 86.8536 156.194C82.3709 157.397 75.8536 160.694 75.8536 160.694C75.8536 160.694 77.8536 155.194 87.8536 151.694C97.8536 148.194 111.354 151.694 111.354 151.694C111.354 151.694 135.854 157.194 138.354 160.694Z" fill="black" stroke="black"/>
              <path d="M135.854 275.694H181.354" stroke="black"/>
              <path d="M196.854 182.194C190.176 186.362 182.854 196.694 182.854 196.694L196.854 189.694C196.854 189.694 204.354 185.194 213.854 184.194C223.354 183.194 233.854 189.694 233.854 189.694V202.194L229.354 216.194L236.354 206.694L240.854 189.694L244.354 188.194L240.854 185.694C240.854 185.694 243.02 185.992 244.354 185.694C246.68 185.174 249.354 182.194 249.354 182.194C249.354 182.194 246.246 182.675 244.354 182.194C242.147 181.633 239.354 179.194 239.354 179.194L244.354 174.694L239.354 176.194H232.354C232.354 176.194 220.972 174.958 213.854 176.194C206.917 177.398 202.826 178.466 196.854 182.194Z" fill="black" stroke="black"/>
              <path d="M113.354 182.194C120.031 186.362 127.354 196.694 127.354 196.694L113.354 189.694C113.354 189.694 105.854 185.194 96.3536 184.194C86.8536 183.194 76.3536 189.694 76.3536 189.694V202.194L80.8536 216.194L73.8536 206.694L69.3536 189.694L65.8536 188.194L69.3536 185.694C69.3536 185.694 67.1874 185.992 65.8536 185.694C63.5276 185.174 60.8536 182.194 60.8536 182.194C60.8536 182.194 63.9612 182.675 65.8536 182.194C68.0605 181.633 70.8536 179.194 70.8536 179.194L65.8536 174.694L70.8536 176.194H77.8536C77.8536 176.194 89.2353 174.958 96.3536 176.194C103.29 177.398 107.381 178.466 113.354 182.194Z" fill="black" stroke="black"/>
              <path d="M210.354 155.694C195.854 158.194 184.854 168.194 184.854 168.194C184.854 168.194 182.616 166.353 182.354 164.694C182.013 162.538 184.854 159.694 184.854 159.694C184.854 159.694 199.754 151.133 210.354 149.694C221.657 148.16 239.354 153.194 239.354 153.194L243.854 159.694C243.854 159.694 224.854 153.194 210.354 155.694Z" fill="black" stroke="black"/>
              <path d="M69.3536 242.694C69.3536 242.694 38.3536 223.194 34.3536 200.194C30.3536 177.194 52.3536 178.194 52.3536 178.194" stroke="black"/>
              <path d="M243.854 242.2C243.854 242.2 274.854 222.7 278.854 199.7C282.854 176.7 255.854 178.194 255.854 178.194" stroke="black"/>
              <path d="M141.354 143.194C157.911 126.976 178.854 97.194 178.854 97.194C178.854 97.194 182.63 123.467 190.354 138.194C199.03 154.738 221.854 174.194 221.854 174.194C221.854 174.194 234.811 188.372 243.854 196.694C251.911 204.11 265.354 214.694 265.354 214.694C265.354 214.694 280.26 225.717 291.354 229.194C302.218 232.6 320.354 232.194 320.354 232.194C320.354 232.194 309.019 226.02 303.354 220.194C297.35 214.02 296.04 208.919 291.354 201.694L310.854 212.694C310.854 212.694 301.91 196.577 299.854 185.194C297.136 170.146 302.622 161.468 303.354 146.194C304.194 128.641 306.904 118.405 303.354 101.194C299.645 83.2138 293.976 73.8293 284.354 58.194C274.683 42.4803 270.332 30.9214 254.354 21.694C242.949 15.1079 234.911 14.4071 221.854 12.694C209.657 11.0939 190.354 12.694 190.354 12.694L193.354 6.19403L185.854 9.69403L181.854 0.194031V12.694C181.854 12.694 170.79 5.61074 162.854 3.19403C149.031 -1.01534 140.168 1.22624 125.854 3.19403C112.009 5.09716 103.984 6.71404 91.3536 12.694C75.7512 20.0811 67.271 26.322 56.3536 39.694C47.2371 50.8602 44.3728 58.8774 38.8536 72.194C30.9116 91.3563 25.8536 123.694 25.8536 123.694C20.9615 140.084 13.8536 154.694 11.8536 165.194C9.85358 175.694 0.353577 185.194 0.353577 185.194L16.8536 179.194C16.8536 179.194 5.96945 209.444 7.85358 229.194C8.8655 239.802 14.3536 255.694 14.3536 255.694C14.3536 255.694 16.5846 245.036 19.3536 238.694C21.0169 234.884 22.8734 231.876 24.883 229.194C29.009 223.688 33.7808 219.558 38.8536 212.694C45.7479 203.366 56.3536 188.694 56.3536 188.694C56.3536 188.694 59.1377 196.488 59.3536 201.694C59.617 208.046 56.3536 217.694 56.3536 217.694C56.3536 217.694 71.5916 200.703 79.8536 188.694C91.292 172.068 104.354 143.194 104.354 143.194L91.3536 181.694C91.3536 181.694 123.748 160.439 141.354 143.194Z" fill="black"/>
            </svg>
          </div>
          <p>scroll</p>
        </section>

        <section className="flex flex-col justify-center mt-100">
          <div className="w-full max-w-5xl">
            <p className="font-light tracking-wider text-pretty">MY WORKS</p>

            <h2 className="text-6xl font-bold tracking-tight text-pretty leading-tight">
              Projects
            </h2>

            <p className="font-normal tracking-wide text-pretty pb-5">
              Things I&apos;ve designed, built, and shipped.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            <Card className="rounded-2xl w-full md:col-span-2 min-h-[300px]">
              <CardHeader>
                <CardTitle>Project 1</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card className="rounded-2xl w-full min-h-[260px]">
              <CardHeader>
                <CardTitle>Project 2</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card className="rounded-2xl w-full min-h-[260px]">
              <CardHeader>
                <CardTitle>Project 2</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card className="rounded-2xl w-full min-h-[260px]">
              <CardHeader>
                <CardTitle>Project 2</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card className="rounded-2xl w-full min-h-[260px]">
              <CardHeader>
                <CardTitle>Project 2</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        </section>

      </main>
    </div>
  );
}