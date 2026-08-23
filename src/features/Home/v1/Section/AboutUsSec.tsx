// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { useEffect, useRef } from "react";
// import Typed from "typed.js";

// gsap.registerPlugin(useGSAP, ScrollTrigger);

// const AboutUsSec = () => {
//   const typedRef = useRef(null);

//   useEffect(() => {
//     const typed = new Typed(typedRef.current, {
//       strings: ["developers.", "innovators.", "leaders."],
//       typeSpeed: 20,
//       backSpeed: 30,
//       loop: true,
//     });
//     return () => {
//       typed.destroy();
//     };
//   }, []);

//   useGSAP(() => {
//     gsap.to(".about-content > *", {
//       y: -130,
//       opacity: 1,
//       // duration: 1,
//       stagger: 0.2,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".AboutUs-sec",
//         start: "top 0%",
//         end: "top right",
//         markers: true,
//       },
//     });

//     gsap.to(".Ellipse", {
//       y: "-18vw",
//       scale: 1.2,
//       x: "-15vw",
//       duration: 1,
//       ease: "elastic.inOut",
//       scrollTrigger: {
//         trigger: ".AboutUs-sec",
//         start: "top 0%",
//         end: "top right",
//         // markers: true,
//       },
//       scrub: 1.2,
//     });
//   });

//   return (
//     <section className="AboutUs-sec relative w-full flex flex-col">
//       {/* Content */}
//       <div className="relative h-[70%] md:mt-[25vh] flex-1 px-6 py-16 sm:px-10 md:px-16 lg:px-[8%] lg:py-20 xl:px-[10%]">
//         {/* Title */}
//         <div className=".about-content mb-5 flex items-center gap-2 ">
//           <span className="h-3 w-3 rounded-full bg-[#EA4335]" />
//           <span className="h-3 w-3 rounded-full bg-[#FBBC04]" />
//           <span className="h-3 w-3 rounded-full bg-[#34A853]" />
//           <span className="h-3 w-3 rounded-full bg-[#4285F4]" />

//           <span className="ml-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 sm:text-sm">
//             About Us
//           </span>
//         </div>

//         <div className="Ellipse absolute right-[-15vw] bottom-[-20vw] w-[25%] ">
//           <img src="/Ellipse 6.svg" className="w-full h-full object-cover" />
//         </div>

//         {/* Heading */}
//         <h2 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
//           Building the next <br />
//           <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
//             generation of <span ref={typedRef}></span>
//           </span>
//         </h2>

//         {/* Paragraph 1 */}
//         <p className="mt-8 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
//           GDG Ranchi is a vibrant developer community that brings together students, professionals,
//           and technology enthusiasts who are passionate about learning, building, and growing with
//           Google technologies. Through hands-on workshops, hackathons, technical talks, coding
//           sessions, and networking events, we create opportunities to gain practical skills,
//           exchange ideas, and stay up to date with the latest innovations in technology.
//         </p>

//         {/* Paragraph 2 */}
//         <p className="mt-6 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
//           Whether you're writing your first line of code or building production-ready applications,
//           GDG Ranchi is a place where everyone is welcome. We believe that learning becomes more
//           meaningful when it's shared, collaboration sparks innovation, and every challenge is an
//           opportunity to grow. Join us to connect with like-minded people, explore new technologies,
//           and build solutions that create a real impact in the community and beyond.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default AboutUsSec;

















import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import myCardImg from "../../../../assets/my-card.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AboutUsSec = () => {
  const typedRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["developers.", "innovators.", "leaders."],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      cursorChar: "_",
    });
    return () => {
      typed.destroy();
    };
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".about-fade-in",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".about-image-1",
        { y: 100, opacity: 0, rotate: -5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
        }
      );

      gsap.fromTo(
        ".about-image-2",
        { y: 120, opacity: 0, rotate: 5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          ease: "power3.out",
          duration: 1.2,
          delay: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-[#050505] py-24 lg:py-32">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4285F4]/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#EA4335]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <div className="about-fade-in mb-6 flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EA4335]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FBBC04]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#34A853]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#4285F4]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
                About Us
              </span>
            </div>

            <h2 className="about-fade-in mb-8 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Building the next <br />
              <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
                generation of <br className="hidden sm:block" />
                <span ref={typedRef}></span>
              </span>
            </h2>

            <div className="about-fade-in space-y-6 text-base leading-relaxed text-gray-400 sm:text-lg">
              <p>
                GDG Ranchi is a vibrant developer community that brings together students, professionals,
                and technology enthusiasts who are passionate about learning, building, and growing with
                Google technologies.
              </p>
              <p>
                Whether you're writing your first line of code or building production-ready applications,
                GDG Ranchi is a place where everyone is welcome. We believe that learning becomes more
                meaningful when it's shared, and collaboration sparks true innovation.
              </p>
            </div>

            <div className="about-fade-in mt-10">
              <button className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10">
                <span>Read our full story</span>
                <svg className="transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Visual Composition */}
          <div className="relative mt-10 lg:mt-0 lg:h-[600px] flex items-center justify-center">
            {/* Main Image */}
            <div className="about-image-1 relative z-10 w-4/5 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl lg:absolute lg:right-10 lg:top-10">
              <img
                src={myCardImg}
                alt="Audience at a tech event"
                className="w-full object-cover grayscale opacity-80 transition-all duration-700 hover:grayscale-0 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-transparent opacity-80" />
            </div>

            {/* Overlapping Image */}
            <div className="about-image-2 absolute -bottom-10 -left-4 z-20 w-3/5 overflow-hidden rounded-[2rem] border-[6px] border-[#050505] shadow-2xl lg:-bottom-10 lg:-left-10">
              <img
                src={myCardImg}
                alt="Developers collaborating"
                className="w-full object-cover grayscale opacity-90 transition-all duration-700 hover:grayscale-0 hover:scale-105"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSec;
