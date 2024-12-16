import { Play, Upload as UploadIcon } from "lucide-react";
import { useState } from "react";

interface UploadViewProps {
  courses: any[];
  resources: any[];
}

export const UploadView = ({ courses, resources }: UploadViewProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("File dropped:", e.dataTransfer.files[0]);
      // Handle file upload logic here
    }
  };

  return (
    <div className="space-y-12">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Content</h2>
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop your video here, or click to select a file
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Recommended Courses
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
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
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Academic Resources
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-xl shadow-sm p-6 card-hover">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <resource.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-gray-500">{resource.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};