import { BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const NotificationBell = () => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "No new notifications",
      description: "Check back later for updates",
    });
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-gray-100"
        onClick={handleClick}
      >
        <BellRing className="h-6 w-6 text-gray-600 hover:text-gray-800 transition-colors" />
      </Button>
    </div>
  );
};