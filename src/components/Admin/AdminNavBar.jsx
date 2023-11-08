import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  // Link,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { HamburguerBtnMenu } from "./HamburgerBtnMenu.jsx";
import ApedirLogoNegro from "../../assets/ApedirLogoNegro.svg";
import { AcmeLogo } from "../header/AcmeLogo.jsx";

export default function AdminNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el evento de escucha cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    { name: "Usuarios", href: "/admin" },
    { name: "Comercios", href: "/admin/businesses" },
    { name: "Categorías de Comercios", href: "/admin/categories" },
    { name: "Planes", href: "/admin/plans" },
  ];

  const navBar = (
    <Navbar className="flex justify-center">
      <NavbarBrand>
        <AcmeLogo className="text-inherit" logo={ApedirLogoNegro} />
      </NavbarBrand>
      <NavbarContent className="flex space-x-5">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link style={{color: '#7828c8'}} to={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );

  const hamburgerNavBar = (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <HamburguerBtnMenu />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <HamburguerBtnMenu />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Usuarios
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#">
            Comercios
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Categorías de Comercios
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Planes
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );

  return <>{screenWidth <= 768 ? hamburgerNavBar : navBar}</>;
}
