$(document).ready(function () {
    // Hacer la solicitud a la API de OpenWeather
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=pamplona&appid=43673e7d610ce2b4571acd8e02d6d9dc&units=metric&lang=es`,
        method: "GET",
        success: function (data) {
            // Procesar y mostrar los resultados
            displayWeather(data);
        },
        error: function () {
            // Manejar errores de la solicitud
            $("#weatherResults").html("<p class='text-danger'>Error al obtener el tiempo. Por favor, verifica el nombre de la ciudad.</p>");
        },
    });

    // Función para mostrar los resultados del tiempo
    function displayWeather(data) {
        const weatherResults = $("#weatherResults");
        weatherResults.empty();

        const cityName = data.city.name;
        const countryCode = data.city.country;
        const iconCountryURL = `http://openweathermap.org/images/flags/${countryCode.toLowerCase()}.png`;

        // Crear encabezado
        const header = `
            <h2 class="text-center mb-4">
                Pronóstico del clima para ${cityName}, ${countryCode} <img src="${iconCountryURL}" alt="${countryCode}" width="20">
            </h2>`;
        weatherResults.append(header);

        // Crear tabla
        const table = $(`
            <table class="table table-striped table-bordered table-dark text-center">
                <thead>
                    <tr>
                        <th>Día</th>
                        <th>Icono</th>
                        <th>Descripción</th>
                        <th>Temperatura (°C)</th>
                        <th>Humedad (%)</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `);
        weatherResults.append(table);

        const tbody = table.find("tbody");

        // Filtrar los datos para las próximas 5 predicciones (hoy + 4 días)
        for (let i = 0; i < data.list.length; i += 8) { // Cada 8 registros corresponde aproximadamente a 1 día
            const forecast = data.list[i];
            const dateTime = new Date(forecast.dt_txt);
            const day = dateTime.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
            const time = dateTime.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
            const iconCode = forecast.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
            const description = forecast.weather[0].description;
            const temperature = forecast.main.temp.toFixed(1);
            const humidity = forecast.main.humidity;

            const row = `
                <tr>
                    <td>${day}</td>
                    <td><img src="${iconUrl}" alt="Icono del clima" width="50"></td>
                    <td>${description}</td>
                    <td>${temperature}</td>
                    <td>${humidity}</td>
                    <td>${time}</td>
                </tr>`;
            tbody.append(row);
        }
    }
});
