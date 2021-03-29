import ModalDialogFactory from "../ui/modalDialog/ModalDialogFactory";

/**
 * Clase padre para las herramientas de croquis.
 * Ofrece utilidades comunes a todas las herramientas
 * @export
 * @class CroquisTool
 */
export default class CroquisTool {
    constructor(mapContext) {
        this.mapContext = mapContext;
        this.uiElement;
    }

    getInteraction() {
        return this.interaction;
    }

    setInteraction(interaction) {
        this.interaction = interaction;
    }


    activate() {
        if (!this.interaction.getActive()) {
            this.interaction.setActive(true);
        }
        this.mapContext.setInteraction(this.interaction);

    }

    askForObservation(croquisObject) {
        let modal = ModalDialogFactory.buildInputTextModalDialog('Escriba una observación para el elemento');
        modal.show();
        modal.setOnAcceptAction(() => {
            let inputValue = modal.getInputValue();
            croquisObject.setObservation(inputValue);
            modal.hide();
        });
    }

    setUIElement(uiElement) {
        this.uiElement = uiElement;
    }

    showUIElment(obj) {
        if (this.uiElement) {
            this.uiElement.setData(obj);
            this.uiElement.show();
        }
    }

    hideUIElement() {
        if (this.uiElement) {
            this.uiElement.hide();
        }
    }


}