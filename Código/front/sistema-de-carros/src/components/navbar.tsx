import { cn } from "@/lib/utils";
import { Atom, MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import logo from "../components/ui/icons/AzilIcon.png";


export type NavbarLink = { href: string; title: string };
export default function Navbar({
  links,
  className,
}: {
  links?: NavbarLink[];
  className?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-border/40 bg-background/95 pb-2 text-xl backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="mx full bg-card pt-0 border-b ">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4">
        
        <Image src={logo} alt="foto perfil" width={100} height={100}></Image>

        {/* Desktop */}
        {links && links.length && (
          <nav className="max-md:hidden">
            
            <ul className="flex items-center gap-4">
              {links.map((link, i) => (
                <li key={'NavbarLink-${i}'}>
                  <Button
                    className="h-full max-w-24 text-wrap text-center"
                    asChild
                    variant={"ghost"}
                  >
                    <Link href={link.href}>{link.title}</Link>
                  </Button>
                </li>
              ))}
            </ul>
            
          </nav>
        )}
        
        {/*Mobile  */}

        {links && links.length && (
          <nav className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <ul className="mt-4 grid items-center gap-4">
                  {links.map((link, i) => (
                    <li key={'NavbarLink-${i}'}>
                      <Button
                        className="h-full w-full text-center text-xl"
                        asChild
                        variant={"ghost"}
                      >
                        <Link href={link.href}>{link.title}</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          </nav>
        )}
      </div>
      </div>
    </header>
  );
}