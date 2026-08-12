const ForgotPasswordRight = () => {
  return (
    <div className="relative hidden w-1/2 overflow-hidden lg:block">
      <img
        src="/Forgot.png"
        alt="Jharkhand"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#34A853]/10 blur-[100px]" />

      <div className="absolute bottom-0 left-0 right-0 p-10 xl:p-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#34A853] shadow-[0_0_12px_#34A853]" />

          <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
            Jharkhand • India
          </span>
        </div>

        <h2 className="max-w-lg text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
          Your journey
          <br />
          <span className="text-[#34A853]">continues here.</span>
        </h2>

        <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
          {" "}
          Forgot your password? No worries. Reset your account and get back to learning, building,
          and connecting with the GDG Ranchi community.{" "}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <div className="h-[2px] w-12 bg-[#34A853]" />
          <div className="h-px w-24 bg-white/20" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordRight;
