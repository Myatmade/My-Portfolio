import Button from "../components/Button";
import Tag from "../components/Tag";
import { useInView } from "../hooks/useInView";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export default function About() {
  const bioSection = useInView();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative min-h-screen">
      {/* Up indicator */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-1/14 left-1/2 -translate-x-1/2 animate-bounce z-10 cursor-pointer hover:opacity-100 transition-opacity"
        aria-label="Scroll to previous section"
      >
        <img
          src="/down.svg"
          alt="Scroll up"
          className="w-6 h-6 opacity-60 rotate-180"
        />
      </button>

      <section
        ref={bioSection.ref}
        className={`flex items-center justify-center min-h-screen px-8 transition-all duration-1000 ${
          bioSection.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-30 w-full max-w-7xl">
          {/* Left side: Bio content */}
          <div className="flex flex-col justify-center space-y-5">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
              {t.about.title}
            </h1>
            <p className="text-2xl text-[var(--text-muted)]">
              {t.about.subtitle}
            </p>

            <p className="text-xl text-justify md:text-2xl leading-7 text-[var(--text-muted)]">
              {t.about.bio}
            </p>

            <div className="space-y-5">
              <div>
                <p className="text-2xl font-semibold text-[var(--text)] mb-2">
                  {t.about.stackTitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.about.stackTags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[var(--text)] mb-2">
                  {t.about.focusTitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.about.focusTags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button href="/projects" variant="solid">
                {t.about.viewProjects}
              </Button>
              <Button href="/contact" variant="solid">
                {t.about.contact}
              </Button>
            </div>
          </div>

          {/* Right side: Profile photo */}
          <div className="flex items-center justify-center">
            <div className="rounded-3xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] p-4 shadow-sm w-full h-full">
              <div className="rounded-2xl bg-gray-200 overflow-hidden w-full h-full min-h-[500px]">
                <img
                  src="/Profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Down indicator */}
      <button
        onClick={() => navigate("/projects")}
        className="absolute bottom-1/14 left-1/2 -translate-x-1/2 animate-bounce z-10 cursor-pointer hover:opacity-100 transition-opacity"
        aria-label="Scroll to next section"
      >
        <img src="/down.svg" alt="Scroll down" className="w-6 h-6 opacity-60" />
      </button>
    </div>
  );
}
