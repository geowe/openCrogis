import axios from 'axios/index'; 
/**
 * Servicio de comunicación
 * @export
 * @class CroquisService
 */
export default class CroquisService {

    async loadCroquis(requestData) {              
        
        try {          
            let response = await fetch(requestData.getUrl());        
            return await response.json();
            
        } catch (error) {
            let errorMsg = 'No se pudo cargar el croquis: ';
            console.log(errorMsg+error);            
            if(error.response){
                errorMsg = errorMsg +error.response.data.error;
            }else{
                errorMsg = errorMsg + error;
            }
            throw new Error(errorMsg);             
        }
    }

    async downloadCroquis(croquis) {
        const json = JSON.stringify(croquis);
        this.downloadFile("data:application/json;charset=UTF-8," +
            encodeURIComponent(json), "croquis.json");
    }

    async downloadFile(uri, filename) {
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(uri);
        }
    }   
    
}