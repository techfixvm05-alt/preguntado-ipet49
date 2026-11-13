# Preguntado IPET N°49

Juego web adaptable a celular y computadora, con cuatro ruletas, preguntas editables y ranking local. Incluye una opción para guardar puntajes en Google Sheets mediante Google Apps Script.

## Contenido

- 144 preguntas originales repartidas entre Escuela, Villa María y Córdoba.
- 18 preguntas nuevas sobre el Museo de Oliva, el Museo Mario Kempes y el Espacio para la Memoria La Perla.
- Panel de administración para crear y renombrar ruletas y categorías, editar preguntas y respuestas, y cambiar el tiempo, la cantidad de preguntas y los puntos.
- Diseño adaptable para pantallas chicas y grandes.
- Copia de seguridad del banco en formato JSON y descarga del ranking en CSV.

## Abrir la versión descargable

1. Descomprimí el archivo.
2. Abrí `index.html` en un navegador actualizado.
3. Los cambios del banco y el ranking local quedan guardados en ese navegador.

El juego funciona sin conexión para las partidas locales. La conexión a Google Sheets requiere internet.

## Publicar en Vercel

1. Subí esta carpeta a un repositorio de Git o usá Vercel CLI desde esta carpeta.
2. En Vercel elegí el framework **Other**. No hace falta comando de construcción; la carpeta raíz contiene `index.html`.
3. Publicá el proyecto. El archivo `vercel.json` ya está incluido.

## Panel de administración

En la pantalla principal, elegí **Administrar**. El PIN inicial es `4949`; se puede cambiar en **Juego y ranking**.

El banco se guarda en el navegador donde se hacen los cambios. Para mover los cambios a otra computadora, descargá el banco JSON desde **Copias y datos** y cargalo en el otro navegador. Si el sitio está publicado y querés que todos reciban un banco modificado, exportá el JSON y reemplazá el contenido de `preguntas.js` antes de volver a publicar.

El PIN es una barrera sencilla del lado del navegador. El panel no tiene control de acceso de servidor y no conviene tratarlo como una contraseña privada.

## Conectar Google Sheets

Seguí los pasos de `GUIA-GOOGLE-SHEETS.md`. Al terminar, pegá la URL de la implementación de Apps Script en **Administrar → Juego y ranking → Conectar Google Sheets** y elegí **Guardar configuración**. El endpoint se guarda en ese navegador. Para que otros dispositivos usen el ranking compartido sin configurarlo a mano, actualizá `sheetEndpoint` dentro de `preguntas.js` con esa URL y volvé a publicar el sitio.

El sitio envía nombre o apodo, puntaje, cantidad de aciertos, total de preguntas, ruleta, fecha e identificador de partida. La hoja de cálculo puede permanecer privada: Apps Script se ejecuta con la cuenta que lo implementó. El servicio admite envíos públicos, así que usá apodos y revisá periódicamente la hoja.

## Preguntas incorporadas

Se añadieron 18 preguntas con respuesta definida en los materiales de la muestra. Se omitieron algunas preguntas de los documentos que no indicaban una respuesta correcta clara.
