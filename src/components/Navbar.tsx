// import { useEffect } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import HoverLinks from "./HoverLinks";
// import { gsap } from "gsap";
// import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
// import "./styles/Navbar.css";

// gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
// export let smoother: ScrollSmoother;

// const Navbar = () => {
//   useEffect(() => {
//     smoother = ScrollSmoother.create({
//       wrapper: "#smooth-wrapper",
//       content: "#smooth-content",
//       smooth: 1.7,
//       speed: 1.7,
//       effects: true,
//       autoResize: true,
//       ignoreMobileResize: true,
//     });

//     smoother.scrollTop(0);
//     smoother.paused(true);

//     let links = document.querySelectorAll(".header ul a");
//     links.forEach((elem) => {
//       let element = elem as HTMLAnchorElement;
//       element.addEventListener("click", (e) => {
//         if (window.innerWidth > 1024) {
//           e.preventDefault();
//           let elem = e.currentTarget as HTMLAnchorElement;
//           let section = elem.getAttribute("data-href");
//           smoother.scrollTo(section, true, "top top");
//         }
//       });
//     });
//     window.addEventListener("resize", () => {
//       ScrollSmoother.refresh(true);
//     });
//   }, []);
//   return (
//     <>
//       <div className="header">
//         <a href="/#" className="navbar-title" data-cursor="disable">
//           Logo
//         </a>
//         <a
//           href="mailto:example@mail.com"
//           className="navbar-connect"
//           data-cursor="disable"
//         >
//           example@mail.com
//         </a>
//         <ul>
//           <li>
//             <a data-href="#about" href="#about">
//               <HoverLinks text="ABOUT" />
//             </a>
//           </li>
//           <li>
//             <a data-href="#work" href="#work">
//               <HoverLinks text="WORK" />
//             </a>
//           </li>
//           <li>
//             <a data-href="#contact" href="#contact">
//               <HoverLinks text="CONTACT" />
//             </a>
//           </li>
//         </ul>
//       </div>

//       <div className="landing-circle1"></div>
//       <div className="landing-circle2"></div>
//       <div className="nav-fade"></div>
//     </>
//   );
// };

// export default Navbar;

import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { getLenis } from "../components/utils/smoothScroll";
import "./styles/Navbar.css";

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll(".header ul a");

    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;

      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();

          const target = element.getAttribute("data-href");

          if (target) {
            const section = document.querySelector(target) as HTMLElement;
            if (section) {
              const lenis = getLenis();

              lenis?.scrollTo(section, {
                offset: 0,
                duration: 1.5,
                easing: (t: number) => 1 - Math.pow(1 - t, 3), // 🔥 smooth ease
              });
            }
          }
        }
      });
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          AMIRAS
        </a>

        <a
          href="mailto:amirassarvaiya@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          amirassarvaiya@gmail.com
        </a>

        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;