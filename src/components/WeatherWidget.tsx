import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from "lucide-react";

interface WeatherWidgetProps {
  location: string;
  language: string;
}

const WeatherWidget = ({ location, language }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isEnglish = language === "english";

  useEffect(() => {
    fetchWeather();
  }, [location]);

  const fetchWeather = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("get-weather", {
        body: { location },
      });

      if (error) throw error;
      setWeather(data);
    } catch (error) {
      console.error("Weather fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 gradient-accent shadow-soft">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/20 rounded w-24"></div>
          <div className="h-12 bg-white/20 rounded"></div>
          <div className="h-20 bg-white/20 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 gradient-accent text-accent-foreground shadow-strong">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold mb-1">
            {isEnglish ? "Weather" : "వాతావరణం"}
          </h3>
          <p className="text-sm opacity-90">{location}</p>
        </div>
        <Sun className="h-10 w-10 opacity-90" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            <span className="text-sm">{isEnglish ? "Temperature" : "ఉష్ణోగ్రత"}</span>
          </div>
          <span className="font-bold text-lg">{weather?.temperature || "28"}°C</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            <span className="text-sm">{isEnglish ? "Humidity" : "తేమ"}</span>
          </div>
          <span className="font-bold text-lg">{weather?.humidity || "65"}%</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur">
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5" />
            <span className="text-sm">{isEnglish ? "Wind Speed" : "గాలి వేగం"}</span>
          </div>
          <span className="font-bold text-lg">{weather?.windSpeed || "12"} km/h</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur">
          <div className="flex items-center gap-2">
            <CloudRain className="h-5 w-5" />
            <span className="text-sm">{isEnglish ? "Rainfall" : "వర్షపాతం"}</span>
          </div>
          <span className="font-bold text-lg">{weather?.rainfall || "0"} mm</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur">
        <p className="text-xs opacity-80">
          {isEnglish
            ? "Weather conditions are favorable for farming activities"
            : "వ్యవసాయ కార్యకలాపాలకు వాతావరణ పరిస్థితులు అనుకూలంగా ఉన్నాయి"}
        </p>
      </div>
    </Card>
  );
};

export default WeatherWidget;
