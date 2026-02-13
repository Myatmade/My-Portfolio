import { useInView } from "../hooks/useInView";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export default function Home() {
  const hero = useInView();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <section
        ref={hero.ref}
        className={`text-center space-y-6 transition-opacity duration-1000 ${
          hero.isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-3xl md:text-4xl text-[var(--text-muted)]">
          {t.home.greeting} <span className="wave-emoji">👋</span>{" "}
          {t.home.intro}
        </p>
        <h1 className="text-7xl md:text-8xl font-semibold tracking-tight transition-transform hover:scale-105 inline-block">
          Myat Ma De May Phuu Ngon
        </h1>
        <p className="text-3xl md:text-4xl text-[var(--text-muted)] mt-8">
          {t.home.role}
        </p>
        <p className="text-3xl text-[var(--text-muted)] max-w-4xl mx-auto">
          {t.home.blurb}
        </p>
      </section>

      {/* Down indicator */}
      <button
        onClick={() => navigate("/about")}
        className="absolute bottom-1/14 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:opacity-100 transition-opacity"
        aria-label="Scroll to next section"
      >
        <img src="/down.svg" alt="Scroll down" className="w-6 h-6 opacity-60" />
      </button>
    </div>
  );
}
