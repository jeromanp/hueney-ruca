//Chechea si un string representa un numero
function isNumeric(num) {
    return !isNaN(num);
}
//Parse el string capacity a un array con las posibles cantidades de huespedes
export function parseCapacityToArray(string) {
    const capacity = [];
    const aux = string.split(" ");
    for (let i = 0; i < aux.length; i++) {
        if (isNumeric(aux[i])) {
            capacity.push(parseInt(aux[i]));
        }
    }
    return capacity;
}
