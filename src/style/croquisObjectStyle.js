import { Fill, Stroke, Icon, Style, Text } from 'ol/style';
import { Point, LineString } from 'ol/geom';
import { getCenter } from 'ol/extent';
import { getDefaultStyle } from './DefaultStyle';
import { invertColor } from './ColorUtil';

/**
 * Función de estilo para objetos de croquis.
 *
 * @export
 * @param {CroquisObject} croquisObject
 * @returns
 */
export function croquisObjectStyle(croquisObject) {
    return (feature, resolution) => {
        var resAdjust = 150 * resolution;
        var rotation = feature.get('rotation');
        var croquisObjectStyle = croquisObject.getStyle();
        if (rotation !== undefined) {

            var extent = feature.getGeometry().getExtent();
            var coordinates = feature.getGeometry().getCoordinates()[0];
            var tl = coordinates[0];
            var bl = coordinates[1];
            var br = coordinates[2];
            var tr = coordinates[3];

            var center = getCenter(extent);
            var top = new LineString([tl, tr]).getClosestPoint(center);
            var left = new LineString([tl, bl]).getClosestPoint(center);

            var dx = center[0] - left[0];
            var dy = center[1] - left[1];
            var scaleX = Math.sqrt(dx * dx + dy * dy) / resAdjust;

            var dx = top[0] - center[0];
            var dy = top[1] - center[1];
            var scaleY = Math.sqrt(dx * dx + dy * dy) / resAdjust;

            var scaledImageStyle = new Style({
                geometry: new Point(center),
                image: new Icon({
                    src: croquisObject.getScaledImage(scaleX, scaleY),
                    rotation: rotation,
                    color: croquisObject.getColor()
                }),
                text: new Text({
                    text: croquisObject.getLabel(),
                    font: '24px Arial',
                    fill: new Fill({ color: invertColor(croquisObject.getColor(), 'true') }),
                    stroke: new Stroke({ color: croquisObject.getColor(), width: 3 }),
                })
            });
            //return this.getDefaultStyles().concat([treeStyle2]);
            return scaledImageStyle;

        } else if (feature.getGeometry().getCenter) {
            croquisObjectStyle.setGeometry(new Point(feature.getGeometry().getCenter()));
            croquisObjectStyle.getImage().setRotation(feature.getGeometry().get('rotation'));
            croquisObjectStyle.getImage().setScale(feature.getGeometry().getRadius() / (150 * resolution));
            return croquisObjectStyle;
        } else {
            return getDefaultStyle();
        }
    }
}