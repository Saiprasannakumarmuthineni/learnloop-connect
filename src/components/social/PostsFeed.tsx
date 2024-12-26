import { AnimatePresence } from "framer-motion";
import { Post } from "./Post";
import { CreatePostForm } from "./CreatePostForm";
import { useState } from "react";

const posts = [
  {
    id: 1,
    author: "Sarah Chen",
    authorId: "sarah-chen",
    avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    content: "Just finished my final project for Advanced Algorithms! Here's what I learned about optimizing graph traversal algorithms and their real-world applications in network routing. #ComputerScience #Algorithms",
    reactions: {
      like: 24,
      love: 15,
      laugh: 8,
      star: 12
    },
    comments: [
      {
        id: 1,
        author: "John Doe",
        content: "Amazing work! Would love to hear more about the implementation details.",
        timestamp: "1h ago"
      }
    ],
    time: "2h ago",
  },
  {
    id: 2,
    author: "Alex Kumar",
    authorId: "alex-kumar",
    avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    content: "Looking for team members for the upcoming hackathon! We're focusing on AI/ML solutions for sustainable energy management. DM if interested! 🚀 #Hackathon #AI #Sustainability",
    reactions: {
      like: 45,
      love: 22,
      laugh: 5,
      star: 18
    },
    comments: [],
    time: "4h ago",
  },
  {
    id: 3,
    author: "Emily Zhang",
    authorId: "emily-zhang",
    avatarUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    content: "Just published my research paper on 'Deep Learning Applications in Renewable Energy Systems' in the International Journal of Engineering Innovation. Check it out! 📚 #Research #DeepLearning #RenewableEnergy",
    reactions: {
      like: 67,
      love: 34,
      laugh: 2,
      star: 28
    },
    comments: [
      {
        id: 2,
        author: "David Wilson",
        content: "Congratulations! This is groundbreaking work.",
        timestamp: "30m ago"
      }
    ],
    time: "6h ago",
  },
  {
    id: 4,
    author: "Michael Rodriguez",
    authorId: "michael-rodriguez",
    avatarUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    content: "Our robotics team just won first place in the Regional Robotics Competition! Proud of everyone's hard work and dedication. Here's our winning robot in action! 🤖 #Robotics #Engineering #Competition",
    reactions: {
      like: 89,
      love: 56,
      laugh: 3,
      star: 42
    },
    comments: [
      {
        id: 3,
        author: "Lisa Chen",
        content: "The robot's movement precision is incredible!",
        timestamp: "15m ago"
      }
    ],
    time: "1d ago",
  },
  {
    id: 5,
    author: "Priya Patel",
    authorId: "priya-patel",
    avatarUrl: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    content: "Excited to announce that we're organizing a series of workshops on 'Web Development Best Practices' next month. Topics include React, TypeScript, and Modern CSS. Sign up link in bio! 💻 #WebDev #Workshop #Learning",
    reactions: {
      like: 34,
      love: 18,
      laugh: 0,
      star: 15
    },
    comments: [],
    time: "1d ago",
  }
];

export const PostsFeed = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6 pb-20">
      <CreatePostForm onPostCreated={handlePostCreated} />
      <AnimatePresence>
        {posts.map((post, index) => (
          <Post key={post.id} post={post} />
        ))}
      </AnimatePresence>
    </div>
  );
};
