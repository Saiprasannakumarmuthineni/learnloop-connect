import { Send } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

export const ChatView = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Chen",
      text: "Hey! Did you check out the new Machine Learning course?",
      isSent: false,
    },
    {
      id: 2,
      sender: "Me",
      text: "Not yet! Is it the one from Stanford?",
      isSent: true,
    },
  ]);
  const { toast } = useToast();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "Me",
        text: message,
        isSent: true,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      toast({
        description: "Message sent successfully!",
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-start space-x-2 ${
                msg.isSent ? "justify-end" : ""
              }`}
            >
              {!msg.isSent && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  msg.isSent
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {!msg.isSent && (
                  <p className="text-sm font-medium mb-1">{msg.sender}</p>
                )}
                <p className="text-sm">{msg.text}</p>
              </div>
              {msg.isSent && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
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
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </div>
  );
};