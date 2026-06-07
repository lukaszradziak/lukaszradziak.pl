import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PROJECTS } from '../data/projects'

export default function Projects() {
  const featured = PROJECTS.filter((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured)

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Portfolio
        </p>
        <h1 className="mb-4 text-4xl font-bold">Projects</h1>
        <p className="max-w-xl text-muted-foreground">
          A selection of things I've built — side projects, open-source tools, and
          client work. Each entry is a short write-up of what I made and why.
        </p>
      </div>

      {/* Featured */}
      {featured.map((project) => (
        <div key={project.slug} className="mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
            Featured project
          </p>
          <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
            <div className="h-1 w-full bg-linear-to-r from-primary to-violet-400" />
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold leading-tight">{project.title}</h2>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Open project"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{project.description}</p>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}

      <Separator className="mb-12" />

      {/* Rest */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project) => (
          <Card
            key={project.slug}
            className="group flex flex-col transition-shadow hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold leading-snug">{project.title}</h2>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Open project"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
