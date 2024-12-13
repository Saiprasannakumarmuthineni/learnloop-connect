export const ProfileView = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-200" />
          <div>
            <h3 className="font-medium text-lg">John Doe</h3>
            <p className="text-gray-500">Computer Science Engineering</p>
          </div>
        </div>
      </div>
    </div>
  );
};