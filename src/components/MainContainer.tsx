import { PropsWithChildren, useEffect } from "react";
import Landing from "./Landing";
import Navbar from "./Navbar";
import About from "./About";
import Experience from "./Experience";
import Work from "./Work";
import Skills from "./Skills";
import Certifications from "./Certifications";
import Contact from "./Contact";
import Footer from "./Footer";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    let timeoutId: number;
    const resizeHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSplitText();
      }, 200);
    };
    
    setSplitText();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="container-main">
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
