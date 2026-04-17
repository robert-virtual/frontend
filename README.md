# React SPA - Documentación Técnica

## ⚛️ Descripción

Single Page Application (SPA) desarrollada en **React 18** que se integra en dos contextos:

1. Como **iframe** embebida en ASP.NET Core
2. Como **aplicación standalone** en desarrollo

## 📁 Estructura del Proyecto

```
frontend/
├── public/
│   └── index.html           # HTML base con div#root
├── src/
│   ├── index.js             # Entry point
│   ├── index.css            # Estilos globales
│   ├── App.js               # Componente principal
│   ├── App.css              # Estilos de App
│   └── App.test.js          # Tests (opcional)
├── package.json             # Dependencias npm
├── .gitignore               # Ignore patterns
└── README.md                # Este archivo
```

## 🚀 Instalación y Ejecución

### Instalar Dependencias
```bash
cd frontend
npm install
```

### Desarrollo
```bash
npm start
```
- Abre http://localhost:3000
- Hot reload automático en cambios

### Compilar para Producción
```bash
npm run build
```
- Crea carpeta `build/` optimizada
- Listo para deployar

## 🎨 Componentes

### App.js
Componente principal que incluye:
- **Contador interactivo** - Hooks useState
- **Información de arquitectura** - Lista de tecnologías
- **Test de API** - Verifica conexión con backend
- **Footer** - Información de copyright

### Estilos
- Diseño responsive con CSS Grid
- Gradientes modernos (púrpura y azul)
- Animaciones en botones
- Optimizado para móvil

## 🔗 Integración Backend

### Como iframe en ASP.NET Core

En el backend (`wwwroot/index.html`):
```html
<iframe
    id="spaIframe"
    src="http://localhost:3000"
    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
></iframe>
```

### Variables de Entorno

Crea archivo `.env` en `frontend/`:
```
REACT_APP_API_URL=http://localhost:5000
```

En código:
```javascript
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
fetch(`${apiUrl}/api/health`)
```

## 📡 Llamadas a API

### Ejemplo en App.js
```javascript
const testBackend = () => {
    fetch('http://localhost:5000/api/health')
        .then(r => r.json())
        .then(data => alert('Backend respondió: ' + JSON.stringify(data)))
        .catch(e => alert('Error: ' + e.message));
};
```

### APIs Disponibles
- `GET /api/health` - Health check
- `GET /api/info` - Información app
- `GET /api/data/items` - Lista items
- `POST /api/data/items` - Crear item

## 🧩 Hooks Utilizados

### useState
```javascript
const [count, setCount] = useState(0);

// Incrementar
<button onClick={() => setCount(count + 1)}>Incrementar</button>
```

### Extensiones Futuras

```javascript
// useEffect - para efectos secundarios
import { useEffect } from 'react';

useEffect(() => {
    // Código que se ejecuta al montar el componente
    console.log('Componente montado');
}, []);
```

## 🎯 Características Principales

✅ **React 18** - Último versión  
✅ **Responsive Design** - Mobile-first  
✅ **Hot Reload** - Desarrollo ágil  
✅ **Build Optimizado** - Production-ready  
✅ **CORS Compatible** - Funciona en iframe  

## 🔒 CORS en iframe

Para funcionar en iframe, requiere:
```javascript
// En el backend
app.UseCors(policy => 
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader()
);
```

Atributos del iframe:
```html
allow="accelerometer; camera; encrypt-media; geolocation; gyroscope; microphone; payment; usb; xr-spatial-tracking"
sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
```

## 🧪 Testing (Opcional)

```bash
npm test
```

Crea archivo `src/App.test.js`:
```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renderiza el título', () => {
    render(<App />);
    const titulo = screen.getByText(/React SPA/i);
    expect(titulo).toBeInTheDocument();
});
```

## 📦 Build para Producción

### Opción 1: Servir desde ASP.NET Core

1. Compila React:
```bash
npm run build
```

2. Copia `build/*` a `backend/wwwroot/spa/`

3. En ASP.NET Core, sirve la carpeta:
```csharp
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(env.ContentRootPath, "wwwroot/spa")),
    RequestPath = "/spa"
});
```

4. Actualiza el iframe:
```html
<iframe src="/spa/index.html"></iframe>
```

### Opción 2: Deploy Independiente

Deployflaunch en servicios como:
- **Vercel** - `npm i -g vercel && vercel`
- **Netlify** - `npm install -g netlify-cli && netlify deploy`
- **GitHub Pages** - Crea `homepage` en package.json

## 🚨 Troubleshooting

### "Cannot GET /"
- Verifica que `npm start` esté ejecutándose
- Revisa el puerto 3000: `lsof -i :3000`

### CORS Error en iframe
- Comprueba CORS habilitado en backend
- Verifica atributos `sandbox` del iframe
- Usa `allow="*"` en desarrollo

### Estilos no se aplican
- Verifica `App.css` tiene rutas correctas
- Compila: `npm run build`
- Limpia caché: Ctrl+Shift+Del

## 🔄 Actualización de Dependencias

```bash
npm update
npm outdated  # Ver versiones disponibles
npm install nombre-paquete@latest
```

## 📚 Recursos

- [React Docs](https://react.dev)
- [Create React App](https://create-react-app.dev)
- [React Hooks](https://react.dev/reference/react)
- [MDN - API Fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API)

---

**Last Updated**: 2026-04-16
