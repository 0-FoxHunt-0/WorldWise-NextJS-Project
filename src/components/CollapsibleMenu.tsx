"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import LogoutButton from "./LogoutButton";
import NavLink from "./NavLink";
import Image from "next/image";
import { useState } from "react";

interface CollapsibleMenuProps {
  user: any;
}

function CollapsibleMenu({ user }: CollapsibleMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClick() {
    setIsOpen((state) => !state);
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger onClick={handleClick}>
          {!isOpen ? (
            <Image
              height={25}
              width={25}
              src="/menu.png"
              alt="dropdown menu icon"
            />
          ) : (
            <Image
              height={25}
              width={25}
              src="/close.png"
              alt="dropdown menu icon"
            />
          )}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <NavLink className="w-full" href={"/pricing"}>
              Pricing
            </NavLink>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <NavLink className="w-full" href={"/product"}>
              Product
            </NavLink>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            {!user ? (
              <NavLink className="w-full" href={"/sign-in"}>
                Login
              </NavLink>
            ) : (
              <NavLink className="w-full" href="/">
                <LogoutButton />
              </NavLink>
            )}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default CollapsibleMenu;
