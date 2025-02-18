"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  mnemonic?: string;
  difficulty: string;
}

export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    async function fetchFlashcards() {
      const res = await fetch("/api/flashcards");
      const data = await res.json();
      setFlashcards(data);
    }
    fetchFlashcards();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Flashcards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((card) => (
          <Card key={card.id} className="p-4 border">
            <h3 className="font-semibold text-lg">{card.question}</h3>
            <p className="text-gray-600 mt-2">Answer: {card.answer}</p>
            {card.mnemonic && <p className="italic mt-2">Mnemonic: {card.mnemonic}</p>}
            <p className="text-sm text-gray-500 mt-2">Difficulty: {card.difficulty}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}