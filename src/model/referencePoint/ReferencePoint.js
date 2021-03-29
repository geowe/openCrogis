import Color from '../../style/Color';
/**
 * Representa un punto de referencia.
 * Elemento obligatorio en un croquis.
 * @export
 * @class ReferencePoint
 */
export default class ReferencePoint {
    constructor() {
        this.id;
        this.label;
        this.color = Color.DEFAULT_REFERENCE_POINT_FILL;
        this.observation;
        this.img = new Image();
        this.img.src = 'img/ref-point-marker.png';

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

    getImg() {
        return this.img.src;
    }
}