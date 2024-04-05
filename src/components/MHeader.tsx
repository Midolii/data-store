import { Navbar, NavbarBrand } from "@nextui-org/react";
import Image from "next/image";

export const MHeader = () => {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Image src="/icon.png" width={36} height={36} alt="icon" />
        <p className="font-bold text-inherit ml-2">Midolii</p>
      </NavbarBrand>
    </Navbar>
  );
};
