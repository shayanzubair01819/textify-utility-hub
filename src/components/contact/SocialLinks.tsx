
import { Twitter, Facebook, Linkedin } from "lucide-react"

export function SocialLinks() {
  return (
    <section className="text-center py-8">
      <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
      <p className="text-muted-foreground mb-6">
        Follow us on social media for updates, new tools, and text formatting
        tips!
      </p>
      <div className="flex justify-center gap-6">
        <a
          href="https://twitter.com/TextTweaker"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Twitter className="h-6 w-6" />
          <span className="sr-only">Twitter</span>
        </a>
        <a
          href="https://facebook.com/TextTweaker"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Facebook className="h-6 w-6" />
          <span className="sr-only">Facebook</span>
        </a>
        <a
          href="https://linkedin.com/company/texttweaker"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Linkedin className="h-6 w-6" />
          <span className="sr-only">LinkedIn</span>
        </a>
      </div>
    </section>
  )
}
