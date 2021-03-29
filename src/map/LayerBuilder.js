import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import LayerGroup from 'ol/layer/Group';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import proxyTileLoader from '../util/ProxyTileLoader';
import OSM from 'ol/source/OSM';
import configuration from '../Configuration';

/**
 * Constructor de las capas base y de trabajo
 *
 * @export
 * @class LayerBuilder
 */
export default class LayerBuilder {
    constructor() {
        let docUrl = configuration.getDocumentationURL();
        
        // OBJETOS DE CROQUIS vector source
        var croquisObjectSource = new VectorSource({
            attributions: '<br><small class="text-muted">Geolocalización gracias a <a target="_blank" href="https://nominatim.openstreetmap.org">Nominatim (OSM)</a></small>'
            +'<br><small class="text-muted">Con tecnología <a target="_blank" href="https://openlayers.org">OpenLayers</a> y <a target="_blank" href="https://viglino.github.io/ol-ext/">ol-ext</a></small>'
            +'<br><small class="text-muted">Hecho con <i class="fas fa-heart"></i> por <a target="_blank" href="https://geowe.org/">GeoWE</a></small>'
            +'<br><small class="text-muted"><a target="_blank" href="https://www.geowe.org/gis/index.php?id=termsOfUse">Términos y condiciones</a></small>'
            +' | <small class="text-muted"><a target="_blank" href="https://www.geowe.org/gis/index.php?id=privacy">Privacidad</a></small>'
            +'<br><small class="text-muted"><a target="_blank" href="'+docUrl+'">Manual de uso</a></small>',
            wrapX: false
        });

        //  Vector layer
        this.croquisObjectLayer = new VectorLayer({ title: 'Objetos', source: croquisObjectSource });

        // MEDIDAS vector source
        var measureSource = new VectorSource({ wrapX: false });
        //  Vector layer
        this.measureLayer = new VectorLayer({ title: 'Medidas', source: measureSource });

        // PUNTOS DE REFERENCIA vector source 
        var referencePointSource = new VectorSource({ wrapX: false });
        //  Vector layer
        this.referencePointLayer = new VectorLayer({ title: 'Puntos de Referencia', source: referencePointSource });

        // ELEMENTOS AUXILIARES vector source 
        var auxElementSource = new VectorSource({ wrapX: false });
        //  Vector layer
        this.auxElementLayer = new VectorLayer({ title: 'Elementos auxiliares', source: auxElementSource });

    }


    getBaseLayerGroup() {
        let proxyUrl = configuration.getProxyURL();
        var iGNLayer = new TileLayer({
            title: 'IGN',
            visible: false,
            source: new TileWMS({
                attributions: '<br><small class="text-muted">© <a target="_blank" href="http://www.ign.es">Instituto Geográfico Nacional</a></small> ',
                url: 'https://www.ign.es/wms-inspire/ign-base',
                params: {
                    LAYERS: 'IGNBaseTodo',
                    SRS: 'EPSG:3857',
                    FORMAT: 'image/png'
                },
                tileLoadFunction: proxyUrl ? proxyTileLoader.load: undefined,
                visible: true
            })
        });
        var pNOALayer = new TileLayer({
            title: 'PNOA',
            visible: false,
            source: new TileWMS({
                attributions: '<br><small class="text-muted">© <a target="_blank" href="http://www.scne.es">Sistema Cartográfico Nacional</a></small> ',
                url: 'https://www.ign.es/wms-inspire/pnoa-ma',
                params: {
                    LAYERS: 'OI.OrthoimageCoverage',
                    SRS: 'EPSG:3857',
                    FORMAT: 'image/png'
                },
                tileLoadFunction: proxyUrl ? proxyTileLoader.load: undefined,
            })
        });  
        
        var osmLayer = new TileLayer({
            title: 'OSM',            
            source: new OSM({
                attributions: '<br><small class="text-muted">Colaboradores de ©<a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a></small>'
            })
          })

        //LAYER GROUP
        return new LayerGroup({
            title: '<b>Capas base</b>',
            openInLayerSwitcher: true,
            layers: [pNOALayer, iGNLayer, osmLayer]
        });
    }

    getWorkingLayerGroup() {
        return new LayerGroup({
            title: '<b>Capas:</b>',
            openInLayerSwitcher: true,
            layers: [this.auxElementLayer, this.croquisObjectLayer, this.measureLayer,
                this.referencePointLayer
            ]
        });
    }

    getCroquisObjectLayer() {
        return this.croquisObjectLayer;
    }

    getMeasureLayer() {
        return this.measureLayer;
    }

    getReferencePointLayer() {
        return this.referencePointLayer;
    }

    getAuxElementLayer() {
        return this.auxElementLayer;
    }

}