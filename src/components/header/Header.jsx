import React, { useEffect, useState, lazy } from "react";
import "./header.css";
import { Link as LinkReact} from "react-router-dom";
import { useHref } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { NegocioLogo } from "../Negocio/HeaderNegocio/NegocioLogo";
import AbiertoCerrado from "../Negocio/HeaderNegocio/AbiertoCerrado";
import Izquierda from "../Icons/Angulo/izquierda";
import { MarginLeft30 } from "../styles/styles";

import { AcmeLogo } from "./AcmeLogo.jsx";
import { useNavigate } from "react-router-dom";
import supabase from "../../api/client.jsx";
import { getUser } from "../../api/profile.jsx";
import { useUserStore } from "../../hooks/useStore";

const Carrito = lazy(() => import("./CarritoIcon.jsx"));
const Notification = lazy(() => import("./Notification.jsx"));
const SelectProvincia = lazy(() => import("./SelectProvincia.jsx"));

export default function Header(props) {
  const history = useHref();
  const [isBussiness, setIsBussiness] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const path = history.split("/");
    if (path.includes("lugar")) setIsBussiness(true);
  }, [history]);

  const [isScrollVisible, setIsScrollVisible] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      const firstProductListPosition = document
        .querySelector(".first-product-list")
        .getBoundingClientRect().top;
      if (window.pageYOffset >= firstProductListPosition) {
        setIsScrollVisible(true);
      } else {
        setIsScrollVisible(false);
      }
    };

    if (isBussiness) {
      window.addEventListener("scroll", checkScrollPosition);
    } else {
      window.removeEventListener("scroll", checkScrollPosition);
    }

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [isBussiness]);
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(null);
      return;
    }
  };

  useEffect(() => {
    async function handleAuthStateChange(_event, session) {
      if (session) {
        setSession(session);
        const u = await getUser(session.user.email);
        setUser(u);
      }
    }

    const authListener = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [setUser]);

  return (
    <Navbar isBordered disableAnimation>
      <NavbarBrand>
        {isBussiness ? (
          <>
            {/* <Link href="/"> */}
            {/* </Link> */}
            <LinkReact to="/">
              <Izquierda h={"20px"} w={"20px"} />
            </LinkReact>

            <NegocioLogo logo={props.logo} />

            <div className="ml-2" style={MarginLeft30}>
              <p
                className="font-bold text-inherit titulo-negocio-header"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {props.nombre}
              </p>

              {props.horario === "si" ? <AbiertoCerrado /> : null}
            </div>
          </>
        ) : (
          <AcmeLogo />
        )}
      </NavbarBrand>

      {!isBussiness && <SelectProvincia />}

      {session !== null ? (
        <NavbarContent as="div" justify="end" style={{ gap: "30px" }}>
          <Carrito carrito = {props.carrito}></Carrito>
          <Notification />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                style={{ color: "white" }}
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.name}
                size="sm"
                showFallback={true}
                src={session.user?.user_metadata?.avatar_url}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="menu principal" variant="flat">
              <DropdownItem
                aria-label="info"
                key="profile"
                className="h-14 gap-4"
              >
                <p className="font-semibold">{user?.email}</p>
                <p className="font-semibold">Plan: PREMIUM</p>
              </DropdownItem>

              {user?.role === "user" ? (
                <DropdownItem aria-label="settings" key="settings">
                  Crear negocio
                </DropdownItem>
              ) : (
                <DropdownItem
                  aria-label="settings"
                  key="settings"
                  onClick={() => navigate("/administrador-negocio")}
                >
                  Ver negocio
                </DropdownItem>
              )}
              {user?.role === "admin" && (
                <DropdownItem
                  aria-label="panel"
                  key="panel"
                  onClick={() => navigate("/admin/")}
                >
                  Panel de Administración
                </DropdownItem>
              )}
              <DropdownItem
                aria-label="analytics"
                key="analytics"
                onClick={() => navigate("/plans")}
              >
                Planes y Precios
              </DropdownItem>
              <DropdownItem
                key="help_and_feedback"
                onClick={() => navigate("/ayudaInformacion")}
              >
                Ayuda e Información
              </DropdownItem>
              <DropdownItem
                aria-label="logout"
                key="logout"
                color="danger"
                onClick={handleLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent as="div" justify="end">
          <Button
            href="/login"
            as={Link}
            anchorIcon={""}
            color="primary"
            showAnchorIcon
            variant="solid"
          >
            Sign In
          </Button>
        </NavbarContent>
      )}
    </Navbar>
  );
}
