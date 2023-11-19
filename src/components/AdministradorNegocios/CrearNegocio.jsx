import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  memo,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab, Card, CardBody, Chip } from "@nextui-org/react";
import { getOneBussiness } from "../../api/bussiness";
import { useBussinessStore, useUserStore } from "../../hooks/useStore";
import { grid_1_col } from "../styles/styles";
const ResponsiveTimePickers = lazy(() =>
  import("./Inputs/ResponsiveTimePicker")
);
const NegocioDashboard = memo(lazy(() => import("./NegocioDashboard")));
const EventManagement = lazy(() => import("./EventManagement"));
const ManageProducts = lazy(() => import("./ManageProducts"));

export default function CrearNegocio() {
  const user = useUserStore((state) => state.user);
  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);

  const [selected, setSelected] = useState("perfil");

  const fetchBussiness = async () => {
    if (user === null) return;

    const b = await getOneBussiness(user.id);
    setBussiness(b);
  };

  useEffect(() => {
    fetchBussiness();
  }, [user]);

  const renderLoader = () => <p>Loading</p>;

  const renderTabContent = () => {
    switch (selected) {
      case "perfil":
        return <NegocioDashboard user={user} bussiness={bussiness} />;
      case "horario":
        return (
          <Suspense fallback={renderLoader()}>
            <ResponsiveTimePickers />
          </Suspense>
        );
      case "eventos":
        return <EventManagement bussinessId={bussiness?.id} />;
      case "productos":
        return <ManageProducts bussiness={bussiness} />;
      default:
        return null;
    }
  };

  return (
    <div style={grid_1_col}>
      <div className="flex w-full flex-col">
        <br />
        <div
          style={{
            display: "flex",
            width: "100%",
            color: "white",
            justifyContent: "space-between",
          }}
        >
          <Chip color="secondary" radius="sm">
            Secondary
          </Chip>
          <Chip color="secondary" radius="sm">
            Secondary
          </Chip>
          <Chip color="secondary" radius="sm">
            Secondary
          </Chip>
        </div>
        <Tabs
          fullWidth
          selectedKey={selected}
          onSelectionChange={setSelected}
          // value={activeTab}
          // onChange={(index) => setActiveTab(index)}
        >
          <Tab key="perfil" title="Perfil" />
          <Tab key="horario" title="Horario" />
          <Tab key="eventos" title="Eventos" />
          <Tab key="productos" title="Productos" />
        </Tabs>
        <Card>
          <CardBody>{renderTabContent()}</CardBody>
        </Card>
      </div>
    </div>
  );
}
