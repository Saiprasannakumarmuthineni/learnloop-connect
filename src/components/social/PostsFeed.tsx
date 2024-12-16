import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const posts = [
  {
    id: 1,
    author: "Sarah Chen",
    content: "Just finished my final project for Advanced Algorithms! Here's what I learned...",
    likes: 24,
    comments: 8,
    time: "2h ago",
  },
  {
    id: 2,
    author: "Alex Kumar",
    content: "Looking for team members for the upcoming hackathon! We're focusing on AI/ML solutions.",
    likes: 45,
    comments: 12,
    time: "4h ago",
  },
];

export const PostsFeed = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const { toast } = useToast();

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const handleShare = (post: typeof posts[0]) => {
    // In a real app, this would open a share dialog or copy to clipboard
    toast({
      title: "Post shared!",
      description: "Link copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6 pb-20">
      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 card-hover"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <h3 className="font-medium text-gray-900">{post.author}</h3>
                <p className="text-sm text-gray-500">{post.time}</p>
              </div>
            </div>
            <p className="text-gray-800 mb-4">{post.content}</p>
            <div className="flex items-center space-x-6 text-gray-500">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 transition-colors ${
                  likedPosts.includes(post.id)
                    ? "text-red-500"
                    : "hover:text-gray-900"
                }`}
              >
                <motion.div
                  animate={likedPosts.includes(post.id) ? { scale: [1, 1.2, 1] } : {}}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedPosts.includes(post.id) ? "fill-current" : ""
                    }`}
                  />
                </motion.div>
                <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
              </motion.button>
              <button className="flex items-center space-x-2 hover:text-gray-900 transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare(post)}
                className="flex items-center space-x-2 hover:text-gray-900 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};