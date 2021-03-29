import RequestData from "../model/croquis/RequestData";

const URL_PARAM = 'url';
export default class UrlParser {
    constructor(){
        this.queryParams = location.search !== '' ? new URLSearchParams(location.search) : new URLSearchParams();
        
    }

    has (attributeName) {
        return this.queryParams.has(attributeName);
    }
    
    get (attributeName) {
        return this.queryParams.get(attributeName);
    }

    hasUrlParam(){
        return this.has(URL_PARAM);
    }

    buildRequestData(){
        return new RequestData(this.get(URL_PARAM));
    }
}