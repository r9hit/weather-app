
const weatherData = document.querySelector('.data')
const loading = document.querySelector('.loading')
const alertBox = document.querySelector('.alert')

const searchByPincode = document.querySelector('.input-pincode');
const enteredPincode = document.querySelector('#input-pincode');

const searchByLocation = document.querySelector('.input-location');
const enteredLocation = document.querySelector('#input-location');


searchByLocation.addEventListener('submit', (e) => {
    e.preventDefault()
    
    fetchDataBylocation(enteredLocation.value);
    
})

searchByPincode.addEventListener('submit', (e) => {
    e.preventDefault()

    let zip = Number(enteredPincode.value)
    fetchDataByPincode(zip);
    
})

async function fetchDataBylocation(location) {
    try {

        weatherData.innerHTML = ''
        loading.style['display'] = 'block';

        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location},IN&appid=f7503f44bcd38b3a143cf34193d5a435`);

        // console.log(response);
        const jsonData = await response.json();
        // console.log(jsonData);
        latitudeLongitude(jsonData);

    } catch (err) {
        loading.style['display'] = 'none';
        weatherData.innerHTML = ''
        // console.log(err);
        setTimeout(() => {
            alertBox.classList.remove('active-alert')
        }, 3000);
        alertBox.classList.add('active-alert')
    }
}

async function fetchDataByPincode(zip) {
    try {

        weatherData.innerHTML = ''

        loading.style['display'] = 'block';

        const response = await fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${zip},IN&appid=0d7dace9bc88448963f73ee11a0c24be`);
        // console.log(response);
        const jsonData = await response.json();
        // console.log(jsonData);

        let lat = jsonData.lat;
        let long = jsonData.lon;
        // console.log(lat, long);
        let urlCurrent =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f7503f44bcd38b3a143cf34193d5a435`;

        const response2 =  await fetch(urlCurrent);
        // console.log(response2);
        const jsonData2 = await response2.json();
        // console.log(jsonData2);

        
        finalData(jsonData2);
        
    } catch (err) {
        loading.style['display'] = 'none';
        weatherData.innerHTML = ''
        // console.log(err);

        setTimeout(() => {
            alertBox.classList.remove('active-alert')
        }, 3000);
        alertBox.classList.add('active-alert')
    }
}

async function latitudeLongitude(jsonData) {
    try {

        let lat = jsonData[0].lat;
        let long = jsonData[0].lon;
        // console.log(lat, long);
        let urlCurrent =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f7503f44bcd38b3a143cf34193d5a435`;
        const response2 =  await fetch(urlCurrent);
        // console.log(response2);
        const jsonData2 = await response2.json();
        console.log(jsonData2);

        finalData(jsonData2);
    }

    catch (Error) {
        loading.style['display'] = 'none';

        weatherData.innerHTML = ''
        // console.log(Error);
        setTimeout(() => {
            alertBox.classList.remove('active-alert')
        }, 3000);
        alertBox.classList.add('active-alert')

    }

}

async function finalData(jsonData2){

    loading.style['display'] = 'none';
    document.querySelector('#fetchedData').style['display'] = 'block';

   let html = `
    <div class="city">${jsonData2.name}, ${jsonData2.sys.country}</div>
    <div class="weather-text">${jsonData2.weather[0].main}</div>
    <div class="weather-details">
        <div class="weather-logo"><img src="https://openweathermap.org/img/wn/${jsonData2.weather[0].icon}@2x.png" alt=""></div>
        <div class="weather-temp">${(jsonData2.main.temp - 273.15).toFixed(2)}°C</div>
        <div class="min-max-container">
            <div class="min">Min: ${(jsonData2.main.temp_min - 273.15).toFixed(2)}°C</div>
            <div class="max">Max: ${(jsonData2.main.temp_max - 273.15).toFixed(2)}°C</div>
        </div>
        <div class="feelslike">Feels like: ${(jsonData2.main.feels_like - 273.15).toFixed(2)}°C </div>
        <div class="humidity">Humidity: ${(jsonData2.main.humidity)}</div>
    </div>
    `

    weatherData.innerHTML = html;

    enteredLocation.value = '';
    enteredPincode.value =  '';

}




