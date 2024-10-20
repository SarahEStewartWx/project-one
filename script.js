
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

    const url = 'https://api.weatherstack.com/current?access_key={9dda21169e1e7bf39cf63444df1ab946}&query=Boston,Daytona,Naples,Ocala,Tampa';
    const options = {
	method: 'GET'
    
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

// function to handle the city selected or found in local storage
function selectCity(city) {
    console.log("Selected City:", city);
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

//------------------------------------------------------------
// TODO: add function to add selected city name to card header
// TODO: test rest of weather api script after fix, debug
//-----------------------------------------------------------------------------------------
