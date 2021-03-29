import CroquisTool from '../CroquisTool';
import CroquisService from "../../service/CroquisService";
import GeoJSON from 'ol/format/GeoJSON';
import Croquis from '../../model/croquis/Croquis';
import CroquisDTO from '../../model/croquis/CroquisDTO';
import Alert from '../../ui/Alert';

const toWGS84 = { featureProjection: 'EPSG:3857', dataProjection: 'EPSG:4326' };
const GeoJSONFormat = new GeoJSON();
/**
 * Responsable de enviar un croquis.
 *
 * @export
 * @class CroquisSender
 * @extends {CroquisTool}
 */
export default class CroquisSenderTool extends CroquisTool {
    constructor(mapContext) {
        super(mapContext);
        this.layerBuilder = mapContext.getLayerBuilder();
        this.croquisService = new CroquisService();        
    }

    async send() {            
        let croquis = new Croquis();
        croquis.setReferencePoints(this.getObjectGeoJSON(this.layerBuilder.getReferencePointLayer()));
        croquis.setCroquisObjects(this.getObjectGeoJSON(this.layerBuilder.getCroquisObjectLayer()));
        croquis.setMeasures(this.getObjectGeoJSON(this.layerBuilder.getMeasureLayer()));
        croquis.setAuxElements(this.getObjectGeoJSON(this.layerBuilder.getAuxElementLayer()));

        // La info del DTO siempre deberá estar en el mapContext       
        let croquisDTO = this.mapContext.getCroquis();
        if (typeof croquisDTO === 'undefined') {
            this.mapContext.setCroquis(new CroquisDTO());
            croquisDTO = this.mapContext.getCroquis();
        }
        croquisDTO.setDatos(croquis);
        
        let loadingMsg = Alert.info('<i class="fas fa-cog fa-spin"></i> &#124; Generando Croquis. Espere un momento por favor.');
        try {
            loadingMsg.show();                       
            await this.croquisService.downloadCroquis(croquisDTO);
            loadingMsg.hide();            
            Alert.success('<i class="far fa-check-circle"></i> &#124; Croquis descargado correctamente: ').showForAWhile(5000);            
        } catch (error) {   
            loadingMsg.hide();         
            Alert.error('<i class="fas fa-exclamation-triangle"></i> &#124; '+ error.message).showForAWhile(10000);    
        }
       
    }

    getObjectGeoJSON(vectorLayer) {
        return GeoJSONFormat.writeFeaturesObject(vectorLayer.getSource().getFeatures(), toWGS84);
    }
}