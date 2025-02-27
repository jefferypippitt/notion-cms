import { getPageContent, getPageBySlug, notionClient } from "@/utils/notion";
import { NotionRenderer } from "@notion-render/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Plugins
import hljsPlugin from "@notion-render/hljs-plugin";
import { Post } from "@/components/post";
import { getAuthorName } from "@/utils/blogPost";

export const revalidate = 60; // Revalidate the page every 60 seconds

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPageBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    };
  }
  
  const title = (post.properties.Title as any).title[0].plain_text;
  const description = (post.properties.Description as any).rich_text[0].plain_text;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [(post.properties.BannerImage as any).url],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPageBySlug(params.slug);

  // Redirect to not found page if post is not found
  if (!post) notFound();

  const content = await getPageContent(post.id);
 
  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  notionRenderer.use(hljsPlugin({}));
  const html = await notionRenderer.render(...content);
  
  const description = (post.properties.Description as any).rich_text;
  const dateValue = (post.properties.Date as any).date?.start || '';

  return (
    <Post
      title={(post.properties.Title as any).title[0].plain_text}
      author={getAuthorName(post.properties.Author)}
      date={dateValue}
      bannerImage={(post.properties.BannerImage as any).url}
      description={description}
      content={html}
    />
  );
}
