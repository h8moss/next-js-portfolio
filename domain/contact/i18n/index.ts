import { I18nBody } from "./types";

const i18n: I18nBody = {
  en: {
    captchaErrorText: "Something went wrong verifying your humanity",
    description:
      "Contact me, Daniel Armenta, to talk about possible business or to just say hi",
    emailPlaceholder: "What's your email? (optional)",
    heading: "What do you wanna talk about?",
    messagePlaceholder: "Write your message",
    namePlaceholder: "What's your name?",
    submitErrorMessage:
      "Something went wrong sending your message, try sending me an email instead",
    submitText: "Submit",
    successMessage: "Message successfully sent",
    title: "Contact me",
    validationErrors: {
      invalidMail: "Invalid mail",
      messageTooLong: "Your message shouldn't be longer than 200 characters",
      missingMessage: "This field is required",
      missingName: "This field is required",
    },
  },
  es: {
    captchaErrorText: "Lo siento, no pudimos verificar que no eres un robot",
    description:
      "Contactame, podemos hablar de negocios o puedes solo decir hola",
    emailPlaceholder: "Escribe tu mail (opcional)",
    heading: "¿Quieres hablar conmigo?",
    messagePlaceholder: "Escribe tu mensaje",
    namePlaceholder: "Escribe tu nombre",
    submitErrorMessage:
      "Algo salió mal al enviar el mensaje, por favor contactame por mail",
    submitText: "Enviar",
    successMessage: "Mensaje enviado",
    title: "Contactame",
    validationErrors: {
      invalidMail: "Email no es valido",
      messageTooLong: "El mensaje no debe de contener más de 200 caracteres",
      missingMessage: "Este campo es obligatorio",
      missingName: "Este campo es obligatorio",
    },
  },
};

export default i18n;
