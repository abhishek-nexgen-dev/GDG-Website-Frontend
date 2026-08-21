

type SocialLink = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

type TeamCardProps = {
  FullName: string;
  imageUrl: string;
  Role: string;
  SocialLink: SocialLink[];
};

const TeamCard = ({ imageUrl, FullName, Role, SocialLink }: TeamCardProps) => {
  return (
    <div className="group relative flex h-[50vh] w-[18vw] min-w-[260px] flex-col overflow-visible">
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          z-0
          h-[65%]
          w-[80%]
          -translate-x-1/2
          rounded-full
          bg-blue-500/20
          blur-[80px]
          transition-all
          duration-700
          group-hover:bg-blue-500/30
          group-hover:blur-[100px]
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-[2%]
          z-40
          aspect-square
          w-[92%]
          -translate-x-1/2
          rounded-full
          border-[3px]
          border-white/20
          bg-gradient-to-br
          from-zinc-500
          via-zinc-800
          to-black
          p-2
          shadow-[0_25px_70px_rgba(0,0,0,0.65)]
          transition-all
          duration-700
          ease-out
          group-hover:-translate-y-3
          group-hover:scale-[1.03]
          group-hover:border-blue-400/50
          group-hover:shadow-[0_30px_80px_rgba(59,130,246,0.25)]
        "
      >
        <div
          className="
            relative
            h-full
            w-full
            overflow-hidden
            rounded-full
            border
            border-white/10
            bg-gradient-to-br
            from-zinc-700
            via-zinc-900
            to-black
          "
        >
          <img
            src={imageUrl}
            alt="Abhishek Gupta"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-110
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              bg-gradient-to-t
              from-black/50
              via-transparent
              to-white/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              left-[15%]
              top-[8%]
              h-[20%]
              w-[35%]
              rotate-[-25deg]
              rounded-full
              bg-white/10
              blur-xl
            "
          />
        </div>

        <div
          className="
            absolute
            bottom-[7%]
            right-[8%]
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border-[4px]
            border-[#100F0F]
            bg-green-400
            shadow-[0_0_25px_rgba(74,222,128,0.7)]
          "
        >
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />
        </div>
      </div>

      <div
        className="
          absolute
          bottom-0
          left-0
          z-30
          flex
          h-[34%]
          w-full
          flex-col
          items-center
          rounded-xl
          border
          border-white/10
          bg-[#100F0F]/80
          px-3

          pb-[2vh]
          py-[4vh]
          backdrop-blur-xl
          shadow-[0_-15px_50px_rgba(0,0,0,0.45)]
          transition-all
          duration-500
          group-hover:border-white/20
          group-hover:bg-[#151414]/90
        "
      >
        <h2
          className="
            text-center
            text-xl
            font-extrabold
            tracking-tight
            text-white
            transition-colors
            duration-300
          "
        >
          {FullName}
        </h2>

        <h4
          className="
            mt-1
            text-sm
            font-semibold
            uppercase
            tracking-[0.15em]
            text-blue-500
          "
        >
          {Role}
        </h4>

        <div className="mt-4 flex items-center gap-2">
          {SocialLink.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="
                relative
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                text-white/50
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-400/50
                hover:bg-blue-500
                hover:text-white
                hover:shadow-[0_8px_25px_rgba(59,130,246,0.4)]
              "
            >
              <span className="text-sm">{social.icon}</span>
            </a>
          ))}
        </div>
      </div>

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          z-0
          h-[20%]
          w-[70%]
          -translate-x-1/2
          rounded-full
          bg-blue-500/10
          blur-[60px]
        "
      />
    </div>
  );
};

export default TeamCard;
