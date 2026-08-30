const EmptyState = ({ text }: { text: string }) => {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.015] px-5 py-8 text-center">
      <p className="text-xs text-white/30">{text}</p>
    </div>
  );
};

export default EmptyState;
