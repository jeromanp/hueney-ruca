export default function handler(req, res) {
  res.status(200).json({
    page_title: "Preguntas frecuentes",
    intro:
      "Si tenes alguna pregunta o sugerencia contactanos por nuestras redes o email!",
    list: [
      {
        title: "Cuál es el horario del Check in y el Check out?",
        content: `El horario de Check-in en Hueney Ruca es a partir de las 14:00 horas y el horario de Check-out es hasta las 12:00 horas. \n\nEstos horarios son necesarios para poder preparar y limpiar adecuadamente las cabañas para los próximos huéspedes. Si necesitas hacer el Check-in antes o el Check-out después de los horarios establecidos, por favor comunícate con nosotros con anticipación para poder hacer los arreglos necesarios.`,
        active: false,
      },
      {
        title: "Tengo una reserva, ¿puedo cambiarla y/o cancelarla?",
        content: `Por supuesto, entendemos que a veces pueden surgir imprevistos o cambios de planes y estamos dispuestos a ayudarte en lo que necesites. Si necesitas cambiar o cancelar tu reserva, por favor ponte en contacto con nosotros lo antes posible para que podamos hacer los arreglos necesarios.\n\nTe recomendamos revisar nuestras políticas de cancelación y cambios en nuestra sección de términos y condiciones para saber cuáles son las condiciones aplicables en tu caso en particular.`,
        active: false,
      },
      {
        title: "¿Puedo pagar el día quen llego?",
        content: `Lamentablemente, no aceptamos pagos en efectivo el día de la llegada. Para confirmar una reserva, es necesario realizar el pago con antelación a través de nuestra página web o por transferencia bancaria. Una vez que se haya realizado el pago, te enviaremos una confirmación por correo electrónico con los detalles de tu reserva.\n\nSi tienes alguna pregunta sobre el proceso de pago o necesitas ayuda para completar tu reserva, no dudes en contactarnos y estaremos encantados de ayudarte en todo lo que podamos.`,
        active: false,
      },
      {
        title: "¿Cómo hago mi reserva?",
        content: `Para realizar una reserva en Hueney Ruca, puedes hacerlo de la siguiente manera:\n\n* Ingresa a nuestra página web y selecciona la cabaña que más se ajuste a tus necesidades y preferencias de viaje.\n\n* Verifica la disponibilidad de la cabaña seleccionada para las fechas que tienes planeado visitarnos.\n\n* Completa el formulario de reserva con tus datos personales y de contacto.\n\n* Realiza el pago correspondiente a través de nuestra página web o por transferencia bancaria.\n\nUna vez que hayamos recibido tu pago, te enviaremos una confirmación por correo electrónico con todos los detalles de tu reserva.\n\nRecuerda que si tienes alguna duda o necesitas ayuda para realizar tu reserva, nuestro equipo de atención al cliente estará disponible para ayudarte en todo lo que necesites.`,
        active: false,
      },
      {
        title: "¿Puedo llevar a mi mascota?",
        content: `En Hueney Ruca entendemos que las mascotas son parte de la familia y sabemos lo importante que es para muchos de nuestros huéspedes poder viajar con ellas. Es por eso que permitimos el ingreso de mascotas de pequeño y mediano tamaño en algunas de nuestras cabañas.\n\nSin embargo, es importante que nos informes previamente si tienes planeado viajar con tu mascota para poder asignarte una cabaña que admita animales y para que podamos informarte sobre nuestras normas y condiciones de estadía con mascotas.`,
        active: false,
      },
      {
        title: "¿Cuáles son las medidas de seguridad en el complejo de cabañas?",
        content: ` En Hueney Ruca nos tomamos muy en serio la seguridad de nuestros huéspedes. Por esta razón, contamos con cámaras de vigilancia en las áreas comunes del complejo, además de personal de seguridad capacitado para atender cualquier emergencia.\n\nAsimismo, nuestras cabañas están equipadas con sistemas de alarma y cajas de seguridad para mayor tranquilidad de nuestros huéspedes.\nTambién contamos con un protocolo de limpieza y desinfección exhaustivo en todas las áreas comunes y en cada una de nuestras cabañas.`,
        active: false,
      },
      {
        title: "¿Debo reservar y/o pagar el estacionamiento?",
        content: `Cada cabaña tiene asignada su propia cochera privada, lo que significa que no tendrá que preocuparse por encontrar estacionamiento. Además, el acceso al estacionamiento es gratuito para todos los huéspedes que se alojan en nuestro complejo de cabañas.\n\nRecomendamos que informe sobre el número de vehículos que traerá al momento de hacer su reserva, para garantizar que se le asigne una cochera privada adecuada a sus necesidades.`,
        active: false,
      },
      {
        title: "¿Hay algún cargo adicional si llego tarde al check-in?",
        content: `Nuestro horario de check-in es flexible y estamos dispuestos a hacer arreglos especiales si es necesario.\n\nSin embargo, si tiene previsto llegar después de las 20:00, le pedimos que nos avise con anticipación para asegurarnos de estar disponibles para recibirlo. \n\nNo se aplicará ningún cargo adicional por llegar tarde al check-in, pero es importante que nos informe con anticipación para evitar cualquier inconveniente.`,
        active: false,
      },
    ],
  });
}
