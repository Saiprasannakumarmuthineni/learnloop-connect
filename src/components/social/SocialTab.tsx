import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, User, Video, Image } from "lucide-react";
import { PostsFeed } from "./PostsFeed";
import { VideosFeed } from "./VideosFeed";
import { SearchView } from "./SearchView";
import { ChatView } from "./ChatView";
import { ProfileView } from "./ProfileView";

export const SocialTab = () => {
  const [activePage, setActivePage] = useState<"posts" | "videos" | "search" | "chat" | "profile">("posts");

  const renderContent = () => {
    switch (activePage) {
      case "posts":
        return <PostsFeed />;
      case "videos":
        return <VideosFeed />;
      case "search":
        return <SearchView />;
      case "chat":
        return <ChatView />;
      case "profile":
        return <ProfileView />;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        key={activePage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="page-transition min-h-[calc(100vh-12rem)]"
      >
        {renderContent()}
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
              <Image className="w-6 h-6" />
              <span className="text-xs">Posts</span>
            </button>
            <button
              onClick={() => setActivePage("videos")}
              className={`flex flex-col items-center space-y-1 ${
                activePage === "videos" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              <Video className="w-6 h-6" />
              <span className="text-xs">Videos</span>
            </button>
            <button
              onClick={() => setActivePage("search")}
              className={`flex flex-col items-center space-y-1 ${
                activePage === "search" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              <Search className="w-6 h-6" />
              <span className="text-xs">Search</span>
            </button>
            <button
              onClick={() => setActivePage("chat")}
              className={`flex flex-col items-center space-y-1 ${
                activePage === "chat" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs">Chat</span>
            </button>
            <button
              onClick={() => setActivePage("profile")}
              className={`flex flex-col items-center space-y-1 ${
                activePage === "profile" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};