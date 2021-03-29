/**
 * Modelo de intercambio.
 *
 * @export
 * @class CroquisDTO
 */
export default class CroquisDTO {
    
    constructor() {        
        this.fecha = Date();
        this.datos;
    }

    setDatos(croquis) {
        this.datos = croquis;
    }

    getDatos() {
        return this.datos;
    }    
    
}