import { UserButton } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { NavItem } from "./nav-item";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/60 px-4 py-3 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
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
                    <span className="text-xl font-semibold flex items-center gap-2">
                      Fikiryilkal
                    </span>
                  </SheetTitle>
                  <Separator className="mt-3" />
                </SheetHeader>

                <ul className="flex gap-4 flex-col mx-10 font-medium text-sm">
                  <li>
                    <SheetClose asChild>
                      <NavItem href="/public" label="Public" />
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <NavItem href="/user" label="User" />
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <NavItem href="/admin" label="Admin" />
                    </SheetClose>
                  </li>
                </ul>

                <SheetFooter>
                  <div className="flex sm:hidden justify-end">
                    <ModeToggle />
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <Link
            href={"/"}
            className="text-xl font-semibold flex items-center gap-2"
          >
            {" "}
            Fikiryilkal
          </Link>
        </div>

        <ul className="hidden gap-10 md:flex font-semibold">
          <NavItem href="/public" label="Public" />
          <NavItem href="/user" label="User" />
          <NavItem href="/admin" label="Admin" />
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden min-[400px]:flex mx-2 ">
            <ModeToggle />
          </div>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
