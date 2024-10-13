let apiKey = '94b1826d21f6b300daf3cf7c89e3f1f4'


async function getWeather(city){
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 
 try{
   let response = await fetch(apiUrl);
   if (!response.ok){
     throw new Error('city not found')
   }
    let data = await response.json()
    displayWeather(data)
    console.log(data)
 } catch (error){
   document.getElementById('weatherOutput').innerHTML =  error.message
 }
}

function displayWeather(data){
  let {name,main,weather} = data
  let output = document.getElementById('weatherOutput').innerHTML= `
          <h2>Weather in ${name}</h2>
          <p>Temperature: ${main.temp} °C</p>
          <p>Weather: ${weather[0].description}</p>
          
      `;
      let description = data.weather[0].main.toLowerCase()
     let icon = document.createElement('div')
     icon.id = 'icon'
    document.getElementById('weatherOutput').append(icon)
      
     /* switch (description){
        case'clouds':
          icon.innerHTML = '☁️'
          break;
          case'clear':
            icon.innerHTML ='☀️'
          case 'snow':
            icon.innerHTML = '❄️'
            break;
            case 'rain':
              icon.innerHTML = '🌧'
              break;
              case 'thunderstorm':
                icon.innerHTML = '⛈️'
                break;
                default :
                icon.innerHTML = ''
                break;
                
                
      }*/
      switch (true) {
  case description.includes('cloud'):
    icon.innerHTML = '☁️';
    break;
  case description.includes('clear'):
    icon.innerHTML = '☀️';
    break;
  case description.includes('snow'):
    icon.innerHTML = '❄️';
    break;
  case description.includes('rain'):
    icon.innerHTML = '🌧️';
    break;
  case description.includes('thunderstorm'):
    icon.innerHTML = '⛈️';
    break;
  default:
    icon.innerHTML = '';
}
}
        



document.getElementById('getWeatherBtn').addEventListener('click', () => {
  let city = document.getElementById('cityInput').value 
  
  if (city){
    getWeather(city)
  }else {
    document.getElementById('weatherOutput').innerText = 'Please enter a city'
  }
})