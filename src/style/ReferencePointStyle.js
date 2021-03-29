import { Fill, Icon, Stroke, Style, Text } from 'ol/style';
import { invertColor } from './ColorUtil';
/**
 * Función de estilo para los puntos de referencia.
 *
 * @export
 * @param {ReferencePoint} referencePoint
 * @returns {getReferencePointStyle~anonymous} - Función de estilo
 */
export function getReferencePointStyle(referencePoint) {
    return () => {
        return new Style({
            image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: referencePoint.getImg(),
                color: referencePoint.getColor()
            }),
            text: new Text({
                text: referencePoint.getLabel(),
                font: '18px Arial',
                stroke: new Stroke({ color: referencePoint.getColor(), width: 3 }),
                fill: new Fill({ color: invertColor(referencePoint.getColor(), 'false') })
            })
        });
    }
}