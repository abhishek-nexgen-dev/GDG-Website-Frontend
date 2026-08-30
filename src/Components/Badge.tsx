import type { BadgeVariant } from "../features/Member/v1/type/MemberDetails.type";

const Badge = ({
  children,
  variant = "green",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) => {
  const styles: Record<BadgeVariant, string> = {
    green: "border-green-500/20 bg-green-500/10 text-green-400",

    purple: "border-purple-500/20 bg-purple-500/10 text-purple-400",

    blue: "border-blue-500/20 bg-blue-500/10 text-blue-400",

    gray: "border-white/10 bg-white/[0.03] text-white/50",

    red: "border-red-500/20 bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`
        inline-flex max-w-full items-center
        rounded-lg border
        px-2 py-1
        text-[10px] font-medium
        leading-4
        sm:px-2.5 sm:text-[11px]
        lg:text-xs
        ${styles[variant]}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
