import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Share2, ThumbsUp, SmilePlus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Reaction {
  type: "like" | "love" | "laugh" | "wow";
  count: number;
}

interface Video {
  id: number;
  author: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: string;
  reactions: Reaction[];
  time: string;
}

const initialVideos: Video[] = [
  {
    id: 1,
    author: "Tech Club",
    title: "Introduction to Machine Learning Workshop",
    thumbnail: "https://picsum.photos/400/225",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "1.2k",
    reactions: [
      { type: "like", count: 156 },
      { type: "love", count: 42 },
      { type: "laugh", count: 23 },
      { type: "wow", count: 15 }
    ],
    time: "1 day ago",
  },
  {
    id: 2,
    author: "Engineering Society",
    title: "Campus Tour & Lab Facilities Showcase",
    thumbnail: "https://picsum.photos/400/225",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "843",
    reactions: [
      { type: "like", count: 92 },
      { type: "love", count: 28 },
      { type: "laugh", count: 12 },
      { type: "wow", count: 8 }
    ],
    time: "3 days ago",
  },
];

export const VideosFeed = () => {
  const [videos, setVideos] = useState(initialVideos);
  const [showReactions, setShowReactions] = useState<number | null>(null);
  const { toast } = useToast();

  const handleReaction = (videoId: number, reactionType: Reaction["type"]) => {
    setVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.id === videoId) {
          const updatedReactions = video.reactions.map(reaction =>
            reaction.type === reactionType
              ? { ...reaction, count: reaction.count + 1 }
              : reaction
          );
          return { ...video, reactions: updatedReactions };
        }
        return video;
      })
    );

    toast({
      title: "Reaction added!",
      description: `You reacted with ${reactionType} to the video`,
      duration: 2000,
    });
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
            className="bg-[#fcfcfc] rounded-xl shadow-sm overflow-hidden card-hover"
          >
            <div className="relative aspect-video w-full">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 bg-gradient-to-r from-[#240a46] to-[#93265f]">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#5b1852]" />
                <div>
                  <h3 className="font-medium text-[#fcfcfc]">{video.author}</h3>
                  <p className="text-sm text-[#fcfcfc]/70">{video.time}</p>
                </div>
              </div>
              <h4 className="font-medium text-lg text-[#fcfcfc] mb-4">
                {video.title}
              </h4>
              <div className="flex items-center justify-between text-[#fcfcfc]">
                <span className="text-sm">{video.views} views</span>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowReactions(showReactions === video.id ? null : video.id)}
                      className="flex items-center space-x-2 hover:text-[#cb346c] transition-colors"
                    >
                      <SmilePlus className="w-5 h-5" />
                      <span>React</span>
                    </button>
                    {showReactions === video.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute bottom-full left-0 mb-2 p-2 bg-[#fcfcfc] rounded-lg shadow-lg flex space-x-2"
                      >
                        {video.reactions.map(reaction => (
                          <button
                            key={reaction.type}
                            onClick={() => handleReaction(video.id, reaction.type)}
                            className="flex flex-col items-center p-2 hover:bg-[#5b1852]/10 rounded-lg transition-colors"
                          >
                            <span className="text-xl mb-1">
                              {reaction.type === "like" ? "👍" :
                               reaction.type === "love" ? "❤️" :
                               reaction.type === "laugh" ? "😄" : "😮"}
                            </span>
                            <span className="text-xs text-[#240a46]">{reaction.count}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <button className="flex items-center space-x-2 hover:text-[#cb346c] transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};