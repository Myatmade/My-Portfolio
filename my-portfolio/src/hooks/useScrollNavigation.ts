import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TABS = ["/", "/about", "/projects", "/skills", "/contact"];
const PROJECTS = ["intern", "eduplayground", "dishcovery"];
const SCROLL_THRESHOLD = 0.8;
const NAVIGATION_COOLDOWN = 1200; // ms - matches transition duration

export function useScrollNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const lastNavTime = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      // Prevent rapid consecutive navigations
      if (now - lastNavTime.current < NAVIGATION_COOLDOWN) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      let nextTab: string | null = null;

      // Check if we're on a project detail page
      const isProjectDetail = location.pathname.startsWith("/projects/");
      if (isProjectDetail) {
        const currentSlug = location.pathname.split("/projects/")[1];
        const currentProjectIndex = PROJECTS.indexOf(currentSlug);

        // Scroll down to next project
        if (e.deltaY > 0 && scrollPercentage > SCROLL_THRESHOLD) {
          if (currentProjectIndex + 1 < PROJECTS.length) {
            nextTab = `/projects/${PROJECTS[currentProjectIndex + 1]}`;
          } else {
            // Last project, go to skills
            nextTab = "/skills";
          }
        }

        // Scroll up to previous project or back to projects
        if (e.deltaY < 0 && scrollTop < 100) {
          if (currentProjectIndex - 1 >= 0) {
            nextTab = `/projects/${PROJECTS[currentProjectIndex - 1]}`;
          } else {
            // First project, go back to projects list
            nextTab = "/projects";
          }
        }
      } else {
        // Normal tab navigation
        const currentIndex = TABS.indexOf(location.pathname);

        // Scroll down to next tab
        if (e.deltaY > 0 && scrollPercentage > SCROLL_THRESHOLD) {
          if (currentIndex + 1 < TABS.length) {
            nextTab = TABS[currentIndex + 1];
          }
        }

        // Scroll up to previous tab
        if (e.deltaY < 0 && scrollTop < 100) {
          if (currentIndex - 1 >= 0) {
            nextTab = TABS[currentIndex - 1];
          }
        }
      }

      if (nextTab) {
        lastNavTime.current = now;
        // Smooth scroll to top before navigating
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Delay navigation to let scroll animation complete
        setTimeout(() => {
          navigate(nextTab);
        }, 600);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [location.pathname, navigate]);
}
