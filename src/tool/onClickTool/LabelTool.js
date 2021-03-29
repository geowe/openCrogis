import Select from 'ol/interaction/Select';
import CroquisTool from '../CroquisTool';
import ModalDialogFactory from '../../ui/modalDialog/ModalDialogFactory';

/**
 * Herramienta para cambiar la etiqueta (label que se muestra) de un elemento del mapa.
 * @export
 * @class LabelTool
 * @extends {CroquisTool}
 */
export default class LabelTool extends CroquisTool {
    constructor(mapContext) {
        super(mapContext);
        this.interaction = this.createInteraction();
        this.feature;
    }

    createInteraction() {
        var select = new Select();

        select.on('select', (e) => {

            var features = e.target.getFeatures();

            for (var i = 0, f; f = features.item(i); i++) {
                this.feature = f;
                this.askForLabel();
            }
            select.getFeatures().clear();
        });
        return select;
    }

    askForLabel() {
        let modal = ModalDialogFactory.buildInputTextModalDialog('Escriba una etiqueta para el elemento');
        modal.show();
        modal.setOnAcceptAction(() => {
            let inputValue = modal.getInputValue();            
            let croquisObject = this.feature.get('croquis-object');
            croquisObject.setLabel(inputValue);
            modal.hide();
            this.feature.changed();

        });
    }
}