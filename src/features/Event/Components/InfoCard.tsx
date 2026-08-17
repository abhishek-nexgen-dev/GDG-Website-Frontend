type InfoCardProps = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
};

const InfoCard = ({ title, eyebrow, children, className = "" }: InfoCardProps) => {
  return (
    <section
      className={`rounded-2xl h-fit p-5 bg-[#0b0d0e] border border-white/[0.08] sm:p-6 ${className}`}
    >
      {eyebrow && (
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#8B5CF6]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{title}</h2>

      <div className="mt-5">{children}</div>
    </section>
  );
};

export default InfoCard;
