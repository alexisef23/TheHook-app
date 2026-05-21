## 🎯 BLOQUE DE ICONOS PARA manifest.json - CORREGIDO

### ✅ PROBLEMA RESUELTO

**Error PWABuilder:** "Separate Icons are needed for both maskable and any"

**Solución:** Usar archivos DIFERENTES para cada propósito.

---

## 📦 BLOQUE DE ICONOS CORREGIDO

Copia este bloque exacto y reemplaza en tu `manifest.json`:

```json
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
```

---

## 📁 ESTRUCTURA DE ARCHIVOS REQUERIDA

Debes tener **4 archivos de iconos** en `/public/icons/`:

```
/public/icons/
├── icon-192.png              (192x192) - para "any"
├── icon-512.png              (512x512) - para "any"
├── icon-192-maskable.png     (192x192) - para "maskable"
└── icon-512-maskable.png     (512x512) - para "maskable"
```

---

## 🎨 DIFERENCIA ENTRE "any" Y "maskable"

| Tipo | Descripción | Uso |
|------|-------------|-----|
| **any** | Icono normal con fondo | Mostración estándar |
| **maskable** | Icono sin fondo (solo silueta) | Android 12+ background theming |

---

## ⚙️ CÓMO CREAR ICONOS MASKABLE

### **Opción 1: Usar el mismo archivo**
Si tu icono ya es una silueta sin fondo:
1. Copia `icon-192.png` → `icon-192-maskable.png`
2. Copia `icon-512.png` → `icon-512-maskable.png`

### **Opción 2: Crear versión maskable con fondo transparente**
1. Abre tu icono en un editor (Figma, Photoshop, GIMP)
2. Elimina el fondo (mantén solo la silueta con transparencia)
3. Guarda como `-maskable.png`
4. Comprueba que sea 192x192 y 512x512

### **Opción 3: Usar herramienta online (Recomendado)**
1. Ve a: https://www.pwabuilder.com/imageGenerator
2. Sube tu icono original
3. Descarga las versiones generadas (any + maskable)
4. Coloca en `/public/icons/`

---

## ✅ VERIFICACIÓN

En DevTools (F12) → **Application** → **Manifest**:

Deberías ver:

```
icons:
  [0]: {
    src: "/icons/icon-192.png"
    sizes: "192x192"
    type: "image/png"
    purpose: "any"
  }
  [1]: {
    src: "/icons/icon-512.png"
    sizes: "512x512"
    type: "image/png"
    purpose: "any"
  }
  [2]: {
    src: "/icons/icon-192-maskable.png"
    sizes: "192x192"
    type: "image/png"
    purpose: "maskable"
  }
  [3]: {
    src: "/icons/icon-512-maskable.png"
    sizes: "512x512"
    type: "image/png"
    purpose: "maskable"
  }
```

---

## 🚀 PRÓXIMO PASO

1. Asegúrate de tener los 4 archivos en `/public/icons/`
2. Ejecuta: `npm run build`
3. Ve a: https://www.pwabuilder.com/
4. Ingresa tu URL
5. Haz clic en "Start"
6. El error debería estar resuelto ✅

---

## 💡 ALTERNATIVA SI TIENES OTROS NOMBRES

Si tus archivos se llaman diferente:

**Ejemplo:** `logo-192.png`, `logo-512.png`

Entonces el bloque sería:

```json
"icons": [
  {
    "src": "/icons/logo-192.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "any"
  },
  {
    "src": "/icons/logo-512.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "any"
  },
  {
    "src": "/icons/logo-192-maskable.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "maskable"
  },
  {
    "src": "/icons/logo-512-maskable.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "maskable"
  }
]
```

---

**¡El error de PWABuilder está resuelto! ✅**
