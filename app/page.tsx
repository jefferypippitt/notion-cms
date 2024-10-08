import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-20">
        <h1 className="text-3xl font-bold text-center">Notion Blog Demo</h1>
        <p className="leading-7 mt-6 text-center">
          Welcome to my Notion Blog Demo! Integrate Notion as a CMS for your
          blog using Next.js. My goal is to create a seamless experience for
          writing and managing blog posts directly from Notion. It uses images,
          description, author, date, Shadcn/UI, light and dark mode enabled.
          Added blog cards with read more links.
        </p>
        <p className="leading-7 mt-6 text-center font-semibold">
          2024 Version Easy Setup
        </p>
        <div className="flex flex-col md:flex-row mt-6 space-x-0 md:space-x-4 space-y-4 md:space-y-0 justify-center items-center">
          <div className="relative w-3/4 md:w-1/4 h-48 rounded-lg overflow-hidden shadow-lg border">
            <Image
              src="/logos/next-logo.jpg"
              alt="Next.js logo"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <Plus className="text-4xl mt-4 md:mt-0" />
          <div className="relative w-3/4 md:w-1/4 h-48 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/logos/notion-logo.jpg"
              alt="Notion logo"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/blog">
            <Button>Visit Blog</Button>
          </Link>
        </div>
        <div className="mt-10 flex justify-center items-center space-x-2">
          <p className="text-lg font-semibold">Special thanks to:</p>
          <div className="flex space-x-2">
            <Link
              href="https://github.com/ipenywis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              iPenywis
            </Link>
            <span>,&nbsp;</span>
            <Link
              href="https://github.com/tuanphungcz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              tuanphungcz
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
