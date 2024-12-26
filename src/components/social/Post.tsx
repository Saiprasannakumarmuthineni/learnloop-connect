import { Heart, MessageSquare, Share2, ThumbsUp, Laugh, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { PostComment } from "./PostComment";
import { PostCommentForm } from "./PostCommentForm";

interface PostProps {
  post: {
    id: number;
    author: string;
    authorId: string;
    avatarUrl: string;
    content: string;
    reactions: {
      like: number;
      love: number;
      laugh: number;
      star: number;
    };
    comments: Array<{
      id: number;
      author: string;
      content: string;
      timestamp: string;
    }>;
    time: string;
  };
}

export const Post = ({ post }: PostProps) => {
  const [expandedPost, setExpandedPost] = useState(false);
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleReaction = (reactionType: string) => {
    setUserReactions(prev => {
      const hasReacted = prev.includes(reactionType);
      if (hasReacted) {
        return prev.filter(r => r !== reactionType);
      } else {
        return [...prev, reactionType];
      }
    });

    toast({
      title: "Reaction updated",
      duration: 1500,
    });
  };

  const handleShare = () => {
    toast({
      title: "Post shared!",
      description: "Link copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
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
              onClick={() => handleReaction(reaction)}
              className={`flex items-center space-x-1 ${
                userReactions.includes(reaction)
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
          onClick={handleShare}
          className="text-[#93265f] hover:text-[#cb346c] transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setExpandedPost(!expandedPost)}
          className="text-[#93265f] hover:text-[#cb346c] flex items-center space-x-2"
        >
          <MessageSquare className="w-5 h-5" />
          <span>{post.comments.length} comments</span>
        </button>

        {expandedPost && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {post.comments.map((comment) => (
              <PostComment key={comment.id} comment={comment} />
            ))}
            <PostCommentForm postId={post.id} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};