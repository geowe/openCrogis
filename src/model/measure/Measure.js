export const REAL_MEASURE = 'REAL_MEASURE';
export const CARTOGRAPHIC_MEASURE = 'CARTOGRAPHIC_MEASURE';
export default class Measure {
    constructor(measureValue, type) {
        this.id;
        this.type = type;
        this.measureValue = measureValue;
        this.label;
        this.observation;

    }

    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }

    setMeasureValue(realMeasure) {
        this.measureValue = realMeasure;
    }

    getMeasureValue() {
        return this.measureValue;
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