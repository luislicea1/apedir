import * as yup from "yup";

const BussinessInputSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  description: yup.string().required("La descripción es requerida"),
  email: yup.string().email("Escriba el email correctamente"),
  phone_number: yup.number("El teléfono debe contener solo números"),
  whatsapp: yup.number("El campo de whatsapp requiere el número telefónico"),
  telegramLink: yup
    .string()
    .matches(
      /^https?:\/\/t\.me\/([a-zA-Z0-9_]{5,32})$/,
      "Por favor ingresa una URL de telegram válida."
    ),
  local_phone: yup.number("El teléfono del local solo debe contener números"),
  facebook: yup
    .string()
    .matches(
      /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\.-]*)?$/,
      "Por favor ingresa una URL de Facebook válida."
    ),
  instagram: yup
    .string()
    .matches(
      /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/im,
      "Debe ser un enlace de Instagram válido."
    ),
  linkedin: yup
    .string()
    .matches(
      /^http[s]?:\/\/www\.linkedin\.com\/(in|pub|public-profile\/in|public-profile\/pub)\/([\w]{6}-[\w]{1,}-[\w]+)$/,
      "Por favor ingrese una URL de LinkedIn válida"
    ),
  youtube: yup
    .string()
    .matches(
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/,
      "Por favor ingresa un enlace de YouTube válido"
    ),
  twitter: yup
    .string()
    .matches(
      /^(https?:\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]+)\/status\/(\d+)$/,
      "Por favor, ingresa un enlace de X (Antiguo Twitter) válido"
    )
});

export default BussinessInputSchema;
