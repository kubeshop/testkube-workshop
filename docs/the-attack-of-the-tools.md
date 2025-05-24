# El Ataque de las Herramientas

> **Info!** La introducción a este Episodio es presentado por el Orador del workshop

Pasos a seguir:

## Estandarizar

Para estandarizar necesitamos asegurar que los equipos utilicen archivos de configuración de los frameworks de forma lo más unificada posible, en este ejemplo utilizamos código base autogenerado por el framework [NestJS](https://nestjs.com/), observa detalles tales como las dependencias y la configuración del framework [Jest](https://jestjs.io/) en los siguientes archivos:

* `package.json`: contiene las dependencias de Jest que vamos a necesitar utilizar, y también al final del archivo las configuraciones básicas para el uso del framework Jest.
* `test/jest-e2e.json`: extensión de la configuración de Jest para adaptarse a la ejecución de las pruebas de integración.

## Compartir éxitos

Todos los frameworks de pruebas automatizadas tienen muchas posibles configuraciones, en este caso vamos a compartir el conocimiento de como generamos reportes web y en formato JUnit:

1. Instalar las dependencias para generar reportes:

    ```bash
    npm i -D jest-html-reporter jest-junit
    ```

2. Ejecuta los comandos de prueba con las siguientes variaciones:

    Pruebas unitarias:

    ```bash
    npm run test:cov -- --ci --reporters=default --reporters=jest-junit
    ```

    Pruebas de integración:

    ```bash
    npm run test:e2e -- --ci --reporters=default --reporters=jest-junit --reporters=jest-html-reporter
    ```

    > **Recuerda!** que para las pruebas de integración debes tener el ambiente local arriba y funcionando, además de la carga de datos de prueba, principalmente porque se utiliza la base de datos.

3. Descubre los archivos de reporte que se generaron.

Ahora toca seguir al próximo episodio, el [Episodio III: La Venganza de las Plataformas](./revenge-of-the-testkube-platform.md).
