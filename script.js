var button = document.querySelector('.submit')
var inputValue = document.querySelector('.inputValue')
var nameEl = document.querySelector('.name');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var uv = document.querySelector('.uv');
var dateToday = document.querySelector('.date');

button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=18614d7187766b9dc40dac4826ceade6&units=imperial')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var nameValue = data.name
            nameEl.textContent = nameValue;
            
            var date = moment().format("MMM Do YY").toString();
            var tempValue = data.main.temp;
            var windValue = data.wind.speed;
            var humidityValue = data.main.humidity;
            


            wind.textContent = 'Wind: ' + windValue;
            temp.textContent = 'Temp: ' + tempValue;
            humidity.textContent = 'Humidity: ' + humidityValue;
            dateToday.textContent = date;

            fiveDayForecast(inputValue.value)

            var latitude = data.coord.lat
            var longitude = data.coord.lon
            

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=18614d7187766b9dc40dac4826ceade6`)
                .then((res) => res.json())
                .then(function (data) {
                    var uvValue = data.current.uvi;
                    uv.textContent = 'UV Index: ' + uvValue;

                    if(uvValue <2){
                        uv.style.background = "green"
                    }

                    else if (uvValue >= 3 && uvValue <=5){
                        uv.style.background = "yellow"
                    }

                    else if (uvValue >= 6 && uvValue <= 7) {
                        uv.style.background = "orange"
                    }

                    else if (uvValue >= 8 && uvValue <= 10) {
                        uv.style.background = "red"
                    }

                    else if (uvValue >= 11) {
                        uv.style.background = "purple"
                    }
    
});
        })

        });




function fiveDayForecast(inputValue) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue + '&appid=18614d7187766b9dc40dac4826ceade6&units=imperial')
        .then(response => response.json())
        .then(weather => {

            console.log(weather)
            console.log("hello")

            var fiveDay = document.querySelector(".fiveday")
            fiveDay.innerHTML = "<h4>Five Day Forecast: </h4>"
            var createForecastRow = document.createElement("div")

            for (var i = 0; i < weather.list.length; i++) {

                if (weather.list[i].dt_txt.indexOf("09:00:00") !== -1) {
                    var colEl = document.createElement('div');
                    colEl.classList.add('col-md-2');
                    var cardEl = document.createElement('div');
                    cardEl.classList.add('card', 'bg-primary', 'text-white');
                    var windEl = document.createElement('p');
                    windEl.classList.add('card-text');
                    windEl.textContent = `Wind Speed: ${weather.list[i].wind.speed} MPH`;
                    var humidityEl = document.createElement('p');
                    humidityEl.classList.add('card-text');
                    humidityEl.textContent = `Humidity : ${weather.list[i].main.humidity} %`;
                    var bodyEl = document.createElement('div');
                    bodyEl.classList.add('card-body', 'p-2');
                    var titleEl = document.createElement('h5');
                    titleEl.classList.add('card-title');
                    titleEl.textContent = new Date(
                        weather.list[i].dt_txt
                    ).toLocaleDateString();
                    var imgEl = document.createElement('img');
                    imgEl.setAttribute(
                        'src',
                        `http://openweathermap.org/img/w/${weather.list[i].weather[0].icon}.png`
                    );
                    var p1El = document.createElement('p');
                    p1El.classList.add('card-text');
                    p1El.textContent = `Temp: ${weather.list[i].main.temp_max} °F`;
                    var p2El = document.createElement('p');
                    p2El.classList.add('card-text');
                    p2El.textContent = `Humidity: ${weather.list[i].main.humidity}%`;
                    // Merge together and put on page
                    colEl.appendChild(cardEl);
                    bodyEl.appendChild(titleEl);
                    bodyEl.appendChild(imgEl);
                    bodyEl.appendChild(windEl);
                    bodyEl.appendChild(humidityEl);
                    bodyEl.appendChild(p1El);
                    bodyEl.appendChild(p2El);
                    cardEl.appendChild(bodyEl);
                    fiveDay.appendChild(colEl);
                }

            }

        })
    }











