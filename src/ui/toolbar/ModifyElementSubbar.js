import Bar from 'ol-ext/control/Bar';
import Toggle from 'ol-ext/control/Toggle';
import ColorTool from '../../tool/onClickTool/ColorTool';
import LabelTool from '../../tool/onClickTool/LabelTool';
import TransformFeatureTool from '../../tool/TransformFeatureTool';

export function getModifyToolBar(mapContext, alertInfo) {
    var transformFeatureTool = new TransformFeatureTool(mapContext);
    var transformButton = new Toggle({
        html: '<i class="fas fa-arrows-alt"></i>',
        className: "transform",
        title: "Mueve, gira y escala",
        onToggle: function(active) {
            if (active) {
                alertInfo.setContent('<i class="fas fa-arrows-alt"></i> &#124; Pulse un elemento para transformarlo')
                    .show();
                transformFeatureTool.activate();
                mapContext.setCursor('auto');
            }
        }
    });
    transformButton.on('change:active', (event) => {
        if (!event.active) {
            alertInfo.hide();
            transformFeatureTool.deactivate();
        }
    });

    var labelTool = new LabelTool(mapContext);
    var labelButton = new Toggle({
        html: '<i class="fas fa-font"></i>',
        className: "label",
        title: "Establece una etiqueta",
        onToggle: function(active) {
            if (active) {
                alertInfo.setContent('<i class="fas fa-font"></i> &#124; Pulse un elemento para cambiar su etiqueta')
                    .show();
                labelTool.activate();
                mapContext.setCursor('auto');
            }
        }
    });
    labelButton.on('change:active', (event) => {
        if (!event.active) {
            alertInfo.hide();
        }
    });

    var colorTool = new ColorTool(mapContext);
    var colorButton = new Toggle({
        html: '<i class="fas fa-palette"></i>',
        className: "color",
        title: "Cambia el color",
        onToggle: function(active) {
            if (active) {
                alertInfo.setContent('<i class="fas fa-palette"></i> &#124; Pulse un elemento para cambiar su color')
                    .show();
                colorTool.activate();
                mapContext.setCursor('auto');
            }
        }
    });
    colorButton.on('change:active', (event) => {
        if (!event.active) {
            alertInfo.hide();
        }
    });
    return new Bar({
        toggleOne: true,
        controls: [ transformButton, labelButton, colorButton ]
    });
}