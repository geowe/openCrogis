import defaultConfig from './default_config.json';

const CONFIG_URL = './config/config.json';
class Configuration {

    async load() {
        const response = await fetch(CONFIG_URL);
        this._config = await response.json();
    }

    getProxyURL() {
        return this._config.proxy_url;
    }

    getDefaultProxyURL() {
        return defaultConfig.proxy_url;
    }

    getDocumentationURL(){
        return this._config.documentation_url;
    }

    enableScale(){        
        return this._config.transformObject.enableScale;
    }

    enableRotate(){        
        return this._config.transformObject.enableRotate;
    }

    enableTranslate(){        
        return this._config.transformObject.enableTranslate;
    }

    ask4Observation(){
        return this._config.ask4Observation;
    }

}

export default new Configuration();