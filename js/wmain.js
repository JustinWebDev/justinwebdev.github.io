/*jslint browser:true */
'use strict';

let weatherConditions = new XMLHttpRequest();
let weatherForecast = new XMLHttpRequest();
let wCond; //conditions
let fObj; //forecast

document.getElementById('zip').value ="";

function loadWeather() {
  let zip = document.getElementById('zip').value;
  if (zip === '') {zip = "35810"}
  const conditionsPath = "https://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&units=imperial&APPID=8c6405207db6b6fe115ac161f770cd31";
  const forecastPath = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + ",us&units=imperial&cnt=17&APPID=8c6405207db6b6fe115ac161f770cd31";

  // GET THE CONDITIONS
  weatherConditions.open('get', conditionsPath, true);
  //weatherConditions.responseType = '';
  weatherConditions.send(null);

  // GET THE FORECAST
  console.log("TEST for json");
  weatherForecast.open('GET', forecastPath, true);
  //weatherForecast.responseType = '';
  weatherForecast.send();
}

weatherConditions.onload = function() {
    if (weatherConditions.status === 200) {
        wCond = JSON.parse(weatherConditions.responseText);
        console.log(wCond);
        document.getElementById('location').innerText = wCond.name;
        const iconcode = wCond.weather[0].icon;
        console.log("GOT icon = "+ iconcode);
        const iconpath = "https://openweathermap.org/img/w/"+iconcode+".png";
        console.log(iconpath);
        document.getElementById('wcicon').src = iconpath;
        // document.getElementById('wcicon').innerHTML = "<img src=\"https://openweathermap.org/img/w/"+wCond.weather[0].icon+".png\">";
        // https://openweathermap.org/weather-conditions  <img src="https://openweathermap.org/img/w/10d.png">
        let weatherCond = "";
          for (let i=0; i < wCond.weather.length; i++) {
            weatherCond += wCond.weather[i].main;
            if (i !== wCond.weather.length-1){
              weatherCond += ", ";}
          }
      document.getElementById('weather').innerText = weatherCond;
      document.getElementById('temperature').innerText = Math.round(wCond.main.temp);
      document.getElementById('windspeed').innerText = wCond.wind.speed.toFixed();
      let weatherDesc = "";
        for (let i=0; i < wCond.weather.length; i++) {
          weatherDesc += wCond.weather[i].description;
          if (i !== wCond.weather.length-1){
            weatherDesc += ", ";}
        }
      document.getElementById('desc').innerText = weatherDesc;
      //document.getElementById('radar').src = 'https://tile.openweathermap.org/map/precipitation_new/4/6/10.png?appid=8c6405207db6b6fe115ac161f770cd31' // for radar div
    } //end if
}; //end function


weatherForecast.onload = function() {
if (weatherForecast.status === 200){
	fObj = JSON.parse(weatherForecast.responseText);
	console.log(fObj);
  // day 1
  const d1 = new Date();
  const dayWeek = d1.getDay(); console.log(`day is ${dayWeek}`);
  const weekday = [];
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  const day1 = weekday[dayWeek];  console.log(`day1 is ${day1}`);
  let day2, day3;
  document.getElementById('r1c1').innerHTML = day1;
  document.getElementById('r1c3').innerHTML = Math.round(fObj.list[0].main.temp)+"&deg;";
  document.getElementById('r1c2').src = "https://openweathermap.org/img/w/"+fObj.list[0].weather[0].icon+".png";
  document.getElementById('r1c2').alt = fObj.list[0].weather[0].description;
  document.getElementById('r1c2').title = fObj.list[0].weather[0].main;

  // day 2
  if (dayWeek === 6) {
    day2 = weekday[0];
  }
  else {
    day2 = weekday[dayWeek+1];
  }
  console.log(`day2 is ${day2}`);
  document.getElementById('r2c1').innerHTML = day2;
  document.getElementById('r2c3').innerHTML = Math.round(fObj.list[8].main.temp)+"&deg;";
  document.getElementById('r2c2').src = "https://openweathermap.org/img/w/"+fObj.list[8].weather[0].icon+".png";
  document.getElementById('r2c2').alt = fObj.list[8].weather[0].description;
  document.getElementById('r2c2').title = fObj.list[8].weather[0].main;

  // day 3
  if (dayWeek === 5) {
    day3 = weekday[0];
  }
  else if (dayWeek === 6) {
    day3 = weekday[1];
  }
  else {
    day3 = weekday[dayWeek+2];
  }
  console.log(`day3 is ${day3}`);
  document.getElementById('r3c1').innerHTML = day3;
  document.getElementById('r3c3').innerHTML = Math.round(fObj.list[16].main.temp)+"&deg;";
  document.getElementById('r3c2').src = "https://openweathermap.org/img/w/"+fObj.list[16].weather[0].icon+".png";
  document.getElementById('r3c2').alt = fObj.list[16].weather[0].description;
  document.getElementById('r3c2').title = fObj.list[16].weather[0].main;

 } //end if
}; //end function

loadWeather();
