import { Book, Briefcase, GraduationCap, Mail, LogOut, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const ProfileView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/login");
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', user.id);

      if (updateError) throw updateError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);

      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback className="bg-[#240a46] text-white text-xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg cursor-pointer group-hover:scale-110 transition-transform">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
                <Upload className="w-4 h-4 text-gray-600" />
              </label>
            </div>
            <div>
              <h3 className="font-medium text-xl">John Doe</h3>
              <p className="text-gray-500">Computer Science Engineering</p>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <Mail className="w-4 h-4 mr-1" />
                john.doe@college.edu
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="text-[#93265f] hover:text-[#cb346c]"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="space-y-6">
          <div className="border-t pt-4">
            <h4 className="font-medium text-lg mb-3 flex items-center">
              <Book className="w-5 h-5 mr-2" />
              Academic Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Semester</p>
                <p className="font-medium">6th Semester</p>
              </div>
              <div>
                <p className="text-gray-500">CGPA</p>
                <p className="font-medium">8.5</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-lg mb-3 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Python", "Java", "Web Development", "Machine Learning"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-lg mb-3 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Achievements
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Dean's List - Fall 2023</li>
              <li>• First Place - College Hackathon 2023</li>
              <li>• Technical Club Lead</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};