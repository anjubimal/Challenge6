var button = document.querySelector('.submit')
var inputValue = document.querySelector('.inputValue')
var nameEl = document.querySelector('.name');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var uv = document.querySelector('.uv');

button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=18614d7187766b9dc40dac4826ceade6&units=imperial')
        .then(response => response.json())
        .then(data => {
            var latitude = data.coord.lon
            var longitude = data.coord.lat
            var nameValue = data.name
            nameEl.textContent = nameValue;
            


            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly&units=imperial&appid=18614d7187766b9dc40dac4826ceade6')
                .then(function (weather) { return weather.json(); })
                .then(function (weather) {

                    // Place weather info into varibles
                    var tempValue = weather.current.temp;
                    var windValue = weather.current.wind_speed;
                    var humidityValue = weather.current.humidity;
                    var uvValue = weather.current.uvi;
                    iconLink = "https://openweathermap.org/img/wn/" + weather.current.weather[0].icon + "@2x.png"


                    wind.textContent = 'Wind: ' + windValue;
                    temp.textContent = 'Temp: ' + tempValue;
                    humidity.textContent = 'Humidity: ' + humidityValue;
                    uv.textContent = 'UV Index: ' + uvValue;


                    function display() {
                        for (i = 0; i < 5; i++) {
                            var temp0 = document.querySelector('.temp' + i);
                            var wind0 = document.querySelector('.wind' + i);
                            var humidity0 = document.querySelector('.humidity' + i);
                            var icon = document.querySelector('.icon' + i);

                            
                            var iconCode = "https://openweathermap.org/img/wn/" + weather.daily[i].weather[0].icon + "@2x.png";
                            var tempValue0 = weather.daily[i].temp.day;
                            console.log(tempValue0)
                            var windValue0 = weather.daily[i].wind_speed;
                            console.log(windValue0)
                            var humidityValue0 = weather.daily[i].humidity;
                            console.log(humidityValue0)
                            

                            wind0.textContent = 'Wind: ' + windValue0;
                            temp0.textContent = 'Temp: ' + tempValue0;
                            humidity0.textContent = 'Humidity: ' + humidityValue0;
                            icon.src = iconCode;
                            
                        

                        }
                    }

                    display();

                    




        })


    // .catch(err => alert("Wrong city name!"))
});
});





