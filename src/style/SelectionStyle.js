import { Fill, Stroke, Icon, Style, Text, Circle as CircleSytle } from 'ol/style';
import { Point, LineString } from 'ol/geom';
import { getCenter } from 'ol/extent';
import CroquisObject from '../model/croquisObject/CroquisObject';
import ReferencePoint from '../model/referencePoint/ReferencePoint';
import Color from './Color';
import { Feature } from 'ol';


/**
 * Estilo para el elemento seleccionado
 * TODO: revisar para mejora
 * @export
 * @param {Feature} feature
 * @returns {Array} array de estilos.
 */
export function getSelectionStyle(feature) {
    var v = feature.get('croquis-object');
    if (v instanceof CroquisObject) {
        var styles = [
            new Style({
                geometry: new Point(getCenter(feature.getGeometry().getExtent())),
                image: new Icon({
                    src: v.getImg(),
                    scale: 0.25, 
                    color: Color.SELECTION_FILL,
                    rotation: feature.get('rotation')
                }),
                text: new Text({
                    text: 'Seleccionado',
                    font: '24px Arial',
                    stroke: new Stroke({ color: Color.SELECTION_STROKE })
                })
            })
        ]
        return styles;
    } else if (v instanceof ReferencePoint) {
        var styles = [
            new Style({
                image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: v.getImg(),
                    color: 'yellow'
                }),
                text: new Text({
                    text: 'Seleccionado',
                    font: '18px Arial',
                    stroke: new Stroke({ color: Color.SELECTION_STROKE })
                }),
                stroke: new Stroke({
                    color: Color.SELECTION_STROKE,
                    width: 5
                })
            })
        ];
        return styles;
    } else {
        var styles = [
            new Style({
                text: new Text({
                    text: 'Seleccionado',
                    font: '18px Arial',
                    stroke: new Stroke({ color: Color.SELECTION_STROKE })
                }),
                stroke: new Stroke({
                    color: Color.SELECTION_STROKE,
                    width: 5
                }),
                image: new CircleSytle({
                    radius: 10,
                    stroke: new Stroke({
                        color: Color.SELECTION_STROKE,
                        width: 3
                    })
                }),
            })
        ];
        return styles;
    }
}