export function Card({
  title,
  desc,
  cta,
  subtle,
}: {
  title: string;
  desc: string;
  cta?: string;
  subtle?: boolean;
}) {
  return (
    <div
      className={
        "rounded-2xl border p-5 shadow-sm " +
        (subtle
          ? "border-slate-800 bg-slate-950"
          : "border-slate-400 bg-slate-400")
      }
    >
      <div className="text-sm font-semibold">{title}</div>
        <p
        className={
            "mt-1 text-xs leading-relaxed " +
            (subtle ? "text-slate-300" : "text-slate-900")
        }
        >
        {desc}
        </p>

        {cta}
    </div>
  );
}