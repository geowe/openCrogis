import Draw from 'ol/interaction/Draw';
import ReferencePoint from '../../model/referencePoint/ReferencePoint';
import StyleFactory from '../../style/StyleFactory';
import CroquisTool from '../CroquisTool';
import Geolocation from 'ol/Geolocation';
import Point from 'ol/geom/Point';
import { Feature } from 'ol';
import Color from '../../style/Color';

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
    }

    useGPS(gps){
        this.gps = gps;
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

    geolocate(){
        let geolocation = new Geolocation({
            trackingOptions: {
              enableHighAccuracy: true,
            },
            projection: this.mapContext.getMap().getView().getProjection()
          });
        geolocation.setTracking(this.gps);
        
        let rPoint;
        
        geolocation.on('change:position', ()=> {
            let feature = new Feature();
            let coordinates = geolocation.getPosition();
            feature.setGeometry(coordinates ? new Point(coordinates) : null);                                    
            rPoint = new ReferencePoint();
            rPoint.setColor(Color.DEFAULT_GPS_REF_POINT);
            feature.setStyle(this.sf.getReferencePointStyle(rPoint));
            
            feature.set('croquis-object', rPoint);
            console.log('FEATURE: '+coordinates);
            this.layerBuilder.getReferencePointLayer().getSource().addFeature(feature);            
        });

        geolocation.on('error', function (error) {
            alert('ERROR GEOLOCALIZANDO');
          });
        return rPoint;
    }

    activate(){
        
        if(!this.gps){   
            this.interaction = this.createInteraction();
            super.activate();
        }
        this.geolocate();         
    }

}