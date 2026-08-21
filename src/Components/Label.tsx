function Label({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-[10px] font-medium text-zinc-300 sm:text-xs">
      {children}

      {required && <span className="ml-0.5 text-red-400">*</span>}
    </label>
  );
}

export default Label;
