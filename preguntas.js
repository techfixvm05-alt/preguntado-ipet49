// Pegá aquí la URL /exec de Apps Script para compartirla con todos los dispositivos.
window.https://script.google.com/macros/s/AKfycbw7yMelsIHrd6sjiF2EYATVXvirUe13UQ8dnVs3uLFRZ5SOXoAwAjypov_8H9myzFqmhg/exec = '';
// Banco inicial editable desde el panel de administración.
window.PREGUNTADO_DATA = {
  "schemaVersion": 1,
  "settings": {
    "title": "Preguntado IPET N°49",
    "subtitle": "Girás la ruleta, respondés y aprendemos entre todos.",
    "questionsPerGame": 20,
    "secondsPerQuestion": 20,
    "pointsCorrect": 1,
    "pointsIncorrect": 0,
    "sheetEndpoint": ""
  },
  "roulettes": [
    {
      "id": "escuela",
      "name": "Escuela",
      "icon": "🏫",
      "description": "Técnica, oficios y saberes del aula",
      "categories": [
        {
          "id": "escuela-cat-1",
          "name": "Electrónica",
          "color": "#34d399",
          "questions": [
            {
              "id": "escuela-1-1",
              "text": "¿Qué es un algoritmo?",
              "options": [
                "Un lenguaje de programación",
                "Un conjunto de instrucciones para resolver un problema",
                "Un tipo de hardware"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-1-2",
              "text": "¿Qué significa la sigla RAM en informática?",
              "options": [
                "Read-Only Memory",
                "Random Access Memory",
                "Read Access Memory"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-1-3",
              "text": "¿Cuál es la unidad de medida de la resistencia eléctrica?",
              "options": [
                "Voltios (V)",
                "Amperios (A)",
                "Ohmios (Ω)"
              ],
              "correctIndex": 2
            },
            {
              "id": "escuela-1-4",
              "text": "¿Qué componente electrónico almacena carga eléctrica?",
              "options": [
                "Diodo",
                "Resistor",
                "Capacitor"
              ],
              "correctIndex": 2
            },
            {
              "id": "escuela-1-5",
              "text": "¿Qué ley relaciona la tensión, la corriente y la resistencia en un circuito eléctrico?",
              "options": [
                "Ley de Faraday",
                "Ley de Ohm",
                "Ley de Kirchhoff"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-1-6",
              "text": "¿Cuál es la función principal de un diodo Zener en un circuito?",
              "options": [
                "Rectificar corriente alterna a continua",
                "Oscilar a una frecuencia específica",
                "Estabilizar el voltaje en polarización inversa"
              ],
              "correctIndex": 2
            },
            {
              "id": "escuela-1-7",
              "text": "En un circuito RLC en serie, ¿qué sucede en la frecuencia de resonancia?",
              "options": [
                "La impedancia es mínima y la corriente es máxima",
                "La impedancia es mínima y la corriente es mínima",
                "La impedancia es máxima y la corriente es mínima"
              ],
              "correctIndex": 0
            },
            {
              "id": "escuela-1-8",
              "text": "¿Qué describe el parámetro “ganancia en bucle abierto” (open-loop gain) en un amplificador operacional?",
              "options": [
                "La cantidad de energía almacenada en un ciclo de señal",
                "La ganancia del amplificador cuando no se conecta realimentación",
                "La impedancia de salida del amplificador"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-1-9",
              "text": "¿Qué es la corriente eléctrica?",
              "options": [
                "La energía almacenada en una batería.",
                "El flujo de electrones a través de un conductor.",
                "La cantidad de luz emitida por una lámpara.",
                "La fuerza con la que se empujan los protones."
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-1-10",
              "text": "¿Qué función cumple una resistencia en un circuito?",
              "options": [
                "Aumentar el voltaje en el circuito.",
                "Permitir el paso libre de corriente sin oponerse.",
                "Almacenar energía en forma de campo magnético.",
                "Oponerse al paso de corriente eléctrica y controlar su intensidad."
              ],
              "correctIndex": 3
            }
          ]
        },
        {
          "id": "escuela-cat-2",
          "name": "MMO",
          "color": "#fbbf24",
          "questions": [
            {
              "id": "escuela-2-1",
              "text": "¿Cuáles son los instrumentos utilizados en MMO?",
              "options": [
                "Multímetro y osciloscopio",
                "Tablero e instrumentos de medición",
                "Juegos de llaves, gato y destornilladores",
                "Soldador y tornos"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-2-2",
              "text": "¿En qué se enfoca MMO?",
              "options": [
                "Diseño de planos para construcción",
                "Creación y reparación de instrumentos electrónicos",
                "Mantenimiento e instalación de cableado eléctrico",
                "Elaboración de muebles para el hogar"
              ],
              "correctIndex": 0
            },
            {
              "id": "escuela-2-3",
              "text": "¿Qué ciencia es requerida para esta especialidad?",
              "options": [
                "Ingeniería Automotriz",
                "Física",
                "Topografía",
                "Matemática"
              ],
              "correctIndex": 2
            },
            {
              "id": "escuela-2-4",
              "text": "¿Qué programa utilizan para realizar planos?",
              "options": [
                "Arduino",
                "Paint",
                "SimullIde",
                "AutoCAD"
              ],
              "correctIndex": 3
            },
            {
              "id": "escuela-2-5",
              "text": "¿Qué técnicas se utilizan en MMO?",
              "options": [
                "Técnicas de albañilería",
                "Montaje y reparación de circuitos",
                "Elaboración y terminación de muebles",
                "Técnicas de montaje y desmontaje"
              ],
              "correctIndex": 0
            },
            {
              "id": "escuela-2-6",
              "text": "¿Cuáles son los conocimientos básicos?",
              "options": [
                "Lectura y confección de planos",
                "Cálculos de estructura y presupuesto",
                "Reconocimiento de materiales",
                "Todas las anteriores"
              ],
              "correctIndex": 3
            },
            {
              "id": "escuela-2-7",
              "text": "¿Qué incluye un plano?",
              "options": [
                "Diseño del techo",
                "Muebles sin medidas",
                "Separación de muros, cotas y ambientes",
                "Información estructural"
              ],
              "correctIndex": 2
            },
            {
              "id": "escuela-2-8",
              "text": "¿Cuál es el material más común en construcción?",
              "options": [
                "Ladrillos",
                "Muebles",
                "Vidrio",
                "Todas las anteriores"
              ],
              "correctIndex": 0
            },
            {
              "id": "escuela-2-9",
              "text": "¿Qué es una cota?",
              "options": [
                "Un cable",
                "Un símbolo eléctrico",
                "Un tipo de mueble",
                "Una medida anotada"
              ],
              "correctIndex": 3
            },
            {
              "id": "escuela-2-10",
              "text": "¿Cuáles son los elementos de seguridad?",
              "options": [
                "Casco y gafas",
                "Borcegos",
                "Guarda polvo y guantes",
                "Todas las anteriores"
              ],
              "correctIndex": 3
            }
          ]
        },
        {
          "id": "escuela-cat-3",
          "name": "Historia",
          "color": "#60a5fa",
          "questions": [
            {
              "id": "escuela-3-1",
              "text": "¿En qué año se fundó la escuela que luego se transformaría en el IPET N.º 49 'Domingo Faustino Sarmiento'?",
              "options": [
                "1940",
                "1929",
                "1964"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-3-2",
              "text": "¿Cuál fue el nombre que recibió la escuela en el año 1933?",
              "options": [
                "Escuela Técnica Agroindustrial de Villa María",
                "Instituto Técnico Domingo F. Sarmiento",
                "Escuela del Trabajo Domingo Faustino Sarmiento"
              ],
              "correctIndex": 2
            },
            {
              "id": "escuela-3-3",
              "text": "¿Qué mejoras se realizaron en la escuela en el año 2009 y gracias a qué motivo?",
              "options": [
                "Se amplió la biblioteca con fondos estatales",
                "Se construyó un gimnasio por ayuda del municipio",
                "Se calefaccionó la escuela gracias al aporte mensual de los padres"
              ],
              "correctIndex": 2
            },
            {
              "id": "escuela-3-4",
              "text": "¿En qué año se creó la Asociación Cooperadora del Instituto y con qué finalidad?",
              "options": [
                "1980, para mejorar la calidad pedagógica",
                "1964, para enfrentar carencias de infraestructura",
                "1955, para abrir nuevas carreras técnicas"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-3-5",
              "text": "¿Qué nombre se le dio a la escuela en el año 1968?",
              "options": [
                "Escuela Provincial de Educación Técnica Nº 5",
                "Instituto Provincial de Educación Técnica Nº 2 'Domingo Faustino Sarmiento'",
                "Colegio Nacional de Técnicos Agroindustriales"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-3-6",
              "text": "¿Qué elementos abarca el apoyo financiero de la Asociación Cooperadora?",
              "options": [
                "Solo mantenimiento del comedor escolar",
                "Infraestructura, administración, limpieza y elementos pedagógicos",
                "Únicamente materiales deportivos"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-3-7",
              "text": "¿Cuál fue el primer nombre de la escuela en 1929 y cómo fue evolucionando hasta 1933?",
              "options": [
                "Escuela de Técnicos Mecánicos, luego Instituto Agropecuario",
                "Maestros Rurales Agropecuaria e Industrial 'Sarmiento', luego Escuela de Artes y Oficios y finalmente Escuela del trabajo",
                "Colegio Industrial Domingo Sarmiento, luego Instituto Técnico de Villa María"
              ],
              "correctIndex": 1
            }
          ]
        },
        {
          "id": "escuela-cat-4",
          "name": "Electricidad",
          "color": "#fb7185",
          "questions": [
            {
              "id": "escuela-4-1",
              "text": "¿Qué es la corriente eléctrica?",
              "options": [
                "La energía almacenada en una batería",
                "El flujo de electrones a través de un conductor",
                "La cantidad de luz emitida por una lámpara",
                "La fuerza con la que se empujan los protones"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-4-2",
              "text": "¿Qué función cumple una resistencia en un circuito?",
              "options": [
                "Aumentar el voltaje",
                "Permitir el paso libre de corriente",
                "Almacenar energía",
                "Oponerse al paso de corriente y controlar su intensidad"
              ],
              "correctIndex": 3
            },
            {
              "id": "escuela-4-3",
              "text": "¿Qué instrumento se utiliza para medir voltaje?",
              "options": [
                "Amperímetro",
                "Voltímetro",
                "Multímetro",
                "Osciloscopio"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-4-4",
              "text": "¿Qué componente convierte energía eléctrica en energía luminosa?",
              "options": [
                "Motor",
                "Resistencia",
                "Lámpara",
                "Condensador"
              ],
              "correctIndex": 2
            },
            {
              "id": "escuela-4-5",
              "text": "¿Qué ley relaciona voltaje, corriente y resistencia?",
              "options": [
                "Ley de Ohm",
                "Ley de Faraday",
                "Ley de Kirchhoff",
                "Ley de Coulomb"
              ],
              "correctIndex": 0
            }
          ]
        },
        {
          "id": "escuela-cat-5",
          "name": "Automotores",
          "color": "#a78bfa",
          "questions": [
            {
              "id": "escuela-5-1",
              "text": "¿Cuál es la función principal del motor de un automóvil?",
              "options": [
                "Almacenar combustible",
                "Generar movimiento",
                "Frenar el vehículo",
                "Regular la presión de los neumáticos"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-5-2",
              "text": "¿Qué tipo de combustible usan la mayoría de los automóviles?",
              "options": [
                "Gasolina",
                "Diésel",
                "Electricidad",
                "Hidrógeno"
              ],
              "correctIndex": 0
            },
            {
              "id": "escuela-5-3",
              "text": "¿Qué componente transmite la fuerza del motor a las ruedas?",
              "options": [
                "Batería",
                "Caja de cambios",
                "Alternador",
                "Radiador"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-5-4",
              "text": "¿Cuál es la función de los frenos ABS?",
              "options": [
                "Aumentar la velocidad",
                "Evitar que las ruedas se bloqueen al frenar",
                "Encender las luces",
                "Regular el aceite del motor"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-5-5",
              "text": "¿Qué herramienta se usa para revisar la presión de los neumáticos?",
              "options": [
                "Manómetro",
                "Llave inglesa",
                "Destornillador",
                "Calibrador de aceite"
              ],
              "correctIndex": 0
            }
          ]
        },
        {
          "id": "escuela-cat-6",
          "name": "Mecánica",
          "color": "#22d3ee",
          "questions": [
            {
              "id": "escuela-6-1",
              "text": "¿Qué herramienta se utiliza para aflojar tuercas?",
              "options": [
                "Destornillador",
                "Llave inglesa",
                "Martillo",
                "Sierra"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-6-2",
              "text": "¿Qué tipo de palanca se usa para levantar un auto?",
              "options": [
                "Palanca de primer género",
                "Gato hidráulico",
                "Torquímetro",
                "Cric de leva"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-6-3",
              "text": "¿Qué material se utiliza comúnmente para fabricar ejes y engranajes?",
              "options": [
                "Aluminio",
                "Acero",
                "Plástico",
                "Cobre"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-6-4",
              "text": "¿Qué instrumento se utiliza para medir el espesor de un disco de freno?",
              "options": [
                "Calibrador",
                "Micrómetro",
                "Manómetro",
                "Flexómetro"
              ],
              "correctIndex": 1
            },
            {
              "id": "escuela-6-5",
              "text": "¿Qué tipo de energía se convierte en movimiento en un motor mecánico?",
              "options": [
                "Química",
                "Eléctrica",
                "Térmica",
                "Todas las anteriores"
              ],
              "correctIndex": 2
            }
          ]
        },
        {
          "id": "escuela-cat-7",
          "name": "Carpintería",
          "color": "#f97316",
          "questions": [
            {
              "id": "escuela-7-1",
              "text": "¿Cuál es el material principal de la carpintería?",
              "options": [
                "Madera",
                "Metal",
                "Plástico",
                "Vidrio"
              ],
              "correctIndex": 0
            },
            {
              "id": "escuela-7-2",
              "text": "¿Qué herramienta se usa para cortar madera recta?",
              "options": [
                "Sierra de mano",
                "Martillo",
                "Destornillador",
                "Taladro"
              ],
              "correctIndex": 0
            },
            {
              "id": "escuela-7-3",
              "text": "¿Para qué se usa la lija?",
              "options": [
                "Cortar madera",
                "Pintar madera",
                "Alisar la superficie",
                "Unir piezas"
              ],
              "correctIndex": 2
            },
            {
              "id": "escuela-7-4",
              "text": "¿Qué instrumento mide ángulos en carpintería?",
              "options": [
                "Escuadra",
                "Flexómetro",
                "Compás",
                "Nivel"
              ],
              "correctIndex": 0
            },
            {
              "id": "escuela-7-5",
              "text": "¿Qué tipo de unión se usa para ensamblar piezas de madera?",
              "options": [
                "Clavado",
                "Tornillería",
                "Encolado",
                "Todas las anteriores"
              ],
              "correctIndex": 3
            }
          ]
        }
      ]
    },
    {
      "id": "villa",
      "name": "Villa María",
      "icon": "🏙️",
      "description": "Personas, lugares e historias de la ciudad",
      "categories": [
        {
          "id": "villa-cat-1",
          "name": "Salud",
          "color": "#34d399",
          "questions": [
            {
              "id": "villa-1-1",
              "text": "¿Cuántos centros médicos y centros de salud posee el Sector privado en Villa María?",
              "options": [
                "3 centros médicos y 15 centros de salud",
                "5 centros médicos y más de 20 centros de salud",
                "10 centros médicos y 10 centros de salud",
                "4 centros médicos y 25 centros de salud"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-1-2",
              "text": "¿Cuál fue el primer centro privado local en Villa María?",
              "options": [
                "Sanatorio Cruz Azul",
                "Sanatorio Argentino",
                "Hospital Regional Pasteur",
                "Clínica San Martín"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-1-3",
              "text": "¿En qué década se originó el Sanatorio Argentino?",
              "options": [
                "1940",
                "1930",
                "1950",
                "1960"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-1-4",
              "text": "¿Qué sector complementa y extiende el sector privado de salud?",
              "options": [
                "Sector educativo",
                "Sector comercial",
                "Sector turístico",
                "Sector público de Salud"
              ],
              "correctIndex": 3
            },
            {
              "id": "villa-1-5",
              "text": "¿Qué tipos de centros destacan dentro de la oferta privada por su alta tecnología?",
              "options": [
                "centros de salud mental",
                "centros oftalmológicos",
                "centro de diagnóstico por imágenes",
                "centros deportivos"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-1-6",
              "text": "¿Qué dos actividades se mencionan como motores de la economía local?",
              "options": [
                "Turismo y comercio",
                "Industria y transporte",
                "Salud y deporte",
                "Salud y educación"
              ],
              "correctIndex": 3
            },
            {
              "id": "villa-1-7",
              "text": "¿Qué institución se menciona junto al Sanatorio Argentino como ubicación actual?",
              "options": [
                "Clínica FUSAVIM",
                "Sanatorio Cruz Azul",
                "Hospital Pasteur",
                "Centro integral de Preparación para el Parto"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-1-8",
              "text": "¿Con cuántos trabajadores cuenta el sector público según consultas realizadas a representantes de la Asoc. de Trabajadores de la sanidad?",
              "options": [
                "250",
                "350",
                "400",
                "300"
              ],
              "correctIndex": 3
            },
            {
              "id": "villa-1-9",
              "text": "¿Cuántos trabajadores cuentan en el sector privado?",
              "options": [
                "700",
                "600",
                "500",
                "400"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-1-10",
              "text": "¿Cuántos médicos están trabajando en la ciudad?",
              "options": [
                "500 aprox.",
                "Supera los 300",
                "Supera los 600",
                "500 aprox."
              ],
              "correctIndex": 2
            }
          ]
        },
        {
          "id": "villa-cat-2",
          "name": "Geografía",
          "color": "#fbbf24",
          "questions": [
            {
              "id": "villa-2-1",
              "text": "¿Sobre qué río está emplazada Villa María?",
              "options": [
                "Río Carcarañá",
                "Río Suquía",
                "Río Tercero (Ctlamochita)"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-2-2",
              "text": "¿Qué rutas nacionales principales pasan por la ciudad?",
              "options": [
                "RN 7 y RN 19",
                "RN 8 y RN 36",
                "RN 9 y RN 158"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-2-3",
              "text": "¿En qué región natural se ubica Villa María?",
              "options": [
                "Sierras Pampeanas",
                "Valle de Traslasierra",
                "Llanura pampeana"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-2-4",
              "text": "¿Qué asentamiento existía en la zona antes de la fundación?",
              "options": [
                "Fuerte del Tercero",
                "Posta del Paso de Ferreyra",
                "Villa Nueva Vieja"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-2-5",
              "text": "¿Cuál es la altitud aproximada de la ciudad sobre el nivel del mar?",
              "options": [
                "250 m",
                "196 m",
                "120 m"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-2-6",
              "text": "¿Qué actividad inició Juan López Fiusa en el siglo XVII en la zona?",
              "options": [
                "Cultivo de vid",
                "Cría de ganado mular",
                "Minería de oro"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-2-7",
              "text": "¿A qué departamento pertenece Villa María?",
              "options": [
                "Marcos Juárez",
                "Unión",
                "General San Martín"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-2-8",
              "text": "¿Quiénes trazaron el plano de la villa?",
              "options": [
                "Pablo Barreliér y Santiago Echenique",
                "José María Paz y Jerónimo Cabrera",
                "Mariano Lozano y Bonifacia Moyano"
              ],
              "correctIndex": 0
            }
          ]
        },
        {
          "id": "villa-cat-3",
          "name": "Historia",
          "color": "#60a5fa",
          "questions": [
            {
              "id": "villa-3-1",
              "text": "¿En qué fecha fue aprobada la fundación por el gobernador Mateo J. Luque?",
              "options": [
                "17 de abril de 1861",
                "27 de septiembre de 1867",
                "9 de julio de 1865"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-3-2",
              "text": "¿En qué fecha Mariano Lozano vendió su propiedad a Manuel Anselmo Ocampo?",
              "options": [
                "17 de abril de 1861",
                "27 de septiembre de 1867",
                "25 de mayo de 1858"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-3-3",
              "text": "¿Quién fue el fundador de Villa María?",
              "options": [
                "José María Paz",
                "Manuel Anselmo Ocampo",
                "Jerónimo Luis de Cabrera"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-3-4",
              "text": "¿Cuándo se fundó Villa María?",
              "options": [
                "27 de septiembre de 1967",
                "12 de agosto de 1989",
                "10 de octubre de 1976"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-3-5",
              "text": "¿Quiénes habitaban anteriormente nuestras tierras?",
              "options": [
                "Sanavirones",
                "Ranqueles",
                "Comechingones"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-3-6",
              "text": "¿En qué año se fundó oficialmente Villa María?",
              "options": [
                "1865",
                "1867",
                "1870"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-3-7",
              "text": "¿En qué año Villa María pasó a ser una ciudad?",
              "options": [
                "1915",
                "1910",
                "1920"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-3-8",
              "text": "¿En honor a quién podría haberse nombrado “Villa María”?",
              "options": [
                "La Virgen de Luján",
                "La Virgen María o María Luisa, hija de Ocampo",
                "María de los Remedios de Escalada"
              ],
              "correctIndex": 1
            }
          ]
        },
        {
          "id": "villa-cat-4",
          "name": "Cultura",
          "color": "#fb7185",
          "questions": [
            {
              "id": "villa-4-1",
              "text": "¿Qué festival se hace en Villa María?",
              "options": [
                "Carnaval",
                "Festival de peñas",
                "Lollapalooza"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-4-2",
              "text": "¿Qué músicas se escuchan más en Villa María?",
              "options": [
                "Cuarteto",
                "Folklore",
                "Todas las anteriores"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-4-3",
              "text": "¿Qué museo es de Villa María?",
              "options": [
                "Museo Bonfiglioli",
                "Museo Genaro Pérez",
                "Museo de la Industria"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-4-4",
              "text": "¿Qué es la Usina Cultural?",
              "options": [
                "Sede de lecturas y encuentros artísticos",
                "Sede de conciertos y exposiciones",
                "Todas las anteriores"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-4-5",
              "text": "¿Cuál es la Universidad de Villa María?",
              "options": [
                "Universidad Nacional",
                "Universidad Católica",
                "Universidad Blas Pascal"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-4-6",
              "text": "¿Cuándo se inauguró el Museo Bonfiglioli?",
              "options": [
                "1968",
                "1978",
                "1965"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-4-7",
              "text": "¿Dónde se encuentra ubicado el Museo Bonfiglioli?",
              "options": [
                "Entre el bulevar Sarmiento y San Martín",
                "Entre el bulevar Italia y Santa Fe",
                "Entre el bulevar Sarmiento y 9 de julio"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-4-8",
              "text": "¿Cuántas obras aproximadamente guarda el museo?",
              "options": [
                "Menos de 200",
                "Menos de 300",
                "Más de 300"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-4-9",
              "text": "¿Qué tipo de museo es el Bonfiglioli?",
              "options": [
                "Histórico",
                "Bellas artes",
                "Científico"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-4-10",
              "text": "¿Cuál es el objetivo principal del museo?",
              "options": [
                "Exponer",
                "Preservar",
                "Todas las anteriores"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-4-11",
              "text": "¿Qué días cierra el museo?",
              "options": [
                "Domingo",
                "Sábado",
                "Ambos"
              ],
              "correctIndex": 0
            }
          ]
        },
        {
          "id": "villa-cat-5",
          "name": "Artistas",
          "color": "#a78bfa",
          "questions": [
            {
              "id": "villa-5-1",
              "text": "¿Cuál es la profesión principal de Yayo Guridi?",
              "options": [
                "Cantante",
                "Humorista",
                "Actor de teatro"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-5-2",
              "text": "¿En qué equipo de Malta jugó Juan Cruz Gill?",
              "options": [
                "Hibernians",
                "Valletta FC",
                "Birkirkara FC"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-5-3",
              "text": "¿En qué año falleció Chango Juárez?",
              "options": [
                "2015",
                "2018",
                "2020"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-5-4",
              "text": "¿Cuál fue el primer premio que ganó Karina Jelinek?",
              "options": [
                "Miss Argentina",
                "Miss Carlos Paz",
                "Miss Córdoba"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-5-5",
              "text": "¿En qué programa se hizo famoso Yayo Guridi?",
              "options": [
                "Videomatch",
                "Sin codificar",
                "Showmatch"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-5-6",
              "text": "¿Cuál era la profesión principal de Chango Juárez?",
              "options": [
                "Humorista",
                "Pintor",
                "Músico"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-5-7",
              "text": "¿En qué área se destaca Karina Jelinek?",
              "options": [
                "Actriz y modelo",
                "Canto",
                "Cocina"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-5-8",
              "text": "¿En qué posición jugaba Juan Cruz Gill?",
              "options": [
                "Mediocampista",
                "Delantero",
                "Defensor central"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-5-9",
              "text": "¿A qué edad se trasladó Sol Gabetta a España para formarse musicalmente?",
              "options": [
                "15 años",
                "12 años",
                "18 años"
              ],
              "correctIndex": 1
            },
            {
              "id": "villa-5-10",
              "text": "¿Qué instrumento toca Sol Gabetta?",
              "options": [
                "Violin",
                "Piano",
                "Violoncello"
              ],
              "correctIndex": 2
            }
          ]
        },
        {
          "id": "villa-cat-6",
          "name": "Deportes",
          "color": "#22d3ee",
          "questions": [
            {
              "id": "villa-6-1",
              "text": "¿Cuál fue el primer club en que jugó Mauro Rosales?",
              "options": [
                "Newell's Old Boys",
                "Boca Juniors",
                "River Plate",
                "Ajax"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-6-2",
              "text": "¿En qué año nació Mauro Rosales?",
              "options": [
                "1980",
                "1979",
                "1981",
                "1985"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-6-3",
              "text": "¿Qué posición ocupa Enzo Barrenechea dentro de la cancha?",
              "options": [
                "Medio campista",
                "Delantero",
                "Defensa",
                "Arquero"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-6-4",
              "text": "¿En qué clubes jugó Enzo Barrenechea antes de llegar a la Juventus?",
              "options": [
                "Boca Juniors",
                "Peñarol",
                "Atlanta",
                "FC Sion"
              ],
              "correctIndex": 3
            },
            {
              "id": "villa-6-5",
              "text": "¿En qué categoría del automovilismo argentino se destacó Darío Ramonda?",
              "options": [
                "TC2000",
                "TC2100",
                "TC2200",
                "TC3000"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-6-6",
              "text": "¿Qué papel tuvo Darío Ramonda en el desarrollo del equipo Toyota en el automovilismo nacional?",
              "options": [
                "Piloto",
                "Pit",
                "Team Manager",
                "Banderista"
              ],
              "correctIndex": 2
            },
            {
              "id": "villa-6-7",
              "text": "¿En qué equipo o club de rugby jugó Boris Wenger?",
              "options": [
                "Dogos",
                "Universidad",
                "Pumas",
                "Alumni"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-6-8",
              "text": "¿Qué posición suele ocupar Boris Wenger en el campo de juego?",
              "options": [
                "Wing",
                "Pilar izq.",
                "Ala",
                "Hooker"
              ],
              "correctIndex": 3
            },
            {
              "id": "villa-6-9",
              "text": "¿En qué disciplina del atletismo competía Guillermo Evans?",
              "options": [
                "400m individuales",
                "100m individuales",
                "1000m individuales",
                "600m individuales"
              ],
              "correctIndex": 0
            },
            {
              "id": "villa-6-10",
              "text": "¿A qué se dedicó Guillermo Evans después del atletismo?",
              "options": [
                "Profe de Ed. Física",
                "Reportero deportivo",
                "Cartero",
                "Comentarista deportivo"
              ],
              "correctIndex": 0
            }
          ]
        }
      ]
    },
    {
      "id": "cordoba",
      "name": "Córdoba",
      "icon": "⛰️",
      "description": "Geografía, cultura e historia provincial",
      "categories": [
        {
          "id": "cordoba-cat-1",
          "name": "Circuito Histórico",
          "color": "#34d399",
          "questions": [
            {
              "id": "cordoba-1-1",
              "text": "¿En qué año se inauguró el Teatro Libertador General San Martín?",
              "options": [
                "1891",
                "1881",
                "1901"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-1-2",
              "text": "¿Qué función cumplía el Cabildo además de ser sede del gobierno?",
              "options": [
                "Palacio de Justicia y cárcel",
                "Museo histórico",
                "Teatro y biblioteca"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-1-3",
              "text": "¿Dónde descansan los restos de José María Paz?",
              "options": [
                "Universidad de Córdoba",
                "Catedral",
                "Colegio de Monserrat"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-1-4",
              "text": "¿Qué institución funciona actualmente en Las Teresas?",
              "options": [
                "Museo de Arte Religioso Juan de Tejeda",
                "Museo de Ciencias Naturales",
                "Archivo Histórico de Córdoba"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-1-5",
              "text": "¿Para qué se usaba originalmente la Plaza San Martín?",
              "options": [
                "Para ferias de artesanos",
                "Para ejercicios de las tropas",
                "Como mercado central"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-1-6",
              "text": "¿Cuál es la iglesia más antigua de Argentina?",
              "options": [
                "La Catedral",
                "La Compañía de Jesús",
                "El Monasterio Las Catalinas"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-1-7",
              "text": "¿Qué edificio fue el primero al que asistieron niñas cordobesas?",
              "options": [
                "Las Teresas",
                "Colegio de Monserrat",
                "Monasterio Las Catalinas"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-1-8",
              "text": "¿Quién fundó el Colegio de Monserrat?",
              "options": [
                "Juan de Tejeda",
                "Ignacio Duarte Quirós",
                "Gregorio Funes"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-1-9",
              "text": "¿En qué año se construyó la Universidad de Córdoba?",
              "options": [
                "1782",
                "1687",
                "1613"
              ],
              "correctIndex": 2
            }
          ]
        },
        {
          "id": "cordoba-cat-2",
          "name": "Economía",
          "color": "#fbbf24",
          "questions": [
            {
              "id": "cordoba-2-1",
              "text": "¿Qué son los circuitos económicos?",
              "options": [
                "Es la relación de actividades económicas para obtener un producto.",
                "Es la variación de pasos para obtener un producto.",
                "Es un esquema que representa gráficamente el paso a paso de cómo se elaboró un producto.",
                "Todas son correctas."
              ],
              "correctIndex": 3
            },
            {
              "id": "cordoba-2-2",
              "text": "¿Cuántas industrias lácteas existen en Córdoba?",
              "options": [
                "Alrededor de 450",
                "Alrededor de 750",
                "Alrededor de 315",
                "Alrededor de 350",
                "Alrededor de 500"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-2-3",
              "text": "¿Cuáles son las industrias más importantes de Argentina?",
              "options": [
                "Las industrias lácteas",
                "Las industrias metalúrgicas y lácteas",
                "Las industrias lácteas y alimentarias",
                "Las industrias alimentarias y metalúrgicas"
              ],
              "correctIndex": 3
            },
            {
              "id": "cordoba-2-4",
              "text": "¿Cuál es el porcentaje aproximado de la cantidad de automóviles que genera Córdoba en todo el país?",
              "options": [
                "Aproximadamente es del 45%",
                "Aproximadamente es del 25%",
                "Aproximadamente es del 40%",
                "Aproximadamente es del 30%"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-2-5",
              "text": "¿Cuáles son las principales industrias de Córdoba?",
              "options": [
                "Las lácteas",
                "Las alimentarias",
                "Las metalúrgicas",
                "Todas las anteriores"
              ],
              "correctIndex": 3
            }
          ]
        },
        {
          "id": "cordoba-cat-3",
          "name": "Geografía",
          "color": "#60a5fa",
          "questions": [
            {
              "id": "cordoba-3-1",
              "text": "¿Cuál es la cabecera de San Francisco?",
              "options": [
                "Ischilín",
                "Río Seco",
                "San Justo"
              ],
              "correctIndex": 2
            },
            {
              "id": "cordoba-3-2",
              "text": "¿Cuál es la cabecera de Tercero Arriba?",
              "options": [
                "Oliva",
                "Cruz del Eje",
                "Bell Ville"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-3-3",
              "text": "¿Cuántos departamentos hay en Córdoba?",
              "options": [
                "26 departamentos",
                "24 departamentos",
                "20 departamentos"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-3-4",
              "text": "¿Qué tipo de clima predomina en las sierras de Córdoba?",
              "options": [
                "Templado húmedo",
                "Templado serrano",
                "Semihúmedo"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-3-5",
              "text": "¿Qué función cumplen los diques en algunos ríos de Córdoba?",
              "options": [
                "Embellecer los paisajes naturales",
                "Aumentar el caudal para la navegación",
                "Acumular agua para producir energía y regar cultivos"
              ],
              "correctIndex": 2
            },
            {
              "id": "cordoba-3-6",
              "text": "¿Qué sucede con los ríos de Córdoba durante el invierno?",
              "options": [
                "Aumenta su caudal por las lluvias",
                "Disminuye su curso porque las lluvias son escasas",
                "Se congelan por las bajas temperaturas"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-3-7",
              "text": "¿Qué diferencias hay entre las sierras, los valles y las llanuras que se encuentran en Córdoba?",
              "options": [
                "Las sierras son planas, valles en lo alto y llanuras montañas",
                "Las sierras son elevaciones, valles entre sierras y llanuras planas",
                "Las sierras y los valles tienen agua salada y las llanuras desérticas"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-3-8",
              "text": "¿Qué tipo de relieve predomina en el oeste de la provincia de Córdoba y su pico más alto?",
              "options": [
                "Llanuras - Cerro Aconcagua",
                "Sierras - Cerro Champaquí",
                "Valles - Cerro Uritorco"
              ],
              "correctIndex": 1
            }
          ]
        },
        {
          "id": "cordoba-cat-4",
          "name": "Sierras",
          "color": "#fb7185",
          "questions": [
            {
              "id": "cordoba-4-1",
              "text": "¿Cuáles son los cordones montañosos que forman las sierras de Córdoba?",
              "options": [
                "Andino, Pampeano y Patagónico",
                "Oriental, Central y Occidental",
                "Norte, Sur y Este"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-4-2",
              "text": "¿Cuál es el valle más importante por su desarrollo turístico?",
              "options": [
                "Valle de Calamuchita",
                "Valle de Traslasierra",
                "Valle de Punilla"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-4-3",
              "text": "¿Qué actividades económicas se realizan en los valles serranos?",
              "options": [
                "Minería, pesca y petróleo",
                "Agricultura, ganadería y turismo",
                "Comercio exterior y pesca"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-4-4",
              "text": "¿Para qué se usan los embalses construidos en los ríos?",
              "options": [
                "Solo para nadar",
                "Para acumular energía, riego y consumo humano",
                "Para pescar y lavar ropa"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-4-5",
              "text": "¿Qué se puede visitar en el camino de las Estancias?",
              "options": [
                "Parques nacionales",
                "Estancias jesuíticas como Jesús María y Caroya",
                "Centros comerciales"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-4-6",
              "text": "¿Qué recorre el camino de la Historia?",
              "options": [
                "El centro de la ciudad de Córdoba",
                "El Camino Real y estancias como Santa Catalina",
                "Las playas del sur"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-4-7",
              "text": "¿Qué se observa en el camino de los Volcanes y los Túneles?",
              "options": [
                "Cascadas naturales",
                "Volcanes apagados y túneles antiguos",
                "Playas y médanos"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-4-8",
              "text": "¿Qué pueblos se visitan en el camino de los Grandes Lagos?",
              "options": [
                "La Falda, Capilla del Monte y Mina Clavero",
                "Villa Carlos Paz, Cosquín y Santa María",
                "Córdoba, Rosario y Buenos Aires"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-4-9",
              "text": "¿Qué camino turístico incluye la visita a Capilla del Monte y Los Cocos?",
              "options": [
                "Camino del Norte",
                "Camino de Punilla",
                "Camino de Alta Gracia"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-4-10",
              "text": "¿Por qué es importante regular sin disminuir el turismo en las sierras?",
              "options": [
                "Para atraer más autos",
                "Para construir más hoteles",
                "Para proteger los paisajes y el ambiente"
              ],
              "correctIndex": 2
            }
          ]
        },
        {
          "id": "cordoba-cat-5",
          "name": "Pueblos originarios",
          "color": "#a78bfa",
          "questions": [
            {
              "id": "cordoba-5-1",
              "text": "¿Qué grupos vivieron en la zona de Mar Chiquita?",
              "options": [
                "Comechingones",
                "Sanavirones",
                "Querandíes"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-5-2",
              "text": "¿En qué provincia argentina vivieron los Sanavirones?",
              "options": [
                "Santiago del Estero",
                "Córdoba",
                "Buenos Aires",
                "Tucumán"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-5-3",
              "text": "¿Qué cultivo no aparece mencionado entre los Sanavirones?",
              "options": [
                "Maíz",
                "Porotos",
                "Papa",
                "Quinoa"
              ],
              "correctIndex": 3
            },
            {
              "id": "cordoba-5-4",
              "text": "¿Qué función cumplían los animales como llamas o alpacas para los Sanavirones?",
              "options": [
                "Alimentación y transporte",
                "Defensa y territorio",
                "Juegos rituales",
                "Animales de compañía"
              ],
              "correctIndex": 0
            },
            {
              "id": "cordoba-5-5",
              "text": "¿Cómo se organizaban políticamente los pueblos agricultores de la llanura de Córdoba?",
              "options": [
                "En reinos teocráticos",
                "En aldeas con caciques",
                "En ciudades fortificadas",
                "En campamentos nómadas"
              ],
              "correctIndex": 1
            },
            {
              "id": "cordoba-5-6",
              "text": "¿Qué hacían los pueblos al terminar la recolección de algarrobo?",
              "options": [
                "Migraban a otra zona",
                "Comenzaban el ciclo agrícola",
                "Realizaban fiestas",
                "Quemaban los campos"
              ],
              "correctIndex": 2
            },
            {
              "id": "cordoba-5-7",
              "text": "¿Qué teoría explica el origen de los Sanavirones en Córdoba?",
              "options": [
                "Migraron desde la región pampeana",
                "Llegaron navegando desde el litoral",
                "Vinieron desde Santiago del Estero",
                "Descendieron de pueblos andinos"
              ],
              "correctIndex": 2
            },
            {
              "id": "cordoba-5-8",
              "text": "¿Cuál de estos materiales usaban para construir viviendas los Sanavirones?",
              "options": [
                "Adobe cocido y ladrillos",
                "Piedra caliza",
                "Cuero de animales",
                "Palos, ramas, pajas y tierra"
              ],
              "correctIndex": 3
            }
          ]
        }
      ]
    },
    {
      "id": "museos",
      "name": "Museos",
      "icon": "🏛️",
      "description": "Tres espacios de Córdoba y sus historias",
      "categories": [
        {
          "id": "museo-oliva",
          "name": "Museo de Oliva",
          "color": "#34d399",
          "questions": [
            {
              "id": "museo-oliva-1",
              "text": "¿Cuál es la temática principal del Museo de Oliva?",
              "options": [
                "La historia del ferrocarril y la inmigración en Córdoba",
                "La historia, los objetos y las vivencias de la Guerra de Malvinas de 1982",
                "Las culturas originarias del período precolombino"
              ],
              "correctIndex": 1
            },
            {
              "id": "museo-oliva-2",
              "text": "¿Qué valor histórico tiene el patrimonio del Museo de Oliva?",
              "options": [
                "Permite reconstruir acontecimientos y experiencias vinculados con la historia de Malvinas",
                "Presenta principalmente la evolución económica de Oliva",
                "Documenta exclusivamente la historia de las Fuerzas Armadas"
              ],
              "correctIndex": 0
            },
            {
              "id": "museo-oliva-3",
              "text": "¿Por qué los objetos históricos del museo sirven como fuentes para estudiar el pasado?",
              "options": [
                "Porque reemplazan por completo a los testimonios escritos",
                "Porque permiten relacionar elementos materiales con acontecimientos del pasado",
                "Porque muestran únicamente avances tecnológicos"
              ],
              "correctIndex": 1
            },
            {
              "id": "museo-oliva-4",
              "text": "Según el trabajo presentado para la muestra, ¿cuántas piezas originales resguarda el Museo de Oliva?",
              "options": [
                "Más de 5.000",
                "Cerca de 4.600",
                "Cerca de 3.800"
              ],
              "correctIndex": 0
            },
            {
              "id": "museo-oliva-5",
              "text": "¿En qué año comenzó la historia del Museo de Oliva, según la actividad de la muestra?",
              "options": [
                "1970",
                "1985",
                "2001"
              ],
              "correctIndex": 0
            },
            {
              "id": "museo-oliva-6",
              "text": "¿Qué tipo de objetos se conservaban en las primeras exposiciones del museo?",
              "options": [
                "Solamente automóviles",
                "Piezas de ciencias naturales y del ser humano",
                "Solamente trofeos deportivos"
              ],
              "correctIndex": 1
            },
            {
              "id": "museo-oliva-7",
              "text": "¿Quiénes impulsaron desde 1995 el Museo Nacional de Malvinas de Oliva como homenaje a olivienses caídos?",
              "options": [
                "El gobierno nacional y autoridades militares",
                "Gabriel Fioni y Dino Torti",
                "Excombatientes del Escuadrón Aerotransportado 4"
              ],
              "correctIndex": 1
            }
          ]
        },
        {
          "id": "museo-kempes",
          "name": "Museo Mario Kempes",
          "color": "#fbbf24",
          "questions": [
            {
              "id": "museo-kempes-1",
              "text": "¿A qué está dedicado principalmente el Museo Provincial del Deporte Mario Alberto Kempes?",
              "options": [
                "A la historia de la música",
                "A la historia del deporte",
                "A la historia de la tecnología"
              ],
              "correctIndex": 1
            },
            {
              "id": "museo-kempes-2",
              "text": "¿Qué elementos se pueden encontrar en el Museo Mario Kempes?",
              "options": [
                "Camisetas, medallas y trofeos",
                "Herramientas agrícolas solamente",
                "Instrumentos musicales solamente"
              ],
              "correctIndex": 0
            },
            {
              "id": "museo-kempes-3",
              "text": "¿Qué relación presenta el sector del Mundial de 1978 con la historia deportiva argentina?",
              "options": [
                "Permite conocer un acontecimiento internacional y su relación con el deporte argentino",
                "Explica exclusivamente la creación de los clubes cordobeses",
                "Documenta los Juegos Olímpicos modernos"
              ],
              "correctIndex": 0
            },
            {
              "id": "museo-kempes-4",
              "text": "¿Qué reconoce el sector dedicado a los cordobeses olímpicos?",
              "options": [
                "La participación de deportistas cordobeses en competencias olímpicas",
                "Únicamente los resultados de equipos de fútbol",
                "La organización de campeonatos provinciales"
              ],
              "correctIndex": 0
            },
            {
              "id": "museo-kempes-5",
              "text": "¿Qué modelo de Chevrolet se encuentra en la entrada del Museo Kempes, según el trabajo de Historia?",
              "options": [
                "Chevrolet 1936",
                "Chevrolet 1948",
                "Chevrolet 1939"
              ],
              "correctIndex": 2
            }
          ]
        },
        {
          "id": "la-perla",
          "name": "Espacio para la Memoria La Perla",
          "color": "#a78bfa",
          "questions": [
            {
              "id": "la-perla-1",
              "text": "¿Qué fue La Perla durante la última dictadura?",
              "options": [
                "Un cuartel para entrenar soldados",
                "Un centro clandestino de detención, tortura y exterminio",
                "Una escuela rural"
              ],
              "correctIndex": 1
            },
            {
              "id": "la-perla-2",
              "text": "¿Durante qué período funcionó La Perla como centro clandestino de detención, tortura y exterminio?",
              "options": [
                "Entre 1966 y 1970",
                "Entre 1976 y fines de 1978",
                "Entre 1980 y fines de 1985"
              ],
              "correctIndex": 1
            },
            {
              "id": "la-perla-3",
              "text": "¿En qué año abrió La Perla como Espacio para la Memoria y Promoción de los Derechos Humanos?",
              "options": [
                "1983",
                "2005",
                "2009"
              ],
              "correctIndex": 2
            },
            {
              "id": "la-perla-4",
              "text": "¿Cuál es la función actual de La Perla como espacio para la memoria?",
              "options": [
                "Promover la memoria y los derechos humanos",
                "Realizar actividades deportivas",
                "Enseñar música"
              ],
              "correctIndex": 0
            },
            {
              "id": "la-perla-5",
              "text": "¿Qué relación tenía La Perla con el sistema represivo de la última dictadura?",
              "options": [
                "Funcionaba de manera independiente de las Fuerzas Armadas",
                "Formaba parte de una red represiva coordinada por el III Cuerpo de Ejército",
                "Dependía exclusivamente de las autoridades municipales"
              ],
              "correctIndex": 1
            },
            {
              "id": "la-perla-6",
              "text": "¿Por qué el recorrido de La Perla usa los edificios como referencia histórica?",
              "options": [
                "Para reconstruir el funcionamiento del centro y transmitir experiencias de las víctimas",
                "Para conservar únicamente la arquitectura militar",
                "Para mostrar cómo se organizaba el entrenamiento de soldados"
              ],
              "correctIndex": 0
            }
          ]
        }
      ]
    }
  ]
};
