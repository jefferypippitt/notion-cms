import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from '@radix-ui/react-icons';

interface PostProps {
  title: string;
  bannerImage: string;
  description: string;
  content: string;
  author: string;
  date: string;
}

export function Post({
  title,
  content,
  bannerImage,
  author,
  date,
}: PostProps) {
  return (
    <article className="w-full mb-10 flex flex-col items-center pt-20 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      <div className="flex flex-col items-start mb-4">
        <p className="text-md text-gray-600 dark:text-gray-400">
          Created by: {author}
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Published on: {date}
        </p>
      </div>
      <div className="relative w-96 h-60 mb-8">
        <Image
          alt="Blog Image"
          src={bannerImage}
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full max-w-3xl mb-4">
        <Link href="/blog" className="flex items-center text-blue-500 hover:underline">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back
        </Link>
      </div>
      <div
        className="prose prose-lg dark:prose-invert max-w-3xl leading-8 content-container"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </article>
  );
}
