const stellarSystem = document.querySelector("#solar-system");

const updateInputDisplay = (inputEl, val) => {
  inputEl.nextElementSibling.innerHTML = val;
}

const sizeButton = document.getElementById('toggle-sizes');
const shipButton = document.getElementById('toggle-starship');

const changeInput = (type, val) => {

  let result = "";

  let dataSet = document.body.dataset;
  
  switch(type) {
    case "angle":
      
      const angle = (val * 0.9 - 90) * -1;
      const decalY = val * -0.5;

      showVal = `${val}°`;

      updateInputDisplay(document.getElementById(`change-${type}`), showVal);

      result = `--angle:${angle}deg; --decalY: ${decalY}%;`;

      dataSet.angle = result;
    break;

    case "perspective":
      
      // const perspective = val;

      if(val > 1000) val = "none";

      updateInputDisplay(document.getElementById(`change-${type}`), val);

      result = `--perspective:${val}em;`;

      dataSet.perspective = result;
    break;

    case "orbit":

      if(!val) val = 3;

      const orbit = val * 5;

      showVal = `${orbit}rem`;

      updateInputDisplay(document.getElementById(`change-${type}`), showVal);

      result = `--earthOrbit:${showVal};`;

      dataSet.orbit = result;
    break;

    case "planet":

      if(!val) val = 1;

      showVal = `${val}rem`;

      updateInputDisplay(document.getElementById(`change-${type}`), showVal);

      result = `--earthSize:${showVal};`;

      dataSet.planet = result;
    break;

    case "year":

      if(!val) val = 1;

      showVal = `${val}s`;

      updateInputDisplay(document.getElementById(`change-${type}`), showVal);

      result = `--earthYear:${showVal};`;

      dataSet.year = result;
    break;

    case "day":

      if(!val) val = 1;

      showVal = `${val}s`;

      updateInputDisplay(document.getElementById(`change-${type}`), showVal);

      result = `--earthDay:${showVal};`;

      dataSet.day = result;
    break;

    case "ship":
      
      updateInputDisplay(document.getElementById(`change-${type}`), val);

      result = `--shipLength:${val}rem;`;

      dataSet.ship = result;
    break;

  }

  // stellarSystem.style= `${dataSet.angle} ${dataSet.orbit} ${dataSet.planet} ${dataSet.year} ${dataSet.day} `;

  document.body.style= `${dataSet.angle} ${dataSet.perspective} ${dataSet.orbit} ${dataSet.planet} ${dataSet.year} ${dataSet.day} ${dataSet.ship} `;

  // calculateMaxDiagonal('.orbit', '.stellar-system');
}

const initValues = () => {
  if(realSizes === true)  {
    document.getElementById('change-planet').value = document.getElementById('change-planet').min;
  }
  changeInput("angle", document.getElementById('change-angle').value);
  changeInput("perspective", document.getElementById('change-perspective').value);
  changeInput("orbit", document.getElementById('change-orbit').value);
  changeInput("planet", document.getElementById('change-planet').value);
  changeInput("year", document.getElementById('change-year').value);
  changeInput("day", document.getElementById('change-day').value);
  changeInput("ship", document.getElementById('change-ship').value);
}; 

const toggleInput = (type, el) => {
  changeInput(type, (el.checked) ? 90 : 22);
}

const toggleSizeClass = (realSizes) => {
  if(realSizes === true) {
    sizeButton.className += ' active';
  } else {
    sizeButton.className = sizeButton.className.replace('active', '');
  }
}

const toggleStarShipClass = (showStarShip) => {
  if(showStarShip === true) {
    shipButton.className += ' active';
  } else {
    shipButton.className = shipButton.className.replace('active', '');
  }
}

const toggleSizes = () => {
  if(realSizes === true) {
    urlParams.set('realSizes', "false");
  } else {
    urlParams.set('realSizes', "true");
  }

  toggleSizeClass(realSizes);

  window.location.search = urlParams.toString();
  // .set('id', '101');
}

const toggleStarShip = () => {
  console.log(showStarShip);

  if(showStarShip === true) {
    urlParams.set('showStarShip', "false");
  } else {
    urlParams.set('showStarShip', "true");
  }

  toggleStarShipClass(showStarShip);

  window.location.search = urlParams.toString();
  // .set('id', '101');
}

toggleSizeClass(realSizes);
toggleStarShipClass(showStarShip);

initValues();