import TextAreaDescription from "./Inputs/TextAreaDescripcion";
import InputTitle from "./Inputs/InputTitle";
import ImageUploadButton from "./Inputs/ImagenUploadButton";
import InputGmail from "./Inputs/InputGmail";
import InputLocation from "./Inputs/InputLocation";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import InputPhoneNumber from "./Inputs/InputPhoneNumber";
import InputTelefonoLocalNumber from "./Inputs/InputTelefonoLocal";
import ResponsiveTimePickers from "./Inputs/ResponsiveTimePicker";
import ManageProducts from "./ManageProducts";
import InputDeFaceBook from "./Inputs/InputDeFaceBook";
import InputDeInstagram from "./Inputs/InputDeInstagram";
import InputTelegram from "./Inputs/InputTelegram";
import InputWhatsapp from "./Inputs/InputWhatsapp";

export default function CrearNegocio() {
  const contenedor = {
    display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
    gap: "10px",
    padding: "20px",
  };

  const bg = {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "10px",
    padding: "40px 0",
  };

  return (
    <div style={contenedor}>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="perfil" title="Perfil">
            <Card>
              <CardBody>
                <InputTitle></InputTitle>
                <ImageUploadButton></ImageUploadButton>
                <TextAreaDescription></TextAreaDescription>
                <InputLocation></InputLocation>
                
                <div style={bg}>
                  <InputGmail></InputGmail>
                  <InputPhoneNumber></InputPhoneNumber>
                  <InputWhatsapp></InputWhatsapp>
                  <InputTelegram></InputTelegram>
                  <InputTelefonoLocalNumber></InputTelefonoLocalNumber>
                  <InputDeFaceBook></InputDeFaceBook>
                  <InputDeInstagram></InputDeInstagram>
                </div>
               
                
              </CardBody>
            </Card>
          </Tab>
          <Tab key="music" title="Horario">
            
              
          
                <ResponsiveTimePickers></ResponsiveTimePickers>
              
            
          </Tab>
          <Tab key="videos" title="Productos">
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
