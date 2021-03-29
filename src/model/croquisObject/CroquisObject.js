import { Icon, Style } from 'ol/style';


/**
 * Representa un objeto real a representar en el croquis. 
 * Gráficamente será representado por una imágen del catálogo.
 * @export
 * @class CroquisObject
 */
export default class CroquisObject {
    constructor(croquisObjectType) {
        this.id;
        this.category = croquisObjectType.getCategory();
        this.type = croquisObjectType.getType();
        this.color;
        this.label;
        this.img = new Image();
        this.img.src = croquisObjectType.getImg();
        this.observation;
    }


    getStyle() {
        return new Style({
            image: new Icon({
                src: this.img.src,
                color: this.color
            })
        });
    }

    
    getScaledImage(scaleX, scaleY) {
        var canvas = document.createElement('canvas');
        let x = Math.round(this.img.width * scaleX);
        let y = Math.round(this.img.height * scaleY);
        canvas.width = x;
        canvas.height = y;
        let ctx = canvas.getContext("2d");
        //si la imagen no existe o no es accesible
        //se usa la imagen por defecto
        try {
            ctx.drawImage(this.img, 0, 0, x, y);
            var url = canvas.toDataURL();
        } catch (error) {
            console.log('ERROR falla imagen. Se usa imagen por defecto');
            this.img.src = 'img/default-img.png';
            ctx.drawImage(this.img, 0, 0, x, y);
            var url = canvas.toDataURL();
        }

        canvas.remove();
        return url;
    }



    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getLabel() {
        return this.label;
    }

    setLabel(label) {
        this.label = label;
    }

    getType() {
        return this.type;
    }

    getImg() {
        return this.img.src;
    }

    setImg(imgSrc) {
        this.img.src = imgSrc;
    }

    getObservation() {
        return this.observation;
    }

    setObservation(observation) {
        this.observation = observation;
    }



}