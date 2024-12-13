export const ProfileView = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Academic Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-200" />
          <div>
            <h3 className="font-medium text-lg">John Doe</h3>
            <p className="text-gray-500">Computer Science Engineering</p>
            <p className="text-sm text-gray-500">Semester 6</p>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="font-medium mb-2">Academic Progress</h4>
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-600">Current CGPA: 8.5</p>
          </div>
        </div>
      </div>
    </div>
  );
};