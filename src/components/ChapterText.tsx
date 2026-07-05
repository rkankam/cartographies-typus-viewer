interface ChapterTextProps {
  text: string
  microNote: string
}

export function ChapterText({ text, microNote }: ChapterTextProps) {
  const paragraphs = text.split('\n\n')

  return (
    <div className="space-y-6">
      <div className="space-y-4 font-serif text-[1rem] leading-[1.62] text-museum-black lg:text-[1.08rem]">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="font-serif text-[0.98rem] leading-[1.55] text-museum-dark-grey lg:text-[1rem]">
        <span className="mr-2 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-museum-grey">✦</span>
        {microNote}
      </p>
    </div>
  )
}
