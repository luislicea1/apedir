import Imagen2 from "../../assets/comidas/comida (3).png";
import Imagen3 from "../../assets/comidas/comida (4).png";
import ListadoCompras from "./ListadoCompras";
import InputsPedido from "./InputsPedido";

const carrito = [
  {
    title: "Brochetas",
    img: Imagen3,
    cantidad: 1,
    price: 5,
  },
  {
    title: "Carne",
    img: Imagen2,
    cantidad: 3,
    price: 10,
  },
];
export default function ComprasSection() {
  const contenedor = {
    display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
    gap: "10px",
    padding: "20px",
  };
  return (
    <div style={contenedor}>
      <ListadoCompras lista={carrito}></ListadoCompras>
      <InputsPedido></InputsPedido>
    </div>
  );
}
