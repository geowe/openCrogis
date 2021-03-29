import Draw from 'ol/interaction/Draw';
import StyleFactory from '../../style/StyleFactory';
import CroquisTool from '../CroquisTool';
import AuxElement from '../../model/auxElement/AuxElement';

export const POINT_ELEMENT = 'Point';
export const LINESTRING_ELEMENT = 'LineString';
export const POLYGON_ELEMENT = 'Polygon';

/**
 * Responsable de dibujar un elemento auxiliar
 * PUNTO, LÍNEA O POLÍGONO
 * @export
 * @class DrawAuxElementTool
 * @extends {CroquisTool}
 */
export class DrawAuxElementTool extends CroquisTool {
    constructor(type, mapContext) {
        super(mapContext)
        this.type = type;
        this.layerBuilder = mapContext.getLayerBuilder();
        this.sf = new StyleFactory();
        this.interaction = this.createInteraction();
    }

    createInteraction() {
        var drawInteraction = new Draw({
            source: this.layerBuilder.getAuxElementLayer().getSource(),
            type: this.type,
            style: this.sf.getDefaultStyles
        });

        drawInteraction.on('drawend', (event) => {

            var feature = event.feature;
            var auxElement = new AuxElement();
            feature.setStyle(this.sf.getAuxElementStyle(auxElement));

            super.askForObservation(auxElement);

            feature.set('croquis-object', auxElement);

        });
        return drawInteraction;
    }


}