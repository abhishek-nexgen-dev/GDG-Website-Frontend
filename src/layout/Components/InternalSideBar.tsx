import { useEffect, useRef, useState } from "react";
import sideBarConstant from "../constant/sideBarConstant";
import { Link, NavLink, useLocation } from "react-router-dom";import { LogOut, Settings, ChevronDown } from "lucide-react";
import gsap from "gsap";
import useNavStore from "../store/nav.store";

const InternalSideBar = () => {
  let isOpen = useNavStore((state) => state.isSideBarOpen);
  const location = useLocation();

  const sidebarRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Expanded submenus state
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    Events: true,
  });

  const toggleSubMenu = (label: string) => {
    setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

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
      data-lenis-prevent
      className="
        fixed
        left-0
        top-[64px]
        z-50

        flex
        h-[calc(100vh-64px)]
        w-[82vw]
        max-w-[300px]
        flex-col

        border-r
        border-white/[0.08]
        bg-[#111315]

        px-3
        py-4

        shadow-2xl

        -translate-x-[105%]

        sm:w-[300px]
        sm:px-4

        lg:fixed
        lg:top-[80px]
        lg:left-[16px]
        lg:h-[calc(100vh-96px)]
        lg:w-[250px]
        lg:min-w-0
        lg:max-w-none
        lg:translate-x-0
        lg:rounded-2xl
        lg:border
        lg:border-white/[0.08]
        lg:m-0
        lg:shadow-none
        overflow-y-auto
        overscroll-contain
      "
    >
      {/* Profile Card */}
      <div className="mb-5 shrink-0 px-1">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src="https://imgs.search.brave.com/no76xWdefnmcUXaHMUQlfShcooGDzJkYqZhSZGLlQkg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LnNo/dXR0ZXJzdG9jay5j/b20vYmxvZy93cC1j/b250ZW50L3VwbG9h/ZHMvc2l0ZXMvNS8y/MDI0LzA2L3Byb2Zp/bGVfcGhvdG9fc2Ft/cGxlXzEyLmpwZz9z/c2w9MQ"
              alt="Abhishek Gupta"
              className="h-10 w-10 rounded-full object-cover"
            />

            <span
              className="
              absolute
              bottom-0
              right-0
              h-2.5
              w-2.5
              rounded-full
              border-2
              border-[#111315]
              bg-[#34A853]
            "
            />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-white">Abhishek Gupta</h2>
            <p className="truncate text-[10px] text-white/40">Full Stack Developer</p>
            <span
              className="
              mt-0.5
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
      <div className="flex flex-col">
        <p
          className="
          mb-2.5
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
            const hasSub = Boolean(item.subItems && item.subItems.length > 0);
            const isParentActive =
              item.label === "Events"
                ? location.pathname.startsWith("/member/event")
                : item.label === "Albums"
                  ? location.pathname.startsWith("/member/album")
                  : item.label === "Images"
                    ? location.pathname.startsWith("/member/image")
                    : item.label === "Emails"
                      ? location.pathname.startsWith("/member/email")
                      : false;
            const isExpanded = expandedMenus[item.label] ?? isParentActive;

            return (
              <div key={item.label} className="flex flex-col gap-1">
                <NavLink
                  to={item.link}
                  ref={(el) => {
                    menuItemsRef.current[index] = el;
                  }}
                  onClick={() => {
                    if (hasSub) {
                      toggleSubMenu(item.label);
                    }
                  }}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive || isParentActive
                        ? "bg-[#34A853]/15 text-white"
                        : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                    }
                    `
                  }
                >
                  {({ isActive }) => {
                    const active = isActive || isParentActive;
                    return (
                      <>
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            size={16}
                            strokeWidth={active ? 2 : 1.7}
                            className={
                              active ? "text-[#34A853]" : "text-white/45 group-hover:text-white/70"
                            }
                          />

                          <span className="truncate">{item.label}</span>
                        </div>

                        {hasSub ? (
                          <ChevronDown
                            size={14}
                            className={`text-white/40 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-white" : ""
                            }`}
                          />
                        ) : (
                          active && (
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
                          )
                        )}
                      </>
                    );
                  }}
                </NavLink>

                {/* Submenu items */}
                {hasSub && isExpanded && (
                  <div className="ml-4 flex flex-col gap-1 border-l border-white/[0.08] pl-3 py-1">
                    {item.subItems?.map((sub) => {
                      const isSubActive =
                        location.pathname === sub.link ||
                        (sub.link === "/member/events" &&
                          location.pathname === "/member/events/manage") ||
                        (sub.link === "/member/albums" &&
                          location.pathname === "/member/albums/manage") ||
                        (sub.link === "/member/images" &&
                          location.pathname === "/member/images/manage");
                      return (
                        <NavLink
                          key={sub.label}
                          to={sub.link}
                          className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                            isSubActive
                              ? "font-semibold text-white bg-white/[0.06]"
                              : "text-white/50 hover:text-white hover:bg-white/[0.02]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isSubActive ? "bg-[#22c55e]" : "bg-white/30"
                            }`}
                          />
                          <span>{sub.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* OTHER */}
      <div className="mt-4 shrink-0 border-t border-white/[0.06] pt-3 pb-2">
        <p
          className="
          mb-2
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
          <Link
            to="/member/Settings"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2
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
          </Link>

          <button
            type="button"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2
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
    </aside>
  );
};

export default InternalSideBar;
