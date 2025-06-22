import Link from "next/link";
import { getSortedNewslettersData } from "@/lib/newsletters";

export default function Home() {
  const allNewslettersData = getSortedNewslettersData();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center row-start-1">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Mi Newsletter
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Un viaje por el mundo de la tecnología y el desarrollo.
        </p>
      </header>

      <main className="w-full max-w-4xl row-start-2 flex flex-col gap-8">
        {allNewslettersData.map(({ id, date, title, summary }) => (
          <article
            key={id}
            className="p-6 rounded-xl border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-black/[.05] dark:hover:bg-white/[.06] group"
          >
            <Link href={`/newsletter/${id}`} className="block">
              <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <h2 className="text-2xl font-bold group-hover:text-foreground">
                  {title}
                </h2>
                <time
                  dateTime={date}
                  className="text-sm text-foreground/60 mt-1 sm:mt-0"
                >
                  {new Date(date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </header>
              <p className="text-foreground/80">{summary}</p>
            </Link>
          </article>
        ))}
      </main>

      <footer className="row-start-3">
        <p className="text-sm text-foreground/60">
          © {new Date().getFullYear()} Mi Newsletter. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}
