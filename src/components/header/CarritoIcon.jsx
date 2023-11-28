import React, { useEffect } from "react";
import { Badge } from "@nextui-org/react";
import "./header.css";

import { grid_4_col, btn100pc } from "../styles/styles";
import LogoCarritoNegro from "../../assets/logoReduce/LogoCarritoNegro";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useCartStore } from "../../hooks/useStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";

/*
export default function Carrito() {
  const [isInvisible, setIsInvisible] = React.useState(false);
  const carrito = useCartStore((state) => state.cart);
  const setCarrito = useCartStore((state) => state.setCart);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const {isOpen, onOpen, onClose} = useDisclosure();



  useEffect(() => {
    const newTotalPrice = carrito.reduce((total, product) => total + product.price, 0);
    setTotalPrice(newTotalPrice);
   }, [carrito]);
   

  
 const isCarritoVacio = carrito.length === 0;

  return (
   <div className="mt-2">
     {isCarritoVacio ? (         
         <LogoCarritoNegro w={30} />

     ) : (
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
              
               <div style={grid_4_col}>
                <img src={product.image} alt={product.title} width="50px" />
                <span><p style={{maxWidth: "10ch", overflow: "hidden", textOverflow: "ellipsis"}}>{product.title}</p></span>
                <span>{product.quantity}</span>
                <span>$ {product.price}</span>
               </div>
               
             
             </DropdownItem>
           ))}

           <DropdownItem aria-label="carrito">
            
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "10px"}}>
              <p>Precio total: </p>
              <strong>$ {totalPrice}</strong>
            </div>
           

             <a href="/carrito">
               <Button color="primary" style={btn100pc}>
                Comprar
               </Button>
             </a> 
            

             
           </DropdownItem>
         </DropdownMenu>
       </Dropdown>
     )}
   </div>
 );
}*/

export default function Carrito() {
  const [isInvisible, setIsInvisible] = React.useState(false);
  const carrito = useCartStore((state) => state.cart);
  const setCarrito = useCartStore((state) => state.setCart);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const newTotalPrice = carrito.reduce(
      (total, product) => total + product.price,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [carrito]);

  const isCarritoVacio = carrito.length === 0;

  return (
    <div className="mt-2">
      {isCarritoVacio ? (
        <LogoCarritoNegro w={30} />
      ) : (
        <>
          <Button onClick={onOpen} className="carritoBtn2">
            <Badge
              color="danger"
              content={carrito.length}
              isInvisible={isInvisible}
              shape="circle"
            >
              <LogoCarritoNegro w={30} />
            </Badge>
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            scrollBehavior={"inside"}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Carrito
                  </ModalHeader>
                  <ModalBody>
                    {carrito.map((product, index) => (
                      <div key={index}>
                        <div style={grid_4_col}>
                          <img
                            src={product.image}
                            alt={product.title}
                            width="50px"
                          />
                          <span>
                            <p>{product.title}</p>
                          </span>
                          <span>{product.quantity}</span>
                          <span>$ {product.price}</span>
                        </div>
                      </div>
                    ))}

                    <div>
                      <Input
                        type="text"
                        variant="bordered"
                        label="Nombre"
                        placeholder="Escriba el nombre de la persona encargada de resivir el pedido"
                        labelPlacement="outside"
                      />

                      <Textarea
                        variant="bordered"
                        label="Dirección"
                        labelPlacement="outside"
                        placeholder="Dirección a donde enviar el pedido"
                        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                      />

                      <Textarea
                        variant="bordered"
                        label="Algun otro detalle"
                        labelPlacement="outside"
                        placeholder="Existe algun otro detalle como tocar el timbre, cuidado que hay perro, segunda planta etc que quieras añadir"
                        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Enviar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
}
