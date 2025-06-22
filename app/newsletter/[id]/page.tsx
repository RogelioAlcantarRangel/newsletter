import { getNewsletterData, getSortedNewslettersData } from "@/lib/newsletters";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export async function generateStaticParams() {
  const newsletters = getSortedNewslettersData();
  return newsletters.map((newsletter) => ({
    id: newsletter.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { title, summary } = await getNewsletterData(params.id);
  return {
    title: `${title} | Mi Newsletter`,
    description: summary,
  };
}

export default async function NewsletterPage({
  params,
}: {
  params: { id: string };
}) {
  const { title, date, content } = await getNewsletterData(params.id);

  return (
    <div className="flex justify-center p-8 sm:p-12 font-[family-name:var(--font-geist-sans)]">
      <article className="prose prose-neutral dark:prose-invert max-w-4xl">
        <header className="mb-8">
          <Link
            href="/"
            className="text-foreground/80 hover:text-foreground no-underline"
          >
            ‹ Volver a todos los artículos
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-5xl">
            {title}
          </h1>
          <p className="text-foreground/60 mt-2">
            Publicado el{" "}
            {new Date(date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <MDXRemote source={content} />
      </article>
    </div>
  );
} 