import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TABS = ["/", "/about", "/projects", "/skills", "/contact"];
const SCROLL_THRESHOLD = 0.8;
const NAVIGATION_COOLDOWN = 1200; // ms - matches transition duration

export function useScrollNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const lastNavTime = useRef(0);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const handleNavigate = (deltaY: number) => {
      const now = Date.now();
      // Prevent rapid consecutive navigations
      if (now - lastNavTime.current < NAVIGATION_COOLDOWN) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      const nearBottom = scrollHeight - (scrollTop + clientHeight) < 12;
      const nearTop = scrollTop < 12;

      let nextTab: string | null = null;

      // Check if we're on a project detail page
      const isProjectDetail = location.pathname.startsWith("/projects/");
      if (!isProjectDetail) {
        // Normal tab navigation
        const currentIndex = TABS.indexOf(location.pathname);

        // Scroll down to next tab
        if (deltaY > 0 && scrollPercentage > SCROLL_THRESHOLD && nearBottom) {
          if (currentIndex + 1 < TABS.length) {
            nextTab = TABS[currentIndex + 1];
          }
        }

        // Scroll up to previous tab
        if (deltaY < 0 && scrollTop < 100 && nearTop) {
          if (currentIndex - 1 >= 0) {
            nextTab = TABS[currentIndex - 1];
          }
        }
      }

      if (nextTab) {
        lastNavTime.current = now;
        navigate(nextTab);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      handleNavigate(e.deltaY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const endY = e.changedTouches[0]?.clientY;
      if (endY === undefined) return;
      const deltaY = touchStartY.current - endY;
      touchStartY.current = null;
      if (Math.abs(deltaY) < 40) return;
      handleNavigate(deltaY);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [location.pathname, navigate]);
}
