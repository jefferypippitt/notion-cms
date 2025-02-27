import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import { CalendarIcon, UserIcon } from "lucide-react";

interface PostProps {
  title: string;
  bannerImage: string;
  description: string;
  content: string;
  author: string;
  date: string;
}

export function Post({ title, content, bannerImage, author, date }: PostProps) {
  // Safely format the date, handling potential invalid dates
  const formattedDate = date ? (() => {
    try {
      // First try parsing as ISO string
      return format(parseISO(date), "MMMM d, yyyy");
    } catch (e) {
      try {
        // If that fails, try direct Date constructor
        return format(new Date(date), "MMMM d, yyyy");
      } catch (e) {
        // If all parsing fails, return the original string or empty
        return "";
      }
    }
  })() : "";

  return (
    <article className="w-full mb-8 flex flex-col pt-6">
      {/* Back Button */}
      <div className="mb-4 text-left">
        <Link
          href="/"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5 mr-1.5" />
          Back to all posts
        </Link>
      </div>

      {/* Banner Image */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 mb-6 overflow-hidden rounded-md">
        <Image
          alt={title}
          src={bannerImage}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          priority
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground leading-tight">
        {title}
      </h1>

      {/* Author and Date */}
      <div className="flex items-center text-xs text-muted-foreground space-x-4 mb-6">
        <div className="flex items-center">
          <UserIcon className="h-3.5 w-3.5 mr-1" />
          <span>{author}</span>
        </div>
        {formattedDate && (
          <div className="flex items-center">
            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="prose prose-sm max-w-none dark:prose-invert
          prose-p:text-sm prose-p:leading-relaxed prose-p:my-3
          prose-headings:font-medium prose-headings:tracking-tight
          prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-md prose-img:my-4
          prose-ul:my-3 prose-ol:my-3 prose-li:my-1
          prose-code:text-xs prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:bg-muted
          prose-pre:bg-muted prose-pre:text-xs prose-pre:p-3 prose-pre:rounded-md
          prose-blockquote:text-sm prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:border-l-2 prose-blockquote:pl-4 prose-blockquote:text-muted-foreground
          [&_.video-container]:my-6 [&_.video-container]:rounded-md [&_.video-container]:overflow-hidden [&_.video-container]:shadow-md"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </article>
  );
}
