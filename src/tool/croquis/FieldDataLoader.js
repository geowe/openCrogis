import CroquisObjectCatalog from '../../service/CroquisObjectCatalog';
import { LineString, Point, Circle } from 'ol/geom';
import { Feature } from "ol";
import { fillObject } from "./fillObject";
import { fromExtent } from 'ol/geom/Polygon';
import { buffer, getBottomLeft } from 'ol/extent';
import StyleFactory from '../../style/StyleFactory';
import ReferencePoint from '../../model/referencePoint/ReferencePoint';
import CroquisObjectType from '../../model/croquisObject/croquisObjectType';
import CroquisObject from '../../model/croquisObject/CroquisObject';
import RealMeasure from '../../model/measure/RealMeasure';
import CroquisObjectLocator from './CroquisObjectLocator';
import { formatLength } from '../../tool/MeasureUtil';
import coordinateUtil from 'geowe-coordinate-utils';

const sourceProjection = 'EPSG:4326';
const targetProjection = 'EPSG:3857';
/**
 * Responsable de representar en el mapa los datos de campo.
 *
 * @export
 * @class FieldDataLoader
 */
export default class FieldDataLoader {
    constructor(fieldDataJson, layerBuilder) {
        this.dataJson = fieldDataJson;
        this.layerBuilder = layerBuilder;
        this.sf = new StyleFactory();
        this.catalogService = new CroquisObjectCatalog();
        this.catalog;
        this.referencePointFeatures = {};
        this.referencePoints = {};
       
        this.objectLocator = new CroquisObjectLocator(
            this.layerBuilder.getAuxElementLayer().getSource(), false
        );
        
        this.unpositionedObjects = [];
    }

    getUnpositionedObjects(){
        return this.unpositionedObjects;
    }

    async load() {
        
        if (!(Object.keys(this.dataJson).length === 0 && this.dataJson.constructor === Object)) {
            this.catalog = await this.catalogService.getCatalog();            
            this.loadEscenarios();
        }
    }

    loadEscenarios() {
        for (const escenario of this.dataJson.escenarios) {
            this.loadReferencePoints(escenario.referencePoints);
            this.loadCroquisObjects(escenario.croquisObjects);
        }
    }

    /**
     * Añade a la capa de puntos de referencia el array pasado como parámetro     *
     * @param {Array} referencePoints - json array ReferencePoint
     * @memberof FieldDataLoader
     */
    loadReferencePoints(referencePoints) {
        for (const rpJson of referencePoints) {
            let referencePoint = this.buildReferencePoint(rpJson);
            let feature = this.buildCroquisObjectPointFeature(rpJson.coordinates, referencePoint);
            feature.setStyle(this.sf.getReferencePointStyle(referencePoint));
            this.layerBuilder.getReferencePointLayer().getSource().addFeature(feature);
            this.referencePointFeatures[rpJson.id] = feature;
            this.referencePoints[rpJson.id] = rpJson;
        }
    }

    buildReferencePoint(rpJson) {
        let referencePoint = new ReferencePoint();
        fillObject(referencePoint, rpJson);
        return referencePoint;
    }

    
    buildCroquisObjectPointFeature(coordinates, croquisObject) {
        this.validateCoordinates(coordinates);
        let point = new Point(coordinates);
        point.transform(sourceProjection, targetProjection);

        let feature = new Feature({ geometry: point });
        feature.set('croquis-object', croquisObject);

        return feature;
    }

    validateCoordinates(coordinates){
        if(!coordinateUtil.hasValidProjection(coordinates, '4326')
            || !coordinateUtil.hasValidAccuracy(coordinates, 6)) {    
            throw new Error('Error en los datos de campo. Coordenadas incorrectas: '+coordinates); 
        }
    }

    /**
     * Añade a la capa los objetos del croquis
     * @param {Array} croquisObjects - json array de CroquisObject
     * @memberof FieldDataLoader
     */
    loadCroquisObjects(croquisObjects) {
        for (const object of croquisObjects) {
            this.addCroquisObjectToMap(object);
        }
    }

    addCroquisObjectToMap(object) {     
        try {
            let center = this.objectLocator.getObjectCenter(
                object.location, this.referencePoints);
            if(!center){
                center = this.getDafaultObjectPosition();                
                this.unpositionedObjects.push(object.label ? object.label : object.id);
            }
            //TODO: interesante poder usar tamaño para el objeto. Por defecto 1m de radio
            let geom = fromExtent((new Circle(center, 1)).getExtent());
            
            let feature = new Feature({
                geometry: geom
            });
            let croquisObject = this.buildCroquisObject(object);
            feature.set('croquis-object', croquisObject);
            feature.set('rotation', 0.0);
            feature.setStyle(this.sf.getCroquisObjectStyleFunction(croquisObject));
            this.layerBuilder.getCroquisObjectLayer().getSource().addFeature(feature);
            
            this.addRealMeasuresToMap(object, center);
        } catch (error) {            
            console.log('ERROR AL posicionar objeto: '+error);
            this.unpositionedObjects.push(object.label ? object.label : object.id);
        }
        
    }

    addRealMeasuresToMap(object, center) {
        object.location.forEach((ref) => {
            let referencePoint = this.referencePointFeatures[ref.referencePointId];
            let point = new Point(referencePoint.getGeometry().getCoordinates());
            let measureLineString = new LineString([center, point.getCoordinates()]);
            let feature = new Feature({
                geometry: measureLineString
            });
            let realMeasure = this.buildRealMeasure(ref);
            feature.setStyle(this.sf.getMeasureStyle(realMeasure));
            feature.set('croquis-object', realMeasure);
            this.layerBuilder.getMeasureLayer().getSource().addFeature(feature);
        });
    }

    buildRealMeasure(json){
        let realMeasure = new RealMeasure(json.measure);
        realMeasure.setLabel(formatLength(json.measure));
        realMeasure.setId(json.id);
        return realMeasure;
    }
    
    buildCroquisObject(croquisObjectJson) {
        var croquisObject = new CroquisObject(
            new CroquisObjectType(croquisObjectJson.category,
                croquisObjectJson.type,
                this.catalog.getCroquisObjectImgPath(croquisObjectJson.category, croquisObjectJson.type)));

        fillObject(croquisObject, croquisObjectJson);
        if(!croquisObject.getLabel()){
            croquisObject.setLabel(croquisObjectJson.id);
        }
        return croquisObject;
    }

    getDafaultObjectPosition() {
        if(this.defaultObjectPosition == undefined) {
            let refLayerExtent = this.layerBuilder.getReferencePointLayer().getSource().getExtent();
            refLayerExtent = buffer(refLayerExtent, 30);
            
            this.defaultObjectPosition = getBottomLeft(refLayerExtent);
        }
        this.defaultObjectPosition[0] += 5;
        
        return this.defaultObjectPosition;  
    }
}