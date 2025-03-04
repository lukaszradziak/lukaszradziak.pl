import { getAllProjects } from "@/lib/api";
import Link from "next/link";

export default function Projects() {
  const allProjects = getAllProjects();

  return (
    <div className="flex flex-col justify-center">
      {allProjects.map((project, index) => (
        <Link key={index} href={`/projects/${project.slug}`}>{project.title}</Link>
      ))}
    </div>
  )
}
