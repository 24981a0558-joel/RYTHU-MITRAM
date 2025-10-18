import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Sprout, MapPin, Languages } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    location: "",
    cropType: "",
    preferredLanguage: "telugu",
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      } else {
        setUserId(user.id);
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          location: profile.location,
          crop_type: profile.cropType,
          preferred_language: profile.preferredLanguage,
        })
        .eq("user_id", userId);

      if (error) throw error;

      toast.success(profile.preferredLanguage === "telugu" ? "ప్రొఫైల్ నవీకరించబడింది!" : "Profile updated!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isEnglish = profile.preferredLanguage === "english";

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-strong">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-primary rounded-full mb-4">
            <Sprout className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">
            {isEnglish ? "Complete Your Profile" : "మీ ప్రొఫైల్ పూర్తి చేయండి"}
          </h1>
          <p className="text-muted-foreground text-center">
            {isEnglish ? "Tell us about your farm" : "మీ వ్యవసాయం గురించి చెప్పండి"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Languages className="h-4 w-4" />
              {isEnglish ? "Preferred Language" : "ఇష్టమైన భాష"}
            </Label>
            <Select value={profile.preferredLanguage} onValueChange={(value) => setProfile({ ...profile, preferredLanguage: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4" />
              {isEnglish ? "Your Location" : "మీ ప్రాంతం"}
            </Label>
            <Input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder={isEnglish ? "e.g., Guntur, Andhra Pradesh" : "ఉదా: గుంటూరు, ఆంధ్రప్రదేశ్"}
              required
            />
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Sprout className="h-4 w-4" />
              {isEnglish ? "Main Crop Type" : "ప్రధాన పంట"}
            </Label>
            <Select value={profile.cropType} onValueChange={(value) => setProfile({ ...profile, cropType: value })}>
              <SelectTrigger>
                <SelectValue placeholder={isEnglish ? "Select crop type" : "పంట రకాన్ని ఎంచుకోండి"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rice">{isEnglish ? "Rice (Paddy)" : "వరి (వరి)"}</SelectItem>
                <SelectItem value="cotton">{isEnglish ? "Cotton" : "పత్తి"}</SelectItem>
                <SelectItem value="turmeric">{isEnglish ? "Turmeric" : "పసుపు"}</SelectItem>
                <SelectItem value="chili">{isEnglish ? "Chili" : "మిరపకాయ"}</SelectItem>
                <SelectItem value="maize">{isEnglish ? "Maize" : "మొక్కజొన్న"}</SelectItem>
                <SelectItem value="sugarcane">{isEnglish ? "Sugarcane" : "చెరకు"}</SelectItem>
                <SelectItem value="vegetables">{isEnglish ? "Vegetables" : "కూరగాయలు"}</SelectItem>
                <SelectItem value="other">{isEnglish ? "Other" : "ఇతర"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "..." : (isEnglish ? "Continue to Dashboard" : "డాష్బోర్డ్కు వెళ్ళండి")}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Onboarding;
