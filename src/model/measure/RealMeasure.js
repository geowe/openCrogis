import Measure, { REAL_MEASURE } from './Measure';
import Color from '../../style/Color';

/**
 * Representa una medida real tomada en campo.
 *
 * @export
 * @class RealMeasure
 * @extends {Measure}
 */
export default class RealMeasure extends Measure {
    constructor(realMeasureValue) {
        super(realMeasureValue, REAL_MEASURE)
        this.color = Color.DEFAULT_REAL_MEASURE;

        this.sourcePointId;
        this.targetPointId;
    }



    getSourcePoint() {
        return this.sourcePointId;
    }

    setSourcePoint(sourcePointId) {
        this.sourcePointId = sourcePointId
    }

    getTargetPoint() {
        return this.targetPointId;
    }

    setSourcePoint(targetPointId) {
        this.targetPointId = targetPointId
    }
}