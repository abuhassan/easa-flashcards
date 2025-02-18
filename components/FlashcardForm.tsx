"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FlashcardForm() {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    mnemonic: "",
    difficulty: "Easy",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = "6b47af05-3514-46c5-bb61-6c096c9be85c"; // Replace with an actual user ID

    const res = await fetch("/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, userId }),
    });

    if (res.ok) {
      alert("Flashcard added!");
      setFormData({ question: "", answer: "", mnemonic: "", difficulty: "Easy" });
    } else {
      alert("Failed to add flashcard.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Add a Flashcard</h2>
      <Input type="text" name="question" placeholder="Question" value={formData.question} onChange={handleChange} required />
      <Input type="text" name="answer" placeholder="Answer" value={formData.answer} onChange={handleChange} required />
      <Input type="text" name="mnemonic" placeholder="Mnemonic (optional)" value={formData.mnemonic} onChange={handleChange} />
      <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="p-2 border rounded mt-2">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <Button type="submit" className="mt-4">Submit</Button>
    </form>
  );
}