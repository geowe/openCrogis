import Draw from 'ol/interaction/Draw';
import RealMeasure from '../../model/measure/RealMeasure';
import StyleFactory from '../../style/StyleFactory';
import CroquisTool from '../CroquisTool';
import { formatLength } from '../MeasureUtil';
import ModalDialogFactory from "../../ui/modalDialog/ModalDialogFactory";

/**
 * Responsable de dibujar una medida real tomada en campo, representada por una línea
 *
 * @export
 * @class DrawRealMeasureTool
 * @extends {CroquisTool}
 */
export default class DrawRealMeasureTool extends CroquisTool {
    constructor(mapContext) {
        super(mapContext)
        this.layerBuilder = mapContext.getLayerBuilder();
        this.sf = new StyleFactory();
        this.interaction = this.createInteraction();
        this.feature;
    }

    createInteraction() {
        var drawMeasureInteraction = new Draw({
            source: this.layerBuilder.getMeasureLayer().getSource(),
            type: 'LineString',
            style: this.sf.getDefaultStyles
        });

        drawMeasureInteraction.on('drawend', (event) => {
            this.feature = event.feature;
            this.askForRealMeasure();
        });
        return drawMeasureInteraction;
    }

    askForRealMeasure() {
        let modal = ModalDialogFactory.buildInputNumberModalDialog('Indique la distancia real (metros)');
        modal.show();
        modal.setOnAcceptAction(() => {
            let inputMeasure = modal.getInputValue();
            let realMeasure = new RealMeasure(inputMeasure);
            realMeasure.setLabel(formatLength(inputMeasure));
            this.feature.setStyle(this.sf.getMeasureStyle(realMeasure));

            super.askForObservation(realMeasure);
            
            this.feature.set('croquis-object', realMeasure);
            modal.hide();
        });
    }


}