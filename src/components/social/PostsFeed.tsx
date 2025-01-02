import { AnimatePresence, motion } from "framer-motion";
import { Post } from "./Post";
import { CreatePostForm } from "./CreatePostForm";
import { useState, useEffect } from "react";
import { ChevronUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: 1,
    author: "Sarah Chen",
    authorId: "sarah-chen",
    avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    content: "Just finished my final project for Advanced Algorithms! Here's what I learned about optimizing graph traversal algorithms and their real-world applications in network routing. #ComputerScience #Algorithms",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
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
  const [isMinimized, setIsMinimized] = useState(true);
  const [quickPostContent, setQuickPostContent] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = window.innerHeight * 0.4; // 40% of viewport height
      setIsScrolled(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePostCreated = () => {
    setRefreshKey(prev => prev + 1);
    setQuickPostContent("");
    setShowCreatePost(true);
  };

  return (
    <div className="relative min-h-screen pb-32">
      <div className="space-y-6 mb-24">
        <AnimatePresence>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </AnimatePresence>
      </div>
      
      {isScrolled && !showCreatePost && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed bottom-24 right-4 z-50"
        >
          <Button
            size="icon"
            className="rounded-full w-12 h-12 bg-[#93265f] hover:bg-[#cb346c] text-white shadow-lg"
            onClick={() => setShowCreatePost(true)}
          >
            <Send className="w-6 h-6" />
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-16 left-0 right-0 bg-white border-t shadow-lg z-40"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-end py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (isScrolled) {
                      setShowCreatePost(false);
                    } else {
                      setIsMinimized(!isMinimized);
                    }
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ChevronUp className={`w-5 h-5 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
                </Button>
              </div>
              
              {isMinimized ? (
                <div className="mb-4">
                  <CreatePostForm 
                    isMinimized={true} 
                    onPostCreated={handlePostCreated}
                    quickPostContent={quickPostContent}
                    onQuickPostContentChange={setQuickPostContent}
                  />
                </div>
              ) : (
                <div className="py-4">
                  <CreatePostForm 
                    isMinimized={false} 
                    onPostCreated={handlePostCreated}
                    quickPostContent={quickPostContent}
                    onQuickPostContentChange={setQuickPostContent}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};