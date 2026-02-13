import { useEffect, useMemo, useState, useRef } from "react";
import {
  useParams,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Button from "../components/Button";
import Tag from "../components/Tag";
import { getProjectBySlug } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import { useAnimation } from "../context/AnimationContext";

type MediaItem = { type: "video" | "image"; src: string };

export default function ProjectDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { animationsEnabled } = useAnimation();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(!animationsEnabled);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLightboxZoomed, setIsLightboxZoomed] = useState(false);
  const isInitialMount = useRef(true);

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

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      // Only redirect on actual page refresh if navigated without state
      // If location.state exists, we navigated here intentionally
      if (location.state) {
        return;
      }

      const perfEntries = window.performance.getEntriesByType("navigation");
      const isRefresh =
        perfEntries.length > 0 &&
        (perfEntries[0] as PerformanceNavigationTiming).type === "reload";

      // Don't redirect on refresh - stay on the current project page
      // This allows refreshing to keep you on the same project detail page
    }
  }, [navigate, location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!animationsEnabled) {
      setIsVisible(true);
      return;
    }
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [animationsEnabled, slug]);

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

  const cameFromProjects =
    typeof location.state === "object" &&
    location.state !== null &&
    "fromProjects" in location.state;

  if (!project || !projectData || !cameFromProjects) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="relative">
      <div className="flex justify-center pt-4 md:pt-8 lg:pt-10">
        <div
          key={project.slug}
          className={`grid grid-cols-1 md:grid-cols-[1.2fr_1fr] items-start gap-10 lg:gap-16 w-full max-w-6xl lg:max-w-7xl px-4 md:px-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Left side: header and hero */}
          <div className="flex flex-col space-y-3 h-full">
            {/* header */}
            <section className="space-y-1">
              <h1 className="text-lg md:text-xl font-semibold">
                {projectData.title}
              </h1>
              <p className="text-md text-[var(--text-muted)]">
                {projectData.shortSummary}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <Button onClick={() => navigate(-1)} variant="solid">
                  {t.projectDetail.back}
                </Button>
                {project.githubUrl ? (
                  <Button href={project.githubUrl} external>
                    <img src="/github.svg" alt="GitHub" className="w-7 h-7" />
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
            <section className="rounded-2xl border border-[var(--border)] overflow-hidden bg-[rgba(34,34,59,0.06)] shadow-sm max-w-full">
              {mediaItems.length ? (
                <div className="flex flex-col h-full">
                  <div className="relative w-full aspect-video max-h-[260px] bg-black">
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
                      <div className="h-full w-full flex items-center justify-center bg-[rgba(246,246,246,0.35)] p-2">
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
                      <div className="absolute inset-x-0 bottom-2 flex items-center justify-between px-2">
                        <button
                          onClick={() =>
                            setMediaIndex(
                              (prev) =>
                                (prev - 1 + mediaItems.length) %
                                mediaItems.length,
                            )
                          }
                          className="rounded-full bg-black/50 text-white px-3 py-1 text-sm hover:bg-black/70"
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
                          className="rounded-full bg-black/50 text-white px-3 py-1 text-sm hover:bg-black/70"
                          aria-label="Next media"
                        >
                          {t.projectDetail.next}
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {mediaItems.length > 1 ? (
                    <div className="flex gap-1 p-2 overflow-x-auto bg-[rgba(246,246,246,0.55)]">
                      {mediaItems.map((item, index) => (
                        <button
                          key={`${item.type}-${item.src}`}
                          onClick={() => {
                            setMediaIndex(index);
                            setIsLightboxOpen(false);
                            setIsLightboxZoomed(false);
                          }}
                          className={`relative h-14 w-20 overflow-hidden rounded-lg border ${
                            index === mediaIndex
                              ? "border-[var(--text)]"
                              : "border-[var(--border)]"
                          }`}
                          aria-label={`Select media ${index + 1}`}
                        >
                          {item.type === "video" ? (
                            <div className="h-full w-full flex items-center justify-center bg-black text-white text-[10px]">
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
                <div className="relative h-36 md:h-48 w-full">
                  {project.heroImage ? (
                    <img
                      src={project.heroImage}
                      alt={projectData.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs text-[var(--muted)]">
                      Add hero image in /public/projects
                    </div>
                  )}
                </div>
              )}
            </section>

            <div className="space-y-1.5">
              <div className="font-semibold text-md">
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
                className="absolute top-4 right-4 rounded-full bg-black/60 text-white px-3 py-1 text-xs hover:bg-black/80"
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
          <div className="flex flex-col gap-2.5 justify-center h-full">
            <div className="rounded-2xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] p-2.5 shadow-sm">
              <div className="font-semibold text-md">
                {t.projectDetail.overview}
              </div>
              <div className="mt-1.5 text-sm text-[var(--text-muted)] space-y-0.5">
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
                <div className="mt-2">
                  <div className="font-semibold text-sm">
                    {t.projectDetail.note}
                  </div>
                  <ul className="mt-1 list-disc pl-5 text-sm text-[var(--text-muted)] space-y-0.5">
                    {projectData.notes.map((n: string) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] p-2.5 shadow-sm">
              <div className="font-semibold text-md">
                {t.projectDetail.contributions}
              </div>
              <ul className="mt-1 list-disc pl-5 text-sm text-[var(--text-muted)] space-y-0.5">
                {projectData.contributions.map((c: string) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] p-2.5 shadow-sm">
              <div className="font-semibold text-md">
                {t.projectDetail.features}
              </div>
              <ul className="mt-1 list-disc pl-5 text-sm text-[var(--text-muted)] space-y-0.5">
                {projectData.features.map((f: string) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[rgba(246,246,246,0.55)] p-2.5 shadow-sm">
              <div className="font-semibold text-md">
                {t.projectDetail.challenges}
              </div>
              <ul className="mt-1 list-disc pl-5 text-sm text-[var(--text-muted)] space-y-0.5">
                {projectData.challenges.map((ch: string) => (
                  <li key={ch}>{ch}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
