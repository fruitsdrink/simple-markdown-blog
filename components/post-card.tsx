import { dummyPosts } from "@/dummy-post";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type DumpPostType = typeof dummyPosts;

type Props = {
  post: DumpPostType[number];
};
export const PostCard = ({ post }: Props) => {
  const likeLoading = false;
  const liked = true;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author.image} />
            <AvatarFallback>{post.author.name.charAt(0) ?? "A"}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="text-sm font-medium">{post.author.name}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <CardTitle className="text-xl">
          <Link href={`/posts/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="flex items-center space-x-4">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex items-center space-x-1"
        >
          <Heart
            className={cn("h-4 w-4", {
              "animate-pulse": likeLoading,
              "fill-red-500 text-red-500": liked,
            })}
          />
          <span>10</span>
        </Button>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex items-center space-x-1"
        >
          <MessageCircle className="h-4 w-4" />
          <span>10</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
