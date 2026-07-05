export function Header() {
  return (
    <header className="border-b border-museum-border bg-museum-bg/95 backdrop-blur-sm px-6 py-4 lg:min-h-[73px] lg:px-20 lg:py-0 flex items-center">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4">
          <a href="https://collection-leskowicz-modules.pages.dev" className="font-sans text-[10px] uppercase tracking-[0.2em] text-museum-grey hover:text-museum-black transition-colors">{'<'} Modules</a>
        </div>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-museum-grey">
          Pour Collection Leskowicz
        </p>
      </div>
    </header>
  )
}
