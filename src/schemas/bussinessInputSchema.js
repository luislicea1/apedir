import * as yup from "yup";

const BussinessInputSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  description: yup.string().required("La descripción es requerida"),
  email: yup.string().email("El email está incorrecto."),
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
    .test(
      "facebook",
      "Por favor ingresa una URL de Facebook válida.",
      (value) => {
        if (value) {
          return /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\.-]*)?$/.test(
            value
          );
        }
        return true;
      }
    ),
  instagram: yup
    .string()
    .test("instagram", "Debe ser un enlace de Instagram válido.", (value) => {
      if (value) {
        return /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/im.test(
          value
        );
      }
      return true;
    }),
  linkedin: yup
    .string()
    .test(
      "linkedin",
      "Por favor ingrese una URL de LinkedIn válida",
      (value) => {
        if (value) {
          return /^http[s]?:\/\/www\.linkedin\.com\/(in|pub|public-profile\/in|public-profile\/pub)\/([\w]{6}-[\w]{1,}-[\w]+)$/.test(
            value
          );
        }
        return true;
      }
    ),
  twitter: yup
    .string()
    .nullable()
    .test(
      "twitter",
      "Por favor, ingresa un enlace de X (Antiguo Twitter) válido",
      (value) => {
        if (value) {
          return /^(https?:\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]+)\/status\/(\d+)$/.test(
            value
          );
        }
        return true;
      }
    ),
  youtube: yup
    .string()
    .test(
      "youtube",
      "Por favor ingresa un enlace de YouTube válido",
      (value) => {
        if (value) {
          return /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/.test(
            value
          );
        }
        return true;
      }
    ),
});

export default BussinessInputSchema;
