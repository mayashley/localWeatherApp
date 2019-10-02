window.addEventListener("load", () => {
  let longitude;
  let latitude;

  const temperatureDescription = document.querySelector("tempDescription");

  const temperatureDegree = document.querySelector("tempDegree");

  const locationTimezone = document.querySelector("timeZone");

  const theHumidity = document.querySelector("humid");

  const theWind = document.querySelector("wind");

  // let temperatureCel = document.querySelector('.temperatureC');
  // const temperatureSpan = document.querySelector('.temperatureC span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";

      const api = `${proxy}https://api.darksky.net/forecast/459e02b87004823a6ac50ae6977c2616/${latitude},${longitude}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {
            temperature,
            summary,
            windSpeed,
            humidity,
            icon
          } = data.currently;
          // set the DOM elements from the API
          tempDegree.textContent = temperature;
          tempDescription.textContent = summary;
          humid.textContent = humidity;
          wind.textContent = windSpeed;
          timeZone.textContent = data.timezone;

          // let celsius = (temperature - 32) * (5 / 9);

          // set icon
          setIcons(icon, document.querySelector(".icons"));

          // celsius temp change
          // temperatureCel.addEventListener('click', () =>{
          // if(temperatureSpan.textContent === "°F"){
          //     temperatureSpan.textContent = "°C";

          //     degreesSection.textContent =Math.floor(celsius);

          // } else {
          //     temperatureSpan.textContent = "°F";
          // }

          // })
        });
    });
  } else {
    h1.textContent = " Yo youre not working";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});


// there is an error in your code somewhere in this js, fix it tomorrow......thank you simon for walking on my keyboard,this cat is why i cant have nice things...!!!!