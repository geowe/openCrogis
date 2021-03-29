import Bar from 'ol-ext/control/Bar';
import Toggle from 'ol-ext/control/Toggle';
import { DrawAuxElementTool, LINESTRING_ELEMENT, POINT_ELEMENT, POLYGON_ELEMENT } from '../../tool/drawTool/DrawAuxElementTool';

export function getDrawAuxElementToolBar(mapContext, alertInfo) {
    var drawAuxElementTool;
    return new Bar({
        toggleOne: true,
        controls: [new Toggle({
                html: '<i class="fas fa-map-marker"></i>',
                className: "punto",
                title: "Dibuja un punto",
                onToggle: function(active) {
                    if (active) {
                        alertInfo.setContent('<i class="fas fa-map-marker"></i> &#124; Pulse en el mapa para dibujar un punto')
                            .show();
                        drawAuxElementTool = new DrawAuxElementTool(POINT_ELEMENT, mapContext);
                        drawAuxElementTool.activate();
                    }
                }
            }),
            new Toggle({
                html: '<i class="fas fa-project-diagram"></i>',
                className: "linea",
                title: "Dibuja una línea",
                onToggle: function(active) {
                    if (active) {
                        alertInfo.setContent('<i class="fas fa-project-diagram"></i> &#124; Pulse en el mapa para dibujar una línea (doble pulsación para finalizar)')
                            .show();
                        drawAuxElementTool = new DrawAuxElementTool(LINESTRING_ELEMENT, mapContext);
                        drawAuxElementTool.activate();
                    }
                }

            }),
            new Toggle({
                html: '<i class="fas fa-draw-polygon"></i>',
                className: "poligono",
                title: "Dibuja un polígono",
                onToggle: function(active) {
                    if (active) {
                        alertInfo.setContent('<i class="fas fa-draw-polygon"></i> &#124; Pulse en el mapa para dibujar un polígono (doble pulsación para finalizar)')
                            .show();
                        drawAuxElementTool = new DrawAuxElementTool(POLYGON_ELEMENT, mapContext);
                        drawAuxElementTool.activate();
                    }
                }

            })
        ]
    });
}