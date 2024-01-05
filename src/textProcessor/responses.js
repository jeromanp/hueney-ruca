const responses = {
  greetings: "Hola soy el bot de Hueney Ruca, como puedo ayudarlo?",
  thanks: "Saludos, espero haberlo ayudado",
  activities:
    "Cerca del complejo hay muchas actividades para realizar, aqui le dejo una pagina con mas especificaciones y donde tambien puede descargar un folleto con mas informacion: https://hueney-ruca-henry.vercel.app/actividades ",
  location:
    "Nos encontramos en Pasaje 3 241, B7540XAA Villa Arcadia,Provincia de Buenos Aires, Argentina. Tambien le dejo el link para vernos en el mapa: https://shorturl.at/hnEV7 ",
  booking:
    "Puedes reservar de forma rapida y facil desde nuestra home page seleccionando las fechas deseadas o desde nuestra seccion de cabanas",
  rooms:
    "puedes ver toda la informacion sobre nuestras cabanas en nuestra seccion de cabanas dando click en cualquiera de ellas te enviara al detalle",
  payments:
    "Puedes pagar de forma rapida y segura utilizando tu tarjeta de credito o debito durante el proceso de reserva",
  comments:
    "Puedes leer las grandes experiencias de nuestros inquilinos pasados desde la seccion de comentarios, no olvides dejar la tuya cuando nos visites!",
  images:
    "Para visualizar mas a detalle las cabanas entra al detalle de la que desees",
  login:
    "Para reservar es necesario registrarte e iniciar sesion desde la seccion de log in, tambien puedes autenticarte utilizando tu gmail!",
  unknown: "Perdon, no entendi la pregunta",
  //English
  english_greetings: "Hi!, i'm Hueney's Ruca Bot, how can i help you today?",
  english_thanks: "I hope the information was useful for you",
  english_activities:
    "There is a lot of activities to do, you can get all information about it doing click on this link https://hueney-ruca-henry.vercel.app/actividades",

  english_location:
    "We are located at Pasaje 3 241, B7540XAA Villa Arcadia,Provincia de Buenos Aires, Argentina, there is also a link where you can see our gps location at google maps https://shorturl.at/hnEV7 ",
  english_booking:
    "You can book quickly and easily from our home page by selecting the desired dates or from our cabins section",
  english_rooms:
    "You can see all the information about our cabins in our cabins section by clicking on any of them it will send you the details",
  english_payments:
    "You can pay quickly and safely using your credit or debit card during the reservation process",
  english_comments:
    "You can read the great experiences of our past tenants from the comments section, don't forget to leave yours when you visit us!",
  english_images:
    "To view the cabins in more detail, enter the detail of the one you want",
  english_login:
    "To reserve it is necessary to register and log in from the log in section, you can also authenticate yourself using your gmail!",
  english_unknown:
    "Im sorry i did not understand the question, please try again",
};

export const getResponse = (tags) => {
  let response = "";
  if (tags.length === 0) {
    return responses.unknown;
  }
  for (let i = 0; i < tags.length; i++) {
    response = response + responses[tags[i]] + "\n";
  }
  return response;
};
