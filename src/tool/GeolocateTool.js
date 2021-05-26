import CroquisTool from './CroquisTool';
import Geolocation from 'ol/Geolocation';
import Alert from '../ui/Alert';
/**
 * Herramienta de Geolocalizació según GPS.
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
            },
            projection: this.mapContext.getMap().getView().getProjection()
        });
        this.geolocation.on('error', function (error) {
            Alert.error('Falló al obtener posición del GPS').showForAWhile(3000);
        });
        
    }

    async geolocate(){        
        this.geolocation.setTracking(true);
        
        let coordinates = this.geolocation.getPosition();
        if(typeof coordinates === 'undefined'){
            alert('No se pudo obtener la posición. Inténtelo de nuevo');
            return;
        }else{
            this.mapContext.zoomTo(coordinates, 20);
        }
    }

    
    getGeolocation(){
        return this.geolocation;
    }
}