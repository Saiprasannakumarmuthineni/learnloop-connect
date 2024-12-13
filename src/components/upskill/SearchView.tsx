export const SearchView = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Search Resources</h2>
      <input
        type="search"
        placeholder="Search courses, resources, and more..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};