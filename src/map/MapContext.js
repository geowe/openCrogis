import Map from 'ol/Map';
import View from 'ol/View';
import { defaults as defaultControls, ScaleLine } from 'ol/control';
import ZoomLevelControl from './control/ZoomLevelControl';
import { createStringXY } from 'ol/coordinate';
import { MousePosition } from 'ol/control';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import GeocodingControl from './control/GeocodingControl';
import croquisDTO from '../model/croquis/CroquisDTO';
import { getCenter } from 'ol/extent';
import htmlzoomToCroquis from '../ui/html/zoomToCroquis.html';

const DEFAULT_ZOOM = 15;
/**
 * Configurador principal del mapa
 * Incorpora las capas base y de trabajo.
 * Controles por defecto: zoom, atribución, escala, nivel de zoom y coordenada del ratón 
 * @export
 * @class MapConfig
 */
export default class MapContext {
    constructor(layerBuilder) {
        this.layerBuilder = layerBuilder;
        this.map = new Map({
            target: 'map',
            view: new View({
                zoom: 5,
                center: [-531597.45945986, 4563049.4381926]
            }),
            layers: [this.layerBuilder.getBaseLayerGroup(), this.layerBuilder.getWorkingLayerGroup()],
            controls: defaultControls({
                zoom: false,
                attribution: false,
                attributionOptions: {
                    collapsible: true
                }
            }).extend(
                [new ScaleLine({units: 'metric'}),/* new ZoomLevelControl(),
                    new MousePosition({
                        coordinateFormat: createStringXY(6),
                        projection: 'EPSG:4326'
                    })*/
                ]
            )
        });

        var geocoding = new GeocodingControl(this.map);
        this.map.addControl(geocoding);

        var switcher = new LayerSwitcher();
        switcher.setHeader(htmlzoomToCroquis);
        this.map.addControl(switcher);

        this.registerZoomToCroquisButtonListener();

        this.interaction;

        this.map.on('pointermove', this.setCursor('grab'));
        //Guarda informacion del croquis cargado.
        this.croquis;
        this.requestData;
    }

    getMap() {
        return this.map;
    }

    /**
     * Establece la interacción del parámetro como la activa en el mapa.     
     * @param {*} interaction
     * @memberof MapConfig
     */
    setInteraction(interaction) {
        this.removeCurrentInteraction();
        this.interaction = interaction;
        this.map.addInteraction(interaction);
    }

    /**
     * elimina del mapa la interacción actual
     * @memberof MapConfig
     */
    removeCurrentInteraction() {
        this.map.removeInteraction(this.interaction);
    }

    getLayerBuilder() {
        return this.layerBuilder;
    }

    /**
     * Establece el icono del cursor del ratón
     * @param {String} cursorName : cursor del ratón 
     * @memberof MapConfig
     */
    setCursor(cursorName) {
        document.getElementById(this.map.getTarget()).style.cursor = cursorName;
    }

    getCroquis() {
        return this.croquis;
    }

    /**
     * Establece el croquis de trabajo
     * @param {croquisDTO} croquisDTO
     * @memberof MapContext
     */
    setCroquis(croquisDTO) {
        this.croquis = croquisDTO;
    }

    /**     
     * Centra el mapa.  
     * @param {Number} zoom  
     * @memberof MapContext
     */
    zoomToCroquis(zoom) {
        let zoomTo = zoom ? zoom : DEFAULT_ZOOM;
        if (this.hasReferencePoints()) {
            let extent = this.layerBuilder.getReferencePointLayer().getSource().getExtent();
            this.zoomTo(getCenter(extent), zoomTo);
        }else if(this.hasCroquisObjects()){
            let extent = this.layerBuilder.getCroquisObjectLayer().getSource().getExtent();            
            this.zoomTo(getCenter(extent), zoomTo);
        }else if(this.hasAuxObjects()){
            let extent = this.layerBuilder.getAuxElementLayer().getSource().getExtent();            
            this.zoomTo(getCenter(extent), zoomTo);
        }
    }

    hasReferencePoints(){
        let refPoints = this.layerBuilder.getReferencePointLayer().getSource().getFeatures();
        return refPoints != 0;
    }

    hasCroquisObjects(){
        let objects = this.layerBuilder.getCroquisObjectLayer().getSource().getFeatures();
        return objects != 0;
    }

    hasAuxObjects(){
        let objects = this.layerBuilder.getAuxElementLayer().getSource().getFeatures();
        return objects != 0;
    }

    /**     
     * Hace zoom y centra en mapa.
     * @param {Coordinates} center
     * @param {Number} zoom
     * @memberof MapContext
     */
    zoomTo(center, zoom){
        this.map.getView().animate({
            center: center,
            zoom: zoom
        });
    }

    setRequestData(requestData){
        this.requestData = requestData;
    }
    
    getRequestData(){
        return this.requestData;
    }

    registerZoomToCroquisButtonListener(){
        let elemento = document.getElementById('zoomToCroquisButton');
        elemento.onclick = ()=>{this.zoomToCroquis(DEFAULT_ZOOM+2);}
    }

}