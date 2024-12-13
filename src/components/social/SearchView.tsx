export const SearchView = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Search</h2>
      <input
        type="search"
        placeholder="Search posts, videos, and people..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};