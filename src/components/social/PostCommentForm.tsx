import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const PostCommentForm = ({ postId }: { postId: number }) => {
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleComment = () => {
    if (!comment.trim()) return;

    // In a real app, this would be an API call
    toast({
      title: "Comment added",
      duration: 1500,
    });

    setComment("");
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93265f]"
      />
      <button
        onClick={handleComment}
        className="px-4 py-2 bg-[#93265f] text-white rounded-lg hover:bg-[#cb346c] transition-colors"
      >
        Post
      </button>
    </div>
  );
};