import htmlColorPicker from '../html/ColorPicker.html';
import htmlInputText from '../html/InputText.html';
import htmlInputNumber from '../html/InputNumber.html';
import htmlFieldDataLoaded from '../html/FieldDataLoaded.html';
import htmlDeleteConfirm from '../html/DeleteElementContent.html';
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

    static buildFinishFielDataLoadModalDialog(title, unpositionedObjects) {
        var options = {
            id: "htmlFieldDataLoaded",
            title: title,
            iconFont: 'fas fa-info',
            buttons: [{ name: "Aceptar", className: "btn btn-primary" }
            ]
        };
        let fieldDataLoadedHtml = new UIElement('fieldDataLoadedHtml', '', htmlFieldDataLoaded);
        if(unpositionedObjects.length >0){                  
            let unpos = fieldDataLoadedHtml.findDomElement('unpositioned');        
            unpos.innerHTML = unpositionedObjects;
            fieldDataLoadedHtml.findDomElement('unpositionedDiv').hidden = false;
        }
        
        return new PromptModalDialog(options, fieldDataLoadedHtml);
    }

}