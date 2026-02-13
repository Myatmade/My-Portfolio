import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { useInView } from "../hooks/useInView";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export default function Projects() {
  const section = useInView();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative min-h-screen">
      {/* Up indicator */}
      <button
        onClick={() => navigate("/about")}
        className="absolute top-1/14 left-1/2 -translate-x-1/2 animate-bounce z-10 cursor-pointer hover:opacity-100 transition-opacity"
        aria-label="Scroll to previous section"
      >
        <img
          src="/down.svg"
          alt="Scroll up"
          className="w-6 h-6 opacity-60 rotate-180"
        />
      </button>

      <div
        ref={section.ref}
        className={`flex flex-col items-center justify-center min-h-screen space-y-6 transition-all duration-1000 ${
          section.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-semibold">
            {t.projects.title}
          </h1>
          <p className="mt-2 text-2xl text-[var(--text-muted)]">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-screen-2xl w-full px-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>

      {/* Down indicator */}
      <button
        onClick={() => navigate("/skills")}
        className="absolute bottom-1/14 left-1/2 -translate-x-1/2 animate-bounce z-10 cursor-pointer hover:opacity-100 transition-opacity"
        aria-label="Scroll to next section"
      >
        <img src="/down.svg" alt="Scroll down" className="w-6 h-6 opacity-60" />
      </button>
    </div>
  );
}
