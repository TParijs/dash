console.log('loaded');

// Retrieve the username and password from local storage
const username = localStorage.getItem('username');
const password = localStorage.getItem('password');

// Log the username and password to the console
console.log('Username:', username);
console.log('Password:', password);

// Display the username in the HTML
const showUsername = document.querySelector('.show-user');
showUsername.innerHTML = username;

// URL for geolocation API
const geolocationApiUrl = 'https://geocode.maps.co/search?q=Rotterdam';

// URL for weather API
const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=51.9244424&longitude=4.47775&daily=sunrise,sunset,rain_sum,precipitation_probability_max&hourly=temperature_2m,windspeed_10m&current_weather=true&forecast_days=1&timezone=Europe%2FBerlin';

// Selecting HTML elements for various purposes
const chartCanvasWindspeed = document.querySelector('.chart-windspeed');
const inputValue = document.querySelector(".form-control");
const tempValue = document.querySelector('.temperature');
const dateValue = document.querySelector('.date-time');
const sunriseValue = document.querySelector('.sunrise');
const sunsetValue = document.querySelector('.sunset');
const rainValue = document.querySelector('.rain');
const chanceValue = document.querySelector('.rain-chance');
const printOne = document.querySelector('.print-one');
const printTwo = document.querySelector('.print-two');
const printThree = document.querySelector('.print-three');
const printFour = document.querySelector('.print-four');
const printFive = document.querySelector('.print-five');
const printSix = document.querySelector('.print-six');
const printSeven = document.querySelector('.print-seven');
const printEight = document.querySelector('.print-eight');
const changeImage = document.querySelector('.change-image');
const tryout = document.querySelector('.try-out');
console.log(inputValue);

let windspeedChart;

// const digit = [01, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

// Event listener for Enter key press on the input field
inputValue.addEventListener("keydown", checkKeyPressed, false);

function checkKeyPressed(evt) {
    if (evt.keyCode == "13") {
        // Executes when the Enter key is pressed
        alert(`showing the weather for ${inputValue.value}`);

        // Fetches geolocation data based on the input value
        fetch(`https://geocode.maps.co/search?q=${inputValue.value}`)
            .then(myData => myData.json())
            .then(jsonData => showInConsole(jsonData));

        // Callback function to handle geolocation data
        function showInConsole(array) {
            const element = array[0];
            console.log("lat", element.lat, "lon", element.lon);

            // Fetches weather data based on the retrieved latitude and longitude
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${element.lat}&longitude=${element.lon}&daily=sunrise,sunset,rain_sum,precipitation_probability_max&hourly=temperature_2m,windspeed_10m&current_weather=true&forecast_days=1&timezone=Europe%2FBerlin`)
                .then(myData => myData.json())
                .then(jsonData => changingShit(jsonData));

            // Callback function to handle weather data
            function changingShit(meteo) {
                console.log(meteo);
                tryout.innerHTML = "";

                // Looping through temperature data and generating HTML content
                for (let index = 0; index < meteo.hourly.temperature_2m.length; index++) {
                    const showTemp = meteo.hourly.temperature_2m[index];
                    console.log(showTemp);
                    let weatherImg = "img/sunnt.png";

                    // Check if precipitation probability is greater than 40% to determine weather image
                    if (meteo.daily.precipitation_probability_max > 40) {
                        weatherImg = "img/rain.png";
                    }

                    // Format the index to include leading zeros if necessary
                    let formattedIndex = index;
                    if (index < 10) {
                        formattedIndex = `0${index}`;
                    }

                    // Append HTML content to the 'tryout' element
                    tryout.innerHTML += `
                    <div class="card card-body">
                        <h1> time = ${formattedIndex} </h1>
                        <img class="card-img-top" src="${weatherImg}" alt="Card image cap">
                        <br>
                        <h1>${showTemp} °C </h1>
                    </div>
                    `;
                }

                // Update other HTML elements with weather data
                dateValue.innerHTML = ` ${meteo.current_weather.time} `;
                tempValue.innerHTML = ` ${meteo.current_weather.temperature}°C `;
                sunriseValue.innerHTML = ` ${meteo.daily.sunrise} `;
                sunsetValue.innerHTML = ` ${meteo.daily.sunset}  `;
                rainValue.innerHTML = ` ${meteo.daily.rain_sum} mm `;
                chanceValue.innerHTML = ` ${meteo.daily.precipitation_probability_max} % `;

                // Destroy the existing windspeed chart if it exists
                if (windspeedChart) {
                    windspeedChart.destroy();
                }

                // Create a new windspeed chart using Chart.js library
                windspeedChart = createChart(chartCanvasWindspeed, meteo.hourly.time, meteo.hourly.windspeed_10m, '#windsnelheid');
                console.log(windspeedChart);
                console.log(meteo.hourly.time);
                console.log(meteo.hourly.windspeed_10m);
            }
        }
    }
}

// Function to create a chart using Chart.js library
function createChart(canvasElement, labels, data) {
    return new Chart(canvasElement, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'windspeed per 2 hours',
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}