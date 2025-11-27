import Link from "next/link";
import { buildTrendReport, TrendTheme } from "@/lib/trendAgent";

export const dynamic = "force-dynamic";

function formatDate(timestamp?: string) {
  if (!timestamp) return "Fresh intel";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(timestamp));
  } catch {
    return "Fresh intel";
  }
}

function ThemeCard({ theme }: { theme: TrendTheme }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold capitalize tracking-tight text-zinc-900">
          {theme.name}
        </h2>
        <div className="flex flex-wrap gap-2 text-xs uppercase text-zinc-500">
          {theme.keywords.slice(0, 4).map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-700"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <p className="mb-8 text-base leading-relaxed text-zinc-600">
        {theme.summary}
      </p>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Fuel For Posts
          </h3>
          <ul className="space-y-5">
            {theme.socialPosts.map((post) => (
              <li
                key={`${theme.name}-${post.platform}`}
                className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-zinc-400">
                    {post.platform}
                  </span>
                  <span className="text-xs text-zinc-400">CTA: {post.cta}</span>
                </div>
                <h4 className="mb-2 text-lg font-medium text-zinc-900">
                  {post.hook}
                </h4>
                <p className="text-sm leading-6 text-zinc-600">{post.body}</p>
                <div className="mt-4 text-xs text-zinc-500">
                  {post.assets.join(" · ")}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Poster Concepts
          </h3>
          <ul className="space-y-5">
            {theme.posterConcepts.map((poster) => (
              <li
                key={`${theme.name}-${poster.title}`}
                className="flex flex-col gap-3 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm"
              >
                <div>
                  <h4 className="text-base font-semibold text-zinc-900">
                    {poster.title}
                  </h4>
                  <p className="text-xs uppercase tracking-wide text-zinc-400">
                    {poster.mood}
                  </p>
                </div>
                <p className="text-sm leading-6 text-zinc-600">
                  {poster.layout}
                </p>
                <p className="text-xs font-medium uppercase text-zinc-400">
                  Palette
                </p>
                <div className="flex gap-2">
                  {poster.palette.map((hex) => (
                    <span
                      key={hex}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                      style={{ backgroundColor: hex }}
                    >
                      {hex.replace("#", "")}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium text-emerald-700">
                  {poster.callToAction}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Source Pulse
        </h3>
        <div className="flex flex-wrap gap-3">
          {theme.supportingContent.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              href={item.url}
              target="_blank"
              className="group flex w-full flex-col rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/80 md:w-auto md:max-w-xs"
            >
              <span className="text-[11px] uppercase tracking-wide text-zinc-400">
                {item.source} · {formatDate(item.publishedAt)}
              </span>
              <span className="mt-2 text-sm font-semibold text-zinc-900 group-hover:text-emerald-700">
                {item.title}
              </span>
              <span className="mt-1 text-xs text-zinc-500">
                {item.excerpt}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const report = await buildTrendReport();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-slate-50 to-amber-100 pb-24 font-sans">
      <header className="mx-auto max-w-6xl px-6 pt-20 pb-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-10 shadow-lg">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,#34d39933,transparent_60%)] md:block" />
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-xs font-medium uppercase tracking-wide text-emerald-700">
              Interior Trend Intelligence
            </span>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-5xl">
              Agentic studio feed for what&apos;s trending in interiors right
              now.
            </h1>
            <p className="text-lg text-zinc-600 md:text-xl">
              Live-sourced intel from design publications and communities,
              translated into ready-to-post social copy and art direction for
              your next campaign.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
              <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 font-medium text-emerald-700">
                {report.themes.length} active trend pulses
              </span>
              <span className="text-zinc-400">
                Generated {new Date(report.generatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-6">
        {report.themes.map((theme) => (
          <ThemeCard key={theme.name} theme={theme} />
        ))}
      </main>
    </div>
  );
}
