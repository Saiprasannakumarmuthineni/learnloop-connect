import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Share2, ThumbsUp, Laugh, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

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
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [userReactions, setUserReactions] = useState<Record<number, string[]>>({});
  const [newComments, setNewComments] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const handleReaction = (postId: number, reactionType: string) => {
    setUserReactions(prev => {
      const postReactions = prev[postId] || [];
      const hasReacted = postReactions.includes(reactionType);
      
      if (hasReacted) {
        return {
          ...prev,
          [postId]: postReactions.filter(r => r !== reactionType)
        };
      } else {
        return {
          ...prev,
          [postId]: [...postReactions, reactionType]
        };
      }
    });

    toast({
      title: "Reaction updated",
      duration: 1500,
    });
  };

  const handleComment = (postId: number) => {
    if (!newComments[postId]?.trim()) return;

    // In a real app, this would be an API call
    toast({
      title: "Comment added",
      duration: 1500,
    });

    setNewComments(prev => ({
      ...prev,
      [postId]: ""
    }));
  };

  const handleShare = (post: typeof posts[0]) => {
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
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.avatarUrl} />
                <AvatarFallback className="bg-[#240a46] text-white">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-[#240a46]">{post.author}</h3>
                <p className="text-sm text-[#5b1852]">{post.time}</p>
              </div>
            </div>

            <p className="text-[#240a46] mb-4">{post.content}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-4">
                {['like', 'love', 'laugh', 'star'].map((reaction) => (
                  <button
                    key={reaction}
                    onClick={() => handleReaction(post.id, reaction)}
                    className={`flex items-center space-x-1 ${
                      userReactions[post.id]?.includes(reaction)
                        ? 'text-[#cb346c]'
                        : 'text-[#93265f] hover:text-[#cb346c]'
                    }`}
                  >
                    {reaction === 'like' && <ThumbsUp className="w-5 h-5" />}
                    {reaction === 'love' && <Heart className="w-5 h-5" />}
                    {reaction === 'laugh' && <Laugh className="w-5 h-5" />}
                    {reaction === 'star' && <Star className="w-5 h-5" />}
                    <span>{post.reactions[reaction as keyof typeof post.reactions]}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleShare(post)}
                className="text-[#93265f] hover:text-[#cb346c] transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                className="text-[#93265f] hover:text-[#cb346c] flex items-center space-x-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{post.comments.length} comments</span>
              </button>

              {expandedPost === post.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="bg-[#fcfcfc] p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-[#240a46]">{comment.author}</span>
                        <span className="text-sm text-[#5b1852]">{comment.timestamp}</span>
                      </div>
                      <p className="text-[#240a46]">{comment.content}</p>
                    </div>
                  ))}

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newComments[post.id] || ""}
                      onChange={(e) => setNewComments(prev => ({
                        ...prev,
                        [post.id]: e.target.value
                      }))}
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93265f]"
                    />
                    <button
                      onClick={() => handleComment(post.id)}
                      className="px-4 py-2 bg-[#93265f] text-white rounded-lg hover:bg-[#cb346c] transition-colors"
                    >
                      Post
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};