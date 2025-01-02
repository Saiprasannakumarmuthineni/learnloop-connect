import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { MinimizedPostForm } from "./MinimizedPostForm";
import { ImageUpload } from "./ImageUpload";

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
      <MinimizedPostForm
        content={quickPostContent}
        isSubmitting={isSubmitting}
        onContentChange={onQuickPostContentChange}
        onSubmit={handleSubmit}
      />
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
      
      <ImageUpload
        onImageSelect={handleImageSelect}
        imagePreview={imagePreview}
        onImageRemove={() => {
          setSelectedImage(null);
          setImagePreview(null);
        }}
      />

      <div className="flex justify-end">
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