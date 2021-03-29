import Select from 'ol/interaction/Select';
import CroquisTool from '../CroquisTool';
import ModalDialogFactory from '../../ui/modalDialog/ModalDialogFactory';

/**
 * Herramienta que permite cambiar el color de una feature (elemento del mapa)
 *
 * @export
 * @class ColorTool
 * @extends {CroquisTool}
 */
export default class ColorTool extends CroquisTool {
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
                this.askForColor();
            }
            select.getFeatures().clear();
        });
        return select;
    }

    askForColor() {
        let modal = ModalDialogFactory.buildColorModalDialog();
        modal.show();
        modal.setOnAcceptAction(() => {
            let inputValue = modal.getInputValue();            
            let croquisObject = this.feature.get('croquis-object');
            croquisObject.setColor(inputValue);
            modal.hide();
            this.feature.changed();
        });
    }
}