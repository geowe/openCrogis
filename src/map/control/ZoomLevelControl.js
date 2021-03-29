import Control from 'ol/control/Control';

const zoomElement = document.createElement('div');
zoomElement.className = 'zoom-level-control';

/**
 * Control de nivel de zoom actual
 *
 * @export
 * @class ZoomLevelControl
 * @extends {Control}
 */
export default class ZoomLevelControl extends Control {
    constructor() {
        super({ element: zoomElement });
    }

    setMap(map) {
        super.setMap(map);
        map.on("moveend", () => {
            var zoom = map.getView().getZoom();
            var zoomInfo = 'Zoom: ' + parseInt(zoom);
            zoomElement.innerHTML = zoomInfo;
        });
    }
}