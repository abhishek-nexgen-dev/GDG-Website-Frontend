import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ForgotPasswordLeft from "../Components/ForgotPasswordLeft";
import ForgotPasswordRight from "../Components/ForgotPasswordRight";

gsap.registerPlugin(useGSAP);

const ForgotPasswordOtp = () => {

   useGSAP(() => {
  


    gsap.to(".Form_Container", {
      opacity: 1,

    });
  }, []);


  return (
    <div className="Forgot-Password-Page relative flex min-h-screen w-full items-center justify-center bg-bg-primary p-4 text-white sm:p-6 lg:p-8">
      <div className="absolute  -right-[9rem] -bottom-[12rem]     h-[400px] w-[400px] rounded-full bg-orange-600 blur-[90px] opacity-40 animate-pulse"></div>

      <div className="absolute   -left-[9rem] -top-[12rem]   h-[400px] w-[400px] rounded-full bg-green-700 blur-[90px] opacity-40 animate-pulse"></div>

      <div className="Form_Container opacity-0 mt-[5vh] flex min-h-[650px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080809] shadow-[0_25px_100px_rgba(0,0,0,0.6)] md:w-[90%] lg:h-[82vh] lg:w-[70%]">
        <ForgotPasswordLeft />

        <ForgotPasswordRight />
      </div>
    </div>
  );
};

export default ForgotPasswordOtp;
