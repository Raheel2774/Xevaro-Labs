import Link from 'next/link'
import type { Block } from '@/lib/blog'

// Parse a small inline subset, **bold** and [label](/path or url), into React
// nodes. Server component: the rendered prose is in the initial HTML.
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-[#5D001E]/90">{m[1]}</strong>,
      )
    } else {
      const label = m[2]
      const href = m[3]
      nodes.push(
        href.startsWith('/') ? (
          <Link key={key++} href={href} className="text-[#EE4C7C] underline-offset-2 hover:underline">{label}</Link>
        ) : (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="text-[#EE4C7C] underline-offset-2 hover:underline">{label}</a>
        ),
      )
    }
    last = regex.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mt-10 space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return <h2 key={i} className="pt-6 font-display text-2xl font-semibold text-[#5D001E]/90 md:text-3xl">{renderInline(b.text)}</h2>
          case 'h3':
            return <h3 key={i} className="pt-2 font-display text-lg font-semibold text-[#5D001E]/85 md:text-xl">{renderInline(b.text)}</h3>
          case 'p':
            return <p key={i} className="text-[15px] leading-relaxed text-[#5D001E]/65 md:text-base">{renderInline(b.text)}</p>
          case 'ul':
            return (
              <ul key={i} className="ml-5 list-disc space-y-2 text-[15px] leading-relaxed text-[#5D001E]/65 marker:text-[#EE4C7C] md:text-base">
                {b.items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
              </ul>
            )
          case 'quote':
            return <blockquote key={i} className="border-l-2 border-[#EE4C7C]/50 pl-4 italic text-[#5D001E]/75">{renderInline(b.text)}</blockquote>
        }
      })}
    </div>
  )
}
