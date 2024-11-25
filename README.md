# Weather Application SPA 🌤️

Bienvenido a **Weather Application**, una página web para consultar el clima actual y la predicción de los próximos 5 días utilizando la API de OpenWeather. Este proyecto es una **Single Page Application (SPA)** creada con HTML, CSS, Bootstrap, y jQuery.

## Características 📋

1. **Clima Actual y Predicción:** 
   - Consulta el clima actual ingresando el nombre de una ciudad.
   - Obtén la predicción de los próximos 5 días (5 Day / 3 Hour Forecast).
   - Posibilidad de obtener el clima basado en tu ubicación actual utilizando geolocalización.

2. **Diseño Interactivo:**
   - Diseño atractivo con imágenes de fondo dinámicas.
   - Interfaz responsiva y moderna con Bootstrap y scss.

3. **Responsiva:**
   - Cuenta con un diseño adaptable para dispositivos moviles. 

4. **Multi-idioma (EXTRA):**
   - La aplicación puede ser traducida y adaptada a otros idiomas (predeterminado: Español).

## Instalación y Uso 🚀

### Requisitos Previos
- Navegador con soporte para JavaScript y geolocalización.
- Conexión a internet para acceder a la API de OpenWeather.

### Instalación
1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/weather-app.git
   cd weather-app

2. Configura tu API Key de OpenWeather:
    - Ve al archivo js/client.js y reemplaza el valor de APPID por tu clave de la API de OpenWeather:
        const APPID = 'tu-api-key-aqui';

3. Abre el archivo index.html:
    - Puedes abrir el archivo en cualquier navegador web para ejecutar la aplicación localmente.

### Uso de la Aplicación
1. Selecciona una de las opciones desde la pantalla de inicio:
    - Buscar una ciudad.
    - Ver el clima de tu ubicación actual.

2. En la sección de Buscar Ciudad, ingresa el nombre de la ciudad y haz clic en "Buscar".

3. Disfruta de los datos del clima actual y la predicción para los próximos días.

## Estructura del Proyecto 📂
.
├── css/
│   └── main.css          # Estilos personalizados
│   └── main.css.map 
├── js/
│   └── client.js         # Lógica principal y llamadas a la API
├── Imagenes/             # Imágenes de fondo y recursos gráficos
├── scss/
│   └── main.scss         # Estilos personalizados en formato scss para transformarlos a css
├── diseño/               # Diseños previos creados antes de acabar la aplicacion creados con la herramienta "Figma" 
├── index.html            # Archivo principal de la SPA
└── README.md             # Documentación del proyecto

## API Utilizada 🌐
La aplicación utiliza la API de OpenWeather para obtener datos en tiempo real:
- Current Weather Data
- 5 Day / 3 Hour Forecast

### Configuración de la API Key
Para obtener tu clave API:
1. Regístrate en OpenWeather.
2. Genera tu API Key desde el panel de usuario.
3. Agrega la clave en el archivo client.js.

## Diseño 📐

### Vista Previa del Diseño
El diseño previo se realizó en Figma. Puedes encontrar el archivo en la carpeta diseño/ del repositorio.


## Tablero de Tareas 📌
Las tareas del proyecto se gestionaron mediante un Tablero de GitHub Projects. Puedes consultarlo aquí: https://github.com/users/AnderVegas/projects/1.

### Ejemplo de Tareas:
- Configuración inicial del proyecto.
- Lógica de geolocalización y clima.
- Estilización con CSS y Bootstrap.
- Integración de la API de OpenWeather.

## Autor ✨
Desarrollado por Ander Vega Fernandez.

¡Gracias por usar Weather Application!






