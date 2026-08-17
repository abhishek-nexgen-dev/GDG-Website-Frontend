const Feature = ({ icon, title }: { icon: React.ReactNode; title: string }) => {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-3">
      <span className="text-purple-400">{icon}</span>

      <span className="text-[10px] font-medium text-white/60">{title}</span>
    </div>
  );
};

export default Feature;
