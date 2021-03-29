# Croquizador SIG
El objetivo de este proyecto es proporcionar herramientas SIG para generar croquis.
Pruébalo aquí: (https://geowe.org/openCrogis/)[https://geowe.org/openCrogis/]

## Tecnología

- Node.js (versión 10.x LTS)
- Openlayers (versión 6)

## Requisitos de preparación del software

Es necesario tener Node.js instalado (versión mínima recomendada 10.x LTS).

## Configuración

Configura las URLs en el fichero de configuración config/config.json

```
{
    "proxy_url": "https://proxy-url",
    "documentation_url":"https://geowe.org/openCrogis/doc/"     
}
```
La propiedad *proxy_url* solo es necesaria si quieres usar un proxy para cargar las capas. 

## Instalación

Descargar el código fuente del proyecto y ejecutar el siguiente comando

```
crogis> npm install
```

## Requisitos de despliegue

- El despliegue de la aplicación será en un servidor web
- El despliegue del proxy de teselas requiere un servidor web con php 7 (no es obligatorio)

## Despliegue

1. Construya el software para su puesta en producción, ejecutando el siguiente comando:

```
crogis> npm run build
```
Se creará el directorio **dist** donde obtenemos todos los ficheros a desplegar.

2. Despliegue el software

Verifique que en el directorio **dist** se han credo los contenidos estáticos en los directorios: catalog, config e img. Si no es el caso se puede copiar manualmente desde el código fuente.

Copie el contenido del directorio **dist** en tu servidor web.


## Despliegue el proxy de teselas (opcional)

Copie el fichero _wmsTiledProxy.php_ en una ubicación accesible del servidor web.
La url de acceso al servicio de proxy deberá ser establecida en el fichero config.json (ver Configuración)

Es recomendable establecer la política de CORS según sus necesidades, especificando los dominios permitidos en la función (por defecto * permite cualquier dominio):

```
function enable_cors() {				
	header("Access-Control-Allow-Origin: *");						
}
```

## Autores

El software ha sido desarrollado por  [GeoWE.org](https://geowe.org)

