import { LineString, Polygon } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import { getArea, getLength } from 'ol/sphere';
import { formatLength, formatArea } from '../MeasureUtil';
import CroquisTool from '../CroquisTool';
import StyleFactory from '../../style/StyleFactory';
import CartographicMeasure from '../../model/measure/CartographicMeasure';



export const MEASURE_TYPE_AREA = 'Polygon';
export const MEASURE_TYPE_LENGTH = 'LineString';
/** 
 * Responsable de realizar una medida cartográfica en el mapa.
 * 
 * @class   MeasureTool
 * @extends CroquisTool
 */
export class MeasureTool extends CroquisTool {
    /**
     * @constructor
     * @param  {String} type   MEASURE_TYPE_AREA ó MEASURE_TYPE_LENGTH
     * @param {MapContext} mapContext configurador del mapa.
     */
    constructor(type, mapContext) {
        super(mapContext);
        this.type = type;
        this.layerBuilder = mapContext.getLayerBuilder();
        this.staticTooltip = [];
        this.source = this.layerBuilder.getMeasureLayer().getSource();
        this.sf = new StyleFactory();
        this.interaction = this.createInteraction();

        this.sketch;
        this.helpTooltipElement;
        this.helpTooltip;

        this.measureTooltipElement;
        this.measureTooltip;

    }

    createInteraction() {

        var draw = new Draw({
            source: this.source,
            type: this.type,
            style: this.sf.getMeasureInteractionStyle()
        });

        var listener;
        draw.on('drawstart', (evt) => {
            this.createMeasureTooltip();

            this.sketch = evt.feature;

            var tooltipCoord = evt.coordinate;

            listener = this.sketch.getGeometry().on('change', (evt) => {
                var geom = evt.target;
                var output;
                if (geom instanceof Polygon) {
                    output = formatArea(getArea(geom));
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof LineString) {
                    output = formatLength(getLength(geom));
                    tooltipCoord = geom.getLastCoordinate();
                }
                this.measureTooltipElement.innerHTML = output;
                this.measureTooltip.setPosition(tooltipCoord);
            });
        });

        draw.on('drawend', (event) => {
            var feature = event.feature;
            var geom = feature.getGeometry();
            let measure = this.getMeasure(geom);
            let formatedMeasureValue = this.getFormatedMeasureValue(measure); 
            
            var cMeasure = new CartographicMeasure(measure);            
            cMeasure.setLabel(formatedMeasureValue);

            feature.setStyle(this.sf.getMeasureStyle(cMeasure));
            feature.set('croquis-object', cMeasure);

            this.sketch = null;
            this.measureTooltipElement = null;
            unByKey(listener);
            this.mapContext.getMap().removeOverlay(this.measureTooltip);
        });

        return draw;
    }

    getMeasure(geom){
        return (this.type == MEASURE_TYPE_AREA) ? getArea(geom) : getLength(geom);        
    }

    getFormatedMeasureValue(measure){
        return (this.type == MEASURE_TYPE_AREA) ? formatArea(measure) : formatLength(measure);
    }

    createMeasureTooltip() {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
        this.measureTooltip = new Overlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        this.mapContext.getMap().addOverlay(this.measureTooltip);
    }


    deactivate() {
        this.clearStaticTooltip();
        this.mapContext.getMap().removeOverlay(this.measureTooltip);
    }

    clearStaticTooltip() {
        var staticTooltip = document.getElementsByClassName("ol-tooltip hidden");

        if (staticTooltip) {
            for (var i = 0; i < staticTooltip.length; i++) {
                staticTooltip[i].remove();
            }
        }

        this.staticTooltip.forEach((tooltip) => tooltip.remove())
        this.staticTooltip = [];
    }
}