const timeEl= document.getElementById("time");
const dateEl = document.getElementById("date");
const currentweatheritemsEl = document.getElementById("current-weather-items");
const timezone=document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherforecastEl = document.getElementById("weather-forecast");
const currenttempEl =document.getElementById("current-temp");

const searchbar = document.getElementById("searchbar")
var form = document.getElementById("LocationForm");
const timeZoneEl= document.getElementById("time_zone"); 
const CountryEl = document.getElementById("country");
var Cityname=document.getElementById("search").value;




const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const months = ['January','February','March','April','May','June','July','August','September','October','November','December']


const API_KEY = 'YOUR_KEY_HERE';


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursin12hourformat= hour>=13? hour%12:hour;
    const ampm = (hour >= 12)? 'PM':'AM';
    const minutes = time.getMinutes();

    timeEl.innerHTML=hoursin12hourformat+ ':' + minutes +' '+ '<span id="am-pm">'+ampm+'</span>'


    dateEl.innerHTML= days[day] + ', ' + date+ ' '+months[month]
}, 1000);

GetWeatherData();

function GetWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        console.log(success);
        let {latitude, longitude } =success.coords;
        console.log(latitude,longitude);
        fetch('http://api.openweathermap.org/geo/1.0/reverse?lat='+latitude+'&lon='+longitude+'&limit=5&appid='+API_KEY).then(res=> res.json()).then(data=>{
            console.log(data);
            call2(data);
        
        })
    })
}


form.addEventListener("submit",function(event){
        event.preventDefault();
        var Cityname=document.getElementById("search").value;
        console.log(Cityname);
        weatherOfCity(Cityname);
    }
)

function weatherOfCity(Cityname){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+Cityname+'&units=metric&appid='+API_KEY).then(res=> res.json()).then(dataforCity=>{
            console.log(dataforCity);
            ShowWeatherData(dataforCity,Cityname);
        })
}





function call2(data){
    let {name}=data[0];
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+name+'&units=metric&appid='+API_KEY).then(res=> res.json()).then(data2=>{
            console.log(data2);
            ShowWeatherData(data2,name);
        })
}


function ShowWeatherData(data2,Cityname){
    let {humidity,pressure,temp_min,temp_max} = data2.main;
    let {speed} = data2.wind;
    let {sunrise,sunset,country} = data2.sys;
    let {icon}= data2.weather[0];
    console.log(humidity,pressure,sunrise,sunset,speed,icon,country);
    currentweatheritemsEl.innerHTML=
    '<div class="weather-item"<div>Humidity: </div> <div>'+humidity+'%</div> </div><div class="weather-item"<div>Pressure</div><div>'+pressure+'</div></div><div class="weather-item"><div>Wind Speed</div><div>'+speed+'</div></div><div class="weather-item"><div>Sunrise:</div><div>'+(window.moment(sunrise * 1000).format('HH:mm a'))+'</div></div><div class="weather-item"><div>Sunset</div><div>'+(window.moment(sunset * 1000).format('HH:mm a'))+'</div></div>';
    // class="weather-item"><div>Sunrise:</div><div>'+window.moment(sunrise * 1000).format('HH:mm a')+'</div></div><div class="weather-item"><div>Sunset</div><div>'+window.moment(sunset * 1000).format('HH:mm a')+'</div></div>';
    currenttempEl.innerHTML='<img src="http://openweathermap.org/img/wn/'+icon+'@2x.png" alt="weather icon" srcset="">    <div class="other">        <div class="day">Today</div>        <div class="temp">Night/Min - '+temp_min+' &#176;</div>        <div class="temp">Day/Max - '+temp_max+' &#176;</div>    </div>'
    timeZoneEl.innerHTML='<span>'+Cityname+'</span>'
    CountryEl.innerHTML = '<span>'+country+'</span'
}

