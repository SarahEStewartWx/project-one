
//--------------------------------------
// Modal Code
var modal = document.getElementById('id01');
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
//--------------------------------------
// the code below is for the weather api
//--------------------------------------
// function to fetch weather from API
async function fetchWeatherData(city) {
    // tomorrow.io Weather API key obtained by Jacob
    const apiKey = 'G9XOMDWf50dwOnT3nYGSQVYV90FEPHLp';

    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&units=imperial&apikey=${apiKey}`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    
    fetch(url, options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .then((data) => {
            const temperature = data.data[0].values.temperature;
            const humidity = data.data[0].values.humidity;
            const feelsLike = data.data[0].values.temperatureApparent;
            const rain = data.data[0].values.precipitationProbability;
            const uvIndex = data.data[0].values.uvIndex;

            document.getElementById('rtTemp').textContent = `${temperature}°F`;
            document.getElementById('rtHumidity').textContent = `${humidity}%`;
            document.getElementById('rtTempApp').textContent = `${feelsLike}°F`;
            document.getElementById('rtPrec').textContent = `${rain}% chance`;
            document.getElementById('rtUV').textContent = `The UV Index is ${uvIndex}`;
        })
        .catch(console.error)
};

// function to handle the city selected or found in local storage
function selectCity(city) {
    console.log("Selected City:", city);
    localStorage.clear;
    localStorage.setItem("selectedCity", city);

    fetchWeatherData(city); 
};

// function for local storage for project guidelines, does nothing if storage is empty 
function checkLocalStorage() {
    const storedCity = localStorage.getItem("selectedCity");

    if (storedCity) {
        selectCity(storedCity);
    }
};

// TODO: fix menu listener, add function to add selected city name to card header
// event listener for dropdown menu
// TODO: test rest of weather api script after fix, debug
const dropdownMenu = document.getElementsByTagName("option");

dropdownMenu.addEventListener("change", () => {
    const selectedCity = dropdownMenu.value;
    selectCity(selectedCity);
});

// Event listener for loading last selected city set in storage when page refreshes or opens 
window.addEventListener("load", checkLocalStorage);

//-----------------------------------------------------------------------------------------
