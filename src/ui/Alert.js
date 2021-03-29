import html from './html/alert.html';
import { UIElement } from 'geowe-ui-js/api/base/UIElement';

/**
 * Representa un aviso al usuario.
 * Toma la vista html de aler.html 
 * @export
 * @class Alert
 */
export default class Alert {
    constructor(className) {
        this.alertHtml = new UIElement('alertContainer', '', html);
        this.className = className;

    }

    setContent(content) {
        var alertDiv = this.alertHtml.findDomElement('alert');
        alertDiv.innerHTML = content;
        alertDiv.classList.add(this.className);
        return this;
    }

    static error(content) {
        var alert = new Alert('alert-danger');
        alert.setContent(content);
        return alert;
    }

    static warn(content) {
        var alert = new Alert('alert-warning');
        alert.setContent(content);
        return alert;
    }

    static info(content) {
        var alert = new Alert('alert-info');
        alert.setContent(content);
        return alert;
    }

    static success(content) {
        var alert = new Alert('alert-success');
        alert.setContent(content);
        return alert;
    }

    hide() {
        this.alertHtml.hide();
    }

    show() {
        this.alertHtml.show();
    }

    showForAWhile(msTohide) {
        this.alertHtml.show();
        setTimeout(() => { this.alertHtml.hide(); }, msTohide);
    }
}