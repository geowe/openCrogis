import Select from 'ol/interaction/Select';
import CroquisTool from '../CroquisTool';
import CroquisObject from '../../model/croquisObject/CroquisObject';
import Measure from '../../model/measure/Measure';
import ReferencePoint from '../../model/referencePoint/ReferencePoint';
import AuxElement from '../../model/auxElement/AuxElement';
import ModalDialogFactory from '../../ui/modalDialog/ModalDialogFactory';

/**
 * Herramienta para eliminar del mapa un elemento
 *
 * @export
 * @class DeleteOnClickTool
 * @extends {CroquisTool}
 */
export default class DeleteOnClickTool extends CroquisTool {
    constructor(mapContext) {
        super(mapContext);
        this.interaction = this.createInteraction();
        this.layerBuilder = mapContext.getLayerBuilder();
        this.feature;
    }

    createInteraction() {
        var select = new Select();
        select.on('select', (e) => {

            var features = e.target.getFeatures();
            for (var i = 0, f; f = features.item(i); i++) {
                this.feature = f;
                this.deleteFeature();
            }
            select.getFeatures().clear();
        });
        return select;
    }

    deleteFeature() {
        let modal = ModalDialogFactory.buildDeleteElementModalDialog();
        modal.show();
        modal.setOnAcceptAction(() => {            
            let croquisObject = this.feature.get('croquis-object');
            if (croquisObject instanceof ReferencePoint) {
                this.layerBuilder.getReferencePointLayer().getSource().removeFeature(this.feature);
            } else if (croquisObject instanceof Measure) {
                this.layerBuilder.getMeasureLayer().getSource().removeFeature(this.feature);
            } else if (croquisObject instanceof CroquisObject) {
                this.layerBuilder.getCroquisObjectLayer().getSource().removeFeature(this.feature);
            } else if (croquisObject instanceof AuxElement) {
                this.layerBuilder.getAuxElementLayer().getSource().removeFeature(this.feature);
            }
            modal.hide();
        });
    }
}