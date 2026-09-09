import { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { BlogPost } from "./BlogPost";

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(blogDir)) return [];
  const slugs = fs.readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
  return slugs.map((slug) => ({ slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogDir = path.join(process.cwd(), "content", "blog");
  const filePath = path.join(blogDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return { title: "Post Not Found" };
  }
  
  const content = fs.readFileSync(filePath, "utf-8");
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
    const descMatch = frontmatter.match(/description:\s*"([^"]+)"/);
    const dateMatch = frontmatter.match(/date:\s*"([^"]+)"/);
    const categoryMatch = frontmatter.match(/category:\s*"([^"]+)"/);
    
    return {
      title: titleMatch ? `${titleMatch[1]} | SMK Web Design` : "Post | SMK Web Design",
      description: descMatch ? descMatch[1] : "SMK Web Design blog post",
      openGraph: {
        title: titleMatch ? titleMatch[1] : "Post",
        description: descMatch ? descMatch[1] : "SMK Web Design blog post",
        type: "article",
        publishedTime: dateMatch ? dateMatch[1] : undefined,
        tags: categoryMatch ? [categoryMatch[1]] : [],
      },
    };
  }
  
  return { title: "Post | SMK Web Design" };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blogDir = path.join(process.cwd(), "content", "blog");
  const filePath = path.join(blogDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  const content = fs.readFileSync(filePath, "utf-8");
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const body = content.replace(/^---\n[\s\S]*?\n---/, "").trim();
  
  let frontmatter = {
    title: slug,
    date: "",
    category: "Blog",
    readTime: "5 min read",
  };
  
  if (frontmatterMatch) {
    const fm = frontmatterMatch[1];
    const titleMatch = fm.match(/title:\s*"([^"]+)"/);
    const dateMatch = fm.match(/date:\s*"([^"]+)"/);
    const categoryMatch = fm.match(/category:\s*"([^"]+)"/);
    const readTimeMatch = fm.match(/readTime:\s*"([^"]+)"/);
    
    frontmatter = {
      title: titleMatch ? titleMatch[1] : slug,
      date: dateMatch ? dateMatch[1] : "",
      category: categoryMatch ? categoryMatch[1] : "Blog",
      readTime: readTimeMatch ? readTimeMatch[1] : "5 min read",
    };
  }
  
  // Compile MDX at build time for static export
  const { content: mdxContent } = await compileMDX({
    source: body,
    components: {},
    options: { parseFrontmatter: false },
  });
  
  return <BlogPost frontmatter={frontmatter} mdxContent={mdxContent} />;
}