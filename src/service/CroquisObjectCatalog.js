import Catalog from '../model/catalog/Catalog';
/**
 * Responsable de cargar los objetos del croquis desde el catálogo.
 *
 * @export
 * @class CroquisObjectCatalog
 */
export default class CroquisObjectCatalog {
    constructor() {
        this.categoriesUrl = 'catalog/catalog-categories.json';
        this.timeout = 5000;
    }

    async loadCategoryTypes(jsonUrl) {
        try {
            return await this.fetchTimeout(jsonUrl, { timeout: this.timeout });
        } catch (error) {
            throw new Error('Error al obtener los tipos de objetos: ' + error.message);
        }
    }

    async loadCategories() {
        try {
            return await this.fetchTimeout(this.categoriesUrl, { timeout: this.timeout });
        } catch (error) {
            throw new Error('Error al obtener las categorías: ' + error.message);
        }
    }

    
    fetchTimeout(url, options = {}) {
        let timeout = options.timeout || 30000;
        let timeout_err = {
            ok: false,
            status: 408,
            message: 'Tiempo de espera agotado'
        };
        return new Promise(function(resolve, reject) {
            fetch(url, options).then(resolve, reject);
            setTimeout(reject.bind(null, timeout_err), timeout);
        });
    }

    /**
    * Función de estilo para elementos auxiliares
    * @returns {Catalog} catalog
    */
    async getCatalog() {
        try {
            
            let objectTypes = [];
            let response = await this.loadCategories();
            let categoriesJson = await response.json();            
            
            for (const category of categoriesJson) {
                const typesResponse = await this.loadCategoryTypes(category.definitionFile);
                const objTypes = await typesResponse.json();  
                //console.log(JSON.stringify(objTypes));
                objectTypes.push(objTypes);
            }
            let catalog = new Catalog();
            catalog.setCroquisObjectTypes(objectTypes);
            
            return catalog;

        } catch (error) {
            console.log(error.message);
            throw new Error('Error al obtener información del catálogo ' + error.message);
        }
    }
}