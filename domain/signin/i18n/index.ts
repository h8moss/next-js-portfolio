import { I18nBody } from "./types";

const i18n: I18nBody = {
  es: {
    registeringErrorMessage:
      "Algo salió mal al registrarte, por favor intentalo de nuevo más tarde o házmelo saber usando la página de contacto",
    signinErrorMessage:
      "Algo salió mal al iniciar sesión, asegurate de que tu email y contraseña sean correctos",
    emailTxt: "Email",
    passwordTxt: "Contraseña",
    registerTxt: "Registrarse",
    repeatTxt: "Repetir contraseña",
    signinTxt: "Iniciar sesión",
    signinWithGoogleTxt: "Iniciar sesión con Google",
    switchToRegisterTxt: "¿No tienes una cuenta? Crea una",
    switchToSigninTxt: "¿Ya tienes una cuenta? Inicia sesión",
    orTxt: "o",
    errorMessages: {
      invalidEmail: "El email no es valido",
      passwordLength: "La contraseña es demasiado corta",
      passwordLengthMin: "La contraseña debe de tener al menos 9 caracteres",
      passwordMatch: "Las contraseñas no son iguales",
      passwordMustContain:
        "La contraseña debe de tener dos de los siguientes: letras minúsculas, letras mayúsculas, números, símbolos (@#!=)",
      required: "Este campo es necesario",
    },
  },
  en: {
    registeringErrorMessage:
      "Something went wrong with your registration, please try again later or inform me through the contact form",
    signinErrorMessage:
      "Something went wrong signing you in, please make sure your email and password are correct",
    emailTxt: "Email",
    passwordTxt: "Password",
    registerTxt: "Register",
    repeatTxt: "Repeat password",
    signinTxt: "Sign in",
    signinWithGoogleTxt: "SignInWithGoogle",
    switchToRegisterTxt: "Don't have an account? Register",
    switchToSigninTxt: "Already have an account? Sign in",
    orTxt: "or",
    errorMessages: {
      invalidEmail: "Email is invalid",
      passwordLength: "Password is too short",
      passwordLengthMin: "Password must be at least 9 characters long",
      passwordMatch: "Passwords don't match",
      passwordMustContain:
        "Password must contain two of the following: a lower case letter, an upper case letter, a number, a rare character (@#!=)",
      required: "This field is required",
    },
  },
};

export default i18n;
