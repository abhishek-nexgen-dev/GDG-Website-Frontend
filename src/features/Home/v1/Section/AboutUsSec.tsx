import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

gsap.registerPlugin(useGSAP, ScrollTrigger);



const AboutUsSec = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["developers.", "innovators.", "leaders."],
      typeSpeed: 20,
      backSpeed: 30,
      loop: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  useGSAP(() => {
    gsap.to(".about-content > *", {
      y: -130,
      opacity: 1,
      // duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".AboutUs-sec",
        start: "top 0%",
        end: "top right",
        markers: true,
      },
    });

    gsap.to(".Ellipse", {
      y: "-18vw",
      scale: 1.2,
      x: "-15vw",
      duration: 2,
      ease: "elastic.inOut",
      scrollTrigger: {
        trigger: ".AboutUs-sec",
        start: "top 0%",
        end: "top right",
        // markers: true,
      },
      scrub: 1.2,
    });
  });

  return (
    <section className="AboutUs-sec relative w-full flex flex-col">
      {/* Content */}
      <div className="relative h-[70%] md:mt-[25vh] flex-1 px-6 py-16 sm:px-10 md:px-16 lg:px-[8%] lg:py-20 xl:px-[10%]">
        {/* Title */}
        <div className=".about-content mb-5 flex items-center gap-2 opacity-0">
          <span className="h-3 w-3 rounded-full bg-[#EA4335]" />
          <span className="h-3 w-3 rounded-full bg-[#FBBC04]" />
          <span className="h-3 w-3 rounded-full bg-[#34A853]" />
          <span className="h-3 w-3 rounded-full bg-[#4285F4]" />

          <span className="ml-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 sm:text-sm">
            About Us
          </span>
        </div>

        <div className="Ellipse absolute right-[-15vw] bottom-[-20vw] w-[25%] ">
          <img src="/Ellipse 6.svg" className="w-full h-full object-cover" />
        </div>

        {/* Heading */}
        <h2 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Building the next <br />
          <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
            generation of <span ref={typedRef}></span>
          </span>
        </h2>

        {/* Paragraph 1 */}
        <p className="mt-8 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
          GDG Ranchi is a vibrant developer community that brings together students, professionals,
          and technology enthusiasts who are passionate about learning, building, and growing with
          Google technologies. Through hands-on workshops, hackathons, technical talks, coding
          sessions, and networking events, we create opportunities to gain practical skills,
          exchange ideas, and stay up to date with the latest innovations in technology.
        </p>

        {/* Paragraph 2 */}
        <p className="mt-6 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
          Whether you're writing your first line of code or building production-ready applications,
          GDG Ranchi is a place where everyone is welcome. We believe that learning becomes more
          meaningful when it's shared, collaboration sparks innovation, and every challenge is an
          opportunity to grow. Join us to connect with like-minded people, explore new technologies,
          and build solutions that create a real impact in the community and beyond.
        </p>
      </div>
    </section>
  );
};

export default AboutUsSec;
