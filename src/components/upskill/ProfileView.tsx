import { Progress } from "@/components/ui/progress";

export const ProfileView = () => {
  const skills = [
    { name: "Data Structures", level: 75 },
    { name: "Web Development", level: 85 },
    { name: "Machine Learning", level: 45 },
    { name: "Database Management", level: 60 }
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Academic Profile</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-200" />
          <div>
            <h3 className="font-medium text-lg">John Doe</h3>
            <p className="text-gray-500">Computer Science Engineering</p>
            <p className="text-sm text-gray-500">Semester 6</p>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-medium mb-4">Academic Progress</h4>
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Current CGPA: 8.5</p>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-medium mb-4">Skill Levels</h4>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};