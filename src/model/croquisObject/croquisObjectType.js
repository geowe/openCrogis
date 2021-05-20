/**
 * Representa un tipo de objeto de croquis.
 * La definición del tipo se establece del catálogo.
 * @export
 * @class CroquisObjectType
 */
export default class CroquisObjectType {
    constructor(category, type, imgPath, radius) {
        this.category = category;
        this.type = type;
        this.img = imgPath;
        this.radius = radius;
    }

    getCategory() {
        return this.category;
    }

    getType() {
        return this.type;
    }

    getImg() {
        return this.img;
    }

    getRadius(){
        return this.radius;
    }
}