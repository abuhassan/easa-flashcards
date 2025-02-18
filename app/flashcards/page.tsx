import FlashcardList from "@/components/FlashcardList";
import FlashcardForm from "@/components/FlashcardForm";

export default function FlashcardsPage() {
  return (
    <div className="container mx-auto mt-10">
      <FlashcardForm />
      <FlashcardList />
    </div>
  );
}