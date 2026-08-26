function Label({
  children,
  required = false,
  className,
}: {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label
      className={`mb-1.5 block text-lg lg:text-[0.9rem] ${className} font-medium text-zinc-300 sm:text-xs`}
    >
      {children}

      {required && <span className="ml-0.5 text-red-400">*</span>}
    </label>
  );
}

export default Label;
