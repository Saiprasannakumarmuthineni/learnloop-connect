import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Upload, User } from "lucide-react";
import { UploadView } from "./UploadView";
import { SearchView } from "./SearchView";
import { ProfileView } from "./ProfileView";

const courses = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    platform: "Udemy",
    duration: "20 hours",
    level: "Intermediate",
    thumbnail: "https://picsum.photos/400/225",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    platform: "Pluralsight",
    duration: "40 hours",
    level: "Beginner",
    thumbnail: "https://picsum.photos/400/225",
  },
];

const resources = [
  {
    id: 1,
    title: "Academic Calendar",
    description: "Important dates and deadlines for the semester",
    icon: "BookOpen",
  },
  {
    id: 2,
    title: "Course Materials",
    description: "Access lecture notes and study materials",
    icon: "Video",
  },
];

export const UpskillTab = () => {
  const [activePage, setActivePage] = useState<"upload" | "search" | "profile">("upload");

  const renderContent = () => {
    switch (activePage) {
      case "upload":
        return <UploadView courses={courses} resources={resources} />;
      case "search":
        return <SearchView />;
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
              onClick={() => setActivePage("upload")}
              className={`flex flex-col items-center space-y-1 ${
                activePage === "upload" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              <Upload className="w-6 h-6" />
              <span className="text-xs">Upload</span>
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
