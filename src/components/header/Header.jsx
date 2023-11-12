import React, { useEffect, useState , lazy} from "react";
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
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useNavigate } from "react-router-dom";
//import SelectProvincia from "./SelectProvincia.jsx";
import supabase from "../../api/client.jsx";
import { getUser } from "../../api/profile.jsx";
//import ApedirLogoNegro from "../../assets/ApedirLogoNegro.svg";
//import Notification from "./Notification.jsx";
import { useUserStore } from "../../hooks/useStore.js";
//import Carrito from "./CarritoIcon.jsx";

const Carrito = lazy(()=>import ("./CarritoIcon.jsx"))
const ApedirLogoNegro = lazy(()=>import ("../../assets/ApedirLogoNegro.svg"))
const Notification = lazy(()=>import ("./Notification.jsx"))
const SelectProvincia = lazy(()=>import ("./SelectProvincia.jsx"))


export default function Header(props) {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [channel, setChannel] = useState(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(null);
      return;
    }
  };

  useEffect(() => {
    async function handleAuthStateChange(_event, session) {
      if (session && user === null) {
        setSession(session);
        const u = await getUser(session.user.email);
        setUser(u);
      }
    }
    const authListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!user) {
          await handleAuthStateChange(event, session);
        }
      }
    );
  }, [user]);

  return (
    <Navbar isBordered disableAnimation>
      <NavbarBrand>
        <AcmeLogo logo={ApedirLogoNegro} />
      </NavbarBrand>

      <SelectProvincia></SelectProvincia>
      {session !== null ? (
        <NavbarContent as="div" justify="end" style={{ gap: "30px" }}>
          <Carrito></Carrito>
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
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-4">
                <p className="font-semibold">{user?.email}</p>
                <p className="font-semibold">Plan: PREMIUM</p>
              </DropdownItem>

              {user?.role === "user" ? (
                <DropdownItem key="settings">Crear negocio</DropdownItem>
              ) : (
                <DropdownItem key="settings">Ver negocio</DropdownItem>
              )}
              {user?.role === "admin" && (
                <DropdownItem
                  key="analytics"
                  onClick={() => navigate("/admin")}
                >
                  Panel de Administración
                </DropdownItem>
              )}
              <DropdownItem key="analytics" onClick={() => navigate("/plans")}>
                Planes y Precios
              </DropdownItem>
              <DropdownItem
                key="help_and_feedback"
                onClick={() => navigate("/ayudaInformacion")}
              >
                Ayuda e Información
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
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
