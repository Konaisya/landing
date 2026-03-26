"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DarkVeil from "@/components/DarkVeil";
import Image from "next/image";
import TextType from "@/components/textType";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const techStack = ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Redis", "Docker", "TailwindCSS", "GSAP"];

export default function Main() {
  const container = useRef(null);
  const heroText = useRef(null);
  const buttonGroup = useRef(null);
  const imageContainer = useRef(null);
  const stackWrapper = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    tl.to([heroText.current, buttonGroup.current], {
      y: -100,
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
    }, 0);

    tl.to(imageContainer.current, {
      scale: 1.2,
      y: -150, 
      boxShadow: "0 50px 100px rgba(0,0,0,0.8)",
    }, 0);


    tl.to(stackWrapper.current, {
      y: 300,
      opacity: 0,
    }, 0);


    gsap.to(".stack-line", {
      xPercent: -50,
      repeat: -1,
      duration: 30,
      ease: "none",
    });

  }, { scope: container });

  return (
    <div ref={container} className="relative">
     <section id="about" className="relative h-[110vh] flex flex-col items-center overflow-hidden">
        
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <div className="w-full h-full opacity-60">
                <DarkVeil speed={0.3} warpAmount={0.1} />
            </div>
        </div>

        <div className="relative z-10 flex flex-col items-center pt-48 text-center">
          <div ref={heroText} className="space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
               <span className="w-8 h-[1px] bg-indigo-600"></span>
               <span className="text-indigo-600 text-xs uppercase tracking-[0.3em] font-medium">Fullstack Portfolio</span>
               <span className="w-8 h-[1px] bg-indigo-600"></span>
            </div>
            
            <h1 className="text-6xl md:text-6xl font-medium tracking-tighter text-white">
            <TextType 
                text={["Привет, я Юки - Fullstack разработчик"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="|"
                cursorClassName="text-indigo-600"
                hideCursorWhileTyping
                initialDelay={500}
                cursorBlinkDuration={0.5}
            />
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Создаю масштабируемые SaaS-решения и MVP. <br /> 
              <span className="text-gray-500 text-sm italic">От идеи до деплоя — с фокусом на производительность и чистый код.</span>
            </p>
          </div>

          <div ref={buttonGroup} className="mt-12 flex flex-col items-center gap-6">
            <a 
              href="#contacts"
              className="group relative px-10 py-3 bg-white text-black font-bold rounded-xl overflow-hidden transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10 uppercase text-xs tracking-widest">Обсудить проект</span>
              <div className="absolute inset-0 bg-indigo-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>
          </div>
        </div>

        <div 
          ref={stackWrapper}
          className="absolute bottom-40 w-full z-20 pointer-events-none"
        >
          <div className="flex border-y border-white/5 py-6 bg-black/40 backdrop-blur-sm">
            <div className="stack-line flex gap-12 whitespace-nowrap px-6">
              {[...techStack, ...techStack].map((item, i) => (
                <span key={i} className="text-3xl font-bold text-white/20 uppercase tracking-tighter flex items-center gap-8">
                  {item} <span className="text-indigo-600/30 text-xl">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div 
          ref={imageContainer}
          className="absolute bottom-[-6%] w-[90%] max-w-[1100px] aspect-video z-30 rounded-3xl overflow-hidden border border-white/10 bg-gray-900 shadow-[0_-20px_80px_rgba(0,0,0,0.5)]"
        >
          <div className="relative w-full h-full group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
            <Image 
              src="/mig.png" 
              alt="Project Preview"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out scale-130"
              fill
            />
            <div className="absolute bottom-12 left-12 z-20">
              <div className="flex items-center gap-3 mb-3">
                 <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[10px] uppercase tracking-widest rounded border border-blue-500/30">Кейс</span>
                 <p className="text-xs text-gray-400 font-mono tracking-wider">// Latest Development</p>
              </div>
              <h3 className="text-4xl font-bold text-white tracking-tight">Мрамор и Гранит</h3>
              <p className="text-gray-400 mt-2 text-sm max-w-sm">Автоматизация уведомлений и кэширование данных.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}