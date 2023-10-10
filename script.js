let main = document.querySelector("main");
let sectioninput = document.createElement("section");
sectioninput.className = "input";
main.appendChild(sectioninput);

let abbrevcountinput = document.createElement("input");
abbrevcountinput.type = "text";
abbrevcountinput.id = "abbrevcountinput";
abbrevcountinput.placeholder = "Enter abbreviation country";
sectioninput.appendChild(abbrevcountinput);

let cityinput = document.createElement("input");
cityinput.type = "text";
cityinput.id = "cityinput";
cityinput.placeholder = "Enter city";
sectioninput.appendChild(cityinput);

let longitudeinput = document.createElement("input");
longitudeinput.type = "text";
longitudeinput.id = "longitudeinput";
longitudeinput.placeholder = "Enter longitude";
sectioninput.appendChild(longitudeinput);

let latitudeinput = document.createElement("input");
latitudeinput.type = "text";
latitudeinput.id = "latitudeinput";
latitudeinput.placeholder = "Enter latitude";
sectioninput.appendChild(latitudeinput);

let btn1 = document.createElement("button");
btn1.textContent = "Push me!";
sectioninput.appendChild(btn1);

btn1.addEventListener("click", function () {
  const enteredabbrevcount = abbrevcountinput.value;
  const enteredcity = cityinput.value;
  const enteredlongitude = longitudeinput.value;
  const enteredlatitude = latitudeinput.value;

  const fetchforecast = () =>
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${enteredcity},${enteredabbrevcount}&dt=${enteredcity}&lat=${enteredlatitude}&lon=${enteredlongitude}&units=metric&lang=fr&APPID=46181bfe81ea32a25340c82f0d82c3df`
    );
  // const fetchforecast = () => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${enteredcity},${enteredabbrevcount}&lat=${enteredlatitude}&lon=${enteredlongitude}&units=metric&lang=fr&APPID=46181bfe81ea32a25340c82f0d82c3df`);
  // const fetchforecast = () => fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${enteredcity},${enteredabbrevcount}&lat=${enteredlatitude}&lon=${enteredlongitude}&units=metric&lang=fr&APPID=${API key}`);
  fetchforecast()
    .then((response) => response.json())
    .then((location) => {
      console.log(location);
    //   console.log(location.list[0].dt);
    //   console.log(location.list[0].dt_txt);

 ///////// intergrer pour les 5 dates suivantes/////////////////

      let dateinput = location.list[0].dt;
      let date = new Date(dateinput * 1000);

      console.log(date)
        
      let format = {
        weekday: "short",
        year: "2-digit",
        month: "2-digit",
        day:"2-digit"  /*, hour: '2-digit', minute: '2-digit', second: '2-digit'*/
      };
      
      let dateoutput = date.toLocaleDateString("fr-FR", format);
    

      const btn2 = document.createElement("button");
      btn2.textContent = "Push me again!";

      btn2.addEventListener("click", function () {
        const futurday = [];
        for (let i = 1; i < 6; i++) {
          let nextday = Date.now(dateoutput) / 1000 + 86400 * i;
          let nextdayformat =new Date(nextday * 1000);
          let nextdayformatoutput = nextdayformat.toLocaleDateString("fr-FR", format);
          futurday.push(nextdayformatoutput);
        //   console.log(nextday)
        }

        futurday.forEach(function (element) {
          console.log(`${element}`);
          let divfuturdate = document.createElement("div");
          divfuturdate.className = "divfuturdate";
          divfuturdate.textContent = `${element}`;
          sectionforecast.appendChild(divfuturdate);
        });
      }); 
///////////////////////////////////////////////////////////////////////
      //     fetchfuturdate = () => fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${enteredcity},${enteredabbrevcount}&lat=${enteredlatitude}&lon=${enteredlongitude}&dt=${element}&units=metric&lang=fr&APPID=46181bfe81ea32a25340c82f0d82c3df`);
      // // const fetchName = () => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${enteredcity},${enteredabbrevcount}&lat=${enteredlatitude}&lon=${enteredlongitude}&units=metric&lang=fr&APPID=${API key}`);
      // fetchfuturdate()
      //     .then((response) => response.json())
      //     .then((futurdate) => {
      //         console.log(futurdate);
      //         console.log();

///////////////////////////////////////////////////////////////////////

      let sectionforecast = document.createElement("section");
      let cityoutput = document.createElement("ul");
      let datenow = document.createElement("li");
      let latitudeoutput = document.createElement("li");
      let longitudeoutput = document.createElement("li");
      let temp = document.createElement("li");
      let temp_min = document.createElement("li");
      let temp_max = document.createElement("li");
      let humidity = document.createElement("li");
      let description = document.createElement("li");

      cityoutput.textContent = location.city.name + "," + location.city.country;
      datenow.textContent = dateoutput;
      latitudeoutput.textContent = "Lat: " + location.city.coord.lat + "°";
      longitudeoutput.textContent = "Long: " + location.city.coord.lon + "°";
      temp.textContent = "Temp: " + parseInt(location.list[0].main.temp) + "°C";
      temp_min.textContent ="Temp min: " + parseInt(location.list[0].main.temp_min) + "°C";
      temp_max.textContent ="Temp max: " + parseInt(location.list[0].main.temp_min) + "°C";
      humidity.textContent ="Humidity: " + parseInt(location.list[0].main.humidity) + "%";
      description.textContent ="Description: " + location.list[0].weather[0].description;


///////////////////////////////////////////////////////////////////////
      // console.log(sectionforecast);
      // console.log(cityoutput);
      // console.log(datenow);
      // console.log(latitudeoutput);
      // console.log(longitudeoutput);
      // console.log(temp);
      // console.log(temp_min);
      // console.log(temp_max);
      // console.log(humidity);
      // console.log(description)
///////////////////////////////////////////////////////////////////////


      // while (sectionforecast.firstChild) {
      //     sectionforecast.removeChild(sectionforecast.firstChild);
      // }

      main.appendChild(sectionforecast);
      sectionforecast;

      sectionforecast.appendChild(cityoutput);
      sectionforecast.appendChild(datenow);
      sectionforecast.appendChild(latitudeoutput);
      sectionforecast.appendChild(longitudeoutput);
      sectionforecast.appendChild(temp);
      sectionforecast.appendChild(temp_min);
      sectionforecast.appendChild(temp_max);
      sectionforecast.appendChild(humidity);
      sectionforecast.appendChild(description);
      sectionforecast.appendChild(btn2);
    });
  // .catch((error) => {
  //     console.error('Erreur lors de la requête GET :', error);
  // });
});
// });
