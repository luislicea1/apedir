import * as yup from "yup";

const BussinessInputSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  description: yup.string().required("La descripción es requerida"),
  email: yup.string().email("El email está incorrecto."),
  phone_number: yup.number("El teléfono debe contener solo números"),
  local_phone: yup.number("El teléfono del local debe contener solo números"),
  whatsapp: yup.number("El campo de whatsapp requiere el número telefónico"),
  local_phone: yup.number("El teléfono del local solo debe contener números"),
});

export default BussinessInputSchema;
