import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="fixed bottom-24 right-4 z-50"
    >
      <Button
        size="icon"
        className="rounded-full w-12 h-12 bg-[#93265f] hover:bg-[#cb346c] text-white shadow-lg"
        onClick={onClick}
      >
        <Send className="w-6 h-6" />
      </Button>
    </motion.div>
  );
};