import { useQuery } from "@tanstack/react-query";
import { fetchGallery } from "@/api/roomApi";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "./Rooms";

export function Gallery() {
  const { data: images, isLoading } = useQuery({ queryKey: ["gallery"], queryFn: fetchGallery });
  return (
    <section id="gallery" className="py-10 md:py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader eyebrow="Property" title="Gallery" subtitle="A glimpse of Valley Medows and the beauty of Srinagar." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-square" />)
            : images?.map((img, i) => (
                <div key={img.id} className={`group relative overflow-hidden rounded-xl ${i % 5 === 0 ? "row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"}`}>
                  <img src={img.image_url} alt={img.caption || "Gallery image"} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {img.caption && (
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
