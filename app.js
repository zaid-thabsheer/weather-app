const iconElement= document.querySelector('.weather-icon');
const tempElement= document.querySelector('.temperatur-value p');
const descElement= document.querySelector('.temperature-description p');
const locationElement= document.querySelector('.location p');
const notificationElement= document.querySelector('.notification');



const weather={}

weather.temperature={
    unit:'celcius'
}

const KELVIN = 273;

const key = "82005d27a116c2880c8f0fcb866998a0";

//check if the browser support geolocalization----
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
    notificationElement.style.display='block';
    notificationElement.innerHTML="<p>Browser doesn't support Geolocalization"
}



//set user position-----

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude)
}


//show error when there is a issue with geolocalization------

function showError(error){
    notificationElement.style.display='block';
    notificationElement.innerHTML=`<p> ${error.message}`
}



//api

function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
fetch(api)
.then((response)=>{
    let data=response.json();
    return data
}).then((data)=>{
   weather.temperature.value= Math.floor(data.main.temp-KELVIN)
  weather.description=data.weather[0].description;
  weather.iconId=data.weather[0].icon;
  weather.city=data.name;
  weather.country=data.sys.country;
}).then(()=>{
    displayWeather();
})
}

function displayWeather(){
    iconElement.innerHTML=`<img src='icons/${weather.iconId}.png'/>`
    tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`
    descElement.innerHTML=`${weather.description}`;
    locationElement.innerHTML=`${weather.city},${weather.country}`;
}


// c to f -----

function celsuistoFarenheit(temp){
return (temp * 9/5)+32
}

tempElement.addEventListener('click',()=>{
   

    if(weather.temperature.unit==='celcius'){
        let faranheit=celsuistoFarenheit(weather.temperature.value);
        faranheit=Math.floor(faranheit)

        tempElement.innerHTML=`${faranheit}°<span>F</span>`
        weather.temperature.unit='faranheit';
    }else{
        tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`
        weather.temperature.unit='celcius';
    }
})
