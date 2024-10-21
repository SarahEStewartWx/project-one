// Image modal
var modal = document.getElementById('id01');
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                };

// Weather API
async function fetchWeatherData(city) {
  const apiKey = 'G9XOMDWf50dwOnT3nYGSQVYV90FEPHLp';
  const url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&units=imperial&apikey=${apiKey}`;
  const options = {method: 'GET', headers: {accept: 'application/json'}};
                  
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      console.log(response);
                        
      const temp = response.data.values.temperature;
      const humidity = response.data.values.humidity;
      const feelsLike = response.data.values.temperatureApparent;
      const rain = response.data.values.precipitationProbability;
      const uvIndex = response.data.values.uvIndex;
                      
      document.getElementById('displayCity').textContent = `${city}`;
      document.getElementById('rtTemp').textContent = `${temp}°F`;
      document.getElementById('rtHumidity').textContent = `${humidity}%`;
      document.getElementById('rtTempApp').textContent = `${feelsLike}°F`;
      document.getElementById('rtPrec').textContent = `${rain}% chance of rain`;
      document.getElementById('rtUV').textContent = `The UV Index is ${uvIndex}`;
    })
    .catch(err => console.error(err));
};

// function to handle the city selected or found in local storage
function selectCity(city) {
    console.log("Selected City:", city);
    localStorage.setItem("selectedCity", city);

    fetchWeatherData(city); 
};

// function for local storage, does nothing if storage is empty 
function checkLocalStorage() {
    const storedCity = localStorage.getItem("selectedCity");

    if (storedCity) {
        selectCity(storedCity);
    }
};

// event listener for dropdown menu
document.addEventListener('DOMContentLoaded', () => {
  const cityMenu = document.getElementById('dropdownMenu');

  cityMenu.addEventListener('change', () => {
    const selectedCity = dropdownMenu.value;
    selectCity(selectedCity);
  });
});

// Event listener for loading last selected city set in storage when page refreshes or opens 
window.addEventListener("load", checkLocalStorage);
