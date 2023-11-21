import React from "react";
import { Badge } from "@nextui-org/react";
//import { CartIcon } from "../Icons/CartIcon/CartIcon";
import { grid_3_col , btn100pc} from "../styles/styles";
import LogoCarritoNegro from "../../assets/logoReduce/LogoCarritoNegro";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

// En el componente Carrito
export default function Carrito({ carrito }) {
  const [isInvisible, setIsInvisible] = React.useState(false);

  
  if (!carrito) {
    return null;
  }
  return (
    <div className="mt-2">
      <Dropdown>
        <DropdownTrigger>
          <div>
            <Badge
              color="danger"
              content={carrito.length}
              isInvisible={isInvisible}
              shape="circle"
            >
              <LogoCarritoNegro w={30} />
            </Badge>
          </div>
        </DropdownTrigger>
        <DropdownMenu
          className="no-hover"
        >
          {carrito.map((product, index) => (
            <DropdownItem key={index}>
              <div style={grid_3_col}>
                <img src={product.image} alt={product.title} width="50px" />
                <span>{product.title}</span>
                <span>{product.quantity}</span>
              </div>
            </DropdownItem>
          ))}
          <DropdownItem>
            <a href="/carrito">
              <Button color="primary" style={btn100pc}>
                Comprar
              </Button>
            </a>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
