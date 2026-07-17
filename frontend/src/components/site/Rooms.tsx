import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Users, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchRooms, type Room } from "@/api/roomApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function Rooms() {
  const { data: rooms, isLoading } = useQuery({ queryKey: ["rooms"], queryFn: fetchRooms });
  const perks = ["Complimentary breakfast", "Free Wi-Fi", "Daily housekeeping", "Airport pickup on request"];
  return (
    <section id="rooms" className="py-10 md:py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          eyebrow="Stay & Tariffs"
          title="Our Rooms & Pricing"
          subtitle="Comfortable, thoughtfully designed rooms with simple, all-inclusive per-night rates."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[28rem]" />)
            : rooms?.map((r) => (
                <article key={r.id} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 flex flex-col">
                  <RoomSlider room={r} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-2xl">{r.name}</h3>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground"><Users className="w-4 h-4" />{r.capacity}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{r.description}</p>
                    <div className="flex items-baseline gap-1 mb-5">
                      <span className="text-primary text-2xl font-semibold">₹{Number(r.price_per_night).toLocaleString("en-IN")}</span>
                      <span className="text-muted-foreground text-sm">/ night</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {perks.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{p}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-auto">
                      <a href="#book">Book this room</a>
                    </Button>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}

function RoomSlider({ room }: { room: Room }) {
  const images = room.images?.length ? room.images : room.image_url ? [room.image_url] : [];
  const [idx, setIdx] = useState(0);
  if (images.length === 0) return <div className="aspect-[4/3] bg-muted" />;
  const go = (delta: number) => setIdx((i) => (i + delta + images.length) % images.length);
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      {images.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt={`${room.name} ${i + 1}`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 hover:bg-background text-foreground flex items-center justify-center shadow-card backdrop-blur transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 hover:bg-background text-foreground flex items-center justify-center shadow-card backdrop-blur transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-1.5 bg-background/70"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="uppercase tracking-[0.25em] text-xs text-primary font-medium mb-3">{eyebrow}</p>
      <h2 className="font-serif text-4xl md:text-5xl mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
