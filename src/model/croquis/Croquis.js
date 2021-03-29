/**
 * Representa una entidad Croquis. 
 * Cada capa será un GEOJSON
 * 
 * @export
 * @class Croquis
 */
export default class Croquis {
    constructor() {
        this.id;
        this.expedientId;
        this.referencePoints;
        this.croquisObjects;
        this.measures;
        this.auxElements;
    }

    getReferencePoints(){
        return this.referencePoints;
    }
    
    setReferencePoints(geojson){
        this.referencePoints = geojson;
    }

    getCroquisObjects(){
        return this.croquisObjects;
    }

    setCroquisObjects(geojson){
        this.croquisObjects = geojson;
    }

    getMeasures(){
        return this.measures;
    }

    setMeasures(geojson){
        this.measures = geojson;
    }

    getAuxElements(){
        return this.auxElements;
    }

    setAuxElements(geojson){
        this.auxElements = geojson;
    }


}