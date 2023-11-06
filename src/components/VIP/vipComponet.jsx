import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import Imagen1 from "../../assets/img/img (1).png";
import { grid_2_col, container, section } from "../styles/styles";

export default function VipComponent() {
  return (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <section style={section}>
        <div style={grid_2_col}>
          <Card>
            <CardHeader></CardHeader>
            <CardBody>
              <Image></Image>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
