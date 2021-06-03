import htmlColorPicker from '../html/ColorPicker.html';
import htmlInputText from '../html/InputText.html';
import htmlInputNumber from '../html/InputNumber.html';
import htmlDeleteConfirm from '../html/DeleteElementContent.html';
import htmlGpsConfirm from '../html/GpsElementContent.html';
import { UIElement } from 'geowe-ui-js/api/base/UIElement';
import PromptModalDialog from './PromptModalDialog';

/**
 * Factoría responsable de facilitar los diálogos modales
 * TODO: sería interesante reutilizar el diálogo modal y no crear varios
 * @export
 * @class ModalDialogFactory
 */
export default class ModalDialogFactory {

    static buildColorModalDialog() {
        var options = {
            id: "colorPickerDialog",
            title: "Cambie el color del elemento",
            iconFont: 'fas fa-palette',
            buttons: [{ name: "Aceptar", className: "btn btn-primary" },
                { name: "Cancelar" }
            ]
        };
        let colorPickerHtml = new UIElement('colorPickerHtml', '', htmlColorPicker);

        return new PromptModalDialog(options, colorPickerHtml);
    }


    static buildInputTextModalDialog(title) {
        var options = {
            id: "inputTextDialog",
            title: title,
            iconFont: 'fas fa-keyboard',
            buttons: [{ name: "Aceptar", className: "btn btn-primary" },
                { name: "Cancelar" }
            ]
        };
        let inputTextHtml = new UIElement('inputTextnHtml', '', htmlInputText);

        return new PromptModalDialog(options, inputTextHtml);
    }

    static buildDeleteElementModalDialog() {
        var options = {
            id: "confirmDeteleDialog",
            title: "Eliminar elemento seleccionado",
            iconFont: 'fas fa-trash',
            buttons: [{ name: "Aceptar", className: "btn btn-danger" },
                { name: "Cancelar" }
            ]
        };
        let deleteConfirmtHtml = new UIElement('deteletConfirmtnHtml', '', htmlDeleteConfirm);

        return new PromptModalDialog(options, deleteConfirmtHtml);
    }

    static buildInputNumberModalDialog(title) {
        var options = {
            id: "inputNumberDialog",
            title: title,
            iconFont: 'fas fa-calculator',
            buttons: [{ name: "Aceptar", className: "btn btn-primary" }]
        };
        let inputNumberHtml = new UIElement('inputNumberHtml', '', htmlInputNumber);

        return new PromptModalDialog(options, inputNumberHtml);
    }

  
    static buildGpsRefPointModalDialog() {
        var options = {
            id: "confirmUseGPSDialog",
            title: "Utilizar GPS para situar punto de referencia",
            iconFont: 'fas fa-crosshairs',
            buttons: [{ name: "Aceptar", className: "btn btn-success" },
                { name: "Cancelar" }
            ]
        };
        let gpsConfirmtHtml = new UIElement('gpsConfirmtnHtml', '', htmlGpsConfirm);

        return new PromptModalDialog(options, gpsConfirmtHtml);
    }

}