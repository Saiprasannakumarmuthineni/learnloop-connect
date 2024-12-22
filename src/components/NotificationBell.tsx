import { BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Notification = {
  id: number;
  title: string;
  description: string;
  timestamp: string;
};

export const NotificationBell = () => {
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

  return (
    <div className="fixed top-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100 relative"
          >
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
            <BellRing className="h-6 w-6 text-gray-600 hover:text-gray-800 transition-colors" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-4">
            {notifications.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No new notifications
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex flex-col gap-1 p-4 rounded-lg bg-muted/50"
                >
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </p>
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};