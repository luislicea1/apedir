import React, { lazy } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { NegocioLogo } from "./NegocioLogo.jsx";
import { useState, useEffect } from "react";
import { MarginLeft30 } from "../../styles/styles.jsx";

const AbiertoCerrado = lazy(() => import("./AbiertoCerrado.jsx"));
const Carrito = lazy(() => import("../../header/CarritoIcon.jsx"));
const Notification = lazy(() => import("../../header/Notification.jsx"));
const Izquierda = lazy(() => import("../../Icons/Angulo/izquierda.jsx"));

export default function HeaderNegocio(props) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      const firstProductListPosition = document
        .querySelector(".first-product-list")
        .getBoundingClientRect().top;
      if (window.pageYOffset >= firstProductListPosition) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };

    window.addEventListener("scroll", checkScrollPosition);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const zIndex = {
    zIndex: "4000",
  };

  return (
    <>
      <Navbar style={zIndex}>
        <NavbarBrand>
          <Link href={props.anterior}>
            <Izquierda h={"20px"} w={"20px"}></Izquierda>
          </Link>

          <NegocioLogo logo={props.logo} />
          <div className="ml-2" style={MarginLeft30}>
            <p className="font-bold text-inherit">{props.nombre}</p>
            {props.horario === "si" ? <AbiertoCerrado></AbiertoCerrado> : null}
          </div>
        </NavbarBrand>

        <NavbarContent as="div" justify="end">
          <Carrito carrito={props.carrito}></Carrito>
          <Notification></Notification>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
}
