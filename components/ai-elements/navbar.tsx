import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

export function Navbar() {
  return (
    <div className="py-8 fixed top-0 z-10 w-full max-w-200 bg-background">
      <div className="flex justify-between max-w-full w-full">
        <div>
          <h1 className="font-bold text-4xl">Synergene</h1>
        </div>
        <div className="flex gap-4 items-center">
          <Button className="cursor-pointer">Sign In</Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
