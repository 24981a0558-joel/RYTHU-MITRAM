import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Camera, AlertCircle, CheckCircle2 } from "lucide-react";

interface PestDetectionProps {
  language: string;
}

const PestDetection = ({ language }: PestDetectionProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEnglish = language === "english";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("detect-pest", {
        body: { image: imageData, language },
      });

      if (error) throw error;

      setResult(data);
      toast.success(isEnglish ? "Analysis complete!" : "విశ్లేషణ పూర్తయింది!");

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("pest_detections").insert({
          user_id: user.id,
          image_url: imageData,
          detection_result: data,
          pest_name: data.pestName,
          severity: data.severity,
          recommendations: data.recommendations,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <Button
        onClick={() => fileInputRef.current?.click()}
        className="w-full"
        size="lg"
        disabled={loading}
      >
        <Camera className="mr-2 h-5 w-5" />
        {loading ? "..." : isEnglish ? "Upload Crop Image" : "పంట చిత్రాన్ని అప్లోడ్ చేయండి"}
      </Button>

      {image && (
        <Card className="p-4">
          <img src={image} alt="Uploaded crop" className="w-full rounded-lg mb-4" />
          {loading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </Card>
      )}

      {result && !loading && (
        <Card className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            {result.severity === "high" ? (
              <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
            ) : (
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">
                {isEnglish ? "Detection Result" : "గుర్తింపు ఫలితం"}
              </h3>
              <p className="text-sm mb-2">
                <span className="font-semibold">{isEnglish ? "Pest/Disease:" : "తెగులు/వ్యాధి:"} </span>
                {result.pestName}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">{isEnglish ? "Severity:" : "తీవ్రత:"} </span>
                <span className={`capitalize ${result.severity === "high" ? "text-destructive" : "text-primary"}`}>
                  {result.severity}
                </span>
              </p>
              <div className="mt-4">
                <p className="font-semibold text-sm mb-2">
                  {isEnglish ? "Recommendations:" : "సిఫార్సులు:"}
                </p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.recommendations}</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PestDetection;
