import Image from "next/image";

export default function Home() {
  return (
    <div id="about" className="scroll-mt-20 bg-background py-10 lg:py-12">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-start mx-auto max-w-350 px-4 pt-6 pb-6 lg:px-10">
        <div className="w-full">
          <div className="flex justify-center px-4 pb-3">
            <Image
              src="/logo.webp"
              alt="Black Vomit logo"
              width={624}
              height={624}
              className="h-auto w-[31.2rem] object-contain"
              priority
            />
          </div>
          <p className="text-base leading-relaxed p-4 text-foreground">
            Black Vomit is a Croatian artist with a background in art history and
            philosophy, working in both digital and traditional media. She creates
            dark, atmospheric work influenced by horror cinema and extreme metal
            music.
          </p>
        </div>
        <div className="flex items-start justify-center">
          <div className="relative aspect-3/4 w-full max-w-md overflow-hidden shadow-sm">
            <Image
              src="/aboutme.webp"
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
