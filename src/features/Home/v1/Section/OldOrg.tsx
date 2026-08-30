import { useRef } from "react";
import myCardImg from "../../../../assets/my-card.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const organizers = [
    {
        id: 1,
        name: "ALICE JOHNSON",
        role: "LEAD ORGANIZER",
        color: "#EA4335",
        img: myCardImg,
    },
    {
        id: 2,
        name: "BOB SMITH",
        role: "CO-ORGANIZER",
        color: "#FBBC04",
        img: myCardImg,
    },
    {
        id: 3,
        name: "CHARLIE DAVIS",
        role: "TECH LEAD",
        color: "#4285F4",
        img: myCardImg,
    },
    {
        id: 4,
        name: "DIANA PRINCE",
        role: "COMMUNITY MANAGER",
        color: "#34A853",
        img: myCardImg,
    },
    {
        id: 5,
        name: "EVAN WRIGHT",
        role: "DESIGN LEAD",
        color: "#EA4335",
        img: myCardImg,
    },
];

const OrganizersSec = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".org-header",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    },
                }
            );

            gsap.fromTo(
                ".org-swiper",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".org-swiper",
                        start: "top 80%",
                    },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="relative overflow-hidden bg-[#050505] py-28">
            {/* Background Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#4285F4]/10 blur-[140px]" />
                <div className="absolute right-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#EA4335]/10 blur-[140px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Heading */}
                <h2 className="org-header text-center text-4xl font-black text-white sm:text-5xl lg:text-6xl">
                    Learn From People <br className="md:hidden" />
                    Who've <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Actually Done the Work</span>
                </h2>
            </div>

            {/* Swiper Carousel - Moved out of max-w-7xl container for full width */}
            <div className="org-swiper relative z-10 mt-20 w-full">
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    initialSlide={2}
                    coverflowEffect={{
                        rotate: 20,
                        stretch: 0,
                        depth: 250,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination]}
                    className="w-full !py-14"
                >
                    {organizers.map((org) => (
                        <SwiperSlide
                            key={org.id}
                            className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl"
                            style={{ width: "320px", height: "420px" }}
                        >
                            {/* Glowing Theme Background inside card */}
                            <div
                                className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-[80px] opacity-30"
                                style={{ backgroundColor: org.color }}
                            />

                            {/* Organizer Image */}
                            <img
                                src={org.img}
                                alt={org.name}
                                className="absolute inset-0 h-full w-full object-cover pointer-events-none transition-transform duration-500 hover:scale-105"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default OrganizersSec;
