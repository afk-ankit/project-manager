import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="grid place-items-center h-[80vh]">
      <div className="lg:w-1/2 space-y-8">
        <h1 className="text-5xl lg:text-6xl text-center font-semibold">
          THE NEXT GEN <br />
          <span className="tracking-wide text-green-500">PROJECT MANAGER</span>
        </h1>
        <p className="text-center lg:text-lg font-semibold">
          Unlimited project creation and management.
          <br />
          Free and easy to use both for students and teachers.
          <br />
          No purchase or frustating adds.
        </p>
        <div className="space-x-2 flex lg:w-2/3 m-auto">
          <Button className="flex-1 font-bold">Login</Button>
          <Button className="flex-1 font-bold" variant={"outline"}>
            Register
          </Button>
        </div>
      </div>
    </section>
  );
}
