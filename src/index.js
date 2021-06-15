import '@fortawesome/fontawesome-free/css/all.css';
import 'geowe-ui-js/style/main.css';
import 'ol/ol.css';
import 'ol-ext/dist/ol-ext.css';
import './css/index.css';
import './css/measure.css';
import './css/button.css';
import './css/layerswitcher.css';
import LayerBuilder from './map/LayerBuilder';
import LayerSwitcherBuilder from'./map/LayerSwitcherBuilder';
import MapContext from './map/MapContext';
import MainToolbarFactory from './ui/toolbar/MainToolbarFactory';
import MenuToolbar from './ui/toolbar/MenuToolbar';
import UrlParser from './util/UrlParser';
import CroquisLoaderTool from './tool/croquis/CroquisLoaderTool';
import proxyTileLoader from './util/ProxyTileLoader';
import configuration from './Configuration';
import Alert from './ui/Alert';

configuration.load().then(() => {
    proxyTileLoader.setProxyURL(configuration.getProxyURL());
    init();

}).catch((ex) => {
    console.log("Error al cargar la configuración")
    Alert.error("Error al cargar la configuración. Cargando configuración por defecto ").showForAWhile(5000);
    proxyTileLoader.setProxyURL(configuration.getDefaultProxyURL());
    configuration.setDefaultConfig();
    init();
});


function init() {
    //Considera meter el layerBuilder en el mapConfig
    var layerBuilder = new LayerBuilder();

    var mapContext = new MapContext(layerBuilder);   
    var map = mapContext.getMap();

    new LayerSwitcherBuilder(mapContext).build();   

    // Main toolbar
    var mainbar = MainToolbarFactory.buildOlExtToolBar(mapContext);
    map.addControl(mainbar);

    //Menu toolbar    
    const menuToolbar = new MenuToolbar(mapContext,mainbar);
    map.addControl(menuToolbar.getMenuToolbar());
    
    let urlParser = new UrlParser();
    if(urlParser.hasUrlParam()){
        let requestData = urlParser.buildRequestData();
        mapContext.setRequestData(requestData);
        new CroquisLoaderTool(mapContext).load();        
    }
}

//Control exit page
window.addEventListener("beforeunload", handlePageUnload);

function handlePageUnload(event) {
    event.preventDefault();
    event.returnValue = "";
}