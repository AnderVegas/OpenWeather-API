$(document).ready(function () {
    const apiKey = "43673e7d610ce2b4571acd8e02d6d9dc";

    // Ocultar la pagina de busqueda al iniciar la pagina
    $("#search").hide();

    // Manejar los clics en los enlaces del menú
    $("#home-link").click(function() {
        $("#home").show();
        $("#search").hide();

        // Cambiar la imagen de fondo para la página de inicio
        $("body").css("background-image", "url('Imagenes/nubes2.jpeg')");
    });

    $("#search-link").click(function() {
        $("#weatherResultsSearch").hide();
        $("#index").hide();
        $("#search").show();
        // Mostrar h1 de referencia
        $("#h1Antes").show();
        // Borrar barra de buscador
        $("#cityName").val("");

        // Cambiar la imagen de fondo para la página de búsqueda
        $("body").css("background-image", "url('Imagenes/atardecer.jpg')");
    });

    $("#volverInicio").click(function() {
        $("#index").show();
        $("#search").hide();

        // Cambiar la imagen de fondo para la página de inicio
        $("body").css("background-image", "url('Imagenes/nubes2.jpeg')");
    });

    // Para quitar el h1 cuando se envíe el formulario
    $("#enviarForm").click(function() {
        $("#h1Antes").hide();
        $("#weatherResultsSearch").show();
    });

    // Solicitud inicial con la ubicacion actual
    $(document).ready(function () {
        // Verificar si la geolocalización está disponible
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Hacer la solicitud para obtener el clima actual
                $.ajax({
                    url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`,
                    method: "GET",
                    success: function (data) {
                        displayCurrentWeather(data, "#weatherResultsMyLocation");
                    },
                    error: function () {
                        $("#weatherResultsMyLocation").html("<p class='text-danger'>Error al obtener el tiempo actual. Por favor, verifica tu conexión o intenta nuevamente.</p>");
                    },
                });

                // Hacer la solicitud para obtener la predicción de los próximos 5 días
                $.ajax({
                    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`,
                    method: "GET",
                    success: function (data) {
                        displayForecast(data, "#weatherResultsMyLocation");
                    },
                    error: function () {
                        $("#weatherResultsMyLocation").html("<p class='text-danger'>Error al obtener la predicción. Por favor, verifica tu conexión o intenta nuevamente.</p>");
                    },
                });
            }, function(error) {
                // Si el usuario no da permiso para compartir su ubicación
                $("#weatherResultsMyLocation").html("<p class='text-danger'>No se pudo obtener la ubicación actual. Por favor, permite el acceso a la geolocalización.</p>");
            });
        } else {
            $("#weatherResultsMyLocation").html("<p class='text-danger'>La geolocalización no está disponible en este navegador.</p>");
        }
    });

    // Manejar la solicitud de búsqueda del tiempo al enviar el formulario
    $("#weatherForm").on("submit", function(event) {
        event.preventDefault();
        const cityName = $("#cityName").val();
        $("#cityName").val("");

        // Hacer la solicitud a la API de OpenWeather
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`,
            method: "GET",
            success: function(data) {
                // Procesar y mostrar los resultados
                displayCurrentWeather(data, "#weatherResultsSearch");
            },
            error: function(err) {
                // Manejar errores de la solicitud
                $("#weatherResultsSearch").html("Error al obtener el tiempo. Por favor, verifica el nombre de la ciudad.");
            }
        });

        // Hacer la solicitud a la API de OpenWeather para la predicción de 5 días
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=es`,
            method: "GET",
            success: function(data) {
                // Procesar y mostrar la predicción de 5 días
                displayForecast(data, "#weatherResultsSearch");
            },
            error: function(err) {
                // Manejar errores de la solicitud
                $("#weatherResultsSearch").html("Error al obtener la predicción del tiempo. Por favor, verifica el nombre de la ciudad.");
            }
        });
    });

    // Función para mostrar el clima actual
    function displayCurrentWeather(data, tablaBusqueda) {
        const weatherResults = $(tablaBusqueda);
        weatherResults.empty();

        const cityName = data.name;
        const countryCode = data.sys.country;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        const temperature = data.main.temp.toFixed(1);
        const humidity = data.main.humidity;
        const description = data.weather[0].description;
        const coordsInfo = `<p class="text-center">Coordenadas: Latitud ${data.coord.lat}, Longitud ${data.coord.lon}</p>`;

        // Agregar un título
        const header = `
            <h2 class="text-center mb-4">
                Clima actual en ${cityName}, ${countryCode} <img src="${iconUrl}" alt="${countryCode}" width="20">
            </h2>`;
            weatherResults.append(header);
            weatherResults.append(coordsInfo);

        // Crear la tabla con los detalles del clima
        const currentWeatherTable = `
            <table class="table table-striped table-bordered table-hover table-dark table-current-weather">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Temperatura (°C)</th>
                        <th>Humedad (%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="Descripción">${description} <img src="${iconUrl}" alt="Icono del clima" width="40"></td>
                        <td data-label="Temperatura">${temperature}°C</td>
                        <td data-label="Humedad">${humidity}%</td>
                    </tr>
                </tbody>
            </table>
        `;
        weatherResults.append(currentWeatherTable);

    }

    // Función para mostrar la predicción de los próximos 5 días
    function displayForecast(data, tablaBusqueda) {
        const weatherResults = $(tablaBusqueda);
        weatherResults.append('<h3 class="text-center mb-4">Pronóstico para los próximos 5 días</h3>');

        const table = $(` 
            <table class="table table-striped table-bordered table-dark text-center table-responsive">
                <thead>
                    <tr>
                        <th>Día</th>
                        <th>Descripción</th>
                        <th>Temperatura (°C)</th>
                        <th>Humedad (%)</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `);
        weatherResults.append(table);

        const tbody = table.find("tbody");

        // Filtrar los datos para las próximas 5 predicciones (hoy + 4 días)
        for (let i = 0; i < data.list.length; i += 8) { // Cada 8 registros corresponde aproximadamente a 1 día (3 horas de intervalo)
            const forecast = data.list[i];
            const dateTime = new Date(forecast.dt_txt);
            const day = dateTime.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
            const iconCode = forecast.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
            const description = forecast.weather[0].description;
            const temperature = forecast.main.temp.toFixed(1);  // Temperatura máxima
            const humidity = forecast.main.humidity;

            const row = `
            <tr>
                <td data-label="Día">${day}</td>
                <td data-label="Descripción">${description}<img src="${iconUrl}" alt="Icono del clima" width="50"></td>
                <td data-label="Temperatura">${temperature}°C</td>
                <td data-label="Humedad">${humidity}%</td>
            </tr>`;
        tbody.append(row);
        
        }
    }
});
