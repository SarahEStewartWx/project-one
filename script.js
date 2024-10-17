// tomorrow.io Weather API key obtained by Jacob
const apiKey = 'G9XOMDWf50dwOnT3nYGSQVYV90FEPHLp';

// JS supplied by Bulma
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
      closeAllModals();
    }
  });
});

// TODO: having issues with event listener grabbing values in html and using them in the fetch 
const dropdown = document.getElementById('dropdown-menu3');
dropdown.addEventListener('click', handleCitySelection);



async function fetchWeatherData(city) {
    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&units=imperial&apikey=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const temperature = data.values.temperature;
      const humidity = data.values.humidity;
      const feelsLike = data.values.temperatureApparent;
      const rain = data.values.precipitationProbability;
      const uvIndex = data.values.uvIndex;
  
      const tempEl = document.createElement('p');
      tempEl.textContent = `${temperature}°F`;
      const humiEl = document.createElement('p');
      humiEl.textContent = `${humidity}%`;
      const feelsEl = document.createElement('p');
      feelsEl.textContent = `${feelsLike}°F`;
      const rainEl = document.createElement('p');
      rainEl.textContent = `${rain}%`;
      const uvEl = document.createElement('p');
      uvEl.textContent = `${uvIndex}`;

      document.getElementById('rtTemp').appendChild(tempEl);
      document.getElementById('rtHumidity').appendChild(humiEl);
      document.getElementById('rtTempApp').appendChild(feelsEl);
      document.getElementById('rtPrec').appendChild(rainEl);
      document.getElementById('rtUV').appendChild(uvEl);

    } catch (error) {
      console.error('Error fetching weather data:', error);
    } // will display error if there's an issue on the API side
};

// TODO: check following code after event listener is plugged in 
function handleCitySelection(event) {
    if (userCity > 0) {
        fetchWeatherData(userCity);
    } else { 
    const selectedCity = event.target.value;
    fetchWeatherData(selectedCity);

    localStorage.setItem('lastSelectedCity', selectedCity);
}};

function getUserCity() {
    return localStorage.getitem('lastSelectedCity')
};

const userCity = getUserCity();

