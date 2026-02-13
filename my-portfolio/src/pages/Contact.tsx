import { useInView } from "../hooks/useInView";
import { useNavigate } from "react-router-dom";
import Tag from "../components/Tag";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export default function Contact() {
  const section = useInView();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const socialLinks = [
    {
      icon: null,
      href: "https://github.com/Myatmade",
      label: "GitHub",
      svgIcon: "/github.svg",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Up indicator */}
      <button
        onClick={() => navigate("/skills")}
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
        className={`flex flex-col items-center justify-center min-h-screen transition-all duration-1000 ${
          section.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-6xl md:text-7xl font-semibold text-center mb-8 text-[var(--text)]">
          {t.contact.title}
        </h1>

        {/* Languages Section */}
        <div className="flex flex-wrap gap-2 items-center justify-center mb-12">
          <p className="text-3xl font-semibold text-[var(--text)]">
            {t.contact.workIn}
          </p>
          {t.contact.languages.map((lang) => (
            <Tag key={lang} text={lang} />
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-2xl gap-8 mb-8">
          {/* Email Section */}
          <div className="flex items-center gap-4">
            <img src="/email.svg" alt="Email" className="w-10 h-10" />
            <a
              href="mailto:myatmade.may@gmail.com"
              className="text-2xl md:text-3xl text-[var(--text-muted)] hover:underline transition"
            >
              myatmade.may@gmail.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition transform hover:scale-110"
                title={link.label}
              >
                {link.svgIcon ? (
                  <img
                    src={link.svgIcon}
                    alt={link.label}
                    className="w-10 h-10"
                  />
                ) : (
                  <span className="text-4xl">{link.icon}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
