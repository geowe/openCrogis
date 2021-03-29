import CroquisObjectCatalog from '../../service/CroquisObjectCatalog';
import GeoJSON from 'ol/format/GeoJSON';
import CroquisObjectType from '../../model/croquisObject/croquisObjectType';
import CroquisObject from '../../model/croquisObject/CroquisObject';
import AuxElement from '../../model/auxElement/AuxElement';
import ReferencePoint from '../../model/referencePoint/ReferencePoint';
import StyleFactory from '../../style/StyleFactory';
import RealMeasure from '../../model/measure/RealMeasure';
import CartographicMeasure from '../../model/measure/CartographicMeasure';
import { fillObject } from "./fillObject";

const to3857 = { featureProjection: 'EPSG:3857', dataProjection: 'EPSG:4326' };
/**
 * Responsable de representar en el mapa la información de un croquis.
 * @export
 * @class CroquisDataLoader
 */
export default class CroquisDataLoader {
    constructor(croquisDataJson, layerBuilder) {
        this.dataJson = croquisDataJson;
        this.layerBuilder = layerBuilder;
        this.catalogService = new CroquisObjectCatalog();
        this.sf = new StyleFactory();
        this.catalog;
    }

    async load() {
        
        if (!(Object.keys(this.dataJson).length === 0 && this.dataJson.constructor === Object)) {
            this.catalog = await this.catalogService.getCatalog();                    
            this.loadReferencePoints(this.dataJson.referencePoints);
            this.loadAuxElements(this.dataJson.auxElements);
            this.loadMeasures(this.dataJson.measures);
            this.loadCroquisObjects(this.dataJson.croquisObjects);
        }
    }

    loadReferencePoints(geojson) {
        let features = new GeoJSON().readFeatures(geojson, to3857);
        
        features.forEach((f) => {
            let refPoint = this.buildReferencePoint(f)
            f.set('croquis-object', refPoint);
            f.setStyle(this.sf.getReferencePointStyle(refPoint))
            this.layerBuilder.getReferencePointLayer().getSource().addFeature(f);
        });
    }
    buildReferencePoint(feature) {
        let refPointJson = feature.get('croquis-object');
        let referencePoint = new ReferencePoint();
        fillObject(referencePoint, refPointJson);
        return referencePoint;
    }

    loadAuxElements(geojson) {
        let features = new GeoJSON().readFeatures(geojson, to3857);
        
        features.forEach((f) => {            
            if(f.get('croquis-object')){
                let auxElement = this.buildAuxElement(f)
                f.set('croquis-object', auxElement);
                f.setStyle(this.sf.getAuxElementStyle(auxElement))
                this.layerBuilder.getAuxElementLayer().getSource().addFeature(f);
            }            
        });
    }
    buildAuxElement(feature) {        
        let auxElementJson = feature.get('croquis-object');
        let auxElement = new AuxElement();
        fillObject(auxElement, auxElementJson);
        return auxElement;
        
        
    }

    loadMeasures(geojson) {
        let features = new GeoJSON().readFeatures(geojson, to3857);
        features.forEach((f) => {
            let measure = this.buildMeasure(f)
            f.set('croquis-object', measure);
            f.setStyle(this.sf.getMeasureStyle(measure))
            this.layerBuilder.getMeasureLayer().getSource().addFeature(f);
        });
    }
    buildMeasure(feature) {
        let measureJson = feature.get('croquis-object');
        let measure;
        if (measureJson.type === 'REAL_MEASURE') {
            measure = new RealMeasure();
        } else {
            measure = new CartographicMeasure(measureJson.measureValue);
        }
        measure.setMeasureValue(measureJson.measureValue);
        fillObject(measure, measureJson);
        return measure;
    }

    loadCroquisObjects(geojson) {
        let features = new GeoJSON().readFeatures(geojson, to3857);

        features.forEach((f) => {
            this.addCroquisObjectToMap(f);
        });
    }
    addCroquisObjectToMap(f) {
        let croquisObjectJson = f.get('croquis-object');
        let croquisObject = this.buildCroquisObject(croquisObjectJson);
        f.set('croquis-object', croquisObject);
        f.setStyle(this.sf.getCroquisObjectStyleFunction(croquisObject));
        this.layerBuilder.getCroquisObjectLayer().getSource().addFeature(f);
    }

    //Necesito recrear el objeto
    buildCroquisObject(croquisObjectJson) {
        var croquisObject = new CroquisObject(
            new CroquisObjectType(croquisObjectJson.category,
                croquisObjectJson.type,
                this.catalog.getCroquisObjectImgPath(croquisObjectJson.category, croquisObjectJson.type)));

        fillObject(croquisObject, croquisObjectJson);

        return croquisObject;
    }
}