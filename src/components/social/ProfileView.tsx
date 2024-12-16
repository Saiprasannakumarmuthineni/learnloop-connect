import { Book, Briefcase, GraduationCap, Mail } from "lucide-react";

export const ProfileView = () => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200" />
          <div>
            <h3 className="font-medium text-xl">John Doe</h3>
            <p className="text-gray-500">Computer Science Engineering</p>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <Mail className="w-4 h-4 mr-1" />
              john.doe@college.edu
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-t pt-4">
            <h4 className="font-medium text-lg mb-3 flex items-center">
              <Book className="w-5 h-5 mr-2" />
              Academic Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Semester</p>
                <p className="font-medium">6th Semester</p>
              </div>
              <div>
                <p className="text-gray-500">CGPA</p>
                <p className="font-medium">8.5</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-lg mb-3 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Python", "Java", "Web Development", "Machine Learning"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-lg mb-3 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Achievements
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Dean's List - Fall 2023</li>
              <li>• First Place - College Hackathon 2023</li>
              <li>• Technical Club Lead</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};