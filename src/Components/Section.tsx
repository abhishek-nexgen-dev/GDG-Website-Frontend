function Section({
  title,
  description,
  icon,
  children,
  action,
}: {
  title: string;
  description?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#191a1f]">
      <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="text-lime-400">{icon}</div>

          <div>
            <h2 className="text-sm font-semibold text-white">{title}</h2>

            {description && <p className="mt-0.5 text-[10px] text-zinc-500">{description}</p>}
          </div>
        </div>

        {action}
      </div>

      <div className="p-3">{children}</div>
    </section>
  );
}

export default Section;
