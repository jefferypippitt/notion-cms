import { getPageContent, getPageBySlug, notionClient } from "@/utils/notion";
import { NotionRenderer } from "@notion-render/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Plugins
import hljsPlugin from "@notion-render/hljs-plugin";
import { Post } from "@/components/post";
import { getAuthorName } from "@/utils/blogPost";

// Function to process YouTube embeds and handle video blocks
function processContent(html: string, blocks: any[]): string {
  // First, look for video blocks in the original Notion blocks
  blocks.forEach(block => {
    if (block.type === 'video') {
      // Extract the video URL from the block
      const videoUrl = block.video?.external?.url || '';
      if (!videoUrl) {
        return;
      }
      
      // Extract YouTube video ID
      let videoId = "";
      
      // Handle youtube.com URLs
      if (videoUrl.includes("youtube.com/watch")) {
        try {
          const urlObj = new URL(videoUrl);
          videoId = urlObj.searchParams.get("v") || "";
        } catch (e) {
          // Failed to parse URL
        }
      } 
      // Handle youtu.be URLs
      else if (videoUrl.includes("youtu.be")) {
        const parts = videoUrl.split("/");
        videoId = parts[parts.length - 1] || "";
      }
      // Handle youtube.com/embed URLs
      else if (videoUrl.includes("youtube.com/embed")) {
        const parts = videoUrl.split("/");
        videoId = parts[parts.length - 1] || "";
      }

      if (!videoId) {
        return;
      }

      // Create the iframe HTML
      const iframeHtml = `
        <div class="video-container">
          <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `;
      
      // Look for the error message about missing renderer
      const errorPattern = new RegExp(`<div[^>]*?id="${block.id}"[^>]*?>There is no renderer for block video</div>`, 'g');
      const originalHtml = html;
      html = html.replace(errorPattern, iframeHtml);
      
      // If we didn't find the exact error message with ID, try a more general approach
      if (originalHtml === html) {
        const generalErrorPattern = /There is no renderer for block video/g;
        html = html.replace(generalErrorPattern, () => {
          return iframeHtml;
        });
      }
      
      // If still not replaced, try to find the block by ID
      if (originalHtml === html) {
        const blockIdPattern = new RegExp(`<div[^>]*?id="${block.id}"[^>]*?>.*?</div>`, 'gs');
        html = html.replace(blockIdPattern, () => {
          return iframeHtml;
        });
      }
      
      // If still not replaced, insert after the last paragraph
      if (originalHtml === html) {
        // Find the last paragraph or div in the HTML
        const lastParagraphIndex = Math.max(
          html.lastIndexOf('</p>'),
          html.lastIndexOf('</div>')
        );
        
        if (lastParagraphIndex !== -1) {
          // Insert after the last paragraph or div
          html = html.substring(0, lastParagraphIndex + 4) + 
                 iframeHtml + 
                 html.substring(lastParagraphIndex + 4);
        } else {
          // If no paragraphs or divs found, just append to the end
          html += iframeHtml;
        }
      }
    }
  });
  
  // Find all video embeds in the HTML - using a simpler regex approach
  const videoPattern = /<figure class="[^"]*?block-video[^"]*?">([\s\S]*?)<\/figure>/g;
  const linkPattern = /<a[^>]*?href="([^"]*?)"[^>]*?>/;
  
  // Also look for direct YouTube links in the content
  const directYouTubePattern = /@https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g;
  
  // Replace direct YouTube links
  html = html.replace(directYouTubePattern, (match, videoId) => {
    return `
      <div class="video-container">
        <iframe 
          src="https://www.youtube.com/embed/${videoId}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
    `;
  });
  
  // Process embedded videos
  html = html.replace(videoPattern, (match) => {
    // Extract the URL from the match
    const linkMatch = match.match(linkPattern);
    if (!linkMatch || !linkMatch[1]) {
      return match; // Return original if no URL found
    }
    
    const url = linkMatch[1];
    
    // Extract YouTube video ID
    let videoId = "";
    
    // Handle youtube.com URLs
    if (url.includes("youtube.com/watch")) {
      try {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get("v") || "";
      } catch (e) {
        // Failed to parse URL
      }
    } 
    // Handle youtu.be URLs
    else if (url.includes("youtu.be")) {
      const parts = url.split("/");
      videoId = parts[parts.length - 1] || "";
    }
    // Handle youtube.com/embed URLs
    else if (url.includes("youtube.com/embed")) {
      const parts = url.split("/");
      videoId = parts[parts.length - 1] || "";
    }

    if (!videoId) {
      return `<p><a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a></p>`;
    }

    // Create responsive wrapper for the iframe
    return `
      <div class="video-container">
        <iframe 
          src="https://www.youtube.com/embed/${videoId}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
    `;
  });
  
  return html;
}

export const revalidate = 60; // Revalidate the page every 60 seconds

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPageBySlug(slug);
  
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPageBySlug(slug);

  // Redirect to not found page if post is not found
  if (!post) notFound();

  const content = await getPageContent(post.id);
 
  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  // Add syntax highlighting plugin
  notionRenderer.use(hljsPlugin({}));
  
  // Render the content
  let html = await notionRenderer.render(...content);
  
  // Process YouTube embeds and handle video blocks
  html = processContent(html, content);
  
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
