import { Fill, Stroke, Style, Text, Circle as CircleStyle } from 'ol/style';
import Color from './Color';
import CartographicMeasure from '../model/measure/CartographicMeasure';
import Measure from '../model/measure/Measure';

/**
 * Función de estilo para las medidas.
 * Si es medida cartográfia la línea es discontinua.
 *
 * @export
 * @param {Measure} measure
 * @returns {getMeasureStyle~anonymous} - Función de estilo
 */
export function getMeasureStyle(measure) {
    return () => {
        return new Style({
            stroke: new Stroke({
                color: measure.getColor(),
                width: 2,
                lineDash: getLineDash(measure)
            }),
            text: new Text({
                text: measure.getLabel(),
                placement: 'line',
                textBaseline: 'top',
                font: '24px Arial',
                stroke: new Stroke({ color: measure.getColor() })
            })
        });
    }
}

function getLineDash(measure) {
    var lineDash;
    if (measure instanceof CartographicMeasure) {
        lineDash = [10, 10];
    }
    return lineDash;
}


/**
 * Función de estilo para la herramienta de medir.
 *
 * @export
 * @returns {Style}
 */
export function getMeasureInteractionStyle() {
    return new Style({
        fill: new Fill({
            color: Color.MEASURE_INTERACTION_FILL
        }),
        stroke: new Stroke({
            color: Color.MEASURE_INTERACTION_STROKE,
            lineDash: [10, 10],
            width: 2
        }),
        image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
                color: Color.MEASURE_INTERACTION_STROKE
            }),
            fill: new Fill({
                color: Color.MEASURE_INTERACTION_FILL
            })
        })
    })
}