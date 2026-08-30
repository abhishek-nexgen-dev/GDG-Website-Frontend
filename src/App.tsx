import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import InternalRoutes from "./routes/InternalRoutes";
import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";

import "lenis/dist/lenis.css";
import { useEffect, useRef } from "react";

function App() {
  // Create a ref to hold the Lenis instance
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.raf(time * 1000);
      }
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <>
      <ReactLenis
        ref={lenisRef}
        root
        options={{
          autoRaf: false,
          lerp: 0.05,
          duration: 1.5,
          smoothWheel: true,
        }}
      />

      <BrowserRouter>
        <PublicRoutes />
        <InternalRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
