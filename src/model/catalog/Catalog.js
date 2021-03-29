/**
 * Representa el catálogo de objetos de croquis *
 * @export
 * @class Catalog
 */
export default class Catalog {
    constructor() {
        this.croquisObjectTypes;
    }

    /**
     * Establece los objetos de croquis
     *
     * @param {Array} objectTypes
     * @memberof Catalog
     */
    setCroquisObjectTypes(objectTypes) {
        this.croquisObjectTypes = objectTypes;
    }

    getCroquisObjectTypes() {
        return this.croquisObjectTypes;
    }


    getCroquisObjectImgPath(category, type) {
        let categorySelected = this.getCategoryTypes(category);
        if(typeof categorySelected === 'undefined'){
            console.log('No se encuentra la categoría'+ category+'. Se carga categoria por defecto');
            categorySelected = this.getCategoryTypes('Vehículos');
        }
        let obj;
        for (const element of categorySelected.types) {
            obj = element;
            if (element.type == type) {
                obj = element;
                break;
            }
            
        }
        return obj.img;
    }


    getCategoryTypes(categoryName) {
        let categoryFound;
        for (const category of this.croquisObjectTypes) {
            if (category.categoryName == categoryName) {
                categoryFound = category;
                break;
            }
        }
        return categoryFound;
    }

}