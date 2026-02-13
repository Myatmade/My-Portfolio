// Navbar component - horizontal navigation bar
import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

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

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "bg-[var(--nav)] text-white",
        "border-b border-[rgba(255,255,255,0.08)]",
        "shadow-[var(--shadow)]",
      ].join(" ")}
    >
      <div className="relative flex items-center justify-center h-16 px-4">
        <div className="flex items-center justify-center gap-15">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }: { isActive: boolean }) =>
                [
                  "flex items-center gap-2 rounded-xl px-4 py-2 transition text-2xl",
                  isActive
                    ? "bg-[rgba(242,233,228,0.16)] text-white"
                    : "text-[rgba(255,255,255,0.82)] hover:bg-[rgba(242,233,228,0.12)] hover:text-white",
                ].join(" ")
              }
            >
              <img src={item.icon} alt={item.key} className="w-8 h-8" />
              <span>{t.nav[item.key]}</span>
            </NavLink>
          ))}
        </div>

        <div className="absolute right-4 flex items-center rounded-full border border-[rgba(255,255,255,0.2)] overflow-hidden">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 text-xl transition ${
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
            className={`px-3 py-1 text-xl transition ${
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
  );
}
