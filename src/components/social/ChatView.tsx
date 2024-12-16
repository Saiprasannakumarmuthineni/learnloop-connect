import { Send } from "lucide-react";
import { useState } from "react";

export const ChatView = () => {
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
            <p className="text-sm font-medium mb-1">Sarah Chen</p>
            <p className="text-sm text-gray-700">
              Hey! Did you check out the new Machine Learning course?
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2 justify-end">
          <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
            <p className="text-sm">
              Not yet! Is it the one from Stanford?
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
        </div>
      </div>

      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};