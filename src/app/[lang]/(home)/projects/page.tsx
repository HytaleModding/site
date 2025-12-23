import { ExternalLinkIcon } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitInfoButton } from "@/components/git-info-button";
import Image from "next/image";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

type Project = {
  slug: string;
  title: string;
  description: string;
  banner?: string;
  logo?: string;
};

async function getProjects(): Promise<Project[]> {
    const projectsPath = join(process.cwd(), "content", "projects");

    try {
        const files = await readdir(projectsPath);
        const mdxFiles = files.filter((file) => file.endsWith(".mdx") && file !== "example.mdx");

        const projects = await Promise.all(
            mdxFiles.map(async (file) => {
                const slug = file.replace(/\.mdx$/, "");
                const filePath = join(projectsPath, file);
                const source = await readFile(filePath, "utf-8");
                const { data } = matter(source);

                return {
                    slug,
                    title: data.title || slug,
                    description: data.description || "",
                    banner: data.banner,
                    logo: data.logo,
                };
            })
        );

        return projects;
    } catch (error) {
        console.error("Error reading projects:", error);
        return [];
    }
}

export default async function ProjectsPage({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const projects = await getProjects();

  return (
    <div className="relative flex flex-1 overflow-hidden">
      <GitInfoButton />
      <Spotlight />
      <div className="container mx-auto flex flex-1 flex-col items-center gap-8 px-12 py-8 lg:flex-row lg:justify-between lg:py-0">
        <div className="max-w-5xl w-full space-y-6 max-lg:max-w-lg max-lg:py-32">
          <h1 className="text-4xl font-semibold text-balance">Projects</h1>
          <h2 className="text-muted-foreground text-lg text-balance">
            Explore community projects.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/${lang}/projects/${project.slug}`}
                className="group rounded-xl border border-fd-border bg-fd-card hover:bg-fd-accent transition-all hover:shadow-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-fd-primary"
              >
                <div className="relative h-40 w-full">
                  {project.banner ? (
                    <Image
                      src={project.banner}
                      alt={`${project.title} banner`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3 flex items-center gap-3">
                    {project.logo && (
                      <div className="relative h-10 w-10 shrink-0">
                        <Image
                          src={project.logo}
                          alt={`${project.title} logo`}
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-white font-medium truncate">{project.title}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {project.description}
                  </p>
                  <div className="pt-2">
                    <Button variant="secondary" size="sm" className="group/btn">
                      <span className="mr-2">View more</span>
                      <ExternalLinkIcon className="h-4 w-4 opacity-70 group-hover/btn:opacity-100" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}