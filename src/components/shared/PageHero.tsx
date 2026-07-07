interface PageHeroProps {
  title: string;
  caption: string;
}

export function PageHero({ title, caption }: PageHeroProps) {
  return (
    <>
      <h1 className="text-foreground mb-1 text-2xl font-semibold sm:text-3xl">
        {title}
      </h1>
      <p className="text-muted-foreground mb-8 text-sm">{caption}</p>
    </>
  );
}
