import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BookOpen, Users } from "lucide-react";

interface TabLayoutProps {
  socialContent: React.ReactNode;
  upskillContent: React.ReactNode;
}

export const TabLayout = ({ socialContent, upskillContent }: TabLayoutProps) => {
  const [activeTab, setActiveTab] = useState<"social" | "upskill">("social");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab("social")}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200",
                activeTab === "social"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Users className="w-5 h-5" />
              <span>Social</span>
            </button>
            <button
              onClick={() => setActiveTab("upskill")}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200",
                activeTab === "upskill"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <BookOpen className="w-5 h-5" />
              <span>Upskill</span>
            </button>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="tab-content"
        >
          {activeTab === "social" ? socialContent : upskillContent}
        </motion.div>
      </div>
    </div>
  );
};