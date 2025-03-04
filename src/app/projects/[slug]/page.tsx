import { getAllProjects, getProjectBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import { markdownToHtml } from "@/lib/markdown";

export default async function Project(props: Params) {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  const content = await markdownToHtml(project.content || "");

  return (
    <div>
      <h2>{project.title} ({project.date})</h2>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>

  )
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}
