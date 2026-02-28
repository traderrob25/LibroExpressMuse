export interface Question {
    id: number;
    bloque: 1 | 2 | 3 | 4;
    titulo: string;
    contexto: string;
    placeholder: string;
    nota_muse: string;
    requerida: boolean;
}

export const questions: Question[] = [
    // BLOQUE 1: Identidad
    {
        id: 1,
        bloque: 1,
        titulo: "Cuéntame tu momento de quiebre.",
        contexto: "Tu historia de origen se convierte en el prólogo o capítulo 1 del libro. Los lectores necesitan saber POR QUÉ escribes esto — y eso siempre viene de un momento específico.",
        placeholder: "Escribe con detalles específicos: fecha, lugar, qué sentiste, quién estaba...",
        nota_muse: "[USO INTERNO] Esta respuesta se convierte en la apertura narrativa del libro. Entre más detalles sensoriales (hora, lugar, qué sentiste, quien estaba), mejor funciona.",
        requerida: true
    },
    {
        id: 2,
        bloque: 1,
        titulo: "¿Cuál es la mentira más grande que tu industria le vende a la gente?",
        contexto: "Las creencias contrarias hacen libros memorables. Esta respuesta se convierte en tu tesis central — el argumento que atraviesa todo el libro.",
        placeholder: "Explica qué es lo que todos aceptan como verdad pero tú sabes que es falso...",
        nota_muse: "[USO INTERNO] Identifica la tesis central del libro. Se mapea a múltiples capítulos como hilo conductor.",
        requerida: true
    },
    {
        id: 3,
        bloque: 1,
        titulo: "Si tuvieras 60 segundos en un elevador con tu cliente ideal, ¿qué le dirías para que quisiera escucharte 2 horas más?",
        contexto: "Esta respuesta captura tu pitch natural — cómo te presentas cuando no estás pensando en marketing. Se convierte en la contraportada y la introducción del libro.",
        placeholder: "Escribe tu 'hook' más poderoso en lenguaje conversacional...",
        nota_muse: "[USO INTERNO] Extrae el tono conversacional natural y el core message. Se usa para calibrar la voz en todo el manuscrito.",
        requerida: true
    },
    {
        id: 4,
        bloque: 1,
        titulo: "¿Qué palabras o frases usas todo el tiempo cuando hablas de tu trabajo?",
        contexto: "Tu vocabulario personal es lo que diferencia tu libro de uno genérico. MUSE calibra la voz usando TUS palabras, no sinónimos de diccionario.",
        placeholder: "Haz una lista de términos técnicos, metáforas o muletillas propias...",
        nota_muse: "[USO INTERNO] Construye el diccionario de voz: palabras a usar, palabras prohibidas, metáforas recurrentes. Se aplica como filtro en cada capítulo.",
        requerida: true
    },
    {
        id: 5,
        bloque: 1,
        titulo: "Describe tu forma de comunicarte. ¿Eres directo/a? ¿Usas humor? ¿Cuentas historias largas? ¿Te gusta provocar?",
        contexto: "El tono del libro tiene que sonar a TI, no a un ghostwriter. Esta pregunta calibra si tu libro debe ser tipo conversación, tipo ensayo, tipo manifiesto o tipo manual.",
        placeholder: "Explica cómo es tu estilo natural: agresivo, empático, técnico, etc...",
        nota_muse: "[USO INTERNO] Define el estilo narrativo: longitud de párrafos, uso de humor, nivel de confrontación, balance historia/teoría.",
        requerida: true
    },
    {
        id: 6,
        bloque: 1,
        titulo: "¿Cuál fue el peor error profesional de tu carrera? ¿Qué aprendiste?",
        contexto: "Los errores crean conexión con el lector. Un libro que solo muestra éxitos es un brochure — un libro que muestra vulnerabilidad es un libro que la gente recomienda.",
        placeholder: "Cuéntanos ese momento donde todo salió mal y la lección que te dejó...",
        nota_muse: "[USO INTERNO] Se convierte en capítulo de vulnerabilidad o sección de 'errores que cometí para que tú no los cometas'.",
        requerida: true
    },
    {
        id: 7,
        bloque: 1,
        titulo: "Fuera del trabajo, ¿qué te apasiona? ¿Qué haces cuando no estás 'en modo profesional'?",
        contexto: "Los intereses personales generan metáforas únicas. Si eres corredor, usaremos metáforas de resistencia. Si cocinas, de recetas y procesos. Esto hace tu libro imposible de replicar.",
        placeholder: "Hobbies, deportes, colecciones o actividades que te definan fuera de la oficina...",
        nota_muse: "[USO INTERNO] Extrae metáforas orgánicas del universo personal del autor. Se inyectan naturalmente en el libro.",
        requerida: true
    },
    // BLOQUE 2: Expertise
    {
        id: 8,
        bloque: 2,
        titulo: "¿Cuál es tu metodología o framework principal? Explícamela como se la explicarías a un cliente nuevo.",
        contexto: "Tu framework se convierte en la columna vertebral del libro — los capítulos centrales. No importa si ya tiene nombre o no; lo importante es que expliques el PROCESO que sigues.",
        placeholder: "Describe los pasos, fases o pilares de tu solución...",
        nota_muse: "[USO INTERNO] Se mapea directamente a la estructura de capítulos (e.g., 3 fases = 3 partes del libro).",
        requerida: true
    },
    {
        id: 9,
        bloque: 2,
        titulo: "Dame 3 casos de éxito con clientes. Para cada uno: qué problema tenían, qué hiciste, y qué resultado obtuvieron (con números).",
        contexto: "Los casos con números son los capítulos más leídos. Un caso sin números es una anécdota; un caso con números es evidencia.",
        placeholder: "Caso 1... Caso 2... Caso 3... (Sé específico con los porcentajes, dinero o tiempo ahorrado)",
        nota_muse: "[USO INTERNO] Cada caso se convierte en un capítulo o sección. Los números se usan en callouts de autoridad.",
        requerida: true
    },
    {
        id: 10,
        bloque: 2,
        titulo: "¿Qué conceptos o ideas enseñas repetidamente a tus clientes? ¿Cuáles son los '5-10 principios' que repites siempre?",
        contexto: "Estos principios se convierten en capítulos individuales o en callouts recurrentes tipo 'Principio #X'. Son el ADN intelectual de tu libro.",
        placeholder: "Principio 1, 2, 3...",
        nota_muse: "[USO INTERNO] Se mapean como capítulos, subcapítulos o callouts temáticos.",
        requerida: true
    },
    {
        id: 11,
        bloque: 2,
        titulo: "¿Qué herramientas, tecnologías o procesos usas que tu competencia no usa (o usa mal)?",
        contexto: "Tu stack técnico diferenciado genera capítulos de 'cómo lo hago' que son extremadamente valiosos. No necesitas ser experto en tecnología — necesitas mostrar TU forma de usar las herramientas.",
        placeholder: "Enumera tu stack y por qué lo elegiste sobre otras opciones...",
        nota_muse: "[USO INTERNO] Genera capítulos de implementación práctica. Se presentan como 'mi stack'.",
        requerida: true
    },
    {
        id: 12,
        bloque: 2,
        titulo: "¿Qué hace mal la mayoría de la gente en tu campo? ¿Cuáles son los 3 errores más comunes que ves?",
        contexto: "Los errores ajenos generan capítulos de tipo 'lo que NO debes hacer' — que paradójicamente son los más compartidos en redes sociales.",
        placeholder: "Error 1, 2, 3...",
        nota_muse: "[USO INTERNO] Se convierten en capítulos de advertencia. Tono preventivo y de autoridad.",
        requerida: true
    },
    {
        id: 13,
        bloque: 2,
        titulo: "¿Tienes datos, estadísticas o benchmarks de tu industria que respalden tu enfoque?",
        contexto: "Los datos externos validan tu experiencia personal. Un libro que dice 'yo creo que...' convence menos que uno que dice 'los datos muestran que...'.",
        placeholder: "Cita estudios, reportes o datos propios que validen tu tesis...",
        nota_muse: "[USO INTERNO] Se insertan como evidencia de apertura en capítulos clave. MUSE verificará los datos.",
        requerida: true
    },
    {
        id: 14,
        bloque: 2,
        titulo: "¿Cuál es el resultado más impresionante que has logrado para un cliente (o para ti mismo)?",
        contexto: "Tu 'caso bandera' se convierte en el ejemplo que se repite a lo largo del libro como referencia. Es tu prueba definitiva.",
        placeholder: "Escribe la historia de tu éxito más notable...",
        nota_muse: "[USO INTERNO] Se posiciona como el caso estrella del libro, referenciado al inicio y al final.",
        requerida: true
    },
    // BLOQUE 3: Audiencia
    {
        id: 15,
        bloque: 3,
        titulo: "Describe a tu lector ideal como si fuera una persona real. ¿Quién es? ¿Qué hace? ¿Cuántos años tiene? ¿Qué le quita el sueño?",
        contexto: "Tu lector ideal determina el vocabulario, los ejemplos, y el nivel de profundidad del libro. MUSE escribe PARA esta persona.",
        placeholder: "Nombre ficticio, edad, cargo, miedos, aspiraciones...",
        nota_muse: "[USO INTERNO] Se construye un 'perfil de lector' que se inyecta como contexto en cada capítulo.",
        requerida: true
    },
    {
        id: 16,
        bloque: 3,
        titulo: "¿Cuál es el dolor #1 de tu lector? Si pudieras meterte dentro de su cabeza, ¿qué estaría pensando a las 11pm de un miércoles?",
        contexto: "El dolor del lector se convierte en la apertura del libro. El lector necesita sentir que TU lo entiendes mejor que él se entiende a sí mismo.",
        placeholder: "Escribe ese monólogo interno lleno de frustración...",
        nota_muse: "[USO INTERNO] Se usa para escribir la apertura del libro en segunda persona.",
        requerida: true
    },
    {
        id: 17,
        bloque: 3,
        titulo: "¿Qué ha intentado tu lector antes de llegar a ti? ¿Qué soluciones ya probó que no le funcionaron?",
        contexto: "Saber qué ya probó te permite posicionar tu libro como 'el siguiente paso'. Genera capítulos de 'por qué lo anterior no funcionó'.",
        placeholder: "Libros, cursos, consultores o herramientas que fallaron...",
        nota_muse: "[USO INTERNO] Se convierte en un capítulo de contraste. Posiciona tu solución como la definitiva.",
        requerida: true
    },
    {
        id: 18,
        bloque: 3,
        titulo: "¿Qué objeciones tiene tu lector? ¿Qué excusas se pone para no cambiar?",
        contexto: "Las objeciones se convierten en capítulos que destruyen mitos. Un libro que anticipa tus excusas y las desmonta es imposible de ignorar.",
        placeholder: "Lista las dudas más comunes que escuchas de tus prospectos...",
        nota_muse: "[USO INTERNO] Cada objeción genera una sección o capítulo de desmontaje con empatía.",
        requerida: true
    },
    {
        id: 19,
        bloque: 3,
        titulo: "¿Qué transformación promete tu libro? Si el lector hace todo lo que dices, ¿cómo se ve su vida en 6 meses?",
        contexto: "La transformación es la promesa del libro. Aparece en la introducción y se valida en el epílogo. Es el hilo que conecta todo.",
        placeholder: "Describe el 'antes' vs el 'después'...",
        nota_muse: "[USO INTERNO] Se usa como visión de futuro en la introducción y checklist en el epílogo.",
        requerida: true
    },
    {
        id: 20,
        bloque: 3,
        titulo: "¿Hay algo que tu lector NO quiere escuchar pero NECESITA escuchar?",
        contexto: "Las verdades incómodas generan los capítulos más poderosos. Un libro que solo dice lo que el lector quiere oír es olvidable.",
        placeholder: "Esa dosis de realidad que nadie más se atreve a decirles...",
        nota_muse: "[USO INTERNO] Se convierte en un capítulo de ruptura o viralidad.",
        requerida: true
    },
    // BLOQUE 4: Arquitectura
    {
        id: 21,
        bloque: 4,
        titulo: "Si tu libro tuviera un título provisional, ¿cuál sería?",
        contexto: "El título provisional revela el tono y la ambición del libro. MUSE genera opciones basadas en todo el cuestionario.",
        placeholder: "Escribe 2-3 opciones de títulos que te gusten...",
        nota_muse: "[USO INTERNO] Se usa como input para proponer 5-8 opciones finales en el Blueprint.",
        requerida: true
    },
    {
        id: 22,
        bloque: 4,
        titulo: "¿Qué tipo de libro quieres escribir?",
        contexto: "¿Manifiesto, manual paso-a-paso, historia personal con lecciones, framework con casos, o una combinación?",
        placeholder: "Describe la estructura preferida (ej: historias + teoría + acción)...",
        nota_muse: "[USO INTERNO] Define la plantilla de capítulo recurrente.",
        requerida: true
    },
    {
        id: 23,
        bloque: 4,
        titulo: "¿Hay capítulos o temas que YA SABES que quieres incluir?",
        contexto: "Las ideas sueltas del autor son el mejor punto de partida para la estructura. MUSE las organiza en un arco narrativo coherente.",
        placeholder: "Enumera temas específicos que no pueden faltar...",
        nota_muse: "[USO INTERNO] Se mapean como capítulos candidatos en el arco narrativo.",
        requerida: true
    },
    {
        id: 24,
        bloque: 4,
        titulo: "¿Qué libros admiras o quisieras que el tuyo se pareciera en tono o formato?",
        contexto: "Los libros de referencia son el benchmark más rápido para calibrar el tono. Si dices 'quiero algo como Rework', ya sabemos qué significa.",
        placeholder: "Título y autor de 2-3 libros que sean tu referencia...",
        nota_muse: "[USO INTERNO] Calibra la densidad de información y nivel de provocación.",
        requerida: true
    },
    {
        id: 25,
        bloque: 4,
        titulo: "Cuando alguien termine tu libro, ¿qué quieres que HAGA?",
        contexto: "La acción post-lectura define el cierre del libro y el CTA final. Un libro sin acción es entretenimiento; un libro con acción es transformación.",
        placeholder: "Pasos concretos que el lector debe tomar al cerrar el libro...",
        nota_muse: "[USO INTERNO] Genera el capítulo final 'Tu Plan de Acción' y el CTA del libro.",
        requerida: true
    },
    {
        id: 26,
        bloque: 4,
        titulo: "¿Hay algo que NO quieras que el libro incluya?",
        contexto: "Los límites son tan importantes como el contenido. Esto evita que MUSE genere algo que te haga sentir incómodo.",
        placeholder: "Temas prohibidos, jerga que odias o estilos a evitar...",
        nota_muse: "[USO INTERNO] Se convierte en filtro negativo (palabras prohibidas, temas tabú).",
        requerida: true
    },
    {
        id: 27,
        bloque: 4,
        titulo: "¿Hay algo más que quieras decirme que no te pregunté?",
        contexto: "La pregunta abierta captura lo que ninguna pregunta estructurada puede anticipar. Frecuentemente, la mejor respuesta viene aquí.",
        placeholder: "Cualquier detalle, historia o idea adicional...",
        nota_muse: "[USO INTERNO] Se analiza para temas emergentes o un capítulo sorpresa.",
        requerida: false
    }
];
