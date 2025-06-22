import { getSortedNewslettersData } from "@/lib/newsletters";
import Link from "next/link";
import { notFound } from "next/navigation";

// This is a dynamic import that will load the correct MDX file.
// The `webpackInclude` comment is a hint for the bundler.
const getNewsletterComponent = (id: string) =>
  import(
    `../../(content)/newsletters/${id}.mdx` /* webpackInclude: /\.mdx$/ */
  )
    .then((mod) => mod.default)
    .catch(notFound);

export async function generateStaticParams() {
  const newsletters = getSortedNewslettersData();
  return newsletters.map((newsletter) => ({
    id: newsletter.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const NewsletterContent = await getNewsletterComponent(params.id);
  const { frontmatter } = NewsletterContent as any;
  return {
    title: `${frontmatter.title} | Mi Newsletter`,
    description: frontmatter.summary,
  };
}

export default async function NewsletterPage({
  params,
}: {
  params: { id: string };
}) {
  const NewsletterContent = await getNewsletterComponent(params.id);
  const { frontmatter } = NewsletterContent as any;

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
            {frontmatter.title}
          </h1>
          <p className="text-foreground/60 mt-2">
            Publicado el{" "}
            {new Date(frontmatter.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <NewsletterContent />
      </article>
    </div>
  );
} 