// Server component that emits one or more JSON-LD <script> blocks. Because it
// has no 'use client' directive it renders on the server, so structured data is
// present in the initial HTML that AI crawlers and answer engines parse.
export default function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data]
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is safe to inline; there is no user input here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  )
}
