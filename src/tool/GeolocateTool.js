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
    }

    async geolocate(){
        
        let geolocation = new Geolocation({
            trackingOptions: {
              enableHighAccuracy: true,
            },
            projection: this.mapContext.getMap().getView().getProjection()
        });

        geolocation.on('error', function (error) {
            Alert.error('Falló al obtener posición del GPS').showForAWhile(3000);
        });

        let coordinates =  geolocation.getPosition();      
         
        this.mapContext.zoomTo(coordinates, 20);
    }
}