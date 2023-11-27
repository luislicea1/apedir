import React, { memo, useCallback , useState} from "react";
import Producto from "./Producto";
import TituloDeProductos from "./TituloDeProductos";
import "./productos.css";
import "./responsive.css"
import { grid_3_col } from "../../styles/styles";


// Envolviendo el componente Producto con React.memo
const ProductoMemo = memo(Producto);

export default function ListadoProductos(props) {
  const list = props.lista;
  const [carrito, setCarrito] = useState([]);
  //const [lastViewedTitle, setLastViewedTitle] = useState([]);
  

  const changeTitle = (title) =>{
    //setLastViewedTitle(title);
    //alert(title)
    props.onChangeTitle(title);
  }
  
  const handleAddToCart = (carrito) => {
    carrito = carrito
    props.onChangeCarrito(carrito)
    console.log(carrito)
   };

  // Usando useCallback para evitar la creación de nuevas funciones en cada renderizado
  const renderProducto = useCallback(
    (item, index) => (
      <ProductoMemo
        key={index}
        index={index}
        img={item.image}
        price={item.price}
        currency={item.currency}
        title={item.name}
        nombre={props.nombre}
        description={item.description}
        localizacion={props.localizacion}
        onChangeCarrito = {handleAddToCart}
      ></ProductoMemo>
    ),
    [props.nombre, props.localizacion]
  );
  
   
  
  return (
    <div>
     <TituloDeProductos title={props.title} onChangeTitle={changeTitle}></TituloDeProductos>

      
      <div className="mt-2 list-container-products" style={grid_3_col}>
        {list.map(renderProducto)}
      </div>
    </div>
  );
}
