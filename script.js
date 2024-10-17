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

//--------------------------------------
// the code below is for the weather api
//--------------------------------------
async function fetchWeatherData() {
    // tomorrow.io Weather API key obtained by Jacob
    const apiKey = 'G9XOMDWf50dwOnT3nYGSQVYV90FEPHLp';
    const city = localStorage.getItem('lastSelectedCity');
    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&units=imperial&apikey=${apiKey}`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    
    fetch(url, options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .then((data) => {
            const temperature = data.values.temperature;
            const humidity = data.values.humidity;
            const feelsLike = data.values.temperatureApparent;
            const rain = data.values.precipitationProbability;
            const uvIndex = data.values.uvIndex;

            const tempEl = document.createElement('p');
            tempEl.innerText = `${temperature}°F`;
            const humiEl = document.createElement('p');
            humiEl.innerText = `${humidity}%`;
            const feelsEl = document.createElement('p');
            feelsEl.innerText = `${feelsLike}°F`;
            const rainEl = document.createElement('p');
            rainEl.innerText = `${rain}%`;
            const uvEl = document.createElement('p');
            uvEl.innerText = `${uvIndex}`;
  
            document.getElementById('rtTemp').appendChild(tempEl);
            document.getElementById('rtHumidity').appendChild(humiEl);
            document.getElementById('rtTempApp').appendChild(feelsEl);
            document.getElementById('rtPrec').appendChild(rainEl);
            document.getElementById('rtUV').appendChild(uvEl);
        })
        .catch(console.error)
};

function selectCity() {
    fetchWeatherData(); 
};

// TODO: fix event listener
// TODO: test rest of weather api script after fix, debug
const dropdown = document.querySelectorAll('#cities')
dropdown.addEventListener('change', () => {
    const selectedCity = this.value;
    selectCity(selectedCity);

    localStorage.clear;
    localStorage.setItem('lastSelectedCity', selectedCity);
});
