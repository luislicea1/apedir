import React, { useEffect, useState } from "react";
import "./header.css";
import { Link as LinkReact } from "react-router-dom";
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
import { useBussinessStore } from "../../hooks/useStore";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useNavigate } from "react-router-dom";
import supabase from "../../api/client.jsx";
import { getUser } from "../../api/profile.jsx";
import { useUserStore } from "../../hooks/useStore";
import {
  fetchBussinessPerURL,
  getAllBussinessFromUser,
  getOneBussiness,
} from "../../api/bussiness";
import SelectProvincia from "./SelectProvincia.jsx";
import Carrito from "./CarritoIcon.jsx";
import Notification from "./Notification.jsx";

export default function Header(props) {
  const history = useHref();
  const [isBussiness, setIsBussiness] = useState(false);
  const [session, setSession] = useState(null);
  const [selectedBussiness, setSelectedBussiness] = useState(null);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const path = history.split("/");
    const fetchData = async () => {
      const bussinessData = await fetchBussinessPerURL(path[2]);
      setSelectedBussiness(bussinessData);
    };

    if (path.includes("lugar")) {
      fetchData();
      setIsBussiness(true);
    } else {
      setSelectedBussiness(null);
      setIsBussiness(false);
    }
  }, [history]);

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
  }, []);

  const setBussiness = useBussinessStore((state) => state.setBussiness);

  const fetchBussiness = async () => {
    if (user === null) return;

    const b = await getOneBussiness(user.id);
    setBussiness(b);
  };

  useEffect(() => {
    fetchBussiness();
  }, [user]);

  return (
    <Navbar isBordered disableAnimation>
      <NavbarBrand>
        {isBussiness && selectedBussiness !== null ? (
          <>
            <LinkReact to="/">
              <Izquierda h={"20px"} w={"20px"} />
            </LinkReact>

            <NegocioLogo logo={selectedBussiness.perfil_pic} />

            <div className="ml-2" style={MarginLeft30}>
              <p
                className="font-bold text-inherit titulo-negocio-header"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {selectedBussiness.name}
              </p>
              <AbiertoCerrado />
            </div>
          </>
        ) : (
          <AcmeLogo />
        )}
      </NavbarBrand>

      {!isBussiness && (
        // <React.Suspense fallback={<div></div>}>
        <SelectProvincia />
        // </React.Suspense>
      )}

      {session !== null && user !== null ? (
        <NavbarContent as="div" justify="end" style={{ gap: "30px" }}>
          {isBussiness && (
            // <React.Suspense fallback={<div></div>}>
            <Carrito></Carrito>
            // </React.Suspense>
          )}
          {/* <React.Suspense fallback={<div></div>}> */}
          <Notification />
          {/* </React.Suspense> */}
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
                <p className="font-semibold">Plan: {user?.plan}</p>
              </DropdownItem>

              {selectedBussiness === undefined && selectedBussiness !== null ? (
                <DropdownItem
                  aria-label="settings"
                  key="settings"
                  onClick={() => navigate("/administrador-negocio/perfil")}
                >
                  Crear negocio
                </DropdownItem>
              ) : (
                <DropdownItem
                  aria-label="settings"
                  key="settings"
                  onClick={() => navigate("/administrador-negocio/perfil")}
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
