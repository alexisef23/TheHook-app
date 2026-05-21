// ============================================================
// 🎯 BLOQUE DE ICONOS - LISTO PARA COPIAR/PEGAR
// ============================================================
// Copia TODO esto y reemplaza el bloque "icons" en manifest.json
// ============================================================

"icons": [
  {
    "src": "/icons/icon-192.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "any"
  },
  {
    "src": "/icons/icon-512.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "any"
  },
  {
    "src": "/icons/icon-192-maskable.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "maskable"
  },
  {
    "src": "/icons/icon-512-maskable.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "maskable"
  }
]

// ============================================================
// ✅ ESTRUCTURA CORRECTA EXPLICADA
// ============================================================
//
// [0] Icono 192x192 → purpose: "any" (icono normal)
// [1] Icono 512x512 → purpose: "any" (icono normal)
// [2] Icono 192x192 → purpose: "maskable" (solo silueta)
// [3] Icono 512x512 → purpose: "maskable" (solo silueta)
//
// ✅ ARCHIVOS NECESARIOS EN /public/icons/:
//
// ├── icon-192.png
// ├── icon-512.png
// ├── icon-192-maskable.png
// └── icon-512-maskable.png
//
// ============================================================
// 📁 SI TUS ARCHIVOS TIENEN OTRO NOMBRE
// ============================================================
// Reemplaza los "src" accordingly:
//
// Ejemplo: si tus archivos se llaman "app-icon-192.png"
// Solo cambia: "/icons/app-icon-192.png"
//
// Pero SIEMPRE mantén la estructura:
// - Dos archivos para "any" (192 + 512)
// - Dos archivos para "maskable" (192 + 512)
// ============================================================

// ============================================================
// 🔍 CÓMO VERIFICAR EN DEVTOOLS
// ============================================================
// 1. Abre DevTools (F12)
// 2. Ve a: Application → Manifest
// 3. Deberías ver 4 iconos listados
// 4. Dos con "any" y dos con "maskable"
// ============================================================

// ============================================================
// 🚀 PASOS FINALES
// ============================================================
// 1. Asegúrate de tener los 4 archivos .png
// 2. Reemplaza el bloque "icons" en manifest.json
// 3. npm run build
// 4. Ve a pwabuilder.com
// 5. El error ✅ debería estar resuelto
// ============================================================
