interface ChapterHeadingProps {
  number: number
  title: string
}

export function ChapterHeading({ number, title }: ChapterHeadingProps) {
  return (
    <div className="hidden lg:block">
      <p className="font-sans text-[0.78rem] uppercase tracking-[0.22em] text-museum-red">
        {String(number).padStart(2, '0')} / 07
      </p>
      <h2 className="mt-3 font-serif text-[2rem] leading-[1.05] text-museum-black">
        {title}
      </h2>
    </div>
  )
}
