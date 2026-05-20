# 🎮 SocialXP — PWA de Gamificación de Habilidades Sociales

**SocialXP** es una Aplicación Web Progresiva (PWA) de gamificación enfocada en potenciar el crecimiento y confianza de tus habilidades sociales. Con una interfaz minimalista, moderna y discreta de estilo *Dark Mode / Hacker*, está diseñada específicamente para ser utilizada de forma rápida e inadvertida en entornos sociales reales (bares, antros, eventos).

---

## ⚡ Características Principales

1. **Dashboard de Capítulos (Fases 1, 2 y 3)**:
   - **Fase 1: Rompehielos (Iniciación)**: Domina los fundamentos básicos (contacto visual, saludos, primeras conversaciones).
   - **Fase 2: Conexión (Intermedio)**: Aprende a leer el lenguaje corporal, dar cumplidos específicos e interactuar con grupos.
   - **Fase 3: Dominio (Avanzado)**: Conviértete en un Storyteller, domina dinámicas grupales complejas e interactúa con soltura.
   - Cada fase cuenta con un **Jefe Final** que representa un desafío de alto impacto para desbloquear la siguiente fase.

2. **Detalle Táctico de Misiones**:
   - Cada misión incluye una descripción clara, los puntos de XP que otorga y un **Tip de Apoyo desplegable** con consejos prácticos específicos para superar el reto.
   - Cuenta con una respuesta táctil (vibración) discreta al completarse para dar un feedback físico directo.

3. **Arsenal de Tips**:
   - Una base de datos integrada y categorizada ("Lenguaje Corporal", "Conversación", "Lectura Social") para repasar consejos tácticos en cualquier momento.
   - Filtro por categorías y buscador integrado en tiempo real.

4. **Soporte Táctico (Botón SOS)**:
   - Un botón flotante permanente que abre un menú radial con 4 niveles de alerta (Verde, Amarillo, Naranja, Rojo).
   - Utiliza la geolocalización en tiempo real para generar un enlace de Google Maps y enviar un mensaje de alerta preformateado directamente a tu contacto de confianza a través de WhatsApp.

5. **Instalable PWA**:
   - Totalmente instalable en iOS y Android con iconos personalizados cyberpunk y modo *standalone* (sin barra de navegación del navegador) para una experiencia totalmente nativa.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 (Vite)
- **Estilos**: Tailwind CSS v4 con efectos neon y sombras fluidas
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion
- **Persistencia**: LocalStorage para un funcionamiento offline instantáneo con soporte para integración futura con **Supabase**

---

## 🚀 Instalación y Desarrollo Local

### 1. Clonar o acceder al directorio del proyecto
```bash
npm install
```

### 2. Ejecutar servidor de desarrollo
```bash
npm run dev
```

### 3. Compilar para producción
```bash
npm run build
```

### 4. Probar build de producción
```bash
npm run preview
```

---

## 📁 Estructura del Código

- `src/components/dashboard/`: Componentes del panel principal (acordeón de fases, tarjetas de misión y círculos de progreso).
- `src/components/mission/`: Modal de misión con tips desplegables y animaciones.
- `src/components/sos/`: Botón y menús para el sistema de alertas tácticas.
- `src/components/layout/`: Layout base, cabecera de XP y barra de navegación inferior.
- `src/hooks/`: Hooks personalizados de geolocalización y progreso en localStorage.
- `src/data/`: Datos estáticos iniciales de misiones y escenarios SOS.
- `supabase/`: Esquema de base de datos (`schema.sql`) e inserción de datos iniciales (`seed.sql`).

---

## 🔗 Integración con Supabase

El backend está listo para conectarse. Puedes encontrar los archivos SQL en `/supabase`.
Para vincular tu base de datos en producción:

1. Crea las tablas ejecutando `supabase/schema.sql` y `supabase/seed.sql` en el editor SQL de Supabase.
2. Agrega las siguientes variables en un archivo `.env` en la raíz del proyecto:
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_publica
```
El cliente de Supabase (`src/lib/supabase.js`) las detectará automáticamente y migrará la lógica sin necesidad de modificar el código.

---

*Desarrollado con pasión para elevar el juego social. ¡Domina tus interacciones!*
