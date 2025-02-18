import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.upsert({
    where: { email: "testuser@example.com" },
    update: {},
    create: {
      email: "testuser@example.com",
      password: "securepassword123",
    },
  });

  console.log("User created:", user);

  // Create flashcards linked to the user
  const flashcards = await prisma.flashcard.createMany({
    data: [
      {
        question: "What is Ohm’s Law?",
        answer: "V = IR (Voltage = Current x Resistance)",
        mnemonic: "VIR (Voltage In Resistance)",
        difficulty: "Easy",
        userId: user.id, // Linking to the user
      },
      {
        question: "What is the unit of capacitance?",
        answer: "Farad (F)",
        mnemonic: "Capacitor Holds Farads",
        difficulty: "Medium",
        userId: user.id,
      },
      {
        question: "What does AC stand for in electronics?",
        answer: "Alternating Current",
        mnemonic: "AC = Alternating Cycle",
        difficulty: "Hard",
        userId: user.id,
      },
    ],
  });

  console.log("Flashcards created!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());