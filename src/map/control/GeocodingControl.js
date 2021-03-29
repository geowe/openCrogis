import SearchNominatim from 'ol-ext/control/SearchNominatim';

/**
 * Control de geocodificación basado en OSM Nominatim
 * Empieza a buscar a los 10 caracteres con un segundo de intervalo entre peticiones
 * @export
 * @class GeocodingControl
 * @extends {SearchNominatim}
 */
export default class GeocodingControl extends SearchNominatim {
    constructor(map) {
        super({
            polygon: false,
            reverse: false,
            placeholder: 'GeoLocalización...',
            typing: 1000,
            minLength: 10,
            position: true
        });

        this.on('select', function(e) {
            map.getView().animate({
                center: e.coordinate,
                zoom: Math.max(map.getView().getZoom(), 18)
            });

        });

    }
}