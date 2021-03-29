/**
 * Representa el objeto DTO de la imagen.
 * @export
 * @class CroquisImg
 */
export default class CroquisImg {
    /**
     * Creates an instance of CroquisImg.
     * @param {String} img: base64
     * @memberof CroquisImg
     */
    constructor(img) {
        this.imgagen = img;
        this.extension = '.png';        
    }

    getImagen(){
        return this.imgagen;
    }

    getExtension(){
        return this.extension;
    }

}