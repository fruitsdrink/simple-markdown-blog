"use client";

import { AuthButton } from "@/components/auth-button";
import { Post, PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { dummyPosts } from "@/dummy-post";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data as Post[]);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={"/"} className="text-2xl font-bold">
            Simple Blog
          </Link>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Button asChild>
                <Link href={"/admin/create"}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  new Post
                </Link>
              </Button>
            )}

            <AuthButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Simple Blog</h1>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              quidem aliquid tempore, minima repudiandae modi magnam expedita,
              atque veritatis voluptas cum doloribus harum officia asperiores
              nobis praesentium assumenda recusandae reiciendis!
            </p>
          </div>

          {loading ? (
            <div className="text-center">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No posts yet. {isAdmin && "Create your first post!"}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
