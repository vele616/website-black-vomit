import Image from "next/image";

export default function Home() {
  return (
    <div id="about" className="scroll-mt-20 bg-background py-10 lg:py-12">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-end mx-auto max-w-350 px-4 pt-6 pb-12 lg:px-10">
        <div className="w-full">
          <p className="text-base leading-relaxed p-4 text-foreground">
            I am a Croatian artist with a background in art history and
            philosophy, working in both digital and traditional media. I create
            dark, atmospheric work influenced by horror cinema and extreme metal
            music.
          </p>
        </div>
        <div className="flex items-start justify-center">
          <div className="relative aspect-3/4 w-full max-w-md overflow-hidden rounded-3xl shadow-sm">
            <Image
              src="/aboutme.jpg"
              alt="artist"
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
