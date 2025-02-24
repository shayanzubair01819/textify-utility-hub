
import { Twitter, Facebook, Linkedin } from "lucide-react"

export function SocialLinks() {
  return (
    <div className="flex gap-4">
      <a
        href="https://twitter.com/TextTweaker"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Twitter className="h-5 w-5" />
        <span className="sr-only">Twitter</span>
      </a>
      <a
        href="https://facebook.com/TextTweaker"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Facebook className="h-5 w-5" />
        <span className="sr-only">Facebook</span>
      </a>
      <a
        href="https://linkedin.com/company/texttweaker"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Linkedin className="h-5 w-5" />
        <span className="sr-only">LinkedIn</span>
      </a>
    </div>
  )
}
