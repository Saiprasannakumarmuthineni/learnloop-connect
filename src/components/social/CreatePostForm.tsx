import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Image, Loader2, Send } from "lucide-react";

interface CreatePostFormProps {
  isMinimized: boolean;
  onPostCreated: () => void;
  quickPostContent: string;
  onQuickPostContentChange: (content: string) => void;
}

export const CreatePostForm = ({ 
  isMinimized, 
  onPostCreated, 
  quickPostContent, 
  onQuickPostContentChange 
}: CreatePostFormProps) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('post-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postContent = isMinimized ? quickPostContent : content;
    if (!postContent.trim()) return;

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create a post",
          variant: "destructive",
        });
        return;
      }

      let imageUrl = null;
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const { error } = await supabase
        .from('posts')
        .insert([{ 
          content: postContent, 
          user_id: user.id,
          image_url: imageUrl
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post created successfully",
      });
      
      setContent("");
      setSelectedImage(null);
      setImagePreview(null);
      onQuickPostContentChange("");
      onPostCreated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isMinimized) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2">
        <Textarea
          placeholder="Share your thoughts..."
          value={quickPostContent}
          onChange={(e) => onQuickPostContentChange(e.target.value)}
          className="min-h-[40px] resize-none"
          rows={1}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isSubmitting || !quickPostContent.trim()}
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
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 mb-6 space-y-4">
      <Textarea
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4 min-h-[100px]"
      />
      
      {imagePreview && (
        <div className="relative">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-h-60 rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setSelectedImage(null);
              setImagePreview(null);
            }}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
        />
        
        <Button 
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="text-[#93265f] border-[#93265f] hover:bg-[#93265f] hover:text-white"
        >
          <Image className="w-4 h-4 mr-2" />
          Add Photo
        </Button>

        <Button 
          type="submit" 
          disabled={isSubmitting || !content.trim()}
          className="bg-[#93265f] hover:bg-[#cb346c] text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Posting...
            </>
          ) : (
            "Post"
          )}
        </Button>
      </div>
    </form>
  );
};