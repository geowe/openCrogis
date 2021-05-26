import Draw from 'ol/interaction/Draw';
import ReferencePoint from '../../model/referencePoint/ReferencePoint';
import StyleFactory from '../../style/StyleFactory';
import CroquisTool from '../CroquisTool';
import Geolocation from 'ol/Geolocation';
import Point from 'ol/geom/Point';
import { Feature } from 'ol';
import Color from '../../style/Color';
import GeolocateTool from '../GeolocateTool';

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
        //this.interaction = this.createInteraction();
        /*this.geolocation = new Geolocation({
            trackingOptions: {
              enableHighAccuracy: true,
            },
            projection: this.mapContext.getMap().getView().getProjection()
          });
        this.geolocation.on('error', function (error) {
            alert('Falló al obtener posición del GPS');
          });*/
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
               
        let coordinates = this.geolocation.getPosition();
        
        if(typeof coordinates === 'undefined'){
            alert('No se pudo obtener la posición. Inténtelo de nuevo');
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