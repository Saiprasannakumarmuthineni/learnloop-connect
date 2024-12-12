import { motion } from "framer-motion";
import { BookOpen, Play, Video } from "lucide-react";

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
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Course Materials",
    description: "Access lecture notes and study materials",
    icon: Video,
  },
];

export const UpskillTab = () => {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Recommended Courses
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-medium text-lg text-gray-900 mb-2">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{course.platform}</span>
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Academic Resources
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 card-hover"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <resource.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-gray-500">{resource.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};