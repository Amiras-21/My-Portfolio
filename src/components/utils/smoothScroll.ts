import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis: Lenis;

export const initSmoothScroll = () => {
  lenis = new Lenis({
    duration: 1.6,        // smoothness (increase for more smooth)
    smoothWheel: true,
    lerp: 0.08,          // 🔥 inertia feel (important)
  });

  // Sync Lenis with GSAP Ticker for smooth integration
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
};

export const getLenis = () => lenis;