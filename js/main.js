

var lats = [];
var atts = [];
var countries = [];
document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById('locationDropdown');
   fetch('city_coordinates.csv')
    .then(response => response.text())
    .then(data => {
      // Parse CSV data
      const rows = data.split('\n');
      const options = [];
      for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(',');
        const lat = columns[0].trim();
        const att = columns[1].trim();
        const city = columns[2]?.trim();
        const country = columns[3]?.trim();
        const option = `${city}, ${country}`;
        lats.push(lat);
        atts.push(att);
        countries.push(`${city}, ${country}`);
        values = dropdown.value;
        // Avoid duplicate options
        if (!options.includes(option)) {
          options.push(option);
          var newOption = document.createElement('option');
          newOption.value = option;
          newOption.text = option;
          dropdown.add(newOption);
        }
        loaders.style.display='none';
      }
    })
    .catch(error => console.error('Error fetching CSV file:', error));
});

const classForTimes = document.getElementById('classForTimes');
const myDropdown = document.getElementById("locationDropdown");
const loaders = document.getElementById('loaders');
const nodata = document.getElementById('nodata');

myDropdown.addEventListener("change", async (event) =>  {
  const selectedValue = event.target.value; 
  if(selectedValue==='empty') {
    loaders.style.display='none';
    classForTimes.innerHTML ='';
    nodata.style.display ='block';
  }
  else {
  var lat = lats[countries.indexOf(selectedValue)];
  var  att = atts[countries.indexOf(selectedValue)];
  classForTimes.innerHTML = '';
  loaders.style.display='flex';
  nodata.style.display ='none';
 await fetch(`http://www.7timer.info/bin/api.pl?lon=${att}&lat=${lat}&product=civillight&output=json`).
  then(response =>response.json()).then(data => {
    var temp  = data.dataseries;
    temp.forEach(element => {
      loaders.style.display='none';
      var cardtemplate = document.createElement('div');
      cardtemplate.classList.add('eachCards');
      var cards = document.createElement('p');
      var cardsdate = document.createElement('p');
      var cardsImg = document.createElement('img');
      cardsImg.src = `/images/${element.weather}.png`
      var  date = element.date;
      date = date.toString();
      console.log(typeof date);
     cardsdate.innerHTML = date.slice(6,9)+ '-'+date.slice(4,6) + '-'+ date.slice(0,4);
      console.log(element.weather);
      cards.innerHTML = element.weather;
      cardtemplate.appendChild(cardsdate);
      cardtemplate.appendChild(cardsImg);
      cardtemplate.appendChild(cards);
      classForTimes.appendChild(cardtemplate);
    });
  }).catch(error => console.error("error occured", error));
}
});
 