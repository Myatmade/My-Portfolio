import { useEffect, useMemo, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import { useAnimation } from "../context/AnimationContext";

export default function Home() {
  const hero = useInView();
  const { language } = useLanguage();
  const { animationsEnabled, setTypingComplete } = useAnimation();
  const t = translations[language];
  const fullName = "Myat Ma De May Phuu Ngon";
  const [typedName, setTypedName] = useState(animationsEnabled ? "" : fullName);
  const [isTypingDone, setIsTypingDone] = useState(!animationsEnabled);

  useEffect(() => {
    if (!animationsEnabled) {
      setTypedName(fullName);
      setIsTypingDone(true);
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedName(fullName.slice(0, index));
      if (index >= fullName.length) {
        window.clearInterval(interval);
        setIsTypingDone(true);
        setTypingComplete(true);
      }
    }, 55);

    return () => window.clearInterval(interval);
  }, [animationsEnabled, fullName]);

  const displayName = useMemo(
    () => (typedName.length ? typedName : fullName),
    [fullName, typedName],
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative pt-20">
      <section ref={hero.ref} className="text-center space-y-6">
        {isTypingDone ? (
          <p className="text-xl md:text-2xl text-[var(--text-muted)] opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]">
            {t.home.greeting} <span className="wave-emoji">👋</span>{" "}
            {t.home.intro}
          </p>
        ) : null}
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight transition-transform hover:scale-105 inline-block">
          {displayName}
        </h1>
        {isTypingDone ? (
          <>
            <p className="text-xl md:text-2xl text-[var(--text-muted)] mt-6 opacity-0 animate-[slideInFromBottom_0.8s_ease-out_0.3s_forwards]">
              {t.home.role}
            </p>
            <p className="text-xl text-[var(--text-muted)] max-w-4xl mx-auto opacity-0 animate-[slideInFromBottom_0.8s_ease-out_0.5s_forwards]">
              {t.home.blurb}
            </p>
          </>
        ) : null}
      </section>
    </div>
  );
}
