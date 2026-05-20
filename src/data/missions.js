// Local missions data - used when Supabase is not configured
export const missions = [
  {
    id: 'mission-1',
    titulo: 'Contacto Visual',
    descripcion: 'Mantén contacto visual con 3 personas diferentes durante al menos 3 segundos cada una. No desvíes la mirada primero. Si te devuelven la mirada, sonríe levemente.',
    fase: 1,
    orden: 1,
    es_jefe: false,
    xp: 50,
    tip_ayuda: 'La regla del triángulo: alterna tu mirada entre el ojo izquierdo, ojo derecho y boca de la otra persona. Esto crea una sensación de interés natural sin ser intimidante. Si te pone nervioso, mira el puente de la nariz — parece contacto visual directo.',
    categoria_tip: 'Lenguaje Corporal'
  },
  {
    id: 'mission-2',
    titulo: 'El Saludo',
    descripcion: 'Saluda a un desconocido con confianza y una sonrisa genuina. Puede ser al llegar a la barra, al pasar junto a alguien, o al pedir tu bebida. El objetivo es proyectar apertura.',
    fase: 1,
    orden: 2,
    es_jefe: false,
    xp: 75,
    tip_ayuda: 'Usa la técnica del "saludo + comentario": en vez de solo decir "hola", agrega un comentario situacional. Ejemplo: "Hey, ¿está buena la música hoy, no?" o "¿Qué estás tomando? Se ve bien". Esto abre la puerta a conversación sin presión.',
    categoria_tip: 'Conversación'
  },
  {
    id: 'mission-3',
    titulo: 'Primera Conversación',
    descripcion: '🔥 MISIÓN DE JEFE: Inicia una conversación de al menos 2 minutos con alguien que no conoces. Debes mantener el diálogo fluyendo con preguntas abiertas y escucha activa.',
    fase: 1,
    orden: 3,
    es_jefe: true,
    xp: 150,
    tip_ayuda: 'Método FORD para nunca quedarte sin tema: Family (¿De dónde eres? ¿Vienes con amigos?), Occupation (¿A qué te dedicas?), Recreation (¿Qué haces para divertirte?), Dreams (¿Qué te gustaría hacer/conocer?). Haz preguntas abiertas, no de sí/no. Y recuerda: la persona más interesante es la que muestra más interés.',
    categoria_tip: 'Conversación'
  },
  {
    id: 'mission-4',
    titulo: 'Lectura Corporal',
    descripcion: 'Identifica al menos 3 señales de lenguaje corporal abierto en alguien: contacto visual sostenido, cuerpo orientado hacia ti, sonrisa frecuente, jugar con el cabello, inclinarse hacia ti.',
    fase: 2,
    orden: 1,
    es_jefe: false,
    xp: 100,
    tip_ayuda: 'Señales verdes (interés): pies apuntando hacia ti, pupilas dilatadas, se toca el cuello o labios, imita tus gestos (mirroring), busca excusas para tocarte. Señales rojas (desinterés): brazos cruzados, cuerpo girado, respuestas cortas, revisa su teléfono, no hace preguntas de vuelta.',
    categoria_tip: 'Lectura Social'
  },
  {
    id: 'mission-5',
    titulo: 'El Cumplido Genuino',
    descripcion: 'Da un cumplido auténtico y específico a alguien. NO sobre apariencia física directa. Enfócate en estilo, energía, o algo que haya dicho/hecho.',
    fase: 2,
    orden: 2,
    es_jefe: false,
    xp: 100,
    tip_ayuda: 'La fórmula del cumplido genuino: Observación + Emoción. "Ese tatuaje está increíble, se ve que tiene una historia" (invita a contar). "Tienes muy buena vibra, se siente chill estar contigo" (valida su presencia). Evita: "Estás guapa/o" (genérico). Los mejores cumplidos hacen sentir a la persona vista, no solo observada.',
    categoria_tip: 'Conversación'
  },
  {
    id: 'mission-6',
    titulo: 'La Invitación',
    descripcion: '🔥 MISIÓN DE JEFE: Invita a alguien a unirse a tu grupo o actividad. Puede ser "ven, te presento a mis amigos", invitar a bailar, o sugerir moverse a otra zona juntos.',
    fase: 2,
    orden: 3,
    es_jefe: true,
    xp: 200,
    tip_ayuda: 'La técnica del "nosotros": usa lenguaje inclusivo para crear sensación de equipo. "Vamos por otra ronda", "¿Ya viste la terraza? Ven, vamos a verla". Esto reduce la presión porque no es una invitación formal, es algo que ya está pasando. Si te dice que no, responde cool: "Sale, cualquier cosa aquí andamos" — sin drama.',
    categoria_tip: 'Lectura Social'
  },
  {
    id: 'mission-7',
    titulo: 'El Storyteller',
    descripcion: 'Cuenta una historia que haga reír o intrigue a tu grupo. Debe tener inicio, conflicto y remate. Usa pausa dramática y expresividad corporal.',
    fase: 3,
    orden: 1,
    es_jefe: false,
    xp: 150,
    tip_ayuda: 'Estructura de historia magnética: 1) Hook ("No van a creer lo que pasó..."), 2) Setup (contexto breve), 3) Conflicto (el momento de tensión), 4) Remate (punch line o resolución inesperada). Tip pro: baja la voz en los momentos de tensión para que se acerquen. Usa gestos y expresiones faciales. La energía importa más que la historia en sí.',
    categoria_tip: 'Conversación'
  },
  {
    id: 'mission-8',
    titulo: 'Lectura Social Avanzada',
    descripcion: 'Lee la dinámica del grupo y adapta tu energía al contexto. Si el grupo está chill, baja tu energía. Si está animado, sube tu volumen. Identifica al líder social del grupo.',
    fase: 3,
    orden: 2,
    es_jefe: false,
    xp: 150,
    tip_ayuda: 'El mapa social del grupo: 1) Identifica al "conector" (quien presenta a todos), 2) Al "líder de energía" (quien decide el mood), 3) Al "satélite" (quien está más abierto a nuevas personas). Conéctate con el satélite primero, es más fácil. Luego el conector te integra. Nunca compitas con el líder de energía — complementa su vibe.',
    categoria_tip: 'Lectura Social'
  },
  {
    id: 'mission-9',
    titulo: 'El Cierre',
    descripcion: '🔥 JEFE FINAL: Cierra la noche intercambiando contacto (Instagram o número) con alguien nuevo. Debe sentirse natural, no forzado.',
    fase: 3,
    orden: 3,
    es_jefe: true,
    xp: 300,
    tip_ayuda: 'El cierre natural: en el punto más alto de la conversación (cuando ambos se están riendo o hay buena conexión), di algo como: "Oye, me caes bien. Deberíamos ir por un café / a [evento]. ¿Tienes IG?" NUNCA pidas el contacto cuando la conversación ya se está muriendo. La clave es cerrar en el pico emocional.',
    categoria_tip: 'Conversación'
  }
];

export const phases = [
  { id: 1, nombre: 'Rompehielos', subtitulo: 'Iniciación', descripcion: 'Domina los fundamentos de la interacción social' },
  { id: 2, nombre: 'Conexión', subtitulo: 'Intermedio', descripcion: 'Profundiza las conexiones y lee las señales' },
  { id: 3, nombre: 'Dominio', subtitulo: 'Avanzado', descripcion: 'Domina el arte de la interacción social' }
];
