import html from '../html/CroquisObjectInfo.html';
import { SideNav } from "geowe-ui-js/api/sidenav/SideNav";
import { UIElement } from 'geowe-ui-js/api/base/UIElement';
import Measure from '../../model/measure/Measure';
import { formatLength } from '../../tool/MeasureUtil';
import Alert from '../Alert';

/**
 * Responsable de presentar la información alfanumérica de un elemento del mapa
 * Permite actualizar la observación asociada.
 * @export
 * @class CroquisObjectInfoSideNav
 */
export default class CroquisObjectInfoSideNav {
    constructor() {
        this.croquisObject;
        this.sideNav = new SideNav({ id: 'elemntInfoSideNav' });
        this.sideNav.setTitle(`<i class="fas fa-info-circle fa-2x ml-1 mt-1 text-light"> Elemento</i>`);
        this.sideNav.closeButton.style.visibility = "hidden"
        this.sideNav.setClassName('crogis-sidenav');

        var croquisObjectInfoPanel = new UIElement('croquisObjectInfoPanel', '', html);
        this.sideNav.addUIElement(croquisObjectInfoPanel);

        var updateButton = this.sideNav.findDomElement('updateObservationBtn');
        updateButton.onclick = () => {
            this.croquisObject.setObservation(this.sideNav.findDomElement('inputObservation').value);
            Alert.success('<i class="fas fa-check-circle"></i> &#124; Observación actualizada').showForAWhile(3000);
        };

    }

    setData(croquisObject) {
        this.croquisObject = croquisObject;

        this.setObjectObservation();
        this.setObjectLabel();
        this.setObjectMeasure();
    }

    setObjectObservation() {
        var observationElement = this.sideNav.findDomElement('inputObservation');
        var observation = this.croquisObject.getObservation();
        observationElement.value = (observation === undefined) ? '' : observation;

    }

    setObjectLabel() {
        var labelElement = this.sideNav.findDomElement('label');
        var label = this.croquisObject.getLabel();
        labelElement.innerHTML = (label === undefined) ? 'No tiene etiqueta' : label;
    }

    setObjectMeasure() {
        var measureSection = this.sideNav.findDomElement('measure-section');
        if (this.croquisObject instanceof Measure) {
            var measureElement = this.sideNav.findDomElement('measure');
            var measure = this.croquisObject.getMeasureValue();
            measureElement.innerHTML = (measure === undefined) ? '' : formatLength(measure);
            measureSection.style.visibility = 'visible';
        } else {
            measureSection.style.visibility = "hidden"

        }

    }



    hide() {
        this.sideNav.hide();
    }

    show() {
        this.sideNav.show();
    }
}