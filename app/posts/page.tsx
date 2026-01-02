import { getAllPosts, type PostMeta } from "@/src/lib/posts";
import PostsClient from "./PostsClient";

export default async function PostsPage() {
  let posts: PostMeta[] = [];
  try {
    posts = getAllPosts();
  } catch (error) {
    console.error("Error loading posts:", error);
    posts = [];
  }

  return <PostsClient posts={posts} />;
}

