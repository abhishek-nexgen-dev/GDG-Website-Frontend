import { useEffect, useRef, useState } from "react";
import sideBarConstant from "../constant/sideBarConstant";
import { NavLink } from "react-router";
import { LogOut, Settings, Headphones, ChevronDown } from "lucide-react";
import gsap from "gsap";
import useNavStore from "../store/nav.store";

type SideBar_Props = {
  isOpenMenu: boolean;
};

const InternalSideBar = ({ isOpenMenu }: SideBar_Props) => {
  let isOpen = useNavStore((state) => state.isSideBarOpen);

  const sidebarRef = useRef(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const items = menuItemsRef.current;

    if (!sidebar) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 1023px)", () => {
      if (isOpen) {
        gsap.to(sidebar, {
          x: 0,
          duration: 0.45,
          ease: "power3.out",
        });

        gsap.fromTo(
          items,
          {
            x: -20,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.04,
            delay: 0.1,
            ease: "power2.out",
          },
        );
      } else {
        gsap.to(sidebar, {
          x: "-105%",
          duration: 0.4,
          ease: "power3.inOut",
        });
      }
    });

    mm.add("(min-width: 1024px)", () => {
      gsap.set(sidebar, {
        x: 0,
      });
    });

    return () => mm.revert();
  }, [isOpen]);

  return (
    <aside
      ref={sidebarRef}
      className="
        fixed
        left-0
        top-0
        z-50

        flex
        h-screen
        w-[82vw]
        max-w-[340px]
        flex-col

        border-r
        border-white/[0.06]
        bg-[#111315]

        px-3
        py-4

        shadow-2xl

        -translate-x-[105%]

        sm:w-[320px]
        sm:px-4

        lg:relative
        lg:left-auto
        lg:top-auto
        lg:h-[calc(100vh-80px)]
        lg:w-[20vw]
        lg:min-w-[230px]
        lg:max-w-none
        lg:translate-x-0
        lg:rounded-2xl
        lg:ml-[1vw]
        lg:mt-[3vh]
        lg:shadow-none
      "
    >
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Profile Card */}
        <div className="mb-7 px-1">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src="https://imgs.search.brave.com/no76xWdefnmcUXaHMUQlfShcooGDzJkYqZhSZGLlQkg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LnNo/dXR0ZXJzdG9jay5j/b20vYmxvZy93cC1j/b250ZW50L3VwbG9h/ZHMvc2l0ZXMvNS8y/MDI0LzA2L3Byb2Zp/bGVfcGhvdG9fc2Ft/cGxlXzEyLmpwZz9z/c2w9MQ"
                alt="Abhishek Gupta"
                className="h-11 w-11 rounded-full object-cover"
              />

              <span
                className="
                absolute
                bottom-0
                right-0
                h-3
                w-3
                rounded-full
                border-2
                border-[#111315]
                bg-[#34A853]
              "
              />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-white">Abhishek Gupta</h2>

              <p className="mt-0.5 truncate text-[10px] text-white/40">Full Stack Developer</p>

              <span
                className="
                mt-1
                inline-flex
                rounded-md
                bg-[#34A853]/10
                px-2
                py-0.5
                text-[9px]
                font-medium
                text-[#34A853]
              "
              >
                Admin
              </span>
            </div>
          </div>
        </div>

        {/* SideBar Menu */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          <p
            className="
            mb-3
            px-1
            text-[9px]
            font-medium
            uppercase
            tracking-[0.15em]
            text-white/30
          "
          >
            Main Menu
          </p>

          <nav className="flex flex-col gap-1">
            {sideBarConstant.map((item, index) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.link}
                  ref={(el) => {
                    menuItemsRef.current[index] = el;
                  }}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-xs
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-[#34A853]/15 text-white"
                        : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={16}
                        strokeWidth={isActive ? 2 : 1.7}
                        className={
                          isActive ? "text-[#34A853]" : "text-white/45 group-hover:text-white/70"
                        }
                      />

                      <span className="truncate">{item.label}</span>

                      {isActive && (
                        <span
                          className="
                          absolute
                          right-0
                          top-1/2
                          h-6
                          w-0.5
                          -translate-y-1/2
                          rounded-full
                          bg-[#34A853]
                          shadow-[0_0_8px_#34A853]
                        "
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* OTHER */}
        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <p
            className="
            mb-3
            px-1
            text-[9px]
            font-medium
            uppercase
            tracking-[0.15em]
            text-white/30
          "
          >
            Other
          </p>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-xs
                font-medium
                text-white/50
                transition
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              <Settings size={16} strokeWidth={1.7} />
              <span>Settings</span>
            </button>

            <button
              type="button"
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-xs
                font-medium
                text-red-400/70
                transition
                hover:bg-red-500/[0.06]
                hover:text-red-400
              "
            >
              <LogOut size={16} strokeWidth={1.7} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default InternalSideBar;
