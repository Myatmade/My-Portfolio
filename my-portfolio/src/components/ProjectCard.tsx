import Button from "./Button";
import Tag from "./Tag";
import type { Project } from "../data/projects";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const projectData = t.projectData[project.slug];

  const handleCardClick = () => {
    navigate(`/projects/${project.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group rounded-3xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] shadow-sm overflow-hidden transition hover:-translate-y-1 hover:shadow-lg cursor-pointer h-full"
    >
      <div className="relative h-40 w-full overflow-hidden bg-[rgba(34,34,59,0.06)]">
        {project.heroImage ? (
          <img
            src={project.heroImage}
            alt={projectData.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[var(--muted)]">
            Add image in /public/projects
          </div>
        )}

        {/* subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-t from-[rgba(34,34,59,0.22)] to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{projectData.title}</h3>
        <p className="mt-1 text-md text-[var(--text-muted)]">
          {projectData.shortSummary}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {project.tags.map((t) => (
            <Tag key={t} text={t} />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button href={`/projects/${project.slug}`} variant="solid">
            {t.projectCard.viewDetails}
          </Button>

          {project.githubUrl ? (
            <Button href={project.githubUrl} external>
              <img src="/github.svg" alt="GitHub" className="w-7 h-7" />
            </Button>
          ) : (
            <Tag text={t.projectCard.ongoing} />
          )}

          {project.demoUrl ? (
            <Button href={project.demoUrl} external>
              Demo
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
