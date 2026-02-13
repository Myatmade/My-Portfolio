import { useInView } from "../hooks/useInView";
import Tag from "../components/Tag";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export default function Contact() {
  const section = useInView();
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
      <div
        ref={section.ref}
        className={`flex flex-col items-center justify-center min-h-screen transition-all duration-1000 ${
          section.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-center mb-6 text-[var(--text)]">
          {t.contact.title}
        </h1>

        {/* Languages Section */}
        <div className="flex flex-wrap gap-2 items-center justify-center mb-8">
          <p className="text-xl font-semibold text-[var(--text)]">
            {t.contact.workIn}
          </p>
          {t.contact.languages.map((lang) => (
            <Tag key={lang} text={lang} />
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl gap-6 mb-6">
          {/* Email Section */}
          <div className="flex items-center gap-3">
            <img src="/email.svg" alt="Email" className="w-8 h-8" />
            <a
              href="mailto:myatmade.may@gmail.com"
              className="text-lg md:text-xl text-[var(--text-muted)] hover:underline transition"
            >
              myatmade.may@gmail.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5">
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
                    className="w-8 h-8"
                  />
                ) : (
                  <span className="text-2xl">{link.icon}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
