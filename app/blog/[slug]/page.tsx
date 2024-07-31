import { getPageContent, getPageBySlug, notionClient } from "@/utils/notion";
import { NotionRenderer } from "@notion-render/client";
import { notFound } from "next/navigation";

// Plugins
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { Post } from "@/components/post";
import { getAuthorName } from "@/utils/blogPost";

export default async function Page({ params }: { params: { slug: string } }) {

  const post = await getPageBySlug(params.slug);

  // Redirect to not found page if post is not found
  if (!post) notFound();

  const content = await getPageContent(post.id);
 

  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  notionRenderer.use(hljsPlugin({}));
  notionRenderer.use(bookmarkPlugin(undefined));
  const html = await notionRenderer.render(...content);
  
  const description = (post.properties.Description as any).rich_text;

  return (
    <Post
      title={(post.properties.Title as any).title[0].plain_text}
      author={getAuthorName(post.properties.Author)}
      date={(post.properties.Date as any).date.start}
      bannerImage={(post.properties.BannerImage as any).url}
      description={description}
      content={html}
    />
  );
}
