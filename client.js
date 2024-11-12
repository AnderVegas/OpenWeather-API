$(document).ready(function() {
    // Mostrar la página de búsqueda al hacer clic en el enlace del menú
    $("a[href='#search']").on("click", function() {
        $("#home").hide();
        $("#search").show();
    });

    // Manejar la solicitud de búsqueda del tiempo al enviar el formulario
    $("#weatherForm").on("submit", function(event) {
        event.preventDefault();
        const cityName = $("#cityName").val();

        // Hacer la solicitud a la API de OpenWeather
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=43673e7d610ce2b4571acd8e02d6d9dc`,
            method: "GET",
            success: function(data) {
                // Procesar y mostrar los resultados
                displayWeather(data);
            },
            error: function(err) {
                // Manejar errores de la solicitud
                $("#weatherResults").html("Error al obtener el tiempo. Por favor, verifica el nombre de la ciudad.");
            }
        });

        // Hacer la solicitud a la API de OpenWeather para la predicción de 5 días
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=43673e7d610ce2b4571acd8e02d6d9dc&cnt=5`,
            method: "GET",
            success: function(data) {
                // Procesar y mostrar la predicción de 5 días
                prediccion5dias(data);
            },
            error: function(err) {
                // Manejar errores de la solicitud
                $("#prediccionDias").html("Error al obtener la predicción del tiempo. Por favor, verifica el nombre de la ciudad.");
            }
        });
    });

    $(document).ready(function() {
        // Manejar los clics en los enlaces del menú
        $("#home-link").click(function() {
            $("#home").show();
            $("#search").hide();

            // Cambiar la imagen de fondo para la página de inicio
            $("body").css("background-image", "url('Imagenes/nubes2.jpeg')");
        });
    
        $("#search-link").click(function() {
            $("#home").hide();
            $("#search").show();
            $("#weatherResults").hide();
            $("#prediccionDias").hide();
    
            // Cambiar la imagen de fondo para la página de búsqueda
            $("body").css("background-image", "url('Imagenes/atardecer.jpg')");
        });

        //Para quitar el h1 cuando se envíe el formulario
        $("#EnviarForm").click(function() {
            $("#h1Antes").hide();
            $("#home").hide();
            $("#search").show();
            $("#weatherResults").show();
            $("#prediccionDias").show();
        });
    });

   // Función para mostrar los resultados del tiempo
   function displayWeather(data) {
    const weatherResults = $("#weatherResults");
    weatherResults.empty();

    // Icono del país
    const currentIconoCountry = data.city.country;
    const iconCountryURL = `http://openweathermap.org/images/flags/${currentIconoCountry.toLowerCase()}.png`;

    // Crear una tabla
    const table = $("<table>").appendTo(weatherResults);
    const row = $("<tr>").appendTo(table);
    const row2 = $("<tr>").appendTo(table);

    // Celda para la imagen del tiempo
    const currentIconCode = data.list[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${currentIconCode}.png`;

    // Celda para la información
    const cityName = data.city.name;
    const cellInfo2 = $("<td>").appendTo(row);
    const cellInfo = $('<td rowspan="2">').appendTo(row);
    const cellInfo3 = $("<td>").appendTo(row2);
    const coord = data.city.coord;
    const humidity = data.city.humidity;
    const currentTemperatureKelvin = data.list[0].main.temp;
    const currentTemperatureCelsius = (currentTemperatureKelvin - 273).toFixed(2); // Conversión a Celsius
    const temperaturaReal = parseInt(currentTemperatureCelsius);
    const currentWeather = data.list[0].weather[0].description;

    cellInfo3.append(`<br><br>`);
    cellInfo2.append(`<img src="${iconUrl}" width="50"></h3>`);
    cellInfo.append(`<h3> ${cityName}, ${currentIconoCountry} <img src="${iconCountryURL}" width="20"></h3>`);
    cellInfo.append(`<h4> ${temperaturaReal} °C</h4>`);
    cellInfo.append(`<p>Coords  [${coord.lat}, ${coord.lon}]</p>`);
    cellInfo.append(`<p>Humidity: ${humidity}</p>`);
    cellInfo.append(`<p> ${currentWeather}</p>`);

    table.css({
        margin: "0 auto",
    });
}

  
        

// Funcion para mostrar la temperatura de los próximos 5 días
function prediccion5dias(data) {
    const prediccionDias = $("#prediccionDias");
    prediccionDias.empty();

    // Título de la predicción
    prediccionDias.append("<h2>Predicción de los próximos 5 días</h2>");

    // Crear una tabla para mostrar la predicción de 5 días
    const table = $("<table>").appendTo(prediccionDias);

    // Encabezado de la tabla
    const headerRow = $("<tr>").appendTo(table);
    headerRow.append("<th style='width: 200px'><h3>Día</h3></th>");
    headerRow.append("<th style='width: 250px'><h3>Temperatura (°C)</h3></th>");
    headerRow.append("<th style='width: 200px'><h3>Clima</h3></th>");

    // Agrupar datos por día y calcular el promedio de temperatura
    const dailyData = {};
    data.list.forEach(forecast => {
        const dateTime = new Date(forecast.dt_txt);
        const day = dateTime.toDateString();

        if (!dailyData[day]) {
            dailyData[day] = {
                temperatureSum: 0,
                temperatureCount: 0,
                weatherDescriptions: []
            };
        }

        const temperatureKelvin = forecast.main.temp;
        dailyData[day].temperatureSum += temperatureKelvin;
        dailyData[day].temperatureCount++;
        dailyData[day].weatherDescriptions.push(forecast.weather[0].description);
    });

    // Mostrar los datos agrupados en la tabla
    for (const day in dailyData) {
        const avgTemperatureCelsius = (dailyData[day].temperatureSum / dailyData[day].temperatureCount - 273.15).toFixed(2);
        const weatherDescription = dailyData[day].weatherDescriptions[0];

        const row = $("<tr>").appendTo(table);
        row.append(`<td><h5>${day}</h5></td>`);
        row.append(`<td><h5>${avgTemperatureCelsius} °C</h5></td>`);
        row.append(`<td><h5>${weatherDescription}</h5></td>`);
    }
    
}


// // Función para mostrar los resultados del tiempo
// function prediccion5dias(data) {
//     const prediccionDias = $("#prediccionDias");
//     prediccionDias.empty();

//     // Titulo de la predicción
//     prediccionDias.append("<h2>Predicción de los próximos 5 días</h2>");

//     // Crear una tabla para mostrar la predicción de 5 días
//     const table = $("<table>").appendTo(prediccionDias);

//     // Encabezado de la tabla
//     const headerRow = $("<tr>").appendTo(table);
//     headerRow.append("<th style='width: 200px'><h3>Día</h3></th>");
//     headerRow.append("<th style='width: 250px'><h3>Temperatura (°C)</h3></th>");
//     headerRow.append("<th style='width: 200px'><h3>Clima</h3></th>");

//     // Procesar y mostrar los datos de la predicción de 5 días
//     for (let i = 0; i < data.list.length; i++) {
//         const forecast = data.list[i];
//         const dateTime = forecast.dt_txt;
//         const temperatureKelvin = forecast.main.temp;
//         const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2);
//         const weatherDescription = forecast.weather[0].description;
//         const currentIconCode = forecast.weather[0].icon;
//         const iconUrl = `https://openweathermap.org/img/w/${currentIconCode}.png`;

//         const row = $("<tr>").appendTo(table);
//         row.append(`<td><h5>${dateTime}</h5></td>`);
//         row.append(`<td><h5>${temperatureCelsius} °C</h5></td>`);
        
//         // Crear un elemento de imagen para la celda del clima
//         const weatherCell = $("<td>").appendTo(row);
//         const weatherImage = $("<img>").attr("src", iconUrl);
//         weatherCell.append(`<h5>${weatherDescription}</h5>`);
//         weatherCell.append(weatherImage);
//     }
// }

});
