export function Header() {
  return (
    <header className="border-b border-museum-border bg-museum-bg/95 backdrop-blur-sm px-6 py-4 lg:h-14 lg:px-12 lg:py-0">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 lg:h-full">
        <div className="flex items-center gap-4">
          <a href="https://cartographies-book.pages.dev" className="font-sans text-[10px] uppercase tracking-[0.2em] text-museum-grey hover:text-museum-black transition-colors">← Modules</a>
          <p className="font-serif text-[1.15rem] leading-none text-museum-black lg:text-[1.25rem]">
            Typus Orbis Terrarum
          </p>
        </div>
        <p className="font-sans text-[0.72rem] uppercase tracking-[0.18em] text-museum-grey">
          Ortelius, 1570
        </p>
      </div>
    </header>
  )
}
