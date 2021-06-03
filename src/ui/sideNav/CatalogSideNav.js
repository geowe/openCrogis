import { UIElement } from 'geowe-ui-js/api/base/UIElement';
import { SelectableList } from 'geowe-ui-js/api/list/SelectableList';
import { SideNav } from "geowe-ui-js/api/sidenav/SideNav";
import CroquisObjectCatalog from '../../service/CroquisObjectCatalog';
import CroquisObjectType from '../../model/croquisObject/croquisObjectType';
import DrawCroquisObjectTool from '../../tool/drawTool/DrawCroquisObjectTool';
import html from '../html/CatalogPanel.html';
import Alert from '../Alert';
import { clearUserProjection } from 'ol/proj';


/**
 * Responsable de presentar el sideNav del catálogo de objetos de croquis
 *
 * @export
 * @class CatalogSideNav
 */
export default class CatalogSideNav {
    constructor(mapContext) {
        this.layerBuilder = mapContext.getLayerBuilder();
        this.mapConfig = mapContext;
        this.sideNav = new SideNav({ id: 'catalogSideNav' });
        this.sideNav.setTitle(`<i class="fas fa-th-list fa-2x ml-1 mt-1 text-light"> Catálogo</i>
        <button id="catalogCloseBtn" type="button" class="btn rounded btn-outline-secondary float-right">
        <i class="fas fa-angle-double-left fa-2x text-light"></i></button>"`);
        this.sideNav.closeButton.style.visibility = "hidden";
        
        this.sideNav.setClassName('crogis-sidenav');

        var catalogPanel = new UIElement('catalogPanel', '', html);
        this.sideNav.addUIElement(catalogPanel);

        this.catalog = new CroquisObjectCatalog();

        /**Es necesario almacenar los tipos, ya que el selectedList solo guarda una cadena */
        this.typesMap = new Map();
        this.dropdown = this.sideNav.findDomElement("categories-dropdown");

        this.progress = this.sideNav.findDomElement("progress");
        this.closeButton = this.sideNav.findDomElement("catalogCloseBtn");
        this.setCloseButtonAction();
        
        this.alert;
    }

    async loadData() {
        try {
            this.clearCategories();
            this.showProgress();
            const response = await this.catalog.loadCategories();
            const categoriesJson = await response.json();
            this.fillCategories(categoriesJson);
            this.hideProgress();
            this.hideAlert();
        } catch (error) {
            this.hideProgress();
            this.alert = Alert.error('<i class="fas fa-exclamation-triangle"></i> &#124; No se ha podido cargar la información de las categorías');
            this.alert.show();
            this.clearCategories();
            console.log(error.message);
        }
    }

    clearCategories() {
        this.dropdown.length = 0;
        this.clearCategoryTypes();

    }

    clearCategoryTypes() {
        this.sideNav.findDomElement("tipos").innerHTML = null;
    }

    fillCategories(categoriesJson) {
        let option;
        categoriesJson.forEach(element => {
            option = document.createElement('option');
            option.text = element.name;
            option.value = element.definitionFile;
            if(element.active){
                this.dropdown.add(option);
            }            
        });
        this.loadCategoryTypes(categoriesJson[0].definitionFile);

        this.dropdown.addEventListener('change', (event) => {
            this.loadCategoryTypes(event.target.value);
        });
    }

    async loadCategoryTypes(categoryDefUrl) {
        try {
            this.showProgress();
            const response = await this.catalog.loadCategoryTypes(categoryDefUrl);
            const categoryJson = await response.json();
            this.fillTypes(categoryJson);
            this.hideProgress();
            this.hideAlert();
        } catch (error) {
            this.hideProgress();
            this.alert = Alert.error('<i class="fas fa-exclamation-triangle"></i> &#124; No se ha podido cargar la información de los tipos de objetos');
            this.alert.show();
            this.clearCategoryTypes();
            console.log(error.message);
        }
    }

    fillTypes(categoryJson) {

        this.typesMap.clear();
        categoryJson.types.forEach(type => {
            //this.typesMap.set(type.type, type.img);
            this.typesMap.set(type.type, type);
        })

        //hay que vaciarlo cada vez, pero ¿no hay otra forma?
        this.sideNav.findDomElement("tipos").innerHTML = null;

        var typesList = new SelectableList('typesListId', false);
        categoryJson.types.forEach(type => {
            if (type.iconFont) {
                typesList.add(type.type, '<small>' + type.type + '</small>', false, type.iconFont, false);
            } else {
                typesList.add(type.type, '<small> <img src="' + type.img + '" class="selectItem"></img> ' + type.type + '</small>', false, '', false);
            }
        });

        typesList.addListener(this);
        typesList.bind("tipos");

        let attribution = this.sideNav.findDomElement("categoryAttribution");
        attribution.innerHTML = categoryJson.attribution || '';
    }

    onSelectionChanged(type, selectedItems) {        
        var croquisObjectType = new CroquisObjectType(
            this.dropdown.options[this.dropdown.selectedIndex].text,
            type.getId(),
            this.typesMap.get(type.getId()).img,
            this.typesMap.get(type.getId()).radius);
        var drawCroquisObjectTool = new DrawCroquisObjectTool(croquisObjectType, this.layerBuilder, this.mapConfig);
        drawCroquisObjectTool.activate();
        this.mapConfig.setCursor('cell');
    }

    setCloseButtonAction(){        
        this.closeButton.addEventListener('click', ()=>{            
            this.hide();            
        });
    }

    hide() {
        this.sideNav.hide();
        this.hideAlert();
    }

    show() {
        this.sideNav.show();
    }

    hideAlert() {
        if (this.alert !== undefined) {
            console.log('deberia ocular el alert');
            this.alert.hide();
        }
    }

    showProgress() {
        this.progress.style.display = "block";
    }

    hideProgress() {
        progress.style.display = "none";
    }

    setCatalogButton(catalogButton){
        this.catalogButton = catalogButton;
    }
}