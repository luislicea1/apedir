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
import { grid_1_col } from "../styles/styles";

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
  const productInfo = carrito.map((product) => {
    return `${product.title},  Cantidad: ${product.quantity}`;
   });
   
  const [nombre, setNombre] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [detalles, setDetalles] = React.useState("");
  const mensaje = `-------Apedir-------%0A%0ANombre: ${nombre}%0ADirección: ${direccion}%0ADetalles: ${detalles}%0A%0A------Productos------- %0A%0A${productInfo.join("%0A")}`;

  const enviarMensaje = () => {
    //const mensajeCodificado = encodeURIComponent(mensaje);
    const numero = "55641782";
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, "_blank");
  };

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
              content={carrito.length > 9 ? "+9" : carrito.length}
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
            backdrop="blur"
            scrollBehavior={"inside"}
            size="full"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Carrito
                  </ModalHeader>
                  <ModalBody style={{minHeight:"300px", background: "white"}}>
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
                        <hr />
                      </div>
                    ))}

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <p>Precio Total: </p>
                      <strong>$ {totalPrice}</strong>
                    </div>

                    <div style={grid_1_col}> 
                      <Input
                        type="text"
                        variant="bordered"
                        label="Nombre"
                        placeholder="Escriba el nombre de la persona encargada de resivir el pedido"
                        labelPlacement="outside"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />

                      <Textarea
                        variant="bordered"
                        label="Dirección"
                        labelPlacement="outside"
                        placeholder="Dirección a donde enviar el pedido"
                        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />

                      <Textarea
                        variant="bordered"
                        label="Algun otro detalle"
                        labelPlacement="outside"
                        placeholder="Existe algun otro detalle como tocar el timbre, cuidado que hay perro, segunda planta etc que quieras añadir"
                        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                        value={detalles}
                        onChange={(e) => setDetalles(e.target.value)}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onClick={enviarMensaje}>
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
