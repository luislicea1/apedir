import React ,{lazy,Suspense} from "react";
//import TextAreaDescription from "./Inputs/TextAreaDescripcion";
//import InputTitle from "./Inputs/InputTitle";
//import ImageUploadButton from "./Inputs/ImagenUploadButton";
//import InputGmail from "./Inputs/InputGmail";
//import InputLocation from "./Inputs/InputLocation";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

//import ResponsiveTimePickers from "./Inputs/ResponsiveTimePicker";
//import ManageProducts from "./ManageProducts";
import { grid_1_col } from "../styles/styles";

const TextAreaDescription = lazy(()=>import ("./Inputs/TextAreaDescripcion"))
const InputTitle = lazy(()=> import("./Inputs/InputTitle"));
const ImageUploadButton = lazy(()=> import("./Inputs/ImagenUploadButton"));
const InputLocation = lazy(()=> import("./Inputs/InputLocation"));
const ResponsiveTimePickers = lazy(()=> import("./Inputs/ResponsiveTimePicker"));
const ManageProducts = lazy(()=> import("./ManageProducts"));

export default function CrearNegocioGratuito() {

  return (
    <div style={grid_1_col}>
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
