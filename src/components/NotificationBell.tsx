import { BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type Notification = {
  id: number;
  title: string;
  description: string;
  timestamp: string;
};

export const NotificationBell = () => {
  const { toast } = useToast();
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Comment",
      description: "Sarah Chen commented on your post",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      title: "New Like",
      description: "Alex Thompson liked your video",
      timestamp: "5 minutes ago",
    },
    {
      id: 3,
      title: "Course Update",
      description: "New content available in React Advanced course",
      timestamp: "1 hour ago",
    },
  ]);

  const handleClick = () => {
    if (notifications.length === 0) {
      toast({
        title: "No new notifications",
        description: "Check back later for updates",
      });
      return;
    }

    // Show the most recent notification
    const latestNotification = notifications[0];
    toast({
      title: latestNotification.title,
      description: (
        <div className="flex flex-col gap-1">
          <p>{latestNotification.description}</p>
          <p className="text-xs text-gray-500">{latestNotification.timestamp}</p>
        </div>
      ),
    });

    // Show additional notifications with a slight delay
    notifications.slice(1).forEach((notification, index) => {
      setTimeout(() => {
        toast({
          title: notification.title,
          description: (
            <div className="flex flex-col gap-1">
              <p>{notification.description}</p>
              <p className="text-xs text-gray-500">{notification.timestamp}</p>
            </div>
          ),
        });
      }, (index + 1) * 1000); // Show each notification 1 second apart
    });
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-gray-100 relative"
        onClick={handleClick}
      >
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
        <BellRing className="h-6 w-6 text-gray-600 hover:text-gray-800 transition-colors" />
      </Button>
    </div>
  );
};