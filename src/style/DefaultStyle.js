import { Fill, Stroke, Icon, Style, Text, Circle as CircleSytle } from 'ol/style';
import Color from './Color';

/**
 * Función de estilos por defecto
 *
 * @export
 * @returns
 */
export function getDefaultStyle() {

    var width = 2;
    var styles = [
        new Style({
            fill: new Fill({
                color: Color.DEFAULT_FILL
            })
        }),
        new Style({
            stroke: new Stroke({
                color: Color.DEFAULT_STROKE,
                width: width + 2
            })
        }),
        new Style({
            stroke: new Stroke({
                color: Color.DEFAULT_STROKE,
                width: width
            })
        }),
        new Style({
            image: new CircleSytle({
                radius: width * 2,
                fill: new Fill({
                    color: Color.DEFAULT_FILL
                }),
                stroke: new Stroke({
                    color: Color.DEFAULT_STROKE,
                    width: width / 2
                })
            }),
            zIndex: Infinity
        })
    ];

    return styles;
}