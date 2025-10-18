import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Leaf, Languages } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("telugu");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
  });

  const translations = {
    telugu: {
      title: "రైతు మిత్ర AI",
      subtitle: "మీ వ్యక్తిగత వ్యవసాయ సహాయకుడు",
      login: "లాగిన్",
      signup: "సైన్అప్",
      email: "ఇమెయిల్",
      password: "పాస్వర్డ్",
      fullName: "పూర్తి పేరు",
      phone: "ఫోన్ నంబర్",
      language: "భాష ఎంచుకోండి",
      loginButton: "లాగిన్ అవ్వండి",
      signupButton: "ఖాతా సృష్టించండి",
      loginSuccess: "విజయవంతంగా లాగిన్ అయ్యారు!",
      signupSuccess: "ఖాతా సృష్టించబడింది!",
      error: "లోపం సంభవించింది",
    },
    english: {
      title: "Rytu Mitra AI",
      subtitle: "Your Personal Farming Assistant",
      login: "Login",
      signup: "Sign Up",
      email: "Email",
      password: "Password",
      fullName: "Full Name",
      phone: "Phone Number",
      language: "Choose Language",
      loginButton: "Sign In",
      signupButton: "Create Account",
      loginSuccess: "Successfully logged in!",
      signupSuccess: "Account created successfully!",
      error: "An error occurred",
    },
  };

  const t = translations[language as keyof typeof translations];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      toast.success(t.loginSuccess);
      navigate("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : typeof err === "string" ? err : String(err);
      toast.error(message || t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
          },
          emailRedirectTo: `${window.location.origin}/onboarding`,
        },
      });

      if (error) throw error;
      toast.success(t.signupSuccess);
      navigate("/onboarding");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : typeof err === "string" ? err : String(err);
      toast.error(message || t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-strong">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-primary rounded-full mb-4">
            <Leaf className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">{t.title}</h1>
          <p className="text-muted-foreground text-center">{t.subtitle}</p>
        </div>

        <div className="mb-6">
          <Label className="mb-2 flex items-center gap-2">
            <Languages className="h-4 w-4" />
            {t.language}
          </Label>
          <RadioGroup value={language} onValueChange={setLanguage} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="telugu" id="telugu" />
              <Label htmlFor="telugu">తెలుగు</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="english" id="english" />
              <Label htmlFor="english">English</Label>
            </div>
          </RadioGroup>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">{t.login}</TabsTrigger>
            <TabsTrigger value="signup">{t.signup}</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">{t.email}</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="login-password">{t.password}</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "..." : t.loginButton}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="signup-name">{t.fullName}</Label>
                <Input
                  id="signup-name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="signup-phone">{t.phone}</Label>
                <Input
                  id="signup-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="signup-email">{t.email}</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="signup-password">{t.password}</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "..." : t.signupButton}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
