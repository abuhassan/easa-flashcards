import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Fetch all flashcards
export async function GET() {
  try {
    const flashcards = await prisma.flashcard.findMany();
    return NextResponse.json(flashcards);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch flashcards" }, { status: 500 });
  }
}

// POST: Add a new flashcard
export async function POST(req: Request) {
  try {
    const { question, answer, mnemonic, difficulty, userId } = await req.json();

    if (!question || !answer || !difficulty || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const flashcard = await prisma.flashcard.create({
      data: { question, answer, mnemonic, difficulty, userId },
    });

    return NextResponse.json(flashcard, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error); // Logs error in terminal
    return NextResponse.json({ error: "Failed to create flashcard" }, { status: 500 });
  }
}