import Select, { SelectEventType } from 'ol/interaction/Select';
import CroquisTool from '../CroquisTool';
import { click } from 'ol/events/condition';
import StyleFactory from '../../style/StyleFactory';

/**
 * Herramienta de selección de un elemento del mapa.
 * El elemento queda marcado como seleccionado y se muestra su información en un panel.
 * @export
 * @class SingleSelectTool
 * @extends {CroquisTool}
 */
export default class SingleSelectTool extends CroquisTool {
    constructor(mapContext) {
        super(mapContext);
        this.interaction = this.createInteraction();

    }

    createInteraction() {
        var select = new Select({
            condition: click,
            style: (feature) => {
                var sf = new StyleFactory();
                return sf.getSelectionStyle(feature);
            }
        });

        select.on('select', (e) => {
            var features = e.target.getFeatures();

            if (features.getLength() == 0) {
                this.hideUIElement();
            } else {               
                for (var i = 0, f; f = features.item(i); i++) {
                    var obj = f.get('croquis-object');
                    this.showUIElment(obj);
                }
            }
        });

        return select;
    }

    deactivate() {
        this.interaction.getFeatures().clear();
        this.hideUIElement();
    }

}