import { redirect } from "next/navigation";
import { getBlogs } from "@/lib/blogs";

export default async function BlogPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const blogs = await getBlogs();
  const blog = blogs.find(
    (entry) => `${entry.year}-${entry.month}-${entry.slug}` === slug,
  );

  if (!blog) redirect("/news");

  redirect(blog.path);
}
