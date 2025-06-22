import fs from "fs";
import path from "path";
import matter from "gray-matter";

const newslettersDirectory = path.join(process.cwd(), "content/newsletters");

export interface NewsletterData {
  id: string;
  title: string;
  date: string;
  summary: string;
}

export function getSortedNewslettersData(): NewsletterData[] {
  const fileNames = fs.readdirSync(newslettersDirectory);
  const allNewslettersData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(newslettersDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      return {
        id,
        ...(matterResult.data as {
          title: string;
          date: string;
          summary: string;
        }),
      };
    });

  return allNewslettersData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
} 