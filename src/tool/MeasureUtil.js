import { getArea, getLength } from 'ol/sphere';

/**
 * Formatea la distancia (length) de la línea, incluyendo la unidad (m ó km).
 * @param  {Number} length    distancia de la línea.
 * @return {String} La distancia que mide la línea en m ó km
 */
export function formatLength(length) {
    var output;
    if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + 'km';
    } else {
        output = (Math.round(length * 100) / 100) +
            ' ' + 'm';
    }
    return output;
}

/**
 * Formatea el área del polígono, incluyendo la unidad (m2 ó km2).
 * @param  {Number} area   área del polígono
 * @return {String}  El área del polígono en m2 o km2
 */
export function formatArea(area) {
    var output;
    if (area > 10000) {
        output = (Math.round(area / 1000000 * 100) / 100) +
            ' ' + 'km<sup>2</sup>';
    } else {
        output = (Math.round(area * 100) / 100) +
            ' ' + 'm<sup>2</sup>';
    }
    return output;
};