import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

interface PostProps {
  title: string;
  bannerImage: string;
  description: string;
  content: string;
  author: string;
  date: string;
}

export function Post({ title, content, bannerImage, author, date }: PostProps) {
  return (
    <article className="w-full mb-12 flex flex-col items-center pt-16 px-4">
      {/* Banner Image */}
      <div className="relative w-full max-w-4xl md:h-80 h-48 mb-10 overflow-hidden rounded-lg shadow-lg">
        <Image
          alt="Blog Image"
          src={bannerImage}
          width={400}
          height={400}
          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Title */}
      <div className="w-full max-w-3xl text-left px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          {title}
        </h1>
      </div>
      {/* Author and Date */}
      <div className="w-full max-w-3xl mb-8 text-left px-2 sm:px-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          By:{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {author}
          </span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Published on:{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {date}
          </span>
        </p>
      </div>

      {/* Back Button */}
      <div className="w-full max-w-3xl mb-6 px-2 sm:px-4 text-left">
        <Link
          href="/blog"
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back
        </Link>
      </div>

      {/* Content */}
      <div
        className="prose sm:prose-lg md:prose-xl dark:prose-invert max-w-3xl leading-relaxed mb-10 px-2 sm:px-4"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </article>
  );
}
