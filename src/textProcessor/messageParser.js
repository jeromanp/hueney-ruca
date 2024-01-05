import { getResponse } from "./responses.js";
import { removeAccents } from "./utils.js";

const tags = {
  greetings: ["hola", "como esta", "buen dia", "como va", "buenas"],
  thanks: ["gracias", "nos vemos", "chau", "adios", "suerte"],
  activities: [
    "actividades",
    "evento",
    "charlas",
    "para hacer",
    "visit",
    "excurs",
    "guia",
    "turis",
    "pasear",
    "paseo",
  ],
  location: ["donde", "lugar", "ubicacion", "como llego", "como llegar"],
  booking: ["reserva", "fecha", "como reservar", "disponibilidad"],
  rooms: ["cabanas", "cuartos", "banos", "cabanas disponibles"],
  payments: ["metodos de pago", "efectivo", "tarjeta", "pago", "pagar"],
  comments: ["comentarios", "opiniones", "experiencias"],
  images: ["fotos", "fotografias", "imagenes", "ilustraciones"],
  login: [
    "iniciar sesion",
    "registrarme",
    "registro",
    " cerrar sesion",
    "autenticacion",
    "credenciales de acceso",
    "perfil",
  ],
  //English
  english_greetings: [
    "hello",
    "hi",
    "what's up",
    "good morning",
    "good afternoon",
    "good evening",
    "hey",
  ],
  english_thanks: [
    "thank you",
    "good bye",
    "see you later",
    "bye",
    "good luck",
  ],
  english_activities: [
    "activities",
    "events",
    "what to do",
    "where to visit",
    "where to go",
    "guide",
    "tours",
    "go for a walk",
  ],
  english_location: [
    "where are you located",
    "location",
    "gps",
    "how to get there",
  ],
  english_booking: ["booking", "date", "how to book", "disponibility"],
  english_rooms: ["rooms", "cabin", "bathroom", "available rooms"],
  english_payments: [
    "payment methods",
    "cash",
    "card",
    "payment",
    "pay",
    "credit",
  ],
  english_comments: ["comentaries", "opinions", "experiences", "reviews"],
  english_images: ["photos", "photography", "images", "ilustrations"],
  english_login: [
    "log in",
    "register",
    "sign up",
    "log out",
    "authentication",
    "access",
    "profile",
  ],
};

const getTags = (message) => {
  const tagsDetected = [];
  for (const key in tags) {
    if (checkTag(message, tags[key])) {
      tagsDetected.push(key);
    }
  }
  return tagsDetected;
};

const checkTag = (message, tagValues) => {
  for (let i = 0; i < tagValues.length; i++) {
    if (removeAccents(message.toLowerCase()).includes(tagValues[i])) {
      return true;
    }
  }
  return false;
};

const messageParser = (message) => {
  const tags = getTags(message);
  return getResponse(tags);
};

export default messageParser;
