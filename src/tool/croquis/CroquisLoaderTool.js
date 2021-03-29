import CroquisTool from '../CroquisTool';
import CroquisService from "../../service/CroquisService";
import CroquisObjectCatalog from '../../service/CroquisObjectCatalog';
import StyleFactory from '../../style/StyleFactory';
import CroquisDTO from '../../model/croquis/CroquisDTO';
import CroquisDataLoader from './CroquisDataLoader';
import Alert from '../../ui/Alert';
import ModalDialogFactory from "../../ui/modalDialog/ModalDialogFactory";

/**
 * Responsable de cargar un croquis.
 * @export
 * @class CroquisLoader
 * @extends {CroquisTool}
 */
export default class CroquisLoaderTool extends CroquisTool {
    constructor(mapContext) {
        super(mapContext);
        this.layerBuilder = mapContext.getLayerBuilder();
        this.croquisService = new CroquisService();
        this.catalogService = new CroquisObjectCatalog();
        this.sf = new StyleFactory();
        this.requestData = mapContext.getRequestData();
    }
    
    async load() {
        let loadingMsg = Alert.info('<i class="fas fa-cog fa-spin"></i> &#124; Cargando Croquis. Espere un momento por favor.');
        try {
            loadingMsg.show();
            
            let croquisJson = await this.croquisService.loadCroquis(this.mapContext.getRequestData());
                 
            let croquisDTO =  new CroquisDTO();                           
            this.mapContext.setCroquis(croquisDTO);            
           
            let successMsg = '...';            
            if(croquisJson.datos){                
                let loader =  this.getDataLoader(croquisJson);
                await loader.load();               
                successMsg = 'Croquis cargado correctamente';
                
                if(croquisJson.version == 1){
                    this.showFinishDialog(loader.getUnpositionedObjects());
                }
            }
            
            this.mapContext.zoomToCroquis(croquisJson.zoom);

            loadingMsg.hide()
            Alert.success('<i class="far fa-check-circle"></i> &#124; '+successMsg).showForAWhile(3000);

        } catch (error) {
            console.log('ERROR CARGANDO CROQUIS: '+ error);
            loadingMsg.hide();
            Alert.error(error).showForAWhile(10000);
        }
    }    

    getDataLoader(dataJson) {
        let dataLoader = new CroquisDataLoader(dataJson.datos, this.layerBuilder);            
        
        return dataLoader;
    }

    parseCroquis(croquisString){
        try {
           return JSON.parse(croquisString);
        } catch (error) {
            let errorMsg ='No se ha podido parsear el croquis';
            throw new Error(errorMsg);
        }
    }

    showFinishDialog(unpositionedObjects) {
        let modal = ModalDialogFactory.buildFinishFielDataLoadModalDialog('Carga de datos de campo finalizada', unpositionedObjects);        
        modal.show();
        modal.setOnAcceptAction(() => {            
            modal.hide();
        });
    }

}