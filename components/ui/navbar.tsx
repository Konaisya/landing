"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Link from "next/link";
import { MousePointerClick } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { name: "О себе", href: "#about" },
  { name: "Стек", href: "#stack" },
  { name: "Портфолио", href: "#projects" },
  { name: "Контакты", href: "#contact" },
];

export default function Navbar() {
  const container = useRef(null);
  const navBox = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".nav-anim-item", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });

    gsap.to(navBox.current, {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=100",
        scrub: 0.5, 
      },
      marginTop: "12px",
      maxWidth: "1100px",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      backdropFilter: "blur(12px)",
      borderColor: "rgba(255, 255, 255, 0.08)",
      paddingLeft: "20px",
      paddingRight: "20px",
      borderRadius: "9999px",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      ease: "none",
    });
  }, { scope: container });

  return (
    <nav 
        ref={container}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
    >
        <div 
            ref={navBox}
            className="flex items-center justify-between w-full max-w-[1300px] px-6 py-4 border border-transparent bg-transparent"
        >
            <Link href="/" className="nav-anim-item font-bold text-xl tracking-tighter flex items-center gap-2 text-white">
                <MousePointerClick />
                yuukich1
            </Link>
            
            <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
                <a
                key={link.name}
                href={link.href}
                className="nav-anim-item text-sm font-bold text-gray-300 hover:text-white transition-colors"
                >
                {link.name}
                </a>
            ))}
            </div>

            <div className="nav-anim-item">
            <a
                href="https://t.me/ultimap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-full  text-white text-xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="#ffffff"/>
                </svg>
                Telegram
            </a>
            </div>
        </div>
    </nav>
  );
}