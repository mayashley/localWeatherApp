window.addEventListener("load", () => {
  let longitude;
  let latitude;

  const temperatureDescription = document.querySelector("tempDescription");

  const temperatureDegree = document.querySelector("tempDegree");

  const locationTimezone = document.querySelector("timeZone");

  const theHumidity = document.querySelector("humid");

  const theWind = document.querySelector("wind");

  const thePercipation = document.querySelector("percip");

  let temperatureCel = document.querySelector(".temperatureC");
  const temperatureSpan = document.querySelector(".temperatureC span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";

      const api = `${proxy}https://api.darksky.net/forecast/459e02b87004823a6ac50ae6977c2616/${latitude},${longitude}`;

      fetch(api)
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {
            temperature,
            precipProbability,
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
          precipProbability.textContent = data.precipProbability;

          

          let fahrenheit = temperature;

          let celsius = (temperature - 32) * (5 / 9);
          tempDegree.textContent = Math.floor(fahrenheit);

          setIcons(icon, document.querySelector(".icons"));

          // celsius temp change
          temperatureCel.addEventListener("click", () => {
            console.log("tempSpan", temperatureSpan.textContent);
            if (temperatureSpan.textContent === "°F") {
              temperatureSpan.textContent = "°C";

              tempDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "°F";
              tempDegree.textContent = temperature;
              tempDegree.textContent = Math.floor(fahrenheit);
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
