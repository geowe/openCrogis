import Draw from 'ol/interaction/Draw';
import ReferencePoint from '../../model/referencePoint/ReferencePoint';
import StyleFactory from '../../style/StyleFactory';
import CroquisTool from '../CroquisTool';
import Point from 'ol/geom/Point';
import { Feature } from 'ol';
import Color from '../../style/Color';
import GeolocateTool from '../GeolocateTool';
import Alert from '../../ui/Alert';
/**
 * Responsable de situar en el mapa un punto de referencia
 *
 * @export
 * @class DrawReferencePointTool
 * @extends {CroquisTool}
 */
export default class DrawReferencePointTool extends CroquisTool {
    constructor(mapContext) {
        super(mapContext);
        this.layerBuilder = mapContext.getLayerBuilder();
        this.sf = new StyleFactory();
        this.gps = false;
        
        this.geolocateTool = new GeolocateTool(this.mapContext);
        this.geolocation = this.geolocateTool.getGeolocation();
    }

    useGPS(gps){
        this.gps = gps;
        
        this.geolocation.setTracking(this.gps);
    }

    createInteraction() {
        var drawPointInteraction = new Draw({
            source: this.layerBuilder.getReferencePointLayer().getSource(),
            type: 'Point',
            style: this.sf.getDefaultStyles
        });

        drawPointInteraction.on('drawend', (event) => {
            var feature = event.feature;
            var rPoint = new ReferencePoint();
            feature.setStyle(this.sf.getReferencePointStyle(rPoint));

            super.askForObservation(rPoint);

            feature.set('croquis-object', rPoint);

        });
        return drawPointInteraction;
    }

    async geolocate(){
               
        var coordinates = this.geolocation.getPosition();
        
        if(typeof coordinates === 'undefined'){
            Alert.error('No se pudo obtener la posición. Inténtelo de nuevo').showForAWhile(2000);
            return;
        }
        
        let feature = new Feature();
        feature.setGeometry(coordinates ? new Point(coordinates) : null);                                    
        let rPoint = new ReferencePoint();
        rPoint.setColor(Color.DEFAULT_GPS_REF_POINT);
        feature.setStyle(this.sf.getReferencePointStyle(rPoint));        
        feature.set('croquis-object', rPoint);            
        this.layerBuilder.getReferencePointLayer().getSource().addFeature(feature);            
        
        super.askForObservation(rPoint);        
    }

    activate(){        
        if(this.gps){   
            this.geolocate();             
        }else{
            this.interaction = this.createInteraction();
            super.activate();
        }    
    }

}