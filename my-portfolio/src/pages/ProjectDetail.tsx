import { useEffect, useMemo, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Tag from "../components/Tag";
import { getProjectBySlug } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

type MediaItem = { type: "video" | "image"; src: string };

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLightboxZoomed, setIsLightboxZoomed] = useState(false);

  const project = slug ? getProjectBySlug(slug) : undefined;
  const projectData =
    project && slug
      ? t.projectData[slug as "intern" | "eduplayground" | "dishcovery"]
      : undefined;

  const mediaItems: MediaItem[] = useMemo(() => {
    if (!project) return [];
    return [
      ...(project.demoVideo
        ? [{ type: "video" as const, src: project.demoVideo }]
        : []),
      ...(project.galleryImages?.map((src) => ({
        type: "image" as const,
        src,
      })) || []),
    ];
  }, [project]);

  const PROJECTS = ["intern", "eduplayground", "dishcovery"];
  const currentProjectIndex = slug ? PROJECTS.indexOf(slug) : -1;

  const handleUpClick = () => {
    setIsVisible(false);
    const targetPath =
      currentProjectIndex > 0
        ? `/projects/${PROJECTS[currentProjectIndex - 1]}`
        : "/projects";
    setTimeout(() => navigate(targetPath), 200);
  };

  const handleDownClick = () => {
    setIsVisible(false);
    const targetPath =
      currentProjectIndex < PROJECTS.length - 1
        ? `/projects/${PROJECTS[currentProjectIndex + 1]}`
        : "/skills";
    setTimeout(() => navigate(targetPath), 200);
  };

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    if (!mediaItems.length) return;
    setMediaIndex(0);
    setIsLightboxOpen(false);
    setIsLightboxZoomed(false);
  }, [project?.slug, mediaItems.length]);

  useEffect(() => {
    if (!mediaItems.length || isLightboxOpen) return;
    const current = mediaItems[mediaIndex];
    if (current?.type !== "image") return;
    const interval = setInterval(() => {
      setMediaIndex((prev) => (prev + 1) % mediaItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [mediaIndex, mediaItems, isLightboxOpen]);

  if (!project || !projectData) return <Navigate to="/projects" replace />;

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Up indicator */}
      <button
        onClick={handleUpClick}
        className="absolute top-1/14 left-1/2 -translate-x-1/2 animate-bounce z-10 cursor-pointer hover:opacity-100 transition-opacity"
        aria-label="Scroll to previous"
      >
        <img
          src="/down.svg"
          alt="Scroll up"
          className="w-6 h-6 opacity-60 rotate-180"
        />
      </button>

      <div
        key={project.slug}
        className={`grid grid-cols-1 md:grid-cols-[1.3fr_1fr] items-start gap-6 w-full max-w-none px-6 md:px-10 py-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Left side: header and hero */}
        <div className="flex flex-col space-y-4 h-full">
          {/* header */}
          <section className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-semibold">
              {projectData.title}
            </h1>
            <p className="text-2xl text-[var(--text-muted)]">
              {projectData.shortSummary}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button href="/projects" variant="solid">
                {t.projectDetail.back}
              </Button>
              {project.githubUrl ? (
                <Button href={project.githubUrl} external>
                  <img src="/github.svg" alt="GitHub" className="w-8 h-8" />
                </Button>
              ) : null}
              {project.demoUrl ? (
                <Button href={project.demoUrl} external>
                  {t.projectDetail.demo}
                </Button>
              ) : null}
            </div>
          </section>

          {/* hero / media */}
          <section className="rounded-2xl border border-[var(--border)] overflow-hidden bg-[rgba(34,34,59,0.06)] shadow-sm">
            {mediaItems.length ? (
              <div className="flex flex-col h-full">
                <div className="relative w-full aspect-video max-h-[480px] bg-black">
                  {mediaItems[mediaIndex]?.type === "video" ? (
                    <video
                      src={mediaItems[mediaIndex].src}
                      className="h-full w-full object-contain bg-black"
                      controls
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-[rgba(246,246,246,0.35)] p-4">
                      <img
                        src={mediaItems[mediaIndex].src}
                        alt={`${projectData.title} media ${mediaIndex + 1}`}
                        className="h-auto w-auto max-h-full max-w-full object-contain cursor-zoom-in"
                        onClick={() => {
                          setIsLightboxOpen(true);
                          setIsLightboxZoomed(false);
                        }}
                      />
                    </div>
                  )}

                  {mediaItems.length > 1 ? (
                    <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
                      <button
                        onClick={() =>
                          setMediaIndex(
                            (prev) =>
                              (prev - 1 + mediaItems.length) %
                              mediaItems.length,
                          )
                        }
                        className="rounded-full bg-black/50 text-white px-3 py-1 text-md hover:bg-black/70"
                        aria-label="Previous media"
                      >
                        {t.projectDetail.prev}
                      </button>
                      <button
                        onClick={() =>
                          setMediaIndex(
                            (prev) => (prev + 1) % mediaItems.length,
                          )
                        }
                        className="rounded-full bg-black/50 text-white px-3 py-1 text-md hover:bg-black/70"
                        aria-label="Next media"
                      >
                        {t.projectDetail.next}
                      </button>
                    </div>
                  ) : null}
                </div>

                {mediaItems.length > 1 ? (
                  <div className="flex gap-2 p-3 overflow-x-auto bg-[rgba(246,246,246,0.55)]">
                    {mediaItems.map((item, index) => (
                      <button
                        key={`${item.type}-${item.src}`}
                        onClick={() => {
                          setMediaIndex(index);
                          setIsLightboxOpen(false);
                          setIsLightboxZoomed(false);
                        }}
                        className={`relative h-16 w-24 overflow-hidden rounded-lg border ${
                          index === mediaIndex
                            ? "border-[var(--text)]"
                            : "border-[var(--border)]"
                        }`}
                        aria-label={`Select media ${index + 1}`}
                      >
                        {item.type === "video" ? (
                          <div className="h-full w-full flex items-center justify-center bg-black text-white text-xs">
                            {t.projectDetail.demo}
                          </div>
                        ) : (
                          <img
                            src={item.src}
                            alt={`${projectData.title} thumbnail ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="relative h-40 md:h-56 w-full">
                {project.heroImage ? (
                  <img
                    src={project.heroImage}
                    alt={projectData.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-sm text-[var(--muted)]">
                    Add hero image in /public/projects
                  </div>
                )}
              </div>
            )}
          </section>

          <div className="space-y-2">
            <div className="font-semibold text-2xl">
              {t.projectDetail.techStack}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Tag key={s} text={s} />
              ))}
            </div>
          </div>
        </div>

        {isLightboxOpen && mediaItems[mediaIndex]?.type === "image" ? (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <button
              onClick={() => {
                setIsLightboxOpen(false);
                setIsLightboxZoomed(false);
              }}
              className="absolute top-4 right-4 rounded-full bg-black/60 text-white px-3 py-1 text-sm hover:bg-black/80"
              aria-label="Close fullscreen"
            >
              {t.projectDetail.close}
            </button>

            <img
              src={mediaItems[mediaIndex].src}
              alt={`${projectData.title} fullscreen ${mediaIndex + 1}`}
              className={`max-h-full max-w-full object-contain transition-transform duration-300 cursor-zoom-${
                isLightboxZoomed ? "out" : "in"
              } ${isLightboxZoomed ? "scale-150" : "scale-100"}`}
              onClick={() => setIsLightboxZoomed((prev) => !prev)}
            />
          </div>
        ) : null}

        {/* Right side: content grid */}
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] p-5 shadow-sm">
            <div className="font-semibold text-2xl">
              {t.projectDetail.overview}
            </div>
            <div className="mt-3 text-xl text-[var(--text-muted)] space-y-2">
              <div>
                <span className="font-semibold">{t.projectDetail.role}:</span>{" "}
                {projectData.role}
              </div>
              <div>
                <span className="font-semibold">{t.projectDetail.team}:</span>{" "}
                {projectData.team}
              </div>
            </div>

            {projectData.notes?.length ? (
              <div className="mt-3">
                <div className="font-semibold text-xl">
                  {t.projectDetail.note}
                </div>
                <ul className="mt-2 list-disc pl-5 text-xl text-[var(--text-muted)] space-y-1.5">
                  {projectData.notes.map((n: string) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] p-5 shadow-sm">
            <div className="font-semibold text-2xl">
              {t.projectDetail.contributions}
            </div>
            <ul className="mt-2 list-disc pl-5 text-xl text-[var(--text-muted)] space-y-1.5">
              {projectData.contributions.map((c: string) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] p-5 shadow-sm">
            <div className="font-semibold text-2xl">
              {t.projectDetail.features}
            </div>
            <ul className="mt-2 list-disc pl-5 text-xl text-[var(--text-muted)] space-y-1.5">
              {projectData.features.map((f: string) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] p-5 shadow-sm">
            <div className="font-semibold text-2xl">
              {t.projectDetail.challenges}
            </div>
            <ul className="mt-2 list-disc pl-5 text-xl text-[var(--text-muted)] space-y-1.5">
              {projectData.challenges.map((ch: string) => (
                <li key={ch}>{ch}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <button
        onClick={handleDownClick}
        className="absolute bottom-1/14 left-1/2 -translate-x-1/2 animate-bounce z-10 cursor-pointer hover:opacity-100 transition-opacity"
        aria-label="Scroll to next"
      >
        <img src="/down.svg" alt="Scroll down" className="w-6 h-6 opacity-60" />
      </button>
    </div>
  );
}
