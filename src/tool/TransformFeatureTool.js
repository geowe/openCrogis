import Transform from 'ol-ext/interaction/Transform';
import { Point } from 'ol/geom';
import StyleFactory from '../style/StyleFactory';
import { shiftKeyOnly } from 'ol/events/condition';
import CroquisTool from './CroquisTool';
import configuration from '../Configuration';

/**
 * Herramienta de transformación de features: GIRAR, ESCALAR y MOVER
 *
 * @export
 * @class TransformFeatureTool
 * @extends {CroquisTool}
 */
export default class TransformFeatureTool extends CroquisTool {
    constructor(mapContext) {
        super(mapContext);
        this.layerBuilder = mapContext.getLayerBuilder();
        this.sf = new StyleFactory();
        this.styleFunction;
        this.interaction = this.createInteraction();        
        this.startangle = 0;
        this.d = [0, 0];

    }

    createInteraction() {
        var transform = new Transform({
            enableRotatedTransform: true,
            hitTolerance: 2,
            translateFeature: configuration.enableTranslate(),
            scale: configuration.enableScale(),
            rotate: configuration.enableRotate(),
            translate: configuration.enableTranslate(),
            keepAspectRatio: shiftKeyOnly,
            //noFlip: true,
            stretch: false
        });

        transform.on(['select'], (e) => {
            if (e.feature !== undefined) {
                this.styleFunction = e.feature.getStyle();
            }

        });

        transform.on(['rotatestart', 'translatestart'], (e) => {
            // Rotation
            this.startangle = e.feature.get('angle') || 0;
            // Translation
            this.d = [0, 0];
        });

        transform.on('rotating', (e) => {
            e.feature.set('rotation', this.startangle - e.angle);
            // Set angle attribute to be used on style !
            e.feature.set('angle', this.startangle - e.angle);
        });

        transform.on('translating', (e) => {
            this.d[0] += e.delta[0];
            this.d[1] += e.delta[1];

        });

        transform.on('scaling', (e) => {
            e.feature.setStyle(this.styleFunction);
        });

        transform.on(['rotateend', 'translateend', 'scaleend'], (e) => {
            e.feature.setStyle(this.styleFunction);
        });

        return transform;
    }

    deactivate() {
        this.interaction.setActive(false);
    }

}