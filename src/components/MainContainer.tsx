import { PropsWithChildren, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Landing from "./Landing";
import Navbar from "./Navbar";
import About from "./About";
import Experience from "./Experience";
import Work from "./Work";
import Skills from "./Skills";
import Certifications from "./Certifications";
import Contact from "./Contact";
import Footer from "./Footer";
import ParticlesBackground from "./ParticlesBackground";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    let timeoutId: number;
    const resizeHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSplitText();
        ScrollTrigger.refresh();
      }, 500);
    };
    
    // Easter Egg: Type "mern"
    let keys = "";
    const easterEggHandler = (e: KeyboardEvent) => {
      keys += e.key.toLowerCase();
      if (keys.length > 4) {
        keys = keys.slice(1);
      }
      if (keys === "mern") {
        document.body.classList.add("matrix-mode");
        // Remove it after 15 seconds
        setTimeout(() => {
          document.body.classList.remove("matrix-mode");
        }, 15000); 
      }
    };

    // Initial call
    setTimeout(() => {
      setSplitText();
      ScrollTrigger.refresh();
    }, 500);
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("keydown", easterEggHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("keydown", easterEggHandler);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="container-main">
      <ParticlesBackground />
      <Navbar />
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            {/* Always render the character image inside Landing */}
            <Landing>{children}</Landing>
            <About />
            <Experience />
            <Work />
            <Skills />
            <Certifications />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
