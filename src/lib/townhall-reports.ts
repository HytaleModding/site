import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import { i18n } from "@/lib/i18n";
import { townHalls, type TownHall } from "@/lib/townhalls";

const reportsPath = join(process.cwd(), "content", "townhalls");
const reportFilenamePattern = /^(\d{4}-\d{2}-\d{2})\.mdx$/;

export interface TownHallReportFrontmatter {
  title: string;
  description: string;
  date: string;
  editedForClarity?: boolean;
  published?: boolean;
}

export interface TownHallReport {
  content: string;
  frontmatter: TownHallReportFrontmatter;
  townHall: TownHall;
}

function reportPath(date: string, locale: string = i18n.defaultLanguage) {
  const prefix = locale === i18n.defaultLanguage ? "" : `/${locale}`;
  return `${prefix}/townhalls/${date}`;
}

function isValidFrontmatter(
  data: unknown,
  filenameDate: string,
): data is TownHallReportFrontmatter {
  if (typeof data !== "object" || data === null) return false;

  const candidate = data as Record<string, unknown>;

  return (
    typeof candidate.title === "string" &&
    typeof candidate.description === "string" &&
    typeof candidate.date === "string" &&
    candidate.date === filenameDate &&
    (candidate.published === undefined ||
      typeof candidate.published === "boolean") &&
    (candidate.editedForClarity === undefined ||
      typeof candidate.editedForClarity === "boolean")
  );
}

async function readReportFile(date: string): Promise<TownHallReport | null> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

  const townHall = townHalls.find((item) => item.id === date);
  if (!townHall) return null;

  try {
    const source = await readFile(join(reportsPath, `${date}.mdx`), "utf-8");
    const { data, content } = matter(source);

    if (!isValidFrontmatter(data, date) || data.published === false) {
      return null;
    }

    return { content, frontmatter: data, townHall };
  } catch {
    return null;
  }
}

export async function getTownHallReport(date: string) {
  return readReportFile(date);
}

export async function getTownHallReports() {
  let files: string[];

  try {
    files = await readdir(reportsPath);
  } catch {
    return [];
  }

  const reports = await Promise.all(
    files.map(async (filename) => {
      const match = filename.match(reportFilenamePattern);
      return match ? readReportFile(match[1]) : null;
    }),
  );

  return reports.filter((report): report is TownHallReport => report !== null);
}

export async function getTownHallsWithReports(locale: string) {
  const reports = await getTownHallReports();
  const reportDates = new Set(reports.map((report) => report.frontmatter.date));

  return townHalls.map((townHall) => ({
    ...townHall,
    reportHref: reportDates.has(townHall.id)
      ? reportPath(townHall.id, locale)
      : townHall.reportHref || undefined,
  }));
}
