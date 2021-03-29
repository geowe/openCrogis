/**
 * Representa un objeto auxiliar dibujado por el usuario en el crqouis.
 * Del que no hay correspondiente categoría.
 * Es un elemento geométrico tipo: Punto, Línea o Polígono.
 * @export
 * @class AuxElement
 */
export default class AuxElement {
    constructor() {
        this.id;
        this.label;
        this.color;
        this.observation;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setLabel(label) {
        this.label = label;
    }

    getLabel() {
        return this.label;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    getObservation() {
        return this.observation;
    }

    setObservation(observation) {
        this.observation = observation;
    }

}