import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";

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
}: BlogCardProps) {
  const truncatedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  return (
    <div className="w-full max-w-sm p-2"> 
      <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between rounded-lg overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full h-32"> 
            <Image
              src={bannerImage}
              alt={title}            
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col justify-between flex-grow p-3"> 
          <div className="flex-grow">
            <CardTitle className="text-lg font-semibold mb-1">
              {title}
            </CardTitle>
            <CardDescription className="mb-2">
              <Label className="text-muted-foreground">
                By: {author}
              </Label>
            </CardDescription>
            <CardDescription className="mb-2">
              {truncatedDescription}
            </CardDescription>
          </div>
          <div className="mt-1">
            <Link
              href={`/blog/${slug}`}
              className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200 text-sm"
            >
              Read More
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
