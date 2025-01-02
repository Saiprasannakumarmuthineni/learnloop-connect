import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { useRef } from "react";

interface ImageUploadProps {
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  onImageRemove: () => void;
}

export const ImageUpload = ({
  onImageSelect,
  imagePreview,
  onImageRemove,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {imagePreview && (
        <div className="relative">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-h-60 rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={onImageRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageSelect}
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
    </>
  );
};