import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Brain, TrendingUp, Cloud, Zap, Globe } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";
import aiIcon from "@/assets/ai-assistant-icon.png";
import dashboardIcon from "@/assets/dashboard-icon.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b shadow-soft glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Rytu Mitra AI</span>
          </div>
          <Button onClick={() => navigate("/auth")} size="lg" className="shadow-soft">
            Get Started
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              రైతు మిత్ర AI - Your Personal Farming Assistant
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Empowering Telugu farmers with AI-powered crop advice, pest detection, and real-time weather insights
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={() => navigate("/auth")} size="lg" className="bg-white text-primary hover:bg-white/90 shadow-strong">
                <Zap className="mr-2 h-5 w-5" />
                Start Free
              </Button>
              <Button onClick={() => navigate("/auth")} size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Globe className="mr-2 h-5 w-5" />
                తెలుగులో చూడండి
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Powerful Features for Modern Farming
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Everything you need to make informed farming decisions, available in Telugu and English
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 shadow-strong hover:shadow-glow transition-smooth animate-fade-in">
              <div className="mb-6 p-4 bg-primary/10 rounded-full w-fit">
                <img src={aiIcon} alt="AI Assistant" className="h-16 w-16" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Farming Assistant</h3>
              <p className="text-muted-foreground mb-4">
                Ask questions about crops, fertilizers, and pest management in Telugu or English. Get instant AI-powered advice.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span>Voice and text input support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>Bilingual: Telugu & English</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-strong hover:shadow-glow transition-smooth animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="mb-6 p-4 bg-destructive/10 rounded-full w-fit">
                <Leaf className="h-16 w-16 text-destructive" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pest Detection</h3>
              <p className="text-muted-foreground mb-4">
                Upload crop images for instant AI analysis. Identify pests and diseases with actionable recommendations.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span>Image-based pest identification</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Instant treatment suggestions</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-strong hover:shadow-glow transition-smooth animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="mb-6 p-4 bg-accent/10 rounded-full w-fit">
                <img src={dashboardIcon} alt="Dashboard" className="h-16 w-16" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Real-time weather data, crop health tracking, and visual analytics all in one place.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-primary" />
                  <span>Live weather updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>Crop health trends</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Built for Telugu Farmers, Powered by AI
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of farmers already using AI to improve their yields and protect their crops
          </p>
          <Button onClick={() => navigate("/auth")} size="lg" className="bg-white text-primary hover:bg-white/90 shadow-strong">
            Get Started for Free
          </Button>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Rytu Mitra AI. Empowering farmers with technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
