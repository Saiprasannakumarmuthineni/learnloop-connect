import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";

interface MinimizedPostFormProps {
  content: string;
  isSubmitting: boolean;
  onContentChange: (content: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const MinimizedPostForm = ({
  content,
  isSubmitting,
  onContentChange,
  onSubmit,
}: MinimizedPostFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 p-2">
      <Textarea
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="min-h-[40px] resize-none"
        rows={1}
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={isSubmitting || !content.trim()}
        className="bg-[#93265f] hover:bg-[#cb346c] text-white shrink-0"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </Button>
    </form>
  );
};