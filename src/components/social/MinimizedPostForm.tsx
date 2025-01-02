import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";

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
  const [showImageUpload, setShowImageUpload] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex items-center gap-2 p-2">
        <Textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="min-h-[40px] resize-none"
          rows={1}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowImageUpload(!showImageUpload)}
          className="shrink-0"
        >
          <Image className="w-4 h-4" />
        </Button>
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
      </div>
      
      {showImageUpload && (
        <div className="px-2">
          <ImageUpload
            onImageSelect={() => {}}
            imagePreview={null}
            onImageRemove={() => {}}
          />
        </div>
      )}
    </form>
  );
};