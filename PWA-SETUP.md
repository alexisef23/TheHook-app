# 🚀 PWA Setup para Android APK - TheHook

## ✅ Archivos Creados

Se han creado 3 archivos principales para convertir tu sitio en una PWA:

### 1. **manifest.json** (`/public/manifest.json`)
- ✅ `id: "/"` - Identificador único de la app
- ✅ Iconos 192x192 y 512x512 con `purpose: "maskable"` para Android
- ✅ Screenshots para tienda (reemplaza las rutas con tus capturas)
- ✅ Shortcuts para acceso rápido a secciones
- ✅ Metadata completa (nombre, descripción, categorías)

### 2. **Service Worker** (`/public/sw.js`)
- ✅ Caché inteligente con estrategia "Cache First"
- ✅ Soporte offline automático
- ✅ Actualización de caché en segundo plano
- ✅ Limpieza de cachés obsoletos
- ✅ Manejo de errores de red

### 3. **Registro en main.jsx** (`/src/main.jsx`)
- ✅ Registro automático del Service Worker al cargar
- ✅ Detección de actualizaciones
- ✅ Eventos de cambios de versión
- ✅ Logging para debugging

---

## 📋 Paso 1: Asegurar que tienes los iconos correctos

### Ubicación esperada:
```
/public/icons/
├── icon-192.png    (192x192 px)
└── icon-512.png    (512x512 px)
```

### Si tus iconos son JPEG:
Convierte a PNG usando cualquier herramienta online:
- [convertio.co](https://convertio.co/)
- [imageconvert.online](https://imageconvert.online/)

**⚠️ PWA requiere PNG para iconos maskable en Android**

---

## 📷 Paso 2: Agregar Screenshots para la Tienda

Crea estas capturas de pantalla en móvil (540x720) y escritorio (1280x720):

```
/public/screenshots/
├── screenshot-1.png    (Pantalla de Misiones)
├── screenshot-2.png    (Pantalla de Perfil)
├── screenshot-3.png    (Arsenal de Tips)
└── screenshot-4.png    (Vista de Escritorio)
```

**Tamaños recomendados:**
- Mobile: 540x720 px (vertical)
- Desktop: 1280x720 px (horizontal)

Si no tienes las capturas aún, PWABuilder puede generarlas automáticamente.

---

## ✨ Paso 3: Verificar que todo está correcto

### En index.html:
```html
<link rel="manifest" href="/manifest.json" />
```
✅ Agregada automáticamente

### En main.jsx:
```js
navigator.serviceWorker.register('/sw.js')
```
✅ Agregado automáticamente

### En navegador (DevTools):
1. Abre **DevTools (F12)**
2. Ve a **Application** → **Manifest**
3. Deberías ver tu manifest con todos los campos

---

## 🔧 Paso 4: Usar PWABuilder para generar APK

### En [PWABuilder.com](https://www.pwabuilder.com/):

1. **Ingresa tu URL:** `https://yourdomain.netlify.app`
2. **Valida:** Haz clic en "Validate"
3. **Genera apks:** Sección "Package"
   - Android: Genera APK automáticamente
   - Resuelve los action items (ahora deberían estar resueltos)

### Próximos pasos:
- **Android APK:** Descarga y carga a Google Play Console
- **iOS:** Usa el manifest para App Store (requiere Apple Developer)

---

## 🐛 Debugging y Testing

### Verificar Service Worker en desarrollo:
```javascript
// En DevTools → Application → Service Workers
// Deberías ver /sw.js registrado y activo
```

### Forzar actualización (durante desarrollo):
En DevTools → Application → Service Workers, haz clic en "Unregister"
Luego recarga la página.

### Ver caché:
DevTools → Application → Cache Storage
Deberías ver "thehook-v1" con archivos cacheados

---

## 📝 Personalización (Opcional)

### Cambiar nombre de la app:
**En manifest.json:**
```json
"name": "Tu nombre aquí",
"short_name": "Nombre corto"
```

### Cambiar colores:
```json
"theme_color": "#00ff41",      // Verde neon
"background_color": "#0a0a0f"  // Negro oscuro
```

### Agregar más URLs al caché:
**En sw.js**, modifica `urlsToCache`:
```javascript
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/index.css',
  // Agrega más aquí
];
```

---

## ✅ Checklist Final

- [ ] Iconos 192x192 y 512x512 en `/public/icons/`
- [ ] Screenshots en `/public/screenshots/` (opcional pero recomendado)
- [ ] `manifest.json` en `/public/`
- [ ] `sw.js` en `/public/`
- [ ] Código de registro en `src/main.jsx`
- [ ] `<link rel="manifest">` en `index.html`
- [ ] App construida/deployed con `npm run build`
- [ ] PWABuilder valida sin errores críticos

---

## 🚀 Comando para Deploy

```bash
npm run build
# Tu app estará lista en /dist para Netlify
```

---

## 📞 Soporte

Si necesitas agregar/modificar algo:
- Edita `manifest.json` para metadatos
- Edita `sw.js` para estrategias de caché
- Edita `main.jsx` para lógica de actualización

¡Tu PWA está lista! 🎉
