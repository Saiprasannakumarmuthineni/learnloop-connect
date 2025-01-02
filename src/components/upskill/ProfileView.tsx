import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

export const ProfileView = () => {
  const skills = [
    { name: "Data Structures", level: 75 },
    { name: "Web Development", level: 85 },
    { name: "Machine Learning", level: 45 },
    { name: "Database Management", level: 60 }
  ];

  // Calculate overall level as average of all skill levels
  const overallLevel = Math.round(
    skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length
  );

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

        <div className="mt-8 flex flex-col items-center">
          <h4 className="font-medium mb-6">Overall Skill Level</h4>
          <Dialog>
            <DialogTrigger>
              <motion.div 
                className="relative w-32 h-32 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeDasharray={`${overallLevel * 2.89}, 289`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold text-primary">
                    {overallLevel}
                  </span>
                  <span className="text-sm text-gray-500">Level</span>
                </div>
              </motion.div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detailed Skill Levels</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Level</span>
                        <span className="text-sm font-semibold text-primary">{skill.level}</span>
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};