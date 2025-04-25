import { UserButton } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { Menu, Zap } from "lucide-react";
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
                  <SheetTitle>
                    {" "}
                    <span className="text-xl font-semibold flex items-center gap-2">
                      <Zap size={15} /> Fikiryilkal
                    </span>
                  </SheetTitle>
                  <Separator className="mt-3" />
                </SheetHeader>

                <ul className="flex gap-10 flex-col mx-10 font-semibold">
                  <Link href={"/public"}>Public</Link>
                  <Link href={"/user"}>User</Link>
                  <Link href={"/admin"}>Admin</Link>
                  <Link href={"/owner"}>Owner</Link>
                </ul>

                <SheetFooter>
                  <div className="flex sm:hidden justify-end">
                    <ModeToggle />
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <span className="text-xl font-semibold flex items-center gap-2">
            {" "}
            <Zap size={15} /> Fikiryilkal
          </span>
        </Link>

        <ul className="hidden gap-10 md:flex font-semibold">
          <Link href={"/public"}>Public </Link>
          <Link href={"/user"}>User</Link>
          <Link href={"/admin"}>Admin</Link>
          <Link href={"/owner"}>Owner</Link>
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/daveyplate/better-auth-nextjs-starter"
            target="_blank"
          ></Link>

          <div className="hidden min-[400px]:flex mx-2 ">
            <ModeToggle />
          </div>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
