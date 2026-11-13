# Conectar el ranking a Google Sheets

Esta guía configura una hoja de cálculo para recibir los resultados de las partidas.

## 1. Crear el servicio

1. Creá una hoja de cálculo de Google nueva.
2. Desde esa hoja, abrí **Extensiones → Apps Script**. Así el script queda vinculado a la hoja.
3. Abrí `Code.gs` incluido en este paquete, copiá su contenido y reemplazá el código del editor de Apps Script.
4. Guardá el proyecto.

Al recibir el primer resultado, el código crea la pestaña `Ranking` con estas columnas: fecha, identificador, nombre o apodo, puntaje, aciertos, preguntas y ruleta.

## 2. Publicar el servicio

1. En Apps Script, elegí **Implementar → Nueva implementación**.
2. Como tipo, seleccioná **Aplicación web**.
3. Elegí **Ejecutar como: Yo** y **Quién tiene acceso: Cualquier usuario**.
4. Implementá y autorizá el acceso a la hoja cuando Google lo solicite.
5. Copiá la URL que termina en `/exec`.

La hoja no necesita compartirse públicamente. El acceso público corresponde al servicio que recibe el puntaje.

## 3. Pegar la URL en el juego

1. Abrí el juego y entrá en **Administrar → Juego y ranking**.
2. Pegá la URL `/exec` en **URL del servicio**.
3. Elegí **Probar conexión**. Si responde correctamente, guardá la configuración.
4. Completá una partida para enviar un puntaje y usá **Actualizar ranking** para leer los resultados.

En una instalación de Vercel, la configuración del panel se guarda en el navegador actual. Para que otros dispositivos tengan la dirección del servicio desde el inicio, editá el valor `sheetEndpoint` en la sección `settings` de `preguntas.js`, guardá el archivo y volvé a publicar el sitio.

## Datos y uso

El juego envía el nombre o apodo ingresado, el puntaje, los aciertos, el total de preguntas, la ruleta, la fecha y un identificador para evitar duplicados. No ingreses documentos, teléfonos ni otros datos personales. Cualquiera que conozca la dirección del servicio puede enviar puntajes; la hoja debería revisarse después de una actividad pública.

## Si la conexión falla

- Confirmá que pegaste la URL terminada en `/exec`, no la URL del editor.
- Revisá que la implementación permita acceso a cualquier usuario y ejecute como tu cuenta.
- Si cambiaste el código, actualizá la implementación desde **Implementar → Administrar implementaciones**.
- Probá la URL en una ventana nueva; debería mostrar un objeto JSON con `ranking`.
