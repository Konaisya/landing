"use client";
import { useEffect, useRef } from "react";
import MagicBento from "@/components/MagicBento";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Stack() {
  const sectionRef = useRef(null);
  const headerWrapRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bentoIntroRef = useRef(null);
  const bentoExitRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      introTl.fromTo(titleRef.current, 
        { 
          y: 100, 
          opacity: 0, 
          rotationX: -45, 
          filter: "blur(20px)",
          scale: 0.8 
        },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0, 
          filter: "blur(0px)", 
          scale: 1,
          duration: 1.5, 
          ease: "expo.out" 
        }
      )
      .fromTo(subtitleRef.current,
        { 
          y: 40, 
          opacity: 0, 
          filter: "blur(10px)",
          letterSpacing: "0.2em" 
        },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)", 
          letterSpacing: "normal",
          duration: 1.2, 
          ease: "power3.out" 
        },
        "-=1.1"
      )
      .fromTo(bentoIntroRef.current,
        { 
          y: 80, 
          opacity: 0, 
          scale: 0.9,
          rotationX: 15 
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          rotationX: 0,
          duration: 1.8, 
          ease: "expo.out" 
        },
        "-=1"
      );

      gsap.to(headerWrapRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",
          end: "top -40%",
          scrub: 1,
          immediateRender: false
        },
        y: -180,
        opacity: 0,
        scale: 0.8,
        filter: "blur(15px)",
        rotationX: 25,
        ease: "none"
      });

      gsap.to(bentoExitRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          immediateRender: false
        },
        y: 120,
        scale: 0.85,
        opacity: 0,
        rotationX: -10,
        ease: "none"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 flex flex-col items-center overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      <div ref={headerWrapRef} className="text-center mb-24 px-4 will-change-[transform,opacity,filter]">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 will-change-[transform,opacity,filter]"
        >
          Мощный <span className="text-indigo-600">Технологический</span> Стек
        </h2>
        <p 
          ref={subtitleRef}
          className="text-gray-400 text-xl max-w-2xl mx-auto font-light will-change-[transform,opacity,filter]"
        >
          Инструменты, которые я использую для создания высоконагруженных и визуально безупречных продуктов.
        </p>
      </div>

      <div ref={bentoExitRef} className="w-full will-change-transform">
        <div ref={bentoIntroRef} className="w-full will-change-transform">
          <MagicBento 
            glowColor="79, 70, 229" 
            spotlightRadius={400} 
            particleCount={20}
            enableTilt={true}
            enableMagnetism={true}
          />
        </div>
      </div>
    </section>
  );
}