import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Share2, ThumbsUp, Laugh, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Reaction {
  type: 'like' | 'love' | 'laugh' | 'star';
  count: number;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

const videos = [
  {
    id: 1,
    author: "Tech Club",
    title: "Introduction to Machine Learning Workshop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://picsum.photos/400/225",
    views: "1.2k",
    reactions: {
      like: 156,
      love: 89,
      laugh: 45,
      star: 23
    },
    comments: [
      {
        id: 1,
        author: "John Doe",
        content: "Great explanation!",
        timestamp: "2h ago"
      }
    ],
    time: "1 day ago",
  },
  {
    id: 2,
    author: "Engineering Society",
    title: "Campus Tour & Lab Facilities Showcase",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://picsum.photos/400/225",
    views: "843",
    reactions: {
      like: 92,
      love: 45,
      laugh: 12,
      star: 8
    },
    comments: [],
    time: "3 days ago",
  },
];

export const VideosFeed = () => {
  const [expandedVideo, setExpandedVideo] = useState<number | null>(null);
  const [userReactions, setUserReactions] = useState<Record<number, string[]>>({});
  const [newComments, setNewComments] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const handleReaction = (videoId: number, reactionType: string) => {
    setUserReactions(prev => {
      const videoReactions = prev[videoId] || [];
      const hasReacted = videoReactions.includes(reactionType);
      
      if (hasReacted) {
        return {
          ...prev,
          [videoId]: videoReactions.filter(r => r !== reactionType)
        };
      } else {
        return {
          ...prev,
          [videoId]: [...videoReactions, reactionType]
        };
      }
    });

    toast({
      title: hasReacted ? "Reaction removed" : "Reaction added",
      duration: 1500,
    });
  };

  const handleComment = (videoId: number) => {
    if (!newComments[videoId]?.trim()) return;

    const comment = {
      id: Date.now(),
      author: "Current User",
      content: newComments[videoId],
      timestamp: "Just now"
    };

    // In a real app, this would be an API call
    toast({
      title: "Comment added",
      duration: 1500,
    });

    setNewComments(prev => ({
      ...prev,
      [videoId]: ""
    }));
  };

  return (
    <div className="space-y-6 pb-20">
      <AnimatePresence>
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
          >
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </AspectRatio>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#240a46]" />
                <div>
                  <h3 className="font-medium text-[#240a46]">{video.author}</h3>
                  <p className="text-sm text-[#5b1852]">{video.time}</p>
                </div>
              </div>

              <h4 className="font-medium text-lg text-[#240a46] mb-4">
                {video.title}
              </h4>

              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4">
                  {['like', 'love', 'laugh', 'star'].map((reaction) => (
                    <button
                      key={reaction}
                      onClick={() => handleReaction(video.id, reaction)}
                      className={`flex items-center space-x-1 ${
                        userReactions[video.id]?.includes(reaction)
                          ? 'text-[#cb346c]'
                          : 'text-[#93265f] hover:text-[#cb346c]'
                      }`}
                    >
                      {reaction === 'like' && <ThumbsUp className="w-5 h-5" />}
                      {reaction === 'love' && <Heart className="w-5 h-5" />}
                      {reaction === 'laugh' && <Laugh className="w-5 h-5" />}
                      {reaction === 'star' && <Star className="w-5 h-5" />}
                      <span>{video.reactions[reaction as keyof typeof video.reactions]}</span>
                    </button>
                  ))}
                </div>
                <span className="text-sm text-[#5b1852]">{video.views} views</span>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setExpandedVideo(expandedVideo === video.id ? null : video.id)}
                  className="text-[#93265f] hover:text-[#cb346c] flex items-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{video.comments.length} comments</span>
                </button>

                {expandedVideo === video.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {video.comments.map((comment) => (
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
                        value={newComments[video.id] || ""}
                        onChange={(e) => setNewComments(prev => ({
                          ...prev,
                          [video.id]: e.target.value
                        }))}
                        placeholder="Add a comment..."
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93265f]"
                      />
                      <button
                        onClick={() => handleComment(video.id)}
                        className="px-4 py-2 bg-[#93265f] text-white rounded-lg hover:bg-[#cb346c] transition-colors"
                      >
                        Post
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};