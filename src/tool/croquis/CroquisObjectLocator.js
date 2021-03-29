import { Feature } from "ol";
import { circular } from 'ol/geom/Polygon';
import { Polygon, LineString }  from 'ol/geom';
import ClusteringEngine from '../../spatial/ClusteringEngine';
import spatialEngine from '../../spatial/SpatialEngine';
import geometryExploder from '../../spatial/GeometryExploder';


const sourceProjection = 'EPSG:4326';
const targetProjection = 'EPSG:3857';
/**
 * Responsable de calcular la posición para los objetos del croquis
 * @export
 * @class CroquisObjectLocator
 */
export default class CroquisObjectLocator {

    /**     
     * @param {ol/vectorSource} vectorSource (opcional) Source de la capa vectorial donde añadir los cálculos intermedios
     * @param {boolean} debugMode (opcional) Activa modo depuración para añadir los cálculos intermedios a una
     * capa vectorial
     */
    constructor(vectorSource, debugMode) {
        this.vectorSource = vectorSource;
        this.debugMode = debugMode != undefined ? debugMode : false;

        this.clusteringEngine = new ClusteringEngine();
    }

    getObjectCenter(objectLocation, croquisReferencePoints, defaultCenter) {
        let referenceBuffers = this.calculateReferenceBuffers(objectLocation, croquisReferencePoints);
        let candidatePoints = this.calculateIntersectingPoints(referenceBuffers);
        let objectCenter;

        if (candidatePoints.length > 0) {
            let pointClusters = this.calculatePointClusters(candidatePoints);
            let largestCluster = this.getLargestCluster(pointClusters);

            objectCenter = this.calculateCentroid(largestCluster);
        }

        return objectCenter;
    }

    calculateReferenceBuffers(objectLocation, referencePoints) {
        let referenceBuffers = [];

        objectLocation.forEach((ref) => {
            let referencePoint = referencePoints[ref.referencePointId];

            let circle = circular(referencePoint.coordinates, ref.measure, 100);
            circle.transform(sourceProjection, targetProjection);

            if (this.debugMode) {
                let feature = new Feature({
                    geometry: circle
                });
                this.vectorSource.addFeature(feature);
            }

            referenceBuffers.push(circle);
        });
        return referenceBuffers;
    }

    calculateIntersectingPoints(referenceBuffers) {
        let intersectingPoints = [];

        for (let i = 0; i < referenceBuffers.length; i++) {
            for (let j = 0; j < referenceBuffers.length && j != i; j++) {
                let iBufferLine = new LineString(referenceBuffers[i].getLinearRing(0).getCoordinates());
                let jBufferLine = new LineString(referenceBuffers[j].getLinearRing(0).getCoordinates());

                let intersection = spatialEngine.intersection(iBufferLine, jBufferLine);
                intersectingPoints = intersectingPoints.concat(geometryExploder.getPoints(intersection));
            }
        }

        return intersectingPoints;
    }

    calculatePointClusters(points) {
        let pointFeatures = [];

        points.forEach((point) => {
            let feature = new Feature({
                geometry: point
            });

            if (this.debugMode) {
                this.vectorSource.addFeature(feature);
            }
            pointFeatures.push(feature);
        });

        return this.clusteringEngine.calculateClusters(pointFeatures);
    }

    getLargestCluster(pointClusters) {
        let largestCluster = pointClusters[0];
        let numPoints = pointClusters[0].length;

        pointClusters.forEach((cluster) => {
            if (cluster.length > numPoints) {
                largestCluster = cluster;
                numPoints = cluster.length;
            }
        });
        return largestCluster;
    }

    calculateCentroid(pointCluster) {
        let centroid;

        if (pointCluster.length == 1) {
            centroid = pointCluster[0].getGeometry().getCoordinates();
        } else if (pointCluster.length == 2) {
            centroid = this.computeSegmentMidpoint(pointCluster);
        } else {
            centroid = this.computePolygonCentroid(pointCluster);
        }
        return centroid;
    }

    computeSegmentMidpoint(pointCluster) {
        let pointA = pointCluster[0].getGeometry().getCoordinates();
        let pointB = pointCluster[1].getGeometry().getCoordinates();
        let midPoint = [];

        midPoint.push((pointA[0] + pointB[0]) / 2);
        midPoint.push((pointA[1] + pointB[1]) / 2);

        return midPoint;
    }

    computePolygonCentroid(pointCluster) {
        let polygonCoordinates = [];

        pointCluster.forEach((point) => {
            polygonCoordinates.push(point.getGeometry().getCoordinates());
        });
        //Cerramos el polígono
        polygonCoordinates.push(polygonCoordinates[0]);

        let clusterPolygon = new Polygon([polygonCoordinates]);
        if (this.debugMode) {
            let feature = new Feature({
                geometry: clusterPolygon
            });
            this.vectorSource.addFeature(feature);
        }

        let centroid = clusterPolygon.getInteriorPoint();
        if (this.debugMode) {
            console.log(centroid.getCoordinates());
            let centroidFeature = new Feature({
                geometry: centroid
            });
            this.vectorSource.addFeature(centroidFeature);
        }
        return centroid.getCoordinates();
    }
}
