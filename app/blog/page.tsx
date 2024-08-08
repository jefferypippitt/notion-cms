import { BlogCard } from "@/components/blog-card";
import { getAuthorName, getBlogPosts } from "@/utils/blogPost";

export const revalidate = 60; // Revalidate the page every 60 seconds

export default async function BlogHomePage() {
  const posts = await getBlogPosts();

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-20">
        <h1 className="text-3xl font-bold text-center mb-8">Recent Blog Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard
                key={post.id}
                title={(post.properties.Title as any).title[0].plain_text}
                description={(post.properties.Description as any).rich_text[0].plain_text}
                bannerImage={(post.properties.BannerImage as any).url}
                slug={(post.properties.Slug as any).rich_text[0].plain_text}
                author={getAuthorName(post.properties.Author)}
                date={(post.properties.Date as any).date.start}
              />
            ))
          ) : (
            <p className="text-gray-600">No posts found</p>
          )}
        </div>
      </div>
    </section>
  );
}
