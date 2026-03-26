import { lazy, Suspense, useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { useLoading } from "../context/LoadingProvider";
import { setProgress } from "./Loading";
import { setCharTimeline, setAllTimeline } from "./utils/GsapScroll";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    // Complete the loading screen since there is no 3D model to wait for
    const progress = setProgress((value) => setLoading(value));
    progress.loaded().then(() => {
      setTimeout(() => {
        setCharTimeline(null, null as any);
        setAllTimeline();
      }, 500);
    });
  }, []);

  useEffect(() => {
    let timeoutId: number;
    const resizeHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setSplitText();
      }, 300);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Suspense fallback={<div>Loading....</div>}>
              <TechStack />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
