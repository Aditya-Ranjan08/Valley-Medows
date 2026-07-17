import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomsAdmin } from "@/components/admin/RoomsAdmin";
import { GalleryAdmin } from "@/components/admin/GalleryAdmin";
import { LeadsAdmin } from "@/components/admin/LeadsAdmin";
import { AlertTriangle } from "lucide-react";

export default function Admin() {
  useEffect(() => {
    document.title = "Admin — Valley Medows";
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-serif text-xl text-primary">Valley Medows</Link>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Admin</span>
          </div>
          <Button asChild variant="outline" size="sm"><Link to="/">Back to site</Link></Button>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-border bg-card p-4">
          <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">Admin panel is read-only</p>
            <p className="text-muted-foreground">The backend has been removed. Rooms and gallery content is now edited directly in the codebase (<code>src/lib/data.ts</code>). This panel is preserved for reference only — changes here will not be saved.</p>
          </div>
        </div>
        <Tabs defaultValue="leads">
          <TabsList>
            <TabsTrigger value="leads">Bookings</TabsTrigger>
            <TabsTrigger value="rooms">Rooms & Pricing</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
          <TabsContent value="leads" className="mt-6"><LeadsAdmin /></TabsContent>
          <TabsContent value="rooms" className="mt-6"><RoomsAdmin /></TabsContent>
          <TabsContent value="gallery" className="mt-6"><GalleryAdmin /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}