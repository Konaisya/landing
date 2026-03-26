"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: '/mig.png',
    link: 'https://samara-mig.ru/',
    title: 'Мрамор и Гранит',
    category: 'Интернет витрина для мемориального сегмента',
    description: 'Полноценная цифровая витрина для премиального сегмента изделий из натурального камня. Реализован сложный каталог с фильтрацией и высокопроизводительная галерея.',
    stack: ['Next.js', 'Tailwind', 'Framer', 'FastAPI', 'PostgreSQL', 'Docker'],
    color: 'from-zinc-900 to-indigo-950/30'
  },
  {
    image: '/freelance.png',
    link: 'https://github.com/Konaisya/frelanceCompanyNextJS',
    title: 'FrelanceHub',
    category: 'Платформа для фрилансеров',
    description: 'Платформа для фрилансеров и заказчиков с упором на UX. Реализована система управления проектами и встроенный чат на вебсокетах.',
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'websockets', 'TailwindCSS', 'zod'],
    color: 'from-zinc-900 to-purple-950/30'
  },
  {
    image: '/jwewr.jpg',
    link: '#',
    title: 'Jewelry Store',
    category: 'Магазин ювелирных изделий',
    description: 'Онлайн-магазин ювелирных изделий с акцентом на визуальное представление и чистоту интерфейса.',
    stack: ['TypeScript', 'Next.js', 'FastAPI', 'MySQL', 'SQLAlchemy'],
    color: 'from-zinc-900 to-emerald-950/30'
  }
];

export default function Portfolio() {
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const modalImgRef = useRef(null);
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

  const closeFullscreen = () => {
    if (!modalRef.current || !modalImgRef.current) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        setFullscreenImg(null);
        document.body.style.overflow = "unset";
      }
    });

    tl.to(modalImgRef.current, { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.in" })
      .to(modalRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  useEffect(() => {
    if (fullscreenImg && modalRef.current && modalImgRef.current) {
      document.body.style.overflow = "hidden";
      
      gsap.set(modalRef.current, { opacity: 0 });
      gsap.set(modalImgRef.current, { scale: 0.8, opacity: 0 });

      const tl = gsap.timeline();
      tl.to(modalRef.current, { opacity: 1, duration: 0.4 })
        .to(modalImgRef.current, { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          ease: "back.out(1.4)" 
        }, "-=0.2");
    }
  }, [fullscreenImg]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(".title-appear", 
        { y: 60, opacity: 0, filter: "blur(10px)" },
        { 
          y: 0, opacity: 1, filter: "blur(0px)", 
          duration: 1.2, ease: "expo.out",
          scrollTrigger: {
            trigger: ".portfolio-title",
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );


      if (window.innerWidth > 768) {
        gsap.to(".title-disappear", {
          scrollTrigger: {
            trigger: ".portfolio-title",
            start: "top 10%",
            end: "bottom 20%",
            scrub: 1,
          },
          y: -80, opacity: 0, filter: "blur(10px)", scale: 0.95, ease: "none"
        });
      }

      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card: any) => {
        const contentAppear = card.querySelector(".content-appear");
        const contentDisappear = card.querySelector(".content-disappear");
        const imageWrapper = card.querySelector(".image-wrapper");
        const image = card.querySelector(".project-image-inner");

        gsap.fromTo(contentAppear,
          { y: 40, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 1, 
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.to(contentDisappear, {
          scrollTrigger: {
            trigger: card,
            start: "top 15%",
            end: "bottom top",
            scrub: 1,
          },
          y: -40, opacity: 0, filter: "blur(4px)", ease: "none"
        });

        gsap.to(imageWrapper, {
          scrollTrigger: {
            trigger: card,
            start: "top 15%",
            end: "bottom top",
            scrub: 1.5,
          },
          y: 30, scale: 0.95, opacity: 0.3, ease: "none"
        });

        gsap.to(image, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen">
      
      {fullscreenImg && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-10 cursor-zoom-out"
          onClick={closeFullscreen}
        >
          <div ref={modalImgRef} className="relative w-full h-full max-w-7xl will-change-transform">
            <Image 
              src={fullscreenImg} 
              alt="Full size" 
              fill 
              className="object-contain" 
              priority
            />
          </div>
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            onClick={closeFullscreen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <section className="portfolio-title pt-20 md:pt-32 pb-20 md:pb-40 px-6 max-w-7xl mx-auto overflow-hidden text-center">
        <div className="title-disappear">
          <div className="title-appear will-change-[transform,opacity,filter]">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Избранные <span className="text-indigo-600">кейсы</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl max-w-3xl font-light leading-relaxed mx-auto">
              Проектирую цифровой опыт, где производительность встречается с эстетикой. 
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto space-y-24 md:space-y-64 pb-32">
        {projects.map((project, index) => (
          <div 
            key={index}
            className={`project-card group relative flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
          >
            <div 
              className="image-wrapper relative w-full md:w-3/5 aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl bg-zinc-900 border border-white/5 cursor-zoom-in will-change-transform"
              onClick={() => setFullscreenImg(project.image)}
            >
              <div className="project-image-inner relative w-full h-[120%] -top-[10%]">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-40 group-hover:opacity-20 transition-opacity`} />
            </div>

            <div className="content-disappear w-full md:w-2/5 will-change-[transform,opacity,filter]">
              <div className="content-appear flex flex-col space-y-4 md:space-y-6 text-left">
                <span className="text-indigo-500 font-mono tracking-[0.2em] uppercase text-[10px] md:text-xs">
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed font-light">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] uppercase tracking-wider text-zinc-400">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 md:pt-8">
                  <a 
                    href={project.link} 
                    target="_blank"
                    className="inline-flex items-center gap-3 text-white text-base md:text-lg group/link"
                  >
                    <span className="relative">
                      Explore Case
                      <span className="absolute bottom-0 left-0 w-full h-px bg-indigo-500 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 origin-left" />
                    </span>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/link:bg-indigo-600 group-hover/link:border-indigo-600 transition-all duration-500">
                      <svg width="12" height="12" viewBox="0 0 15 15" fill="none" className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">
                        <path d="M3.64645 11.3536L11 4M11 4H5M11 4V10" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}