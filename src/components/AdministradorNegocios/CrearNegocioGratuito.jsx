import TextAreaDescription from "./Inputs/TextAreaDescripcion";
import InputTitle from "./Inputs/InputTitle";
import ImageUploadButton from "./Inputs/ImagenUploadButton";
import InputGmail from "./Inputs/InputGmail";
import InputLocation from "./Inputs/InputLocation";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import ResponsiveTimePickers from "./Inputs/ResponsiveTimePicker";
import ManageProducts from "./ManageProducts";

export default function CrearNegocioGratuito() {
  const contenedor = {
    display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
    gap: "10px",
    padding: "20px",
  };

  const bg = {
    background: "red",
  };

  return (
    <div style={contenedor}>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" disabledKeys={["productos"]} >
          <Tab key="perfil" title="Perfil">
            <Card>
              <CardBody>
                <InputTitle></InputTitle>
                <ImageUploadButton></ImageUploadButton>
                <TextAreaDescription></TextAreaDescription>
                <InputLocation></InputLocation>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="horario" title="Horario">
                <ResponsiveTimePickers></ResponsiveTimePickers>         
          </Tab>
          <Tab key="productos" title="Productos">
            <Card>
              <CardBody>
                <ManageProducts/>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}