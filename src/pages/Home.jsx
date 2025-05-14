import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Update as per your setup

const themes = ["Programming", "Maths", "English"];

export default function Home() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleStart = () => {
    if (selectedTheme) {
      navigate(`/start?theme=${selectedTheme}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-4xl font-bold">Choose Your Theme</h1>
      <div className="flex gap-4">
        {themes.map((theme) => (
          <Button
            key={theme}
            variant={selectedTheme === theme ? "default" : "outline"}
            onClick={() => setSelectedTheme(theme)}
          >
            {theme}
          </Button>
        ))}
      </div>
      <Button onClick={handleStart} disabled={!selectedTheme} className="mt-4">
        Start Game
      </Button>
    </main>
  );
}
