export default function Tag({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border-2 border-[var(--border)] bg-[rgba(246,246,246,0.55)] px-2.5 py-1 text-sm text-[var(--muted)] transition hover:-translate-y-0.5 hover:shadow-sm">
      {text}
    </span>
  );
}
