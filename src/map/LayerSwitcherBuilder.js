import layerSwitcherTools from '../ui/html/layerSwitcherTools.html';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import configuration from '../Configuration';

const DEFAULT_ZOOM = 15;
/**
 * Constructor gestor de capas
 *
 * @export
 * @class export default class LayerSwitcherBuilder
 * @param mapContext
 */
export default class LayerSwitcherBuilder {
    constructor(mapContext) {
        this.mapContext = mapContext;
    }
   
    build(){
        let switcher = new LayerSwitcher();
        switcher.setHeader(layerSwitcherTools);
        this.mapContext.getMap().addControl(switcher);
        
        this.registerZoomToCroquisButtonListener();
        this.registerCleanCroquisButtonListener();

        return switcher;
    }

    registerZoomToCroquisButtonListener(){
        let elemento = document.getElementById('zoomToCroquisButton');
        elemento.onclick = ()=>{this.mapContext.zoomToCroquis(configuration.getDefaultZoom() || DEFAULT_ZOOM);}
    }

    registerCleanCroquisButtonListener(){
        let elemento = document.getElementById('CleanCroquisButton');
        elemento.onclick = ()=>{
            this.mapContext.getLayerBuilder().getAuxElementLayer().getSource().clear();
            this.mapContext.getLayerBuilder().getCroquisObjectLayer().getSource().clear();
            this.mapContext.getLayerBuilder().getReferencePointLayer().getSource().clear();
            this.mapContext.getLayerBuilder().getMeasureLayer().getSource().clear();        
        }
    }

}