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
    <div className="relative min-h-screen w-full bg-transparent text-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Fade mask at the bottom to blend with BackgroundWatermark */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
      {/* Background gradients similar to EventsHero */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#1a73e8]/10 blur-[120px]" />
      </div>

      <div className="Form_Container opacity-0 relative z-10 w-full md:w-[90%] lg:w-[80%] mt-20 lg:mt-28 min-h-[650px] overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0c]/60 backdrop-blur-3xl shadow-2xl flex flex-col lg:flex-row">
        
        {/* Left Side (Image & Brand) */}
        <div className="relative hidden w-1/2 overflow-hidden lg:block bg-black">
          <img
            src="/WelCome_Jharkhand.png"
            alt="Jharkhand"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <div className="absolute inset-0 p-12 flex flex-col justify-end">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_#1a73e8]" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                Jharkhand • India
              </span>
            </div>

            <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-white xl:text-5xl">
              Where <span className="text-primary">innovation</span> meets community.
            </h2>
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-gray-400">
              Connect, learn, build and grow with the developer community of Ranchi and Jharkhand.
            </p>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="flex w-full flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-16">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
              <span className="text-lg font-bold text-primary">{'< >'}</span>
            </div>
            <div>
              <p className="text-sm font-bold">GDG Ranchi</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Developer Community
              </p>
            </div>
          </div>

          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              Welcome back
            </p>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Sign in to your account
            </h1>
            <p className="mt-3 text-sm font-medium text-gray-400">
              Continue your journey with the GDG Ranchi community.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input
                value={email}
                label="Email Address"
                placeholder="you@example.com"
                onChange={(value) => setValue("email", value)}
                className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-primary/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/10"
                labelClassName="font-semibold text-gray-300 mb-2 block"
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
                  className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 pr-12 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-primary/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/10"
                  labelClassName="font-semibold text-gray-300 mb-2 block"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[70%] -translate-y-1/2 text-gray-400 transition hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>

              <div className="mt-3 flex items-center justify-end">
                <Link
                  to="/forgot"
                  className="text-xs font-bold text-primary transition-colors hover:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="group relative mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary text-sm font-bold text-white transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_rgba(26,115,232,0.4)] hover:scale-[1.02] active:scale-100"
            >
              <span>Sign in</span>
              <FaArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <div className="flex items-center gap-4 py-4">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">OR</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <button
              type="button"
              className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm font-bold text-white transition-all hover:border-white/20 hover:bg-white/[0.06] hover:scale-[1.02] active:scale-100"
            >
              <FaGoogle size={18} className="text-[#4285F4]" />
              Continue with Google
            </button>
          </form>

          <div className="mt-12 text-center text-xs font-bold tracking-widest text-gray-600 uppercase">
            © {new Date().getFullYear()} GDG Ranchi
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
