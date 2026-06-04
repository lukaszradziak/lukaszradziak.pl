import { ArrowUpRight, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface Project {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  link?: string
  featured?: boolean
}

const PROJECTS: Project[] = [
  {
    slug: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    description:
      'A real-time analytics dashboard for a SaaS product with 10k+ users. Built with Next.js, Recharts, and WebSockets. Reduced data load time by 60% through server-side aggregation.',
    date: '2025-11-10',
    readTime: '5 min read',
    tags: ['Next.js', 'TypeScript', 'WebSockets', 'PostgreSQL'],
    link: 'https://github.com/lukaszradziak',
    featured: true,
  },
  {
    slug: 'api-gateway',
    title: 'Lightweight API Gateway',
    description:
      'Open-source API gateway written in Node.js supporting rate limiting, JWT auth, and request proxying. Used in production by 3 small businesses.',
    date: '2025-08-22',
    readTime: '4 min read',
    tags: ['Node.js', 'Docker', 'Redis', 'REST'],
    link: 'https://github.com/lukaszradziak',
  },
  {
    slug: 'ai-chat-widget',
    title: 'Embeddable AI Chat Widget',
    description:
      'Drop-in React widget that integrates with any LLM API. Configurable themes, conversation history, and streaming support. Under 8 kB gzipped.',
    date: '2025-05-14',
    readTime: '3 min read',
    tags: ['React', 'TypeScript', 'AI', 'Streaming'],
    link: 'https://github.com/lukaszradziak',
  },
  {
    slug: 'e-commerce-platform',
    title: 'Headless E-commerce Platform',
    description:
      'Full e-commerce solution with a headless architecture — separate storefront (Astro) and admin (React). Integrated with Stripe and a custom inventory system.',
    date: '2025-02-03',
    readTime: '7 min read',
    tags: ['Astro', 'React', 'Stripe', 'Node.js'],
  },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

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
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDate(project.date)}</span>
                <span>·</span>
                <Clock className="h-3 w-3" />
                <span>{project.readTime}</span>
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
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDate(project.date)}</span>
                <span>·</span>
                <Clock className="h-3 w-3" />
                <span>{project.readTime}</span>
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
