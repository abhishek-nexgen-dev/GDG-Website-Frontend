import { Link } from "react-router-dom";
const ForgotPasswordLeft = () => {
  return (
    <div className="Left-Container flex w-full flex-col justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-14 xl:px-20">
      <div className="mb-10 flex items-center gap-3 lg:hidden">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
          <span className="text-lg">✦</span>
        </div>

        <div>
          <p className="text-sm font-semibold">GDG Ranchi</p>
          <p className="text-[10px] uppercase tracking-widest text-white/40">Developer Community</p>
        </div>
      </div>

      <div className="Title mb-9">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#34A853]">
          Account Recovery
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Forgot your password?</h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-white/45">
          Enter the verification code sent to your email address to continue resetting your
          password.
        </p>
      </div>

      <form className="ForgotPassword-Form space-y-5">
        <div className="Email">
          {" "}
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/75">
            {" "}
            Email address{" "}
          </label>{" "}
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className=" h-12 w-full rounded-lg border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none placeholder:text-white/25 transition-all focus:border-[#34A853]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34A853]/10 "
          />{" "}
        </div>

        <div className="Verification-Code my-[3vh]">
          <label htmlFor="otp" className="mb-2 block text-sm font-medium text-white/75">
            Verification code
          </label>

          <input
            id="otp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit code"
            autoComplete="one-time-code"
            className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.035] px-4 text-center text-lg tracking-[0.4em] text-white outline-none transition-all placeholder:text-sm placeholder:tracking-normal placeholder:text-white/25 focus:border-[#34A853]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34A853]/10"
          />
        </div>

        <button
          type="submit"
          className="Btn group flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#34A853] text-sm font-semibold text-black transition-all duration-300 hover:bg-[#3fba60] hover:shadow-[0_8px_30px_rgba(52,168,83,0.22)] active:scale-[0.99]"
        >
          <span>Verify code</span>
          <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </form>

      <div className="Bottom-Sec mt-6 flex items-center justify-center gap-1 text-sm">
        <span className="text-white/40">Didn't receive the code?</span>

        <button
          type="button"
          className="font-medium text-[#34A853] transition hover:text-[#5edb79]"
        >
          Resend
        </button>
      </div>

      <div className="mt-6 text-center">
        <Link to="/login" className="text-sm text-white/40 transition hover:text-white/80">
          <span className="mr-2">←</span>
          Back to login
        </Link>
      </div>

      <div className="mt-10 text-center text-[11px] text-white/20">
        © {new Date().getFullYear()} GDG Ranchi • Google Developer Groups
      </div>
    </div>
  );
};

export default ForgotPasswordLeft;
