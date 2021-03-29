import { Circle } from 'ol/geom';
import { fromExtent } from 'ol/geom/Polygon';
import Draw from 'ol/interaction/Draw';
import StyleFactory from '../../style/StyleFactory';
import CroquisTool from '../CroquisTool';
import CroquisObject from '../../model/croquisObject/CroquisObject';

/**
 * Responsable de dibujar un objeto de croquis (del catálogo)
 *
 * @export
 * @class DrawCroquisObjectTool
 * @extends {CroquisTool}
 */
export default class DrawCroquisObjectTool extends CroquisTool {

    constructor(croquisObjectType, layerBuilder, mapContext) {
        super(mapContext);
        this.croquisObjectType = croquisObjectType;
        this.croquisObject = new CroquisObject(this.croquisObjectType);
        this.layerBuilder = layerBuilder;
        this.sf = new StyleFactory();
        this.interaction = this.createInteraction();

    }

    createInteraction() {
        this.mapContext.removeCurrentInteraction();
        var interaction = new Draw({
            source: this.layerBuilder.getCroquisObjectLayer().getSource(),
            type: 'Circle',
            geometryFunction: function(coordinates, geometry) {
                var center = coordinates[0];
                var last = coordinates[1];
                var dx = center[0] - last[0];
                var dy = center[1] - last[1];
                var radius = Math.sqrt(dx * dx + dy * dy);
                var rotation = Math.PI - Math.atan2(dy, dx);
                geometry = geometry || new Circle(center, radius);
                geometry.setCenter(center);
                geometry.setRadius(radius);
                geometry.set('rotation', rotation);
                return geometry;
            },
            style: this.sf.getCroquisObjectStyleFunction(this.croquisObject)
        });

        interaction.on('drawstart', (evt) => {
            //creamos un objeto nuevo
            this.croquisObject = new CroquisObject(this.croquisObjectType);
        });


        interaction.on('drawend', (evt) => {
            var rotation = evt.feature.getGeometry().get('rotation');
            evt.feature.set('rotation', rotation);

            var geom = fromExtent(evt.feature.getGeometry().getExtent());
            geom.rotate(-rotation, evt.feature.getGeometry().getCenter());
            evt.feature.setGeometry(geom);
            evt.feature.setStyle(this.sf.getCroquisObjectStyleFunction(this.croquisObject));

            super.askForObservation(this.croquisObject);

            evt.feature.set('croquis-object', this.croquisObject);
        });
        return interaction
    }


}