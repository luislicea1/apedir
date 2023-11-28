import React, { useEffect } from "react";
import { Badge } from "@nextui-org/react";
//import { CartIcon } from "../Icons/CartIcon/CartIcon";
import { grid_3_col, btn100pc } from "../styles/styles";
import LogoCarritoNegro from "../../assets/logoReduce/LogoCarritoNegro";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useCartStore } from "../../hooks/useStore";

// En el componente Carrito
export default function Carrito() {
  const [isInvisible, setIsInvisible] = React.useState(false);
  const carrito = useCartStore((state) => state.cart);
  const setCarrito = useCartStore((state) => state.setCart);

  useEffect(() => {
    console.log(carrito);
  }, [carrito]);

  
  return (
    <div className="mt-2">
      <Dropdown aria-label="carrito">
        <DropdownTrigger aria-label="carrito">
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
        <DropdownMenu aria-label="carrito" className="no-hover">
          {carrito.map((product, index) => (
            <DropdownItem key={index}>
              <div style={grid_3_col}>
                <img src={product.image} alt={product.title} width="50px" />
                <span>{product.title}</span>
                <span>{product.quantity}</span>
                <span>$ {product.price}</span>
              </div>
            </DropdownItem>
          ))}
          <DropdownItem aria-label="carrito">
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
