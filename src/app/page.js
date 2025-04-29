import Image from "next/image";
import styles from "./page.module.css";
import PostCard from '../components/PostCard';

export default function Home() {
  return (
    <div>
      <PostCard
        title="Welcome to FSC Threads"
        body="This is our first post. It supports images and styled content!"
        imageUrl="https://via.placeholder.com/600x300"
      />
      <PostCard
        title="Text-only Post"
        body="Here's a post with no image. Everything is looking clean and minimal."
      />
    </div>
  );
}
