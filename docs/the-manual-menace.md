# La Amenaza Manual

> **Info!** La introducción a este Episodio es presentado por el Orador del workshop

Pasos a seguir:

## Entender tu Código (10 min)

Para aprovechar al máximo el tiempo de la experiencia utilizaremos un software pre-creado a partir del ejemplo de [flujo "Booking process"](https://draft.io/example/eventstorming) mapeado con el método [Event Storming](https://openpracticelibrary.com/practice/event-storming/), el código lo pueden encontrar en el repositorio de Github: [Testing Wars: App Backend](https://github.com/caiodonascimento/testing-wars/tree/main/app/backend).

1. Clonar código de la app:

    ```bash
    git clone https://github.com/caiodonascimento/testing-wars.git
    ```

2. Navegar a la carpeta que contiene el código elaborado con NodeJs + Typescript + NestJs, y preparar el proyecto instalando dependencias:

    ```bash
    cd testing-wars/app/backend
    npm i
    ```

3. Se recomienda abrir el proyecto con su IDE favorito, se recomienda VSCode, navegue en el código para descubrir lo que hace, aquí la estructura del proyecto explicado:

    ```
    .
    ├── Dockerfile
    ├── eslint.config.mjs
    ├── helm/
    ├── nest-cli.json
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── src
    │   ├── app.controller.spec.ts
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   ├── booking/
    │   ├── entities/
    │   ├── interfaces/
    │   └── main.ts
    ├── test
    │   ├── app.e2e-spec.ts
    │   ├── booking.e2e-spec.ts
    │   ├── data-management/
    │   ├── fixtures/
    │   └── jest-e2e.json
    ├── Tiltfile
    ├── tsconfig.build.json
    └── tsconfig.json
    ```

4. Hora de probar la aplicación de forma manual como lo haríamos "antiguamente", para simular en nuestro ambiente local el despliegue final en kubernetes vamos a usar Tilt:

    ```bash
    kubectl create ns hotel
    tilt up
    ```

    Prepara la base de datos creada con datos de prueba:

    ```bash
    npm run typeorm -- migration:generate database-sync -d ./src/datasource.ts
    npm run typeorm -- migration:run -d ./src/datasource.ts
    npm run test:load-data
    ```

    Una vez el software está arriba podemos consumir nuestra app desde la url: http://localhost:3000/api.

5. Inicia un timer y luego ejecuta los siguientes casos de prueba para asegurar que el requerimiento esta correctamente implementado:

    > **Importante!** estos escenarios consideran datos de pruebas pre-creados para simular un caso real.

    * Funcionalidad: El App debe tener un método de health check.
      * Escenario: El app debe indicar el estado de su funcionamiento.
        * Dado: el context `/health`
        * Cuando: se hace una llamada HTTP de tipo **GET**
        * Entonces: Retorna `{ "status": "ok" }` y código HTTP `200`.

    * Funcionalidad: Filtrar habitaciones disponibles.
      * Escenario: Filtrar habitaciones disponibles cuando el rango de búsqueda es antes de todas las reservas actuales.
        * Dado: el context `/booking/availableRooms`
        * Cuando: se hace una llamada HTTP de tipo **GET**
        * Y: Se busca habitaciones del Hotel `Hotel Sunshine` (ID: `47c1082c-2fa6-11f0-819b-325096b39f47`)
        * Y: El rango de fecha es desde `2024-12-25` al `2024-12-30`
        * Entonces: Retorna 2 habitaciones con los IDs: <table>, y código HTTP `200`.

          | Room ID |
          |---------|
          |8205b0ca-2fa9-11f0-**8b32**-325096b39f47|
          |8205b0ca-2fa9-11f0-**8b31**-325096b39f47|

      * Escenario: Filtrar habitaciones disponibles cuando el rango de búsqueda es después de todas las reservas actuales.
        * Dado: el context `/booking/availableRooms`
        * Cuando: se hace una llamada HTTP de tipo **GET**
        * Y: Se busca habitaciones del Hotel `Hotel Sunshine` (ID: `47c1082c-2fa6-11f0-819b-325096b39f47`)
        * Y: El rango de fecha es desde `2025-01-16` al `2025-01-20`
        * Entonces: Retorna 2 habitaciones con los IDs: <table>, y código HTTP `200`.

          | Room ID |
          |---------|
          |8205b0ca-2fa9-11f0-**8b32**-325096b39f47|
          |8205b0ca-2fa9-11f0-**8b31**-325096b39f47|

      * Escenario: Filtrar habitaciones disponibles cuando el rango de búsqueda fecha de entrada antes y de salida dentro del rango de las reservar actuales.
        * Dado: el context `/booking/availableRooms`
        * Cuando: se hace una llamada HTTP de tipo **GET**
        * Y: Se busca habitaciones del Hotel `Hotel Sunshine` (ID: `47c1082c-2fa6-11f0-819b-325096b39f47`)
        * Y: El rango de fecha es desde `2024-12-25` al `2025-01-10`
        * Entonces: Retorna 1 habitación con los IDs: <table>, y código HTTP `200`.

          | Room ID |
          |---------|
          |8205b0ca-2fa9-11f0-**8b32**-325096b39f47|

      * Escenario: Filtrar habitaciones disponibles cuando el rango de búsqueda fecha de entrada dentro y de salida después del rango de las reservar actuales.
        * Dado: el context `/booking/availableRooms`
        * Cuando: se hace una llamada HTTP de tipo **GET**
        * Y: Se busca habitaciones del Hotel `Hotel Sunshine` (ID: `47c1082c-2fa6-11f0-819b-325096b39f47`)
        * Y: El rango de fecha es desde `2025-01-10` al `2025-01-20`
        * Entonces: Retorna 1 habitación con los IDs: <table>, y código HTTP `200`.

          | Room ID |
          |---------|
          |8205b0ca-2fa9-11f0-**8b32**-325096b39f47|

      * Escenario: Filtrar habitaciones disponibles cuando el rango de búsqueda fecha de entrada dentro y de salida dentro del rango de las reservar actuales.
        * Dado: el context `/booking/availableRooms`
        * Cuando: se hace una llamada HTTP de tipo **GET**
        * Y: Se busca habitaciones del Hotel `Hotel Sunshine` (ID: `47c1082c-2fa6-11f0-819b-325096b39f47`)
        * Y: El rango de fecha es desde `2025-01-05` al `2025-01-13`
        * Entonces: Retorna 1 habitación con los IDs: <table>, y código HTTP `200`.

          | Room ID |
          |---------|
          |8205b0ca-2fa9-11f0-**8b32**-325096b39f47|

      * Escenario: Filtrar habitaciones disponibles cuando el rango de búsqueda fecha de entrada antes y de salida después del rango de las reservar actuales.
        * Dado: el context `/booking/availableRooms`
        * Cuando: se hace una llamada HTTP de tipo **GET**
        * Y: Se busca habitaciones del Hotel `Hotel Sunshine` (ID: `47c1082c-2fa6-11f0-819b-325096b39f47`)
        * Y: El rango de fecha es desde `2024-12-25` al `2025-01-25`
        * Entonces: Retorna 1 habitación con los IDs: <table>, y código HTTP `200`.

          | Room ID |
          |---------|
          |8205b0ca-2fa9-11f0-**8b32**-325096b39f47|

6. Guarda el dato del tiempo que tomó hacer las pruebas para luego compartirlo con el grupo.


## Escribir tests como Código (5 min)

Vamos a automatizar con pruebas unitarias y pruebas de integración:

> **Importante!** para mayor provecho del tiempo, los códigos ya están implementados. Pero todos están invitados a mejorarlos, expandirlos, replicarlos, modificarlos de la forma que más les guste 😊.

1. Las pruebas unitarias asegurarán que el código que escribimos haga lo que se espera que haga, linea por linea, y no debe validar nada más que el código escrito en el proyecto en cuestión, revisa las hojas de Typescript que tienen como sufijo `spec.ts` que están dentro de la estructura de carpetas `src/`.

2. Descubre como se evita probar más que las lineas de código deseadas utilizando la práctica **Mocking**, un buen ejemplo es el archivo `src/booking/booking.service.spec.ts`.

3. Ejecuta las pruebas unitarias para asegurar que el código haga lo que se espera:

    ```bash
    npm run test
    ```

    👀 Fijese en el tiempo que muestra el resultado.

4. Vamos con las pruebas de integración que nos permiten validar la interfaces del usuario y asegurar el compartamiento al integrar con los sistemas externos que son dependencia del software, tal y como la base de datos, analiza el código de esas pruebas que están en la carpeta `test/`, son los archivos con sufijo `e2e-spec.ts`.

5. Descubre como la integración se hace en modo **gray box** a diferencia de la prueba unitario que es **white box**, al ser gray box solo contamos con información del comportamiento del software y de como invocarlo, esto se puede observar en el archivo `test/booking.e2e-spec.ts`.

6. Finalmente lo ejecutaremos, asegurate de que el ambiente local en tu Kubernetes esta funcionando, el que iniciamos con el comando: `tilt up`. Ahora al ejecutar el comando:

    ```bash
    npm run test:e2e
    ```

    👀 Fijese en el tiempo que muestra el resultado.

Ahora toca seguir al próximo episodio, el [Episodio II: El Ataque de las Herramientas](./the-attack-of-the-tools.md).
