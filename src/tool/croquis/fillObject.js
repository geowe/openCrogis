import CroquisObject from "../../model/croquisObject/CroquisObject";
import Color from "../../style/Color";

/**
 * Rellena la información alfanumérica para un eleemto del croquis, a partir de un json *
 * @export
 * @param {CroquisObject, ReferencePoint, Measure, AuxElement} croquisObject
 * @param {*} json
 * TODO: COMPROBAR VALORES DE LOS ATRIBUTOS. SI VIENE VACIOS O NO VIENEN PONER POR DEFECTO
 */
export function fillObject(croquisObject, json) {
    croquisObject.setId(json.id);
    croquisObject.setLabel(json.label);
    if (json.color) {
        croquisObject.setColor(json.color);
    }
    croquisObject.setObservation(json.observation);
}