import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StartGame() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleSubmit = () => {
    if (player1 && player2 && theme) {
      navigate(
        `/game?theme=${theme}&player1=${encodeURIComponent(
          player1
        )}&player2=${encodeURIComponent(player2)}`
      );
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <h2 className="text-3xl font-semibold mb-2">Theme: {theme}</h2>
      <Input
        placeholder="Enter Player 1 Name"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
        className="w-64"
      />
      <Input
        placeholder="Enter Player 2 Name"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
        className="w-64"
      />
      <Button onClick={handleSubmit} disabled={!player1 || !player2}>
        Start Quiz
      </Button>
    </main>
  );
}
