import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Globe, Mail, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const SKILLS = [
  'TypeScript', 'React', 'Node.js', 'Next.js',
  'PostgreSQL', 'Docker', 'Tailwind CSS', 'REST APIs',
]

const SOCIALS = [
  { icon: ExternalLink, label: 'GitHub', href: 'https://github.com/lukaszradziak' },
  { icon: Globe, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: '/contact' },
]

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="flex min-h-[calc(100vh-73px)] flex-col justify-center py-24">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Available for new projects
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Hi, I'm{' '}
            <span className="bg-linear-to-r from-primary to-violet-400 bg-clip-text text-transparent">
              Łukasz
            </span>
            <br />
            Full-Stack Developer
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I build fast, scalable web applications with clean code and great user
            experience. Passionate about turning ideas into polished products.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/projects">
                View my work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Skills */}
      <section className="py-20">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Tech stack
        </p>
        <h2 className="mb-8 text-3xl font-bold">What I work with</h2>
        <div className="flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold">Have a project in mind?</h2>
        <p className="mb-8 text-muted-foreground">
          I'm always open to discussing new opportunities and interesting projects.
        </p>
        <Button asChild size="lg">
          <Link to="/contact">
            Let's talk
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </main>
  )
}
