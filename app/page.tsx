import { BlogCard } from "@/components/blog-card";
import { getAuthorName, getBlogPosts } from "@/utils/blogPost";

export const revalidate = 60; // Revalidate the page every 60 seconds

export default async function HomePage() {
  const posts = await getBlogPosts();
  
  // Add a title to the page
  return (
    <section className="py-10">
      <div className="mx-auto">
        <h1 className="text-2xl font-semibold mb-8 pb-2 border-b border-border/40">Welcome</h1>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post) => {
              const dateValue = (post.properties.Date as any).date?.start || '';
              
              return (
                <BlogCard
                  key={post.id}
                  title={(post.properties.Title as any).title[0].plain_text}
                  description={(post.properties.Description as any).rich_text[0].plain_text}
                  bannerImage={(post.properties.BannerImage as any).url}
                  slug={(post.properties.Slug as any).rich_text[0].plain_text}
                  author={getAuthorName(post.properties.Author)}
                  date={dateValue}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-2">No posts found</p>
            <p className="text-xs text-muted-foreground/70">Check back soon for new content</p>
          </div>
        )}
      </div>
    </section>
  );
}
