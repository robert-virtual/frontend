import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './App.css';

function App() {
    const videoRef = useRef(null)
    const [error,setError] = useState('')
    const abrirCamara = () => {
        console.log({videoRef})
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(err => {
                alert('Error al acceder a la cámara: ' + err.message);
                setError('Error al acceder a la cámara: ' + err.message)
            });
            return
        }
        alert('Tu navegador no soporta acceso a la cámara');
        setError('Tu navegador no soporta acceso a la cámara');
    }
    const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    // Configuración del escáner
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,       // Cuadros por segundo
      qrbox: { width: 250, height: 250 }, // Área de escaneo
    });

    // Éxito al escanear
    const onSuccess = (result) => {
      scanner.clear(); // Detiene el escáner tras una lectura exitosa
      setScanResult(result);
    };

    // Error al escanear (se dispara continuamente mientras busca)
    const onError = (err) => {
      console.warn(err);
    };

    scanner.render(onSuccess, onError);

    // Limpieza al desmontar el componente
    return () => {
      scanner.clear();
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 React SPA</h1>
        <p>Esta es una aplicación React integrada en ASP.NET Core mediante iframe</p>
      </header>

      <section className="content">
        <div className="card">
          <h2>Test de camara</h2>
          <label>
            <span>Selecionar foto</span>  
            <input type='file' accept='image/*'  />
          </label>
          <button onClick={() => abrirCamara()}>Abrir camara</button>
          <video ref={videoRef} id="cameraPreview" style={{ width: '100%', marginTop: '10px' }} >
          </video>
          <h1>Lector de QR</h1>
          {scanResult ? (
            <div>Éxito: <a href={scanResult}>{scanResult}</a></div>
          ) : (
            <div id="reader"></div> // El div donde se renderiza la cámara
          )}
          <p>{error}</p>
        </div>

        <div className="card">
          <h2>Información de la Arquitectura</h2>
          <ul>
            <li>Frontend: React SPA</li>
            <li>Backend: ASP.NET Core</li>
            <li>Integración: iframe en ASP.NET Core</li>
            <li>App Nativa: iOS en Objective-C</li>
          </ul>
        </div>

        <div className="card">
          <h2>APIs Disponibles</h2>
          <p>URL del Backend: <code>{process.env.REACT_APP_API_URL || 'http://localhost:5000'}</code></p>
          <button onClick={() => {
            fetch('http://localhost:5000/api/health')
              .then(r => r.json())
              .then(data => alert('Backend respondió: ' + JSON.stringify(data)))
              .catch(e => alert('Error conectando al backend: ' + e.message));
          }}>
            Probar Conexión con Backend
          </button>
        </div>
      </section>

      <footer className="App-footer">
        <p>© 2026 - Aplicación Multi-plataforma</p>
      </footer>
    </div>
  );
}

export default App;
