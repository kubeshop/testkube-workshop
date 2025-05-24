# La Venganza de las Plataformas

> **Info!** La introducción a este Episodio es presentado por el Orador del workshop

Pasos a seguir:

## Gestionar la ejecución

Para ello utilizaremos [Testkube](https://testkube.io), la idea es que puedan probar su propia instancia por lo tanto se les hará entrega de llaves de licencias para que puedan utilizar, si no disponen de un cluster de Kubernetes en el que desplegar soliciten una alternativa al Orador.

1. Asegurar que la sesión está iniciada en el cluster de Kubernetes donde vas a desplegar Testkube, puedes validarlo con el siguiente comando:

    ```bash
    kubectl config current-context
    ```

2. Luego ejecuta el comando que inicializa la instalación de un ambiente de prueba de Testkube:

    ```bash
    testkube init demo
    ```

    > **Info!** aquí se solicitará la llave de licencia que debe entregar el Orador.

3. Una vez terminada la ejecución, si tuviste éxito podrás aceptar para acceder a la consola de Testkube. Las credenciales del ambiente de prueba es:

    |Parámetro|Valor|
    |---------|-----|
    |Usuario|admin@example.com|
    |Contraseña|<La entregará el Orador>|

4. Ahora toca gestionar la ejecución de las pruebas, sigue las instrucciones del orador y navega hasta la vista de Test Workflows para crear la configuración que gestionará la ejecución de las pruebas unitarias.

    > **Desafío!** si llegaste aquí antes que los demás, intenta crear tu solo el Test Workflow para el testing unitario.

5. Una vez creado, lo ejecutaremos manualmente, para ello sigue las instrucciones del Orador.

## Ir más allá en las pruebas

Las pruebas de integración requieren más que código para ejecutar, necesitamos:

* Una instancia de la base de datos.
* Datos de prueba pre-cargados.
* Entregar los datos de la base de datos a la ejecución de las pruebas

Sigue las instrucciones del Orador para construir cada uno de esos pasos.

Ahora toca seguir al último episodio, el [Episodio IV: Una Nueva Esperanza](./revenge-of-the-testkube-platform.md).
