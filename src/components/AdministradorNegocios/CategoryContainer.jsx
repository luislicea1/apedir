import { Tooltip } from "@nextui-org/react";
import ProductCard from "./ProductCard";
import { Button } from "@nextui-org/react";
import { EditIcon } from "../Icons/Edit/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";

const listContainer = {
  width: "100%",
  display: "grid",
  marginTop: "10px",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "20px",
};

const CategoryContainer = ({
  category,
  products,
  onOpen,
  productInput,
  setProductInput,
  onProductEditOpen,
}) => {
  return (
    <div
      style={{
        borderRadius: "20px",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
        padding: "20px",
        marginBottom: "30px",
      }}
    >
      <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>{category}</h4>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              return updatedState;
            });
            onOpen();
          }}
        >
          Agregar Producto
        </Button>
        <div className="flex" style={{ gap: "10px" }}>
          <Tooltip content="Editar producto">
            <span className="text-lg text-default-500 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Eliminar producto">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="mt-2 list-container" style={listContainer}>
        {products.map((product, index) => (
          <ProductCard
            price={product.price}
            key={index + 1}
            index={index}
            id={product.id}
            img={product.image}
            title={product.name}
            description={product.description}
            onOpen={onOpen}
            productInput={product}
            setProductInput={setProductInput}
            onProductEditOpen={onProductEditOpen}
            isAvalaible={product.isAvalaible}
          />
        ))}
      </div>
    </div>
  );
};
export default CategoryContainer;
