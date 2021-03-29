import Draw from 'ol/interaction/Draw';
import ReferencePoint from '../../model/referencePoint/ReferencePoint';
import StyleFactory from '../../style/StyleFactory';
import CroquisTool from '../CroquisTool';


/**
 * Responsable de situar en el mapa un punto de referencia
 *
 * @export
 * @class DrawReferencePointTool
 * @extends {CroquisTool}
 */
export default class DrawReferencePointTool extends CroquisTool {
    constructor(mapContext) {
        super(mapContext);
        this.layerBuilder = mapContext.getLayerBuilder();
        this.sf = new StyleFactory();
        this.interaction = this.createInteraction();
    }

    createInteraction() {
        var drawPointInteraction = new Draw({
            source: this.layerBuilder.getReferencePointLayer().getSource(),
            type: 'Point',
            style: this.sf.getDefaultStyles
        });


        drawPointInteraction.on('drawend', (event) => {
            var feature = event.feature;
            var rPoint = new ReferencePoint();
            feature.setStyle(this.sf.getReferencePointStyle(rPoint));

            super.askForObservation(rPoint);

            feature.set('croquis-object', rPoint);

        });
        return drawPointInteraction;
    }


}