import Measure, { CARTOGRAPHIC_MEASURE } from './Measure';
import Color from '../../style/Color';

/**
 * Representa una medida realizada desde el SIG.
 *
 * @export
 * @class CartographicMeasure
 * @extends {Measure}
 */
export default class CartographicMeasure extends Measure {
    constructor(measureValue) {
        super(measureValue, CARTOGRAPHIC_MEASURE)
        this.color = Color.DEFAULT_CARTOGRAPHIC_MEASURE;
    }

}