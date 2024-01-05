import axios from "axios";
import Swal from "sweetalert2";
import swalError from './swalError.js';

/**
 * Recibe un string para lanzar una alerta y elegir la accion a tomar.
 *
 *
 * @param {String}   instancia           La instancia que se trata.
 * @param {Number}   id           El id de la instancia a borrar/suspender.
 * @param {Function}   setter           setState a ejecutar.
 * @param {Object}   data           Estado a filtrar con setState.
 * @param {String}   route           Ruta de la api (DELETE/PUT /api/${route}/${id}).
 */

export default async function swalAction(instancia, id, setter, data, route, suspended) {
    // Para saber si la instancia es el o la
    const resultado = { result: null, realizado: false };
    const articulo =
        instancia.slice(-1) === 'a'
            ? 'la'
            : 'el';

    // Lanza el swal principal
    await Swal.fire({
        title: '¿Que acción querés tomar?',
        icon: 'question',
        allowEnterKey: false,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: suspended ? 'Habilitar' : 'Suspender',
        confirmButtonAriaLabel: suspended ? 'Habilitar' : 'Suspender',
        denyButtonText: 'Eliminar',
        denyButtonAriaLabel: 'Eliminar',
        cancelButtonText: 'Ninguna',
        reverseButtons: true,
        preConfirm: async () => {
            // Suspensión de instancia
            try {
                // Envía un query 'true' para dar el toggle, no es explicitamente el valor de suspended
                return await axios.put(`/api/${route}/${id}?suspend=true`);
            } catch (error) {
                swalError()
                return 'error';
            }
        },
        preDeny: async () => {
            // Borrado logico de instancia
            try {
                return await axios.delete(`/api/${route}/${id}`);
            } catch (error) {
                swalError()
                return 'error';
            }
        }
    })
        // Si no fue cancelado, actua (pre👆) y responde con otro swal
        .then((result) => {
            if (!result.isDismissed && result.value !== 'error') {
                Swal.fire(
                    'Listo!',
                    `Se ${result.isConfirmed ? suspended ? 'habilitó' : 'suspendió' : 'borró'} ${articulo} ${instancia}.`,
                    'success',
                )
                const finded = data.find(data => data.id === id);
                result.isConfirmed ? finded.suspended = !finded.suspended :
                finded.deleted_at = Date.now();
                setter([
                    ...data.filter(dato => dato.id !== finded.id),
                    finded
                ]);
                resultado.result = result.value.data;
                resultado.realizado = true;
            }
        })
    return resultado
}
