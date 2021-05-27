import CroquisTool from './CroquisTool';
import Geolocation from 'ol/Geolocation';
import Alert from '../ui/Alert';
/**
 * Herramienta de Geolocalización según GPS.
 *
 * @export
 * @class GeolocateTool
 * @extends {CroquisTool}
 */
export default class GeolocateTool extends CroquisTool {
    constructor(mapContext) {
        super(mapContext);
        this.geolocation = new Geolocation({
            trackingOptions: {
              enableHighAccuracy: true,
              timeout: 3000
            },
            projection: this.mapContext.getMap().getView().getProjection()
        });
        this.geolocation.on('error', function (error) {
            Alert.error('Falló al obtener posición del GPS').showForAWhile(3000);
        });
        
    }

    geolocate(){        
        this.geolocation.setTracking(true);
        
        var coordinates = this.geolocation.getPosition();
        
        if(typeof coordinates === 'undefined'){
            Alert.error('No se pudo obtener la posición. Inténtelo de nuevo').showForAWhile(2000);
            return;
        }else{
            this.mapContext.zoomTo(coordinates, 20);            
        }
        this.geolocation.setTracking(false);
    }

    
    getGeolocation(){
        return this.geolocation;
    }
}