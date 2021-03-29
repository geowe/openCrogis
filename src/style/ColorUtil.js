const DEFAUL_COLOR = [0, 100, 255, 1];

/**
 * Devuelve un color Hexadecimal en contraste con el pasado como parámetro. *
 * @export
 * @param {String} hexColor: color hexadecimal a invertir (Ej.: #AA33FA)
 * @param {boolean} whiteBlack: true devuelve blanco o negro. Mejora la visualización
 * @returns
 */
export function invertColor(hexColor, whiteBlack) {
    if (typeof hexColor === 'undefined') {
        return DEFAUL_COLOR;
    }
    if (hexColor.indexOf('#') === 0) {
        hexColor = hexColor.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hexColor.length === 3) {
        hexColor = hexColor[0] + hexColor[0] + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2];
    }
    if (hexColor.length !== 6) {
        console.log('INFO: Invalid HEX color. Returning blue');
        return DEFAUL_COLOR;
    }
    var r = parseInt(hexColor.slice(0, 2), 16),
        g = parseInt(hexColor.slice(2, 4), 16),
        b = parseInt(hexColor.slice(4, 6), 16);
    if (whiteBlack) {
        // decide blanco o negro en función del color de fondo
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ?
            '#000000' :
            '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}