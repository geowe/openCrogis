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
        return this._config.documentation_url
    }

}

export default new Configuration();