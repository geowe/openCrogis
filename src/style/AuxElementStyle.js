import { Fill, Stroke, Style, Text, Circle as CircleStyle } from 'ol/style';
import Color from './Color';

/**
 * Función de estilo para elementos auxiliares
 *
 * @export
 * @param {AuxElement} element 
 * @returns
 */
export function getAuxElementStyle(element) {
    return () => {
        var width = 3;
        var styles = [
            new Style({
                fill: new Fill({
                    color: Color.DEFAULT_FILL
                })
            }),
            new Style({
                stroke: new Stroke({
                    color: element.getColor() || Color.DEFAULT_AUXELEMENT_STROKE,
                    width: width
                })
            }),
            new Style({
                image: new CircleStyle({
                    radius: width * 2,
                    fill: new Fill({
                        color: Color.DEFAULT_FILL
                    }),
                    stroke: new Stroke({
                        color: element.getColor() || Color.DEFAULT_AUXELEMENT_STROKE,
                        width: width
                    })
                })
            }),
            new Style({
                text: new Text({
                    text: element.getLabel(),
                    textBaseline: 'top',
                    font: '24px Arial',
                    fill: new Fill({ color: element.getColor() })
                })
            })
        ];

        return styles;
    }

}