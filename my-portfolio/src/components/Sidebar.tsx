// Navbar component - horizontal navigation bar
import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import { useAnimation } from "../context/AnimationContext";

const nav = [
  { to: "/", key: "home", icon: "/home.svg" },
  { to: "/about", key: "about", icon: "/profile.svg" },
  { to: "/projects", key: "projects", icon: "/project.svg" },
  { to: "/skills", key: "skills", icon: "/skill.svg" },
  { to: "/contact", key: "contact", icon: "/contact.svg" },
] as const;

export default function Sidebar() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { animationsEnabled, typingComplete } = useAnimation();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Show sidebar on project detail pages regardless of animation state
    const isProjectDetail = location.pathname.startsWith("/projects/");
    if (isProjectDetail) {
      setShouldAnimate(true);
    } else if (animationsEnabled && typingComplete) {
      setShouldAnimate(true);
    } else if (!animationsEnabled) {
      setShouldAnimate(false);
    }
  }, [animationsEnabled, typingComplete, location.pathname]);

  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "skills", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-10% 0px -40% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const activeKey = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith("/projects/")) return "projects";
    const pathToKey: Record<string, string> = {
      "/": "home",
      "/about": "about",
      "/projects": "projects",
      "/skills": "skills",
      "/contact": "contact",
    };

    return activeSection ?? pathToKey[path] ?? "home";
  }, [activeSection, location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "bg-[var(--nav)] text-white",
          "border-b border-[rgba(255,255,255,0.08)]",
          "shadow-[var(--shadow)]",
          animationsEnabled && !typingComplete ? "opacity-0" : "",
          shouldAnimate
            ? "animate-[slideInFromTop_0.8s_ease-out_forwards]"
            : "",
        ].join(" ")}
      >
        <div className="relative flex items-center h-14 px-3 gap-2">
          {/* Hamburger button for mobile/tablet */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            <img src="/detail.svg" alt="Menu" className="w-7 h-7" />
          </button>

          {/* Desktop navigation */}
          <div className="hidden lg:flex flex-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-center gap-4 sm:gap-10 min-w-max w-full">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={() =>
                    [
                      "flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 transition text-sm sm:text-lg",
                      activeKey === item.key
                        ? "bg-[rgba(242,233,228,0.16)] text-white"
                        : "text-[rgba(255,255,255,0.82)] hover:bg-[rgba(242,233,228,0.12)] hover:text-white",
                    ].join(" ")
                  }
                >
                  <img src={item.icon} alt={item.key} className="w-7 h-7" />
                  <span className="hidden sm:inline">{t.nav[item.key]}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Language switcher - Desktop only */}
          <div className="hidden lg:flex items-center rounded-full border border-[rgba(255,255,255,0.2)] overflow-hidden flex-shrink-0">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 text-xs sm:text-md transition ${
                language === "en"
                  ? "bg-white text-[var(--nav)]"
                  : "bg-[rgba(255,255,255,0.12)] text-white/90 hover:bg-[rgba(255,255,255,0.2)]"
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("jp")}
              className={`px-2 py-1 text-xs sm:text-md transition ${
                language === "jp"
                  ? "bg-white text-[var(--nav)]"
                  : "bg-[rgba(255,255,255,0.12)] text-white/90 hover:bg-[rgba(255,255,255,0.2)]"
              }`}
              aria-label="Switch to Japanese"
            >
              日本
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-[var(--nav)] flex flex-col items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2"
              aria-label="Close menu"
            >
              <img src="/cross.svg" alt="Close" className="w-8 h-8" />
            </button>

            {/* Mobile navigation links */}
            <div className="flex flex-col items-center gap-6 text-white">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={() =>
                    [
                      "text-2xl font-medium transition",
                      activeKey === item.key
                        ? "text-white"
                        : "text-white/70 hover:text-white",
                    ].join(" ")
                  }
                >
                  {t.nav[item.key]}
                </NavLink>
              ))}

              {/* Language switcher in mobile menu */}
              <div className="flex items-center rounded-full border border-[rgba(255,255,255,0.2)] overflow-hidden mt-4">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-4 py-2 text-sm transition ${
                    language === "en"
                      ? "bg-white text-[var(--nav)]"
                      : "bg-[rgba(255,255,255,0.12)] text-white/90 hover:bg-[rgba(255,255,255,0.2)]"
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("jp")}
                  className={`px-4 py-2 text-sm transition ${
                    language === "jp"
                      ? "bg-white text-[var(--nav)]"
                      : "bg-[rgba(255,255,255,0.12)] text-white/90 hover:bg-[rgba(255,255,255,0.2)]"
                  }`}
                  aria-label="Switch to Japanese"
                >
                  日本
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
