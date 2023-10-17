import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {NegocioLogo} from "./NegocioLogo.jsx";
import Izquierda from "../../Icons/Angulo/izquierda.jsx";

export default function HeaderNegocio(props) {
    const green = {
        color: "green"
    }

    const red = {
        color: "red"
    }

    const style = {
        marginLeft: "30px"
    }

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/"><Izquierda h = {"20px"} w = {"20px"}></Izquierda></Link>
        
        <NegocioLogo logo = {props.logo}/>
        <div className="ml-2" style={style}>
            <p className="font-bold text-inherit">{props.nombre}</p>
            {props.estado === "Abierto" ? <h2 style={green}>Abierto</h2>:<h2 style={red}>Cerrado</h2>}
        </div>
       
      </NavbarBrand>

      

      <NavbarContent as="div" justify="end">
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
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}