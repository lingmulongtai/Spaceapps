import TranslationWidget from "@/components/TranslationWidget";
import useTranslations from "@/hooks/useTranslations";

export function ResourcePanel() {
  const t = useTranslations("resourcePanel");

  return (
    <section className="grid gap-4 rounded-2xl border border-dashed border-slate-300 bg-white/80 p-5 text-sm text-slate-600 shadow-inner dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {t.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>
        <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {t.statusChip}
        </span>
      </header>

      <ul className="grid gap-2">
        {t.items.map((item) => (
          <li key={item.title} className="rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
            <strong className="font-semibold text-slate-900 dark:text-slate-100">
              {item.title}
            </strong>
            <div>{item.description}</div>
          </li>
        ))}
      </ul>

      <TranslationWidget />

      <div className="rounded-xl border border-slate-300 border-dashed bg-white/40 p-3 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
        {t.footer}
      </div>
    </section>
  );
}

export default ResourcePanel;

