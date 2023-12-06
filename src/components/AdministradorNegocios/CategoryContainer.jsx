import React, { useState, useEffect } from "react";
import { Tooltip } from "@nextui-org/react";
import ProductCard from "./ProductCard";
import { Button } from "@nextui-org/react";
import { EditIcon } from "../Icons/Edit/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";
import { grid_3_col, grid_1_col } from "../styles/styles";

export default function CategoryContainer({
  category,
  products,
  onOpen,
  setProductInput,
  onProductEditOpen,
  onProductDeleteOpen,
  categoryInput,
  onCategoryEditOpen,
  onCategoryDeleteOpen,
}) {
  // const [windowWidth, setWindowWidth] = useState(window.screen.width);
  // useEffect(() => {
  //   const handleResize = () => setWindowWidth(window.screen.width);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <div
      style={{
        borderRadius: "20px",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
        padding: "20px",
        marginBottom: "30px",
      }}
    >
      <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
        {category.category}
      </h4>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          className="text-white"
          color="secondary"
          variant="shadow"
          onClick={() => {
            setProductInput((prevState) => {
              const updatedState = {
                ...prevState,
                category: category.id,
              };
              return updatedState;
            });
            onOpen();
          }}
        >
          Agregar Producto
        </Button>
        <div className="flex" style={{ gap: "10px" }}>
          <Tooltip content="Editar categoría">
            <span
              className="text-lg text-default-500 cursor-pointer active:opacity-50"
              onClick={() => {
                categoryInput.current = {
                  ...categoryInput.current,
                  id: category.id,
                  category: category.category,
                };
                onCategoryEditOpen();
              }}
            >
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Eliminar categoría">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => {
                categoryInput.current = {
                  ...categoryInput.current,
                  id: category.id,
                  category: category.category,
                };
                onCategoryDeleteOpen();
              }}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      </div>

      <div
        className="mt-2 list-container"
        // style={windowWidth < 800 ? grid_1_col : grid_3_col}
      >
        {products.map((product, index) => (
          <ProductCard
            price={product.price}
            key={index + 1}
            index={index}
            id={product.id}
            img={product.image}
            title={product.name}
            description={product.description}
            currency={product.currency}
            onOpen={onOpen}
            onProductDeleteOpen={onProductDeleteOpen}
            productInput={product}
            setProductInput={setProductInput}
            onProductEditOpen={onProductEditOpen}
            isAvalaible={product.isAvalaible}
          />
        ))}
      </div>
    </div>
  );
}
