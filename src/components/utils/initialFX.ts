import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  // 1. Enable scrolling and resume ScrollSmoother
  document.body.style.overflowY = "auto";
  if (smoother) {
    smoother.paused(false);
  }
  
  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) {
    mainEl.classList.add("main-active");
  }

  // 2. Set background color smoothly
  gsap.to("body", {
    backgroundColor: "#050810",
    duration: 0.6,
  });

  // 3. Create a master timeline for the entrance animation
  const tl = gsap.timeline({
    defaults: {
      ease: "power4.out",
      duration: 1.2
    }
  });

  // ── Top Elements (Header/Navbar) slide down from top ──
  tl.fromTo(
    [".header", ".nav-fade"],
    { opacity: 0, y: -40 },
    { opacity: 1, y: 0, duration: 1.0 },
    0.1
  );

  // ── Bottom Avatar slides up from bottom ──
  tl.fromTo(
    ".character-container",
    { opacity: 0, y: 150 },
    { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
    0.3
  );

  // ── Left Elements slide in from left (Staggered one by one) ──
  const leftElements = [
    ".landing-info .greeting",
    ".landing-info .name",
    ".landing-info .role",
    ".landing-info .bio",
    ".landing-info .availability",
    ".landing-info .hero-ctas"
  ].filter(sel => document.querySelector(sel));

  if (leftElements.length > 0) {
    tl.fromTo(
      leftElements,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, stagger: 0.12 },
      0.5
    );
  }

  // ── Right Elements (Stats) slide in from right (Staggered) ──
  const rightElements = document.querySelectorAll(".landing-right .stat-block");
  if (rightElements.length > 0) {
    tl.fromTo(
      rightElements,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, stagger: 0.15 },
      0.7
    );
  }
}
