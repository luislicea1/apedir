import * as yup from "yup";

const ProductInputSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  price: yup
    .number()
    .required("El precio es requerido")
    .positive("El precio debe ser un número positivo"),
  description: yup.string().required("La descripción es requerida"),
});

export default ProductInputSchema;
