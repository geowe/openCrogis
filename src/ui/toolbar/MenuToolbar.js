import Bar from 'ol-ext/control/Bar';
import Button from 'ol-ext/control/Button';
import CroquisSenderTool from '../../tool/croquis/CroquisSenderTool';
import CatalogSideNav from '../sideNav/CatalogSideNav';
import { Attribution } from 'ol/control';

export default class MenuToolbar {

    constructor(mapContext, mainToolBar){
        this.mapContext = mapContext;
        this.mainToolBar = mainToolBar;
    }
    
    getMenuToolbar() {
        let menuToolbar = new Bar();
        menuToolbar.setPosition('top-left');

        const catalogSideNav = new CatalogSideNav(this.mapContext);
        var catalogButton = new Button({
            html: '<i class="fas fa-th-list"></i>',
            className: "catalog",
            title: "Catálogo de elementos de croquis",
            handleClick: () => {               
                catalogSideNav.loadData();
                catalogSideNav.show();                
                this.mapContext.setCursor('auto');
                this.mainToolBar.deactivateControls();                
            }
        });
        menuToolbar.addControl(catalogButton);
       
        var croquisSender = new CroquisSenderTool(this.mapContext);
        var saveCroquisButton = new Button({
            html: '<i class="fas fa-download"></i>',
            className: "save-croquis",
            title: "Guardar Croquis",
            handleClick: () => {                
                croquisSender.send();
            }
        });
        menuToolbar.addControl(saveCroquisButton);
        
        let collapsableSpan = document.createElement('span')
        collapsableSpan.innerHTML = '<i class="fas fa-angle-double-left"></i>';
        const attribution = new Attribution({
            collapsible:true,
            tipLabel:'Acerca de...',
            collapseLabel: collapsableSpan
        });       
        menuToolbar.addControl(attribution);
        
        
        /*var imageExporter = new ImageExporter(mapContext);
        var exportPNGButton = new Button({
            html: '<i class="fas fa-camera"></i>',
            className: "to-png",
            title: "Enviar captura",
            handleClick: () => {
                imageExporter.exportPNG();
            }
        });
        menuToolbar.addControl(exportPNGButton);       

        */

        return menuToolbar;

    }
}