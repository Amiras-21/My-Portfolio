// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
// import { SplitText } from "gsap-trial/SplitText";

// interface ParaElement extends HTMLElement {
//   anim?: gsap.core.Animation;
//   split?: SplitText;
// }

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// export default function setSplitText() {
//   ScrollTrigger.config({ ignoreMobileResize: true });
//   if (window.innerWidth < 900) return;
//   const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
//   const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

//   const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
//   const ToggleAction = "play pause resume reverse";

//   paras.forEach((para: ParaElement) => {
//     para.classList.add("visible");
//     if (para.anim) {
//       para.anim.progress(1).kill();
//       para.split?.revert();
//     }

//     para.split = new SplitText(para, {
//       type: "lines,words",
//       linesClass: "split-line",
//     });

//     para.anim = gsap.fromTo(
//       para.split.words,
//       { autoAlpha: 0, y: 80 },
//       {
//         autoAlpha: 1,
//         scrollTrigger: {
//           trigger: para.parentElement?.parentElement,
//           toggleActions: ToggleAction,
//           start: TriggerStart,
//         },
//         duration: 1,
//         ease: "power3.out",
//         y: 0,
//         stagger: 0.02,
//       }
//     );
//   });
//   titles.forEach((title: ParaElement) => {
//     if (title.anim) {
//       title.anim.progress(1).kill();
//       title.split?.revert();
//     }
//     title.split = new SplitText(title, {
//       type: "chars,lines",
//       linesClass: "split-line",
//     });
//     title.anim = gsap.fromTo(
//       title.split.chars,
//       { autoAlpha: 0, y: 80, rotate: 10 },
//       {
//         autoAlpha: 1,
//         scrollTrigger: {
//           trigger: title.parentElement?.parentElement,
//           toggleActions: ToggleAction,
//           start: TriggerStart,
//         },
//         duration: 0.8,
//         ease: "power2.inOut",
//         y: 0,
//         rotate: 0,
//         stagger: 0.03,
//       }
//     );
//   });

//   ScrollTrigger.addEventListener("refresh", () => setSplitText());
// }

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText } from "./splitTextHelper";

gsap.registerPlugin(ScrollTrigger);

let instances: any[] = [];

export default function setSplitText() {
  if (window.innerWidth < 900) return;

  // Cleanup prev triggers
  instances.forEach((instance) => {
    if (instance.scrollTrigger) instance.scrollTrigger.kill();
    instance.kill();
  });
  instances = [];

  const paras = document.querySelectorAll(".para");
  const titles = document.querySelectorAll(".title");

  paras.forEach((para: any) => {
    const split = splitText(para, "words");

    const tween = gsap.fromTo(
      split.words,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: para,
          start: "top 80%",
        },
      }
    );
    instances.push(tween);
  });

  titles.forEach((title: any) => {
    const split = splitText(title, "chars");

    const tween = gsap.fromTo(
      split.chars,
      { opacity: 0, y: 80, rotate: 10 },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
        },
      }
    );
    instances.push(tween);
  });
}