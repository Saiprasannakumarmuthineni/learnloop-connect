import { motion } from "framer-motion";
import { Heart, MessageSquare, Share2 } from "lucide-react";

const videos = [
  {
    id: 1,
    author: "Tech Club",
    title: "Introduction to Machine Learning Workshop",
    thumbnail: "https://picsum.photos/400/225",
    views: "1.2k",
    likes: 156,
    time: "1 day ago",
  },
  {
    id: 2,
    author: "Engineering Society",
    title: "Campus Tour & Lab Facilities Showcase",
    thumbnail: "https://picsum.photos/400/225",
    views: "843",
    likes: 92,
    time: "3 days ago",
  },
];

export const VideosFeed = () => {
  return (
    <div className="space-y-6 pb-20">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <h3 className="font-medium text-gray-900">{video.author}</h3>
                <p className="text-sm text-gray-500">{video.time}</p>
              </div>
            </div>
            <h4 className="font-medium text-lg text-gray-900 mb-2">
              {video.title}
            </h4>
            <div className="flex items-center space-x-6 text-gray-500">
              <span className="text-sm">{video.views} views</span>
              <button className="flex items-center space-x-2 hover:text-gray-900 transition-colors">
                <Heart className="w-5 h-5" />
                <span>{video.likes}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-gray-900 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};