import { ModalDialog } from 'geowe-ui-js/api/dialog/ModalDialog';

/**
 * Representa una entidad de diálogo modal que solicita un dato al usuario (input)
 * Si presenta botón Cancelar cierra el diálogo.
 * El boton acetar ejecutará la función establecida en setOnAcceptAction.
 * @export
 * @class PromptModalDialog
 */
export default class PromptModalDialog {
    constructor(options, uiElement) {

        this.modalDialog = new ModalDialog(options);        
        this.modalDialog.addContent(uiElement.getDOMObject());
        this.modalDialog.hideCloseButton();
        if (this.modalDialog.getButton('Cancelar')) {
            this.modalDialog.getButton('Cancelar').onclick = () => {
                this.hide();
            };
        }
        this.croquisObject;
    }

    setData(croquisObject) {
        this.croquisObject = croquisObject;
    }

    setOnAcceptAction(onActionFuncion) {
        this.modalDialog.getButton('Aceptar').onclick = onActionFuncion;
    }

    setOnCancelAction(onActionFuncion) {
        this.modalDialog.getButton('Cancelar').onclick = onActionFuncion;
    }

    getInputValue() {
        return this.getInput().value;
    }

    getInput() {
        return this.modalDialog.findDomElement('inputValue');
    }

    hide() {
        this.modalDialog.hide();
        var modal = document.getElementById(this.modalDialog.getId());
        modal.parentNode.removeChild(modal);
    }

    show() {
        this.modalDialog.show();
    }
}