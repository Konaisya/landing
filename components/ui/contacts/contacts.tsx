"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    name: "Telegram",
    handle: "@ultimap",
    link: "https://t.me/ultimap",
    color: "group-hover:text-blue-400",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 5L2 12.5L9 15M21 5L12.5 21L9 15M21 5L9 15" />
      </svg>
    ),
  },
  {
    name: "Discord",
    handle: "yuukich1",
    link: "https://discord.com/users/334417922879520769",
    color: "group-hover:text-indigo-400",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        <path d="M19.7 4.5a16.3 16.3 0 0 0-5.1-1.6l-.2.5c-1.6-.5-3.2-.5-4.8 0l-.2-.5a16.3 16.3 0 0 0-5.1 1.6 17.5 17.5 0 0 0-3.3 12.5 17.5 17.5 0 0 0 5.3 2.6l1.1-1.5c-1-.3-1.9-.8-2.8-1.5l.4-.3a11.9 11.9 0 0 0 14.2 0l.4.3c-.9.7-1.8 1.2-2.8 1.5l1.1 1.5a17.5 17.5 0 0 0 5.3-2.6 17.5 17.5 0 0 0-3.3-12.5Z" />
      </svg>
    ),
  }
];

export default function Contacts() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-item", 
        { 
          y: 60, 
          opacity: 0,
          scale: 0.95 
        }, 
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.1, 
          ease: "power4.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", 
            toggleActions: "play none none reverse", 
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black py-40 px-6 min-h-screen flex items-center overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="reveal-item mb-20">
          <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-white mb-6 text-center">
            Построим будущее <span className="text-indigo-600">вместе</span>
          </h2>
          <p className="text-zinc-500 text-xl md:text-2xl font-light max-w-2xl text-center mx-auto">
            Свяжитесь со мной напрямую или посмотрите репозитории на GitHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {socials.map((item, idx) => (
            <a 
              key={idx} 
              href={item.link} 
              target="_blank"
              className="reveal-item group relative h-[300px] rounded-[3rem] bg-zinc-900/40 border border-white/5 p-12 flex flex-col justify-between overflow-hidden hover:border-indigo-500/50 transition-all duration-500"
            >
              <div className={`w-20 h-20 rounded-3xl bg-zinc-800 flex items-center justify-center text-zinc-500 ${item.color} transition-all duration-500 group-hover:scale-110 group-hover:bg-zinc-800/50`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-white text-4xl font-bold tracking-tight mb-2">{item.name}</h3>
                <p className="text-zinc-500 text-xl font-light">{item.handle}</p>
              </div>
            </a>
          ))}

          <a 
            href="https://github.com/yuukich1" 
            target="_blank"
            className="reveal-item md:col-span-2 group relative rounded-[3rem] bg-zinc-900/40 border border-white/5 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 hover:border-white/20 transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-24 h-24 rounded-[2rem] bg-white text-black flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-white text-5xl font-bold mb-4 tracking-tight">GitHub</h3>
                <p className="text-zinc-500 text-xl max-w-md font-light leading-relaxed">
                  Посмотрите мои последние коммиты и архитектурные решения в open-source.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-lg font-medium group-hover:bg-white group-hover:text-black transition-all">
              <span>View Profile</span>
              <svg width="20" height="20" viewBox="0 0 15 15" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M3.5 7.5H11.5M11.5 7.5L7.5 3.5M11.5 7.5L7.5 11.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}