import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardContent,
} from "./ui/card";
import { CalendarIcon, UserIcon } from "lucide-react";

interface BlogCardProps {
  title: string;
  description: string;
  bannerImage: string;
  slug: string;
  author: string;
  date: string;
}

export function BlogCard({
  title,
  description,
  bannerImage,
  slug,
  author,
  date,
}: BlogCardProps) {
  const truncatedDescription =
    description.length > 120
      ? description.substring(0, 120) + "..."
      : description;
  
  // Safely format the date, handling potential invalid dates
  const formattedDate = date ? (() => {
    try {
      // First try parsing as ISO string
      return format(parseISO(date), "MMM d, yyyy");
    } catch (e) {
      try {
        // If that fails, try direct Date constructor
        return format(new Date(date), "MMM d, yyyy");
      } catch (e) {
        // If all parsing fails, return the original string or empty
        console.error("Failed to parse date:", date);
        return "";
      }
    }
  })() : "";

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Card className="overflow-hidden border border-border/40 hover:border-border bg-card/50 hover:bg-card transition-all duration-300 h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative h-48 md:h-full md:col-span-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <Image
              src={bannerImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
          
          <CardContent className="p-5 md:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground/90 leading-relaxed mb-4">
                {truncatedDescription}
              </p>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground space-x-4 pt-2 border-t border-border/30">
              <div className="flex items-center">
                <UserIcon className="h-3 w-3 mr-1.5 text-muted-foreground/70" />
                <span>{author}</span>
              </div>
              {formattedDate && (
                <div className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1.5 text-muted-foreground/70" />
                  <span>{formattedDate}</span>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
