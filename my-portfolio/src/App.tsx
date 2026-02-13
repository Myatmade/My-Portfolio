import { useEffect, useMemo, useRef } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AppShell from "./app/AppShell";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import { useAnimation } from "./context/AnimationContext";

// Store initial page load state at module level to persist across route changes
let redirectHandled = false;
let wasInitialLoadProjectDetail = false;

function SinglePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { animationsEnabled, markAnimationsDone } = useAnimation();

  const sectionId = useMemo(() => {
    switch (location.pathname) {
      case "/about":
        return "about";
      case "/projects":
        return "projects";
      case "/skills":
        return "skills";
      case "/contact":
        return "contact";
      default:
        return "home";
    }
  }, [location.pathname]);

  useEffect(() => {
    // Check current navigation type from performance API
    const perfEntries = window.performance.getEntriesByType("navigation");
    const currentNavType =
      perfEntries.length > 0
        ? (perfEntries[0] as PerformanceNavigationTiming).type
        : null;

    // Only redirect if:
    // 1. We haven't already handled a redirect
    // 2. It's an actual page reload (not client-side navigation)
    // 3. We're not on the home page
    // 4. AND the initial page load was NOT on a ProjectDetail page
    // This ensures that if you refresh on a project page and then click a sidebar tab,
    // it doesn't redirect to home
    if (
      !redirectHandled &&
      currentNavType === "reload" &&
      location.pathname !== "/" &&
      !wasInitialLoadProjectDetail
    ) {
      redirectHandled = true;
      navigate("/", { replace: true });
      return;
    }

    redirectHandled = true;
  }, [navigate, location.pathname]);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [sectionId]);

  useEffect(() => {
    if (!animationsEnabled) return;
    const ids = ["home", "about", "projects", "skills", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            seen.add(entry.target.id);
          }
        });

        if (seen.size === ids.length) {
          markAnimationsDone();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [animationsEnabled, markAnimationsDone]);

  return (
    <div className="space-y-16 md:space-y-24">
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

function RouteWrapper() {
  const location = useLocation();
  const isInitialMountRef = useRef(true);

  useEffect(() => {
    // Set this flag once on app load to detect if we started on a project detail page
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      wasInitialLoadProjectDetail = location.pathname.startsWith("/projects/");
    }
  }, []);

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<SinglePage />} />
        <Route path="/about" element={<SinglePage />} />
        <Route path="/projects" element={<SinglePage />} />
        <Route path="/skills" element={<SinglePage />} />
        <Route path="/contact" element={<SinglePage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return <RouteWrapper />;
}
