import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export default function Projects() {
  const section = useInView();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative min-h-screen">
      <div
        ref={section.ref}
        className={`flex flex-col items-center justify-center min-h-screen space-y-6 transition-all duration-1000 ${
          section.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold">
            {t.projects.title}
          </h1>
          <p className="mt-2 text-lg text-[var(--text-muted)]">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 max-w-screen-2xl w-full px-4">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
