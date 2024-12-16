import { Search as SearchIcon, Filter } from "lucide-react";
import { useState } from "react";

export const SearchView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["All", "Posts", "Videos", "People"];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="search"
            placeholder="Search posts, videos, and people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2 mt-4 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-500" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter.toLowerCase())}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                activeFilter === filter.toLowerCase()
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {searchTerm && (
          <p className="text-sm text-gray-500 mb-4">
            Showing results for "{searchTerm}"
          </p>
        )}

        {/* Example search results */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <h3 className="font-medium">Sarah Chen</h3>
              <p className="text-sm text-gray-500">Computer Science • 6th Semester</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-medium mb-1">Introduction to Machine Learning</h3>
          <p className="text-sm text-gray-500 mb-2">
            Video Course • Stanford University
          </p>
          <div className="text-xs text-gray-500">1.2k views • 2 weeks ago</div>
        </div>
      </div>
    </div>
  );
};