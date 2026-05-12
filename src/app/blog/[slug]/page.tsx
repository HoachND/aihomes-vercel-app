import { Metadata } from "next";
import { BlogPost } from "@/app/api/blog/route";
import fs from "fs";
import path from "path";
import { I18nProvider } from "@/context/I18nContext";
import BlogDetailContent from "@/components/BlogDetailContent";

const DATA_FILE = path.join(process.cwd(), "data", "blog-posts.json");

function getPost(slug: string): BlogPost | undefined {
  if (!fs.existsSync(DATA_FILE)) return undefined;
  const posts: BlogPost[] = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  return posts.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPost(resolvedParams.slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.seoTitle || post.titleVi,
    description: post.seoDescription || post.excerptVi,
    openGraph: {
      title: post.seoTitle || post.titleVi,
      description: post.seoDescription || post.excerptVi,
      images: [post.seoImage || "/images/projects/biet-thu-anh-minh/1.jpg"],
      type: "article",
      publishedTime: post.createdAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.titleVi,
      description: post.seoDescription || post.excerptVi,
      images: [post.seoImage || "/images/projects/biet-thu-anh-minh/1.jpg"],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPost(resolvedParams.slug);
  if (!post) return <div>Post not found</div>;

  return (
    <>
      <BlogDetailContent post={post} />
      
      {/* Schema Markup for Google - Expert level SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.titleVi,
            "image": post.seoImage || "/images/projects/biet-thu-anh-minh/1.jpg",
            "author": {
              "@type": "Organization",
              "name": "AI Homes"
            },
            "publisher": {
              "@type": "Organization",
              "name": "AI Homes",
              "logo": {
                "@type": "ImageObject",
                "url": "https://aihomes.vimgroup.vn/images/logo-aihomes.png"
              }
            },
            "datePublished": post.createdAt,
            "description": post.seoDescription || post.excerptVi
          })
        }}
      />
    </>
  );
}
