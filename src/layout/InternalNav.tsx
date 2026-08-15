import { useEffect,  useState } from "react";
import { MenuIcon, MoreVertical, X } from "lucide-react";

import { FaArrowLeft } from "react-icons/fa";
import useNavStore from "./store/nav.store";

const InternalNav = () => {
  let sideBarController = useNavStore((state) => state.handleSideBar);
  let isSideBarOpen = useNavStore((state) => state.isSideBarOpen);

  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    sideBarController(isOpen);
  }, [isOpen]);

  return (
    <nav className=" flex w-full items-center justify-between  gap-6 fixed top-0 left-0 lg:relative border-b border-white/[0.08] bg-[#0b0c0e]  px-4 py-2.5 sm:px-5 z-50">
      <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-5 py-2 text-white transition hover:bg-white/[0.05]">
        <button
          type="button"
          className="flex items-center justify-center rounded-lg p-1.5 text-white/45 transition hover:bg-white/10 hover:text-white"
        >
          <FaArrowLeft className="text-md font-semibold tracking-tight lg:text-[1.3vw]" />
        </button>

        <div className="h-5 w-px bg-white/10" />

        <img src="/GDG_Logo.svg" alt="GDG Ranchi" className="h-full w-18 object-contain" />

        <span className="text-md font-semibold tracking-tight lg:text-[1.3vw]">GDG Ranchi</span>
      </div>

      {/* Profile Card */}
      <button
        type="button"
        className="group hidden lg:flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-2 py-1.5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.05]"
      >
        <div className="relative shrink-0">
          <img
            src="https://imgs.search.brave.com/uR91XUWcb13rrp6r7r7yjmRBfGCepu_vBDlWawOqCfc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzA1L2Jm/LzdkLzA1YmY3ZDlh/OGQwZDYxN2UxMWUz/MDNiNDQ1OTIwY2E5/LmpwZw"
            alt="Abhishek Gupta"
            className="h-9 w-9 rounded-lg object-cover"
          />

          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b0c0e] bg-[#34A853]" />
        </div>

        <div className="hidden min-w-0 text-left sm:block">
          <p className="truncate text-xs font-semibold leading-4 text-white md:text-sm">
            Abhishek Gupta
          </p>

          <p className="mt-0.5 truncate text-[9px] leading-3 text-white/35 md:text-[10px]">
            Full Stack Developer
          </p>
        </div>

        <div className="ml-1 flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition group-hover:bg-white/[0.06] group-hover:text-white/70">
          <MoreVertical size={15} strokeWidth={1.8} />
        </div>
      </button>

      <div className="block lg:hidden" onClick={() => setOpen((prev) => !prev)}>
        {isSideBarOpen ? (
          <X className="block lg:hidden" />
        ) : (
          <MenuIcon className="block lg:hidden" />
        )}
      </div>
    </nav>
  );
};

export default InternalNav;
