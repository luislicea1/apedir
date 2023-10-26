import UserAltIcon from "../../Icons/user/UserAltIcon";
import Corazon2 from "../../Icons/Corazon/Corazon2";
import Regalo from "../../Icons/regalo/Regalo";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import Like from "../../Like/Like";

const stats = [
  { id: 1, name: "Seguidores", value: "44 million" },
  { id: 2, name: "Productos", value: "55" },
  { id: 3, name: "Me Gusta", value: "46,000" },
];

export default function Promo(props) {
  const listContainer = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "20px",
  };

  const center = {
    display: "grid",
    placeItems: "center",
  };

  const margin = {
    marginTop: "50px",
    marginBottom: "30px",
  };

  const style = {
    borderRadius: "50%"
  }

  return (
    <div style={margin}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl
          className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3"
          style={listContainer}
        >
          <div
            className="mx-auto flex max-w-xs flex-col gap-y-4"
            style={center}
          >
            <Card style={style}>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                
              >
                <UserAltIcon w="25px" color = {"gray"}></UserAltIcon>
              </Button>
            </Card>
            

            <dt className="text-base leading-7 text-gray-600">Seguidores</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              {props.seguidores}
            </dd>
          </div>

          <div
            className="mx-auto flex max-w-xs flex-col gap-y-4"
            style={center}
          >
            <Card style={style}>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                
              >
                <Regalo w="20px" color={"gray"}></Regalo>
              </Button>
            </Card>
            

            <dt className="text-base leading-7 text-gray-600">Productos</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              {props.productos}
            </dd>
          </div>

          <div
            className="mx-auto flex max-w-xs flex-col gap-y-4"
            style={center}
          >
            <Like></Like>
            <dt className="text-base leading-7 text-gray-600">Les Gusta</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              {props.lesGusta}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
