# 🔄 Guía para Limpiar Caché del Navegador

## ⚠️ Problema Común: Los cambios no se ven

Cuando actualizas el tutorial en GitHub Pages, a veces los navegadores guardan versiones antiguas en caché y no muestran los cambios nuevos.

---

## 🚀 Soluciones Rápidas

### 1️⃣ **Recarga Forzada** (Más Fácil)

Presiona estas teclas mientras estás en la página:

- **Windows/Linux**: `Ctrl + F5` o `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### 2️⃣ **Limpiar Caché del Navegador**

#### Chrome/Edge:
1. Presiona `Ctrl + Shift + Delete`
2. Selecciona "Todo el tiempo"
3. Marca "Imágenes y archivos en caché"
4. Haz clic en "Borrar datos"

#### Firefox:
1. Presiona `Ctrl + Shift + Delete`
2. Selecciona "Todo"
3. Marca "Caché"
4. Haz clic en "Limpiar ahora"

#### Safari (Mac):
1. Presiona `Cmd + Option + E` para vaciar caché
2. O ve a Safari → Preferencias → Avanzado → Mostrar menú Desarrollo → Vaciar cachés

### 3️⃣ **Modo Incógnito/Privado**

Abre una ventana en modo incógnito:
- **Chrome/Edge**: `Ctrl + Shift + N`
- **Firefox**: `Ctrl + Shift + P`
- **Safari**: `Cmd + Shift + N`

El modo incógnito no usa caché, así verás siempre la versión más reciente.

---

## 🛠️ Para Desarrolladores

### Prevenir Caché en GitHub Pages

Añade este meta tag en el `<head>` de tus HTML:

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

### Versionar archivos CSS/JS

En lugar de:
```html
<link rel="stylesheet" href="styles.css">
```

Usa:
```html
<link rel="stylesheet" href="styles.css?v=1.0.2">
```

Cambia el número de versión cada vez que actualices.

---

## ✅ Verificar que funciona

1. Abre la página
2. Presiona `F12` para abrir DevTools
3. Ve a la pestaña "Network" (Red)
4. Recarga con `Ctrl + F5`
5. Verifica que los archivos tengan status **200** (no 304)

---

## 📱 En Dispositivos Móviles

### Android (Chrome):
1. Configuración → Privacidad → Borrar datos de navegación
2. Selecciona "Imágenes y archivos en caché"
3. Borra datos

### iOS (Safari):
1. Ajustes → Safari → Borrar historial y datos
2. Confirma

---

## 🎯 Cuándo Actualizar

Después de hacer cambios y subirlos a GitHub:

1. **Espera 1-2 minutos** para que GitHub Pages actualice
2. **Limpia la caché** con `Ctrl + F5`
3. **Verifica** que los cambios aparezcan

---

## 🔍 Solución de Problemas

### Los cambios aún no aparecen:

1. ✅ Verifica que el commit se subió correctamente a GitHub
2. ✅ Espera 2-3 minutos (GitHub Pages tarda en actualizar)
3. ✅ Usa modo incógnito para probar
4. ✅ Verifica en otro navegador
5. ✅ Revisa la URL (asegúrate de estar en la correcta)

### Verificar última actualización en GitHub:

1. Ve a tu repositorio en GitHub
2. Mira la fecha del último commit
3. Si es reciente, los cambios ya están en el servidor

---

## 💡 Tip Final

**Para los usuarios del tutorial:**

Añade un mensaje visible en tu página que diga:
> "Si no ves los cambios más recientes, presiona **Ctrl + F5**"

Esto ayuda a los estudiantes a ver siempre la versión actualizada.

---

**Fecha de actualización:** 2 de diciembre de 2025
