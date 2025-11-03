import { dummyPosts } from "@/dummy-post";

type DumpPostType = typeof dummyPosts;

type Props = {
  post: DumpPostType[number];
};
export const PostCard = ({ post }: Props) => {
  return <h1>{post.title}</h1>;
};
