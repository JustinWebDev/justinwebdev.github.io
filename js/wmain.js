/*jslint browser:true */
'use strict';

var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var wCond; //conditions
var fObj; //forecast
document.getElementById('zip').value ="";
function loadWeather() {
  var zip = document.getElementById('zip').value;
  if (zip === '') {zip = "35810"}
  var conditionsPath = "https://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&units=imperial&APPID=8c6405207db6b6fe115ac161f770cd31";
  var forecastPath = "https://api.openweathermap.org/data/2.5/forecast?zip="+zip+",us&units=imperial&cnt=17&APPID=8c6405207db6b6fe115ac161f770cd31";

  // GET THE CONDITIONS
  weatherConditions.open('get', conditionsPath, true);
  weatherConditions.responseType = 'text';
  weatherConditions.send(null);

  // GET THE FORECARST
  weatherForecast.open('GET', forecastPath, true);
  weatherForecast.responseType = 'text';
  weatherForecast.send();
}

weatherConditions.onload = function() {
    if (weatherConditions.status === 200){
        wCond = JSON.parse(weatherConditions.responseText);
        console.log(wCond);
        document.getElementById('location').innerHTML = wCond.name;
        var iconcode = wCond.weather[0].icon;
        var iconpath = "https://openweathermap.org/img/w/"+iconcode+".png";
        document.getElementById('wcicon').src = iconpath;
        //document.getElementById('wcicon').innerHTML = "<img src=\"https://openweathermap.org/img/w/"+wCond.weather[0].icon+".png\">";
// https://openweathermap.org/weather-conditions  <img src="http://openweathermap.org/img/w/10d.png">
        var weatherCond = "";
        var i = 0;
          for (var i=0; i < wCond.weather.length; i++){
            weatherCond += wCond.weather[i].main;
            if (i != wCond.weather.length-1){
              weatherCond += ", ";}
            }
      document.getElementById('weather').innerHTML = weatherCond;
      document.getElementById('temperature').innerHTML = Math.round(wCond.main.temp);
      document.getElementById('windspeed').innerHTML = wCond.wind.speed;
      var weatherDesc = "";
      var i = 0;
        for (var i=0; i < wCond.weather.length; i++){
          weatherDesc += wCond.weather[i].description;
          if (i != wCond.weather.length-1){
            weatherDesc += ", ";}
          }
      document.getElementById('desc').innerHTML = weatherDesc;
      document.getElementById('radar').src = 'https://tile.openweathermap.org/map/precipitation_new/4/6/10.png?appid=8c6405207db6b6fe115ac161f770cd31' // for radar div
    } //end if
}; //end function


weatherForecast.onload = function() {
if (weatherForecast.status === 200){
	fObj = JSON.parse(weatherForecast.responseText);
	console.log(fObj);
  // day 1
  var d1 = new Date();
  var weekday1 = new Array();
  weekday1[0] = "Sunday";
  weekday1[1] = "Monday";
  weekday1[2] = "Tuesday";
  weekday1[3] = "Wednesday";
  weekday1[4] = "Thursday";
  weekday1[5] = "Friday";
  weekday1[6] = "Saturday";
  var day1 = weekday1[d1.getDay()];
  document.getElementById('r1c1').innerHTML = day1;
  document.getElementById('r1c3').innerHTML = Math.round(fObj.list[0].main.temp)+"&deg;";
  document.getElementById('r1c2').src = "http://openweathermap.org/img/w/"+fObj.list[0].weather[0].icon+".png";

  // day 2
  var d2 = new Date();
  var weekday2 = new Array();
  weekday2[0] = "Sunday";
  weekday2[1] = "Monday";
  weekday2[2] = "Tuesday";
  weekday2[3] = "Wednesday";
  weekday2[4] = "Thursday";
  weekday2[5] = "Friday";
  weekday2[6] = "Saturday";
  var day2 = weekday2[d2.getDay()+1];
  document.getElementById('r2c1').innerHTML = day2;
  document.getElementById('r2c3').innerHTML = Math.round(fObj.list[8].main.temp)+"&deg;";
  document.getElementById('r2c2').src = "http://openweathermap.org/img/w/"+fObj.list[8].weather[0].icon+".png";

  // day 3
  var d3 = new Date();
  var weekday3 = new Array();
  weekday3[0] = "Sunday";
  weekday3[1] = "Monday";
  weekday3[2] = "Tuesday";
  weekday3[3] = "Wednesday";
  weekday3[4] = "Thursday";
  weekday3[5] = "Friday";
  weekday3[6] = "Saturday";
  var day3 = weekday3[d3.getDay()+2]; console.log(day3);
  document.getElementById('r3c1').innerHTML = day3;
  document.getElementById('r3c3').innerHTML = Math.round(fObj.list[16].main.temp)+"&deg;";
  document.getElementById('r3c2').src = "http://openweathermap.org/img/w/"+fObj.list[16].weather[0].icon+".png";

 } //end if
}; //end function

loadWeather();
