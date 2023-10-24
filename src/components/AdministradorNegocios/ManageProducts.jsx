import ProductCard from "./ProductCard";
import { getProducts } from "../../api/products";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

const listContainer = {
  width: "100%",
  display: "grid",
  marginTop: "20px",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "20px",
};

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div>
      <section style={{ marginTop: "10px" }}>
        <h3>Productos </h3>
        <br />
        <Button className="text-white" color="secondary" variant="shadow">
          Agregar Producto
        </Button>
      </section>

      <div className="mt-2 list-container" style={listContainer}>
        {products.map((product, index) => (
          <ProductCard
            price={product.price}
            key={index + 1}
            index={index}
            img={product.image}
            title={product.name}
          />
        ))}
      </div>
    </div>
  );
}
