import ContenedorCompras from "./ContenedorCompras";
import React, { useState , useEffect} from "react";

export default function ListadoCompras(props) {
  const [list, setList] = useState(props.lista);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = list.reduce((acc, item) => acc + item.price * item.cantidad, 0);
    setTotalPrice(total);
  }, [list]);

  return (
    <>
      {list.map((item, index) => (
        <ContenedorCompras 
          key={index}
          index={index}
          img={item.img}
          price={item.price}
          title={item.title}
          cantidad={item.cantidad}
          setList={setList}
          onQuantityChange={(newQuantity) => {
            const newList = [...list];
            newList[index].cantidad = newQuantity;
            setList(newList);
          }}
        ></ContenedorCompras>
      ))}
      <div>Total a pagar: {totalPrice}</div>
    </>
  );
}
