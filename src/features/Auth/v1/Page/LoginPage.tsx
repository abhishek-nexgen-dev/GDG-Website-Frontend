import { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useLogin from "../hook/useLogin";
import useLoginForm from "../hook/useLoginForm";
import Input from "../../../../Components/Input";

gsap.registerPlugin(ScrollTrigger);

const LoginPage = () => {
  const navigate = useNavigate();
  const { watch, setValue } = useLoginForm();
  const { mutate } = useLogin();

  const email = watch("email");
  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);

  useGSAP(() => {
    gsap.to(".Form_Container", {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Assuming email and password are state variables or props available here
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("Login success:", data);

          Swal.fire({
            title: "Login Successful",
            text: "Login Successful!",
            icon: "success",
            confirmButtonText: "Okay",
          }).then(() => {
            navigate("/member/Dashboard", { replace: true });
          });
        },
        onError: (error: any) => {
          Swal.fire({
            title: "Login Failed",
            text: error.message || "An error occurred",
            icon: "error",
            confirmButtonText: "Cool",
          });
        },
      },
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-bg-primary text-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="opacity-0 absolute -left-[9rem] -top-[12rem] h-[400px] w-[400px] rounded-full bg-orange-600 blur-[90px] animate-pulse"></div>

      <div className="opacity-0 absolute -right-[9rem] -bottom-[12rem] h-[400px] w-[400px] rounded-full bg-green-700 blur-[90px] animate-pulse"></div>

      <div className="Form_Container opacity-0 relative w-full mt-[5vh] md:w-[90%] lg:w-[70%] min-h-[650px] lg:h-[82vh] overflow-hidden rounded-2xl border border-white/8 bg-[#080809] shadow-[0_25px_100px_rgba(0,0,0,0.6)]">
        <div className="flex h-full min-h-[650px] flex-col lg:flex-row">
          <div className="relative hidden w-1/2 overflow-hidden lg:block">
            <img
              src="/WelCome_Jharkhand.png"
              alt="Jharkhand"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

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
                Where <span className="text-[#34A853]">innovation</span> meets community.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
                Connect, learn, build and grow with the developer community of Ranchi and Jharkhand.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="h-[2px] w-12 bg-[#34A853]" />
                <div className="h-[1px] w-24 bg-white/20" />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-14 xl:px-20">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <span className="text-lg">✦</span>
              </div>

              <div>
                <p className="text-sm font-semibold">GDG Ranchi</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40">
                  Developer Community
                </p>
              </div>
            </div>

            <div className="mb-9">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#34A853]">
                Welcome back
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sign in to your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/45">
                Continue your journey with the GDG Ranchi community.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Input
                  value={email}
                  label="Email Address"
                  placeholder="you@example.com"
                  onChange={(value) => setValue("email", value)}
                  className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none placeholder:text-white/25 transition-all focus:border-[#34A853]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34A853]/10"
                  labelClassName="font-medium text-white/75"
                />
              </div>

              <div>
                <div className="relative">
                  <Input
                    value={password}
                    label="Password"
                    placeholder="password@123"
                    onChange={(value) => setValue("password", value)}
                    type={showPassword ? "text" : "password"}
                    className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none placeholder:text-white/25 transition-all focus:border-[#34A853]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34A853]/10"
                    labelClassName="font-medium text-white/75"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[70%] -translate-y-1/2 text-white/30 transition hover:text-white/70 "
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                  </button>
                </div>

                <div className="my-[1vh] flex items-center justify-between">
                  <Link
                    to="/forgot"
                    className="text-xs text-[#34A853] transition hover:text-[#5edb79]"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="group relative mt-2 flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-lg bg-[#34A853] text-sm font-semibold text-black transition-all duration-300 hover:bg-[#3fba60] hover:shadow-[0_8px_30px_rgba(52,168,83,0.22)] active:scale-[0.99]"
              >
                <span>Sign in</span>

                <FaArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-white/10" />

                <span className="text-xs text-white/30">OR</span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.025] text-sm font-medium text-white/80 transition-all hover:border-white/20 hover:bg-white/[0.06]"
              >
                <FaGoogle size={15} className="text-[#4285F4]" />
                Continue with Google
              </button>
            </form>

            <div className="mt-10 text-center text-[11px] text-white/20">
              © {new Date().getFullYear()} GDG Ranchi • Google Developer Groups
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
