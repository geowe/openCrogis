import Bar from 'ol-ext/control/Bar';
import Toggle from 'ol-ext/control/Toggle';
import { MeasureTool, MEASURE_TYPE_AREA, MEASURE_TYPE_LENGTH } from '../../tool/drawTool/MeasureTool';

export function getMeasureToolBar(mapContext, alertInfo) {
    var measureTool = new MeasureTool(MEASURE_TYPE_LENGTH, mapContext);
    var rulerButton = new Toggle({
        html: '<i class="fas fa-ruler"></i>',
        className: "ruler",
        title: "Mide una distancia",
        onToggle: function(active) {
            if (active) {
                alertInfo.setContent('<i class="fas fa-ruler"></i> &#124; Pulse en el mapa par comenzar a medir una distancia (doble pulsación para finalizar)')
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
      

    var measureAreaTool = new MeasureTool(MEASURE_TYPE_AREA, mapContext)
    var rulerAreaButton = new Toggle({
        html: '<i class="fas fa-ruler-combined"></i>',
        className: "ruler",
        title: "Mide un área",
        onToggle: function(active) {
            if (active) {
                alertInfo.setContent('<i class="fas fa-ruler-combined"></i> &#124; Pulse en el mapa par comenzar a medir un área (doble pulsación para finalizar)')
                    .show();
                measureAreaTool.activate();
                mapContext.setCursor('crosshair');
            }
        }
    });
    rulerAreaButton.on('change:active', (event) => {            
        if (!event.active) {
            measureAreaTool.deactivate();
            alertInfo.hide();
        }
    });
    

    return new Bar({
        toggleOne: true,
        controls: [ rulerButton, rulerAreaButton ]
    });
}