import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label"; // Importing Label from ShadcnUI

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
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  return (
    <div className="w-full max-w-xs p-4"> {/* Responsive width */}
      <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between rounded-lg overflow-hidden"> {/* Full height, rounded corners */}
        <CardHeader>
          <div className="relative w-full h-40"> {/* Fixed image container height */}
            <Image
              src={bannerImage}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col justify-between flex-grow p-4"> {/* Consistent padding */}
          <div className="flex-grow">
            <CardTitle className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</CardTitle> {/* Modern font size */}
            <CardDescription className="mb-4">
              <Label className="text-sm text-gray-500 block">
                By: {author}
              </Label>
              <Label className="text-sm text-gray-500 block">
                {date}
              </Label>
            </CardDescription>
            <CardDescription className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3"> {/* Limit description height */}
              {truncatedDescription}
            </CardDescription>
          </div>
          <div className="mt-2">
            <Link
              href={`/blog/${slug}`}
              className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
            >
              Read More
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
