import { getAuxElementStyle } from './AuxElementStyle';
import { getDefaultStyle } from './DefaultStyle';
import { getMeasureInteractionStyle, getMeasureStyle } from './MeasureStyle';
import { getSelectionStyle } from './SelectionStyle';
import { croquisObjectStyle } from './croquisObjectStyle';
import { getReferencePointStyle } from './ReferencePointStyle';

/**
 * Responsable de crear y proveer los estilos para las diferentes entidades
 *
 * @export
 * @class StyleFactory
 */
export default class StyleFactory {


    getDefaultStyles() {
        return getDefaultStyle();
    }

    getMeasureStyle(realMeasure) {
        return getMeasureStyle(realMeasure);
    }

    getReferencePointStyle(referencePoint) {
        return getReferencePointStyle(referencePoint);
    }


    getAuxElementStyle(element) {
        return getAuxElementStyle(element);
    }

    getCroquisObjectStyleFunction(croquisObject) {
        return croquisObjectStyle(croquisObject);
    }


    getSelectionStyle(feature) {
        return getSelectionStyle(feature);
    }

    getMeasureInteractionStyle() {
        return getMeasureInteractionStyle();
    }
}