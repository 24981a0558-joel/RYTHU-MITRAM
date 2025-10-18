import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, Cloud, Droplets, Wind, MessageSquare, Camera, TrendingUp, User } from "lucide-react";
import AIChat from "@/components/AIChat";
import WeatherWidget from "@/components/WeatherWidget";
import CropHealthChart from "@/components/CropHealthChart";
import PestDetection from "@/components/PestDetection";

interface Profile {
  user_id: string;
  full_name?: string | null;
  preferred_language?: string | null;
  location?: string | null;
  crop_type?: string | null;
  [key: string]: unknown;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileData && !profileData.location) {
        navigate("/onboarding");
        return;
      }

      setProfile(profileData);
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isEnglish = profile?.preferred_language === "english";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b shadow-soft glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            {isEnglish ? "Rytu Mitra AI" : "రైతు మిత్ర AI"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{profile?.full_name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              {isEnglish ? "Logout" : "లాగౌట్"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 gradient-card shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent rounded-lg">
                  <MessageSquare className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {isEnglish ? "AI Farming Assistant" : "AI వ్యవసాయ సహాయకుడు"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {isEnglish ? "Ask questions about farming" : "వ్యవసాయం గురించి ప్రశ్నలు అడగండి"}
                  </p>
                </div>
              </div>
              <AIChat language={profile?.preferred_language || "telugu"} />
            </Card>

            <Card className="p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-destructive rounded-lg">
                  <Camera className="h-6 w-6 text-destructive-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {isEnglish ? "Pest Detection" : "తెగుళ్ళ గుర్తింపు"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {isEnglish ? "Upload crop image for analysis" : "విశ్లేషణ కోసం పంట చిత్రాన్ని అప్లోడ్ చేయండి"}
                  </p>
                </div>
              </div>
              <PestDetection language={profile?.preferred_language || "telugu"} />
            </Card>

            <Card className="p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-secondary rounded-lg">
                  <TrendingUp className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {isEnglish ? "Crop Health Trends" : "పంట ఆరోగ్య ట్రెండ్స్"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {isEnglish ? "Track your crop progress" : "మీ పంట పురోగతిని ట్రాక్ చేయండి"}
                  </p>
                </div>
              </div>
              <CropHealthChart />
            </Card>
          </div>

          <div className="space-y-6">
            <WeatherWidget location={profile?.location || "Guntur"} language={profile?.preferred_language || "telugu"} />

            <Card className="p-6 gradient-card shadow-soft">
              <h3 className="font-bold mb-4">
                {isEnglish ? "Quick Stats" : "త్వరిత గణాంకాలు"}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-accent" />
                    <span className="text-sm">{isEnglish ? "Location" : "ప్రాంతం"}</span>
                  </div>
                  <span className="font-semibold text-sm">{profile?.location}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    <span className="text-sm">{isEnglish ? "Crop Type" : "పంట రకం"}</span>
                  </div>
                  <span className="font-semibold text-sm capitalize">{profile?.crop_type}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
