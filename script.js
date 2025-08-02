// Simple Weather App
const apiKey = '155a11782007be5d14d7311235e6a102'; // Replace with your OpenWeatherMap API key
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weather');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

// Weather display elements
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDesc = document.getElementById('weatherDesc');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const errorMessage = document.getElementById('errorMessage');

// Event listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});

async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    showLoading();
    
    try {
        const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        showError('City not found! Please try again.');
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = Math.round(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    
    // Set weather icon
    weatherIcon.className = getWeatherIcon(data.weather[0].id);
    
    // Keep the mountain background - don't change based on weather
    // setWeatherBackground(data.weather[0].id, data.weather[0].main);
    
    hideAll();
    weatherCard.classList.remove('hidden');
}

function setWeatherBackground(weatherId, weatherMain) {
    // Remove all weather background classes
    document.body.classList.remove('sunny', 'cloudy', 'rainy', 'snowy', 'stormy', 'foggy');
    
    // Set background based on weather conditions
    if (weatherId >= 200 && weatherId < 300) {
        // Thunderstorm
        document.body.classList.add('stormy');
    } else if (weatherId >= 300 && weatherId < 400) {
        // Drizzle
        document.body.classList.add('rainy');
    } else if (weatherId >= 500 && weatherId < 600) {
        // Rain
        document.body.classList.add('rainy');
    } else if (weatherId >= 600 && weatherId < 700) {
        // Snow
        document.body.classList.add('snowy');
    } else if (weatherId >= 700 && weatherId < 800) {
        // Atmosphere (fog, mist, etc.)
        document.body.classList.add('foggy');
    } else if (weatherId === 800) {
        // Clear
        document.body.classList.add('sunny');
    } else if (weatherId >= 801 && weatherId < 900) {
        // Clouds
        document.body.classList.add('cloudy');
    } else {
        // Default
        document.body.classList.add('sunny');
    }
}

function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return 'fas fa-bolt';
    if (weatherId >= 300 && weatherId < 400) return 'fas fa-cloud-rain';
    if (weatherId >= 500 && weatherId < 600) return 'fas fa-cloud-showers-heavy';
    if (weatherId >= 600 && weatherId < 700) return 'fas fa-snowflake';
    if (weatherId >= 700 && weatherId < 800) return 'fas fa-smog';
    if (weatherId === 800) return 'fas fa-sun';
    if (weatherId === 801) return 'fas fa-cloud-sun';
    if (weatherId >= 802 && weatherId < 900) return 'fas fa-cloud';
    return 'fas fa-cloud';
}

function showLoading() {
    hideAll();
    loading.classList.remove('hidden');
}

function showError(message) {
    hideAll();
    errorMessage.textContent = message;
    error.classList.remove('hidden');
}

function hideAll() {
    weatherCard.classList.add('hidden');
    loading.classList.add('hidden');
    error.classList.add('hidden');
}

// Demo mode for testing
function enableDemoMode() {
    const demoData = {
        name: 'New York',
        main: {
            temp: 22,
            humidity: 65
        },
        weather: [{ id: 800, description: 'Clear sky', main: 'Clear' }],
        wind: { speed: 3.3 }
    };
    
    // Don't set background for demo mode - keep the default mountain background
    displayWeatherWithoutBackground(demoData);
}

function displayWeatherWithoutBackground(data) {
    cityName.textContent = data.name;
    temperature.textContent = Math.round(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    
    // Set weather icon
    weatherIcon.className = getWeatherIcon(data.weather[0].id);
    
    // Don't change background - keep the default mountain background
    hideAll();
    weatherCard.classList.remove('hidden');
}

// Initialize with demo if no API key
if (apiKey === 'YOUR_API_KEY') {
    enableDemoMode();
} 