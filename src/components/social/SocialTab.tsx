import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Video } from "lucide-react";
import { PostsFeed } from "./PostsFeed";
import { VideosFeed } from "./VideosFeed";

export const SocialTab = () => {
  const [activePage, setActivePage] = useState<"posts" | "videos">("posts");

  return (
    <div className="space-y-6">
      <motion.div
        key={activePage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="page-transition"
      >
        {activePage === "posts" ? <PostsFeed /> : <VideosFeed />}
      </motion.div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-4">
            <button
              onClick={() => setActivePage("posts")}
              className={`flex flex-col items-center space-y-1 ${
                activePage === "posts" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm">Posts</span>
            </button>
            <button
              onClick={() => setActivePage("videos")}
              className={`flex flex-col items-center space-y-1 ${
                activePage === "videos" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              <Video className="w-6 h-6" />
              <span className="text-sm">Videos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};