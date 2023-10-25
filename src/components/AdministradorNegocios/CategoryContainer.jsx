import ProductCard from "./ProductCard";
import { Button } from "@nextui-org/react";

const listContainer = {
  width: "100%",
  display: "grid",
  marginTop: "10px",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "20px",
};

const CategoryContainer = ({ category, products, onOpen, setProductInput }) => {
  return (
    <div
      style={{
        borderRadius: "20px",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
        padding: "20px",
        marginBottom: "30px",
      }}
    >
      <h4 style={{ marginTop: "10px" }}>{category}</h4>
      <Button
        className="text-white"
        color="secondary"
        variant="shadow"
        onClick={() => {
          setProductInput((prevState) => {
            const updatedState = {
              ...prevState,
              category: category,
            };

            console.log(updatedState);

            return updatedState;
          });
          onOpen();
        }}
      >
        Agregar Producto
      </Button>

      <div className="mt-2 list-container" style={listContainer}>
        {products.map((product, index) => (
          <ProductCard
            price={product.price}
            key={index + 1}
            index={index}
            img={product.image}
            title={product.name}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
};
export default CategoryContainer;
