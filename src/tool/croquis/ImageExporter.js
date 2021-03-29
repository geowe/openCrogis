import CroquisTool from '../CroquisTool';
import { toPng } from 'html-to-image';
import Alert from '../../ui/Alert';
import CroquisImg from '../../model/croquis/CroquisImg';
import CroquisService from '../../service/CroquisService';



const TIME_OUT = 15000;
/**
 * Responsable de generar una imagen del mapa
 * https://github.com/bubkoo/html-to-image#options
 * @export
 * @class ImageExporter
 * @extends {CroquisTool}
 */
export default class ImageExporter extends CroquisTool {
    constructor(mapContext) {
        super(mapContext);
        this.exportOptions = {
            filter: (element) => {
                return element.className ? element.className.indexOf('ol-control') === -1 : true;
            }
        };
        this.timeoutExceeded = true;
    }

    /*
    exportPNG() {
        var message = Alert.info('<i class="fas fa-cog fa-spin"></i> &#124; Generando imagen. Espere un momento por favor.');
        message.show();

        this.checkTimeOut(message);

        let map = this.mapContext.getMap();
        var sendingMsg = Alert.info('<i class="fas fa-paper-plane"></i> &#124; Exportanto imagen');
        map.once('rendercomplete', () => {
            toPng(map.getTargetElement(), this.exportOptions)
                .then(async(dataImagePNG) => {
                    message.hide();
                    this.timeoutExceeded = false;

                    
                    sendingMsg.show();
                    let croquisImg = new CroquisImg(dataImagePNG);
                    let croquisService = new CroquisService();                    
                    let response = await croquisService.pushCroquisImage(croquisImg,
                         this.mapContext.getCroquis().getUrlImagen(), this.mapContext.getRequestData());                    
                    sendingMsg.hide();
                    Alert.success('<i class="far fa-check-circle"></i> &#124; Imágen enviada correctamente: '+response.data.resultado).showForAWhile(5000);
                })
                .catch((error) => {
                    console.log(error);
                    sendingMsg.hide();
                    this.showError(error);

                });
        });
        map.renderSync();
    }

    checkTimeOut(message) {
        setTimeout(() => {
            if (this.timeoutExceeded) {
                message.hide();
                this.showError();
            }
        }, TIME_OUT);
    }
    */
    showError(error) {
        Alert.error('<i class="fas fa-exclamation-triangle"></i> &#124; No se ha podido enviar la imagen '+ error)
            .showForAWhile(3000);
    }

}