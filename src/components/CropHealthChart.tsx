import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CropHealthChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCropHealth();
  }, []);

  const fetchCropHealth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: healthData, error } = await supabase
        .from("crop_health")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(10);

      if (error) throw error;

      const formattedData = healthData?.map((record) => ({
        date: new Date(record.created_at).toLocaleDateString(),
        health: record.health_score,
      })) || [];

      if (formattedData.length === 0) {
        const mockData = [
          { date: "Day 1", health: 75 },
          { date: "Day 3", health: 78 },
          { date: "Day 5", health: 82 },
          { date: "Day 7", health: 85 },
          { date: "Day 9", health: 88 },
        ];
        setData(mockData);
      } else {
        setData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching crop health:", error);
      const mockData = [
        { date: "Day 1", health: 75 },
        { date: "Day 3", health: 78 },
        { date: "Day 5", health: 82 },
        { date: "Day 7", health: 85 },
        { date: "Day 9", health: 88 },
      ];
      setData(mockData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="health" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CropHealthChart;
