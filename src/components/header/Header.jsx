import { useEffect, useState } from "react";
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
import SelectProvincia from "./SelectProvincia.jsx";
import supabase from "../../api/client.js";
import { getUser } from "../../api/profile.js";
import ApedirLogoNegro from "../../assets/ApedirLogoNegro.svg";

export default function Header(props) {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(null);
      return;
    }
  };
  async function handleAuthStateChange(event, session) {
    if (session) {
      setSession(session);
      const user = await getUser(session.user.email);
      setUser(user);
    } else {
      setSession(null);
    }
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => await handleAuthStateChange(event, session)
    );
  }, [navigate]);

  return (
    <Navbar isBordered disableAnimation>
      <NavbarBrand>
        <AcmeLogo logo={ApedirLogoNegro} />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <SelectProvincia></SelectProvincia>

      {session !== null ? (
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
                showFallback={true}
                src={session.user?.user_metadata?.avatar_url}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Registrado como</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              {user?.role === "user" ? (
                <DropdownItem key="settings">Crear negocio</DropdownItem>
              ) : (
                <DropdownItem key="settings">Ver negocio</DropdownItem>
              )}
              <DropdownItem
                key="analytics"
                onClick={() => navigate(`/${user.role}`)}
              >
                Mi rol: {user?.role}
              </DropdownItem>

              <DropdownItem key="help_and_feedback">
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
