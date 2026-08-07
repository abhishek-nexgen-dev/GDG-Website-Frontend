import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const stats = [
  { value: "15", title: "Events" },
  { value: "5600+", title: "Participants" },
  { value: "30+", title: "Speakers" },
  { value: "18", title: "Partners" },
];

const Achievement = () => {
  useGSAP(() => {
    let tl = gsap.timeline();
    tl.to(".red-circle", {
      y: -120,
      animationDuration: 0.5,
      animationDelay: 0.5,
      filter: "blur(200px)",
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    tl.to(".yellow-circle", {
      y: 20,
      scale: 1.1,
      delay: 1,
      filter: "blur(120px)",
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    tl.to(".green-circle", {
      scale: 1.2,

      filter: "blur(120px)",
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    tl.to(".blue-circle", {
      y: -120,

      filter: "blur(200px)",
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section className="relative w-full ">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Red */}
        <div className="red-circle absolute left-[-12%] top-1/2 h-full w-[35vw] max-h-[650px] max-w-[650px] -translate-y-1/2 rounded-full bg-[#EA4335] opacity-90 blur-[180px]" />

        {/* Yellow */}
        <div className="yellow-circle absolute left-[18%] top-1/2  h-full w-[38vw] max-h-[720px] max-w-[720px] -translate-y-1/2 rounded-full bg-[#FBBC04] opacity-90 blur-[200px]" />

        {/* Green */}
        <div className="green-circle absolute right-[18%] top-1/2 h-full w-[38vw] max-h-[720px] max-w-[720px] -translate-y-1/2 rounded-full bg-[#34A853] opacity-90 blur-[200px]" />

        {/* Blue */}
        <div className="blue-circle absolute right-[-12%] top-1/2 h-full w-[35vw] max-h-[650px] max-w-[650px] -translate-y-1/2 rounded-full bg-[#4285F4] opacity-90 blur-[180px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto grid w-full max-w-[1800px] grid-cols-2 gap-y-12 px-6 sm:px-10 md:grid-cols-4 lg:px-20 2xl:px-32">
          {stats.map((item) => (
            <div key={item.title} className="flex flex-col items-center justify-center text-center">
              <h2
                className="
                  font-bold text-white tracking-wide
                  text-[clamp(2.5rem,3vw,5rem)]
                "
              >
                {item.value}
              </h2>

              <p
                className="
                  mt-4 font-medium text-white/80 tracking-wide
                  text-[clamp(1rem,1.2vw,2rem)]
                "
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievement;
