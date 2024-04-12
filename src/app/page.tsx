import { ModeToggle } from "@/components/mode-toggler";
import Form from "@/components/Form";
export default async function Home() {
  return (
    <main className="min-h-screen container pt-4">
      <ModeToggle />
      <Form />
    </main>
  );
}
