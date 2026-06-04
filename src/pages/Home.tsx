import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <p>Welcome to my website.</p>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button variant="outline">Button</Button>
        <Button variant="outline" size="icon" aria-label="Submit">
          <ArrowUpIcon />
        </Button>
      </div>
    </main>
  )
}
