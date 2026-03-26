"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function SmoothScroll() {
  useGSAP(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          e.preventDefault();
          gsap.to(window, {
            duration: 1.2,
            scrollTo: {
              y: anchor.hash,
              offsetY: 80, 
            },
            ease: "power4.inOut",
          });
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);
    return () => window.removeEventListener("click", handleAnchorClick);
  }, []);

  return null; 
}