/**
 * Datos para realizar peticiones de datos
 *
 * @export
 * @class RequestData
 */
export default class RequestData {
    constructor(url){
        this.url = url;
    }    

    getUrl(){
        return this.url;
    }
}