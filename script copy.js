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
longitudeinput.type = "number";
longitudeinput.id = "longitudeinput";
longitudeinput.placeholder = "Enter longitude";
sectioninput.appendChild(longitudeinput);

let latitudeinput = document.createElement("input");
latitudeinput.type = "*number";
latitudeinput.id = "latitudeinput";
latitudeinput.placeholder = "Enter latitude";
sectioninput.appendChild(latitudeinput);

let btn1 = document.createElement("button");
btn1.className = "btn1";
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
  // const fetchforecast = () => fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${enteredcity},${enteredabbrevcount}&lat=${enteredlatitude}&lon=${enteredlongitude}&units=metric&lang=fr&APPID=${API key}`);
  fetchforecast()
    .then((response) => response.json())
    .then((location) => {

//////////////////////////// intergrer date/////////////////

      let dateinput = location.list[0].dt;
      let date = new Date(dateinput * 1000);

      let format = {
        weekday: "short",
        year: "2-digit",
        month: "2-digit",
        day:
          "2-digit" /*, hour: '2-digit', minute: '2-digit', second: '2-digit'*/
      };

      let dateoutput = date.toLocaleDateString("fr-FR", format);

      const btn2 = document.createElement("button");
      btn2.className = "btn2";
      btn2.textContent = "Push me again!";

      btn2.addEventListener("click", function () {
        const diplayfururdays = document.createElement("div");
        diplayfururdays.className = "diplayfururdays";

//////////////////////////// intergrer pour les 5 dates suivantes/////////////////

      const numb5dates = [];

                let divinterg5dates = document.createElement('div');
        divinterg5dates.className = 'divinterg5dates';

      for (let a = 0; a <= 32; a += 8) {
        numb5dates.push(a);
      }

      console.log(numb5dates);

      numb5dates.forEach((element) => {

        let div5dates = document.createElement("div");
        div5dates.className = "div5dates";

        
        let div5datesdate = document.createElement("ul");
        let div5datestemp = document.createElement("li");
        let div5datesdescription = document.createElement("li");

        let div5datesdatetime = document.createElement('span');
        div5datesdatetime.textContent = location.list[element].dt;

        let div5datesdatetimeconv = new Date(div5datesdatetime.textContent * 1000);

        let format = {
          weekday: "short",
          // year: "2-digit",
          // month: "2-digit",
          day: "2-digit",
          // hour: "2-digit",
          // minute: "2-digit",
          // second: '2-digit',
        };

        let div5datesdateformat = div5datesdatetimeconv.toLocaleDateString("fr-FR",format);

        div5datesdate.textContent = div5datesdateformat;        
        div5datestemp.textContent = "Temp: " + parseInt(location.list[element].main.temp) + "°C";
        div5datesdescription.textContent = location.list[element].weather[0].description;      
        
        sectionforecast.appendChild(divinterg5dates);
        divinterg5dates.appendChild(div5dates);      
         
        div5dates.appendChild(div5datesdate);
        div5dates.appendChild(div5datestemp);
        div5dates.appendChild(div5datesdescription);
      });
    
        /////////////////////////  CHART  //////////////////////////////////////////////

        /////////////////////////  Array  //////////////////////////////////////////////

        const axedegre = [];
        const axetime = [];
        const numblist = [];


        for (let a = 0; a < 40; a++) {
          let numb = a - 1 + 1;
          let listinput = `${numb}`;
          numblist.push(listinput);
        }

        numblist.forEach((listinput) => {
          let tempchart = document.createElement("span");
          tempchart.textContent = parseInt(location.list[`${listinput}`].main.temp);

          axedegre.push(tempchart.textContent);

          let timechart = document.createElement("span");
          timechart.textContent = location.list[`${listinput}`].dt;

          let timechartconv = new Date(timechart.textContent * 1000);

          let format = {
            weekday: "short",
            // year: "2-digit",
            // month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
            // second: '2-digit',
          };

          let timechartformat = timechartconv.toLocaleDateString("fr-FR",format);

          axetime.push(timechartformat);
        });

        /////////////////////////  CHART integration  //////////////////////////////////////////////

        const newCanvas = document.createElement("canvas");
        newCanvas.id = "myChart";
        newCanvas.width = 800;

        const divContainer = document.createElement("div");
        divContainer.style.width = "800px";

        divContainer.appendChild(newCanvas);
        sectionchart.appendChild(divContainer);


        new Chart("myChart", {
          type: "line",
          data: {
            labels: axetime,
            datasets: [
              {
                label: location.city.name,
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0, 0, 255, 1.0)",
                borderColor: "rgba(0, 0, 255, 0.1)",
                data: axedegre
              }
            ]
          },
          options: {
            legend: { display: false },
            scales: {
              y: {
                beginAtZero: false,
                suggestedMin: -30, 
                suggestedMax: 50 
              }
            }
          }
        });
      });

      let footer = document.querySelector('footer');
      let sectionforecast = document.createElement("section");
      sectionforecast.className = "sectioncity";
      let sectionchart = document.createElement("section");
      sectionchart.className = "sectionchart";
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
      temp_max.textContent ="Temp max: " + parseInt(location.list[0].main.temp_max) + "°C";
      humidity.textContent ="Humidity: " + parseInt(location.list[0].main.humidity) + "%";
      description.textContent ="Description: " + location.list[0].weather[0].description;

      ///////////////////////////////////////////////////////////////////////
      // while (sectionforecast.firstChild) {
      //     sectionforecast.removeChild(sectionforecast.firstChild);
      // }
      ///////////////////////////////////////////////////////////////////////


      

      main.appendChild(sectionforecast);      
      footer.appendChild(sectionchart);
      

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
    ///////////////////////////////////////////////////////////////////////
  // .catch((error) => {
  //     console.error('Erreur lors de la requête GET :', error);
  // });
  ///////////////////////////////////////////////////////////////////////
});



