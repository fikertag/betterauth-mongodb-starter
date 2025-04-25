import { UserButton } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/60 px-4 py-3 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="rounded-full size-8"
                >
                  <Menu size={17} />
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader className="mt-3">
                  <SheetTitle>♟ Fikiryilkal</SheetTitle>
                  <Separator className="mt-3" />
                </SheetHeader>

                <ul className="flex gap-10 flex-col mx-10">
                  <Link href={"/unprotected"}>Unprotected</Link>
                  <Link href={"/protected"}>Protected</Link>
                  <Link href={"/role1"}>Role1</Link>
                  <Link href={"/role2"}>Role2</Link>
                </ul>

                <SheetFooter>
                  <div className="flex sm:hidden justify-end">
                    <ModeToggle />
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          ♟ Fikiryilkal
        </Link>

        <ul className="hidden gap-10 md:flex">
          <Link href={"/unprotected"}>Unprotected</Link>
          <Link href={"/protected"}>Protected</Link>
          <Link href={"/role1"}>Role1</Link>
          <Link href={"/role2"}>Role2</Link>
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/daveyplate/better-auth-nextjs-starter"
            target="_blank"
          ></Link>

          <div className="hidden min-[400px]:flex ">
            <ModeToggle />
          </div>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
