module.exports = {
    setProxyURL: function(url) {
        proxy = url;
    },
    load: function(tile, src) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", proxy + encodeURIComponent(src).replace(/'/g, "%27").replace(/"/g, "%22"));
        xhr.responseType = "arraybuffer";

        xhr.onload = function() {
            var arrayBufferView = new Uint8Array(this.response);
            var blob = new Blob([arrayBufferView], { type: 'image/png' });
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            tile.getImage().src = imageUrl;
        };
        xhr.onerror = function() {
            console.log("ERROR de conexión con el servicio de teselas (WMS).");
        };

        xhr.send();
    }
};