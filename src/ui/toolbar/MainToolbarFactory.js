import Bar from 'ol-ext/control/Bar';
import Toggle from 'ol-ext/control/Toggle';
import DrawReferencePointTool from '../../tool/drawTool/DrawReferencePointTool';
import { MeasureTool, MEASURE_TYPE_LENGTH } from '../../tool/drawTool/MeasureTool';
import DeleteOnClickTool from '../../tool/onClickTool/DeleteOnClickTool';
import SingleSelectTool from '../../tool/onClickTool/SingleSelectTool';
import Alert from '../Alert';
import COISideNav from '../sideNav/CroquisObjectInfoSideNav';
import { getDrawAuxElementToolBar } from './DrawAuxElementSubbar';
import { getModifyToolBar } from './ModifyElementSubbar';
import ModalDialogFactory from '../../ui/modalDialog/ModalDialogFactory';

export default class UIFactory {

    static buildOlExtToolBar(mapContext) {
        
        var alertInfo = new Alert('alert-info');
        
        var toggleBar = new Bar({ toggleOne: true, group: true });
        toggleBar.setPosition('bottom-center');  


        var panButton = new Toggle({
            html: '<i class="far fa-hand-paper"></i>',
            className: "pan",
            title: "Mueve el mapa",
            active: true,
            onToggle: function(active) {
                if (active) {
                    mapContext.removeCurrentInteraction();
                    mapContext.setCursor('grab');
                }
            }
        });
        toggleBar.addControl(panButton);


        var singleSelectTool = new SingleSelectTool(mapContext);
        var elementInfoSideNav = new COISideNav();
        singleSelectTool.setUIElement(elementInfoSideNav);
        var selectButton = new Toggle({
            html: '<i class="fas fa-mouse-pointer"></i>',
            className: "select",
            title: "Selecciona un elemento",
            onToggle: function(active) {
                if (active) {
                    alertInfo.setContent('<i class="fas fa-mouse-pointer"></i> &#124; Pulse un elemento para seleccionarlo').show();
                    singleSelectTool.activate();
                    mapContext.setCursor('auto');
                }
            }
        });
        selectButton.on('change:active', (event) => {
            if (!event.active) {
                alertInfo.hide();
                singleSelectTool.deactivate();
            }
        });
        toggleBar.addControl(selectButton);
        

        var drawReferencePointTool = new DrawReferencePointTool(mapContext);
        var referencePointButton = new Toggle({
            html: '<i class="fas fa-map-marker-alt"></i>',
            className: "rfPoint",
            title: "Situa un Punto de Referencia",
            onToggle: function(active) {
                if (active) {                    
                    let modal = ModalDialogFactory.buildGpsRefPointModalDialog();
                    modal.show();
                    modal.setOnAcceptAction(() => {
                        let infoText = 'El punto de referencia se situa según GPS.';
                        alertInfo.setContent('<i class="fas fa-crosshairs"></i> &#124; '+infoText).show();
                        mapContext.setCursor('not-allowed');
                        drawReferencePointTool.useGPS(true);
                        modal.hide();
                        drawReferencePointTool.activate();
                    });
                    modal.setOnCancelAction(() => {
                        let infoText = 'Pulse en el mapa para situar un Punto de Referencia';
                        alertInfo.setContent('<i class="fas fa-map-marker-alt"></i> &#124; '+infoText).show();
                        mapContext.setCursor('crosshair');                  
                        drawReferencePointTool.useGPS(false);
                        modal.hide();
                        drawReferencePointTool.activate();
                    });                                        
                }
            }
        });
        referencePointButton.on('change:active', (event) => {
            if (!event.active) {
                alertInfo.hide();
                drawReferencePointTool.useGPS(false);
                mapContext.removeCurrentInteraction();
            }
        });
        toggleBar.addControl(referencePointButton);

        var modifyElementSubBar = getModifyToolBar(mapContext, alertInfo);
        var modifyElementButton = new Toggle({
            html: '<i class="fas fa-edit"></i>',
            className: "modify",
            title: "Modifica un elemento",
            bar: modifyElementSubBar,
            onToggle: function(active) {
                if (active) {
                    alertInfo.setContent('<i class="fas fa-edit"></i> &#124; Seleccione una herramienta para modificar el elemento')
                        .show();
                }                
            }
        });
        modifyElementButton.on('change:active', (event) => {
            modifyElementSubBar.deactivateControls();
            if (!event.active) {
                alertInfo.hide();
            }
        });
        toggleBar.addControl(modifyElementButton);
        
       var drawGeomSubBar = getDrawAuxElementToolBar(mapContext, alertInfo);
       var drawGeomButton = new Toggle({
           html: '<i class="fas fa-pencil-alt"></i>',
           className: "ruler",
           title: "Dibuja una geometría",
           bar: drawGeomSubBar,
           onToggle: function(active) {
               if (active) {
                   alertInfo.setContent('<i class="fas fa-pencil-alt"></i> &#124; Seleccione una herramienta para dibujar.')
                       .show();
               }
               mapContext.setCursor('crosshair');
           }
       });
       drawGeomButton.on('change:active', (event) => {
           drawGeomSubBar.deactivateControls();
           if (!event.active) {
               alertInfo.hide();
           }
       });
       toggleBar.addControl(drawGeomButton);


        var measureTool = new MeasureTool(MEASURE_TYPE_LENGTH, mapContext)
        var rulerButton = new Toggle({
            html: '<i class="fas fa-ruler"></i>',
            className: "ruler",
            title: "Mide una distancia",
            onToggle: function(active) {
                if (active) {
                    alertInfo.setContent('<i class="fas fa-ruler"></i> &#124; Pulse en el mapa par comenzar a medir (doble pulsación para finalizar)')
                        .show();
                    measureTool.activate();
                    mapContext.setCursor('crosshair');
                }
            }
        });
        rulerButton.on('change:active', (event) => {            
            if (!event.active) {
                measureTool.deactivate();
                alertInfo.hide();
            }
        });
        toggleBar.addControl(rulerButton);        


        var deleteOnClickTool = new DeleteOnClickTool(mapContext)
        var deleteFetureButton = new Toggle({
            html: '<i class="fas fa-trash"></i>',
            className: "delete",
            title: "delete feature",
            onToggle: function(active) {
                if (active) {
                    alertInfo.setContent('<i class="fas fa-trash"></i> &#124; Pulse en un elemento para eliminarlo')
                        .show();
                    deleteOnClickTool.activate();
                    mapContext.setCursor('auto');
                }
            }
        });
        deleteFetureButton.on('change:active', (event) => {
            if (!event.active) {
                alertInfo.hide();
            }
        });
        toggleBar.addControl(deleteFetureButton);

        return toggleBar;
    }

}