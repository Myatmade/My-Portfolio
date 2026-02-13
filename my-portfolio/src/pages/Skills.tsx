import Tag from "../components/Tag";
import { useInView } from "../hooks/useInView";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export default function Skills() {
  const section = useInView();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const groups = [
    {
      title: t.skills.groups.frontend,
      items: [
        "React",
        "TypeScript",
        "HTML",
        "CSS",
        "JavaScript",
        "Vite",
        "Tailwind CSS",
      ],
    },
    {
      title: t.skills.groups.programming,
      items: ["Python", "Java", "C", "C++"],
    },
    { title: t.skills.groups.database, items: ["MySQL"] },
    {
      title: t.skills.groups.tools,
      items: [
        "GitHub",
        "Redmine",
        "Figma",
        "Canva",
        "VS Code",
        "Microsoft Office",
      ],
    },
    { title: t.skills.groups.os, items: ["macOS", "Windows"] },
    {
      title: t.skills.groups.learning,
      items: ["Node.js", "Vue", "Laravel"],
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Up indicator */}
      <button
        onClick={() => navigate("/projects")}
        className="absolute top-1/14 left-1/2 -translate-x-1/2 animate-bounce z-10 cursor-pointer hover:opacity-100 transition-opacity"
        aria-label="Scroll to previous section"
      >
        <img
          src="/down.svg"
          alt="Scroll up"
          className="w-5 h-5 opacity-60 rotate-180"
        />
      </button>

      <div
        ref={section.ref}
        className={`flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-1000 ${
          section.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">
            {t.skills.title}
          </h1>
          <p className="mt-2 text-lg text-[var(--text-muted)]">
            {t.skills.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {groups.slice(0, 3).map((g) => (
              <div
                key={g.title}
                className="rounded-3xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="font-semibold text-lg text-center">
                  {g.title}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 justify-center">
                  {g.items.map((x) => (
                    <Tag key={x} text={x} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {groups.slice(3).map((g) => (
              <div
                key={g.title}
                className="rounded-3xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="font-semibold text-lg text-center">
                  {g.title}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 justify-center">
                  {g.items && g.items.map((x) => <Tag key={x} text={x} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <button
        onClick={() => navigate("/contact")}
        className="absolute bottom-1/14 left-1/2 -translate-x-1/2 animate-bounce z-10 cursor-pointer hover:opacity-100 transition-opacity"
        aria-label="Scroll to next section"
      >
        <img src="/down.svg" alt="Scroll down" className="w-5 h-5 opacity-60" />
      </button>
    </div>
  );
}
