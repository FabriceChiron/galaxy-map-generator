const stellarSystem = document.querySelector("#solar-system");

const updateInputDisplay = (inputEl, val) => {
  inputEl.nextElementSibling.innerHTML = val;
}

const sizeButton = document.getElementById('toggle-sizes');
const shipButton = document.getElementById('toggle-starship');
const toggleLightWeight = document.querySelector('#toggle-lightweight');

const changeInput = (type, val, toStore) => {

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

    case "axis":
      
      if(!val) val = 0;

      const axisStep = ((val / 45) * 0.125) -1;
      // const axisStep2 = axisStep * -1;

      showVal = `${val}°`;

      updateInputDisplay(document.getElementById(`change-${type}`), showVal);

      result = `--axis:${val}deg; --axisStep: ${axisStep};`;

      dataSet.axis = result;
    break;

    case "perspective":
      
      // const perspective = val;

      if(val > 1000) val = "none";

      updateInputDisplay(document.getElementById(`change-${type}`), val);

      result = `--perspective:${(val !== "none") ? `${val}em`: 'none' };`;

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

  document.body.style= `${dataSet.angle} ${dataSet.axis} ${dataSet.perspective} ${dataSet.orbit} ${dataSet.planet} ${dataSet.year} ${dataSet.day} ${dataSet.ship} `;

  if(toStore) {
    storeSettings();
  }
}

const storeSettings = () => {

  settings = {
    'angle': document.getElementById('change-angle').value,
    'axis': document.getElementById('change-axis').value,
    'perspective': document.getElementById('change-perspective').value,
    'orbit': (realSizes === 'true') ? document.getElementById('change-planet').getAttribute('default') : document.getElementById('change-orbit').value,
    'planet': document.getElementById('change-planet').value,
    'year': document.getElementById('change-year').value,
    'day': document.getElementById('change-day').value,
    'ship': document.getElementById('change-ship').value
  }

  window.localStorage.setItem("settings", JSON.stringify(settings));
}

const initValues = (settings, realSizes) => {
  console.log(settings);


  if(realSizes === "true")  {
    document.getElementById('change-planet').value = document.getElementById('change-planet').min;
    document.getElementById('change-planet').disabled = true;
  } else {
    document.getElementById('change-planet').value = settings && settings.planet || document.getElementById('change-planet').getAttribute('default');
    document.getElementById('change-planet').disabled = false;
  }
  changeInput("angle", 
    settings && settings.angle || document.getElementById('change-angle').value, 
    false
  );

  changeInput("axis", 
    settings && settings.axis || document.getElementById('change-axis').value, 
    false
  );

  changeInput("perspective", 
    settings && settings.perspective || document.getElementById('change-perspective').value, 
    false
  );

  changeInput("orbit", 
    settings && settings.orbit || document.getElementById('change-orbit').value, 
    false
  );

  changeInput("planet", 
    document.getElementById('change-planet').value, 
    false
  );

  changeInput("year", 
    settings && settings.year || document.getElementById('change-year').value, 
    false
  );

  changeInput("day", 
    settings && settings.day || document.getElementById('change-day').value, 
    false
  );

  changeInput("ship", 
    settings && settings.ship || document.getElementById('change-ship').value, 
    false
  );

  if(settings) {
    [...document.querySelectorAll('.settings .setting input')].map(input => {
      const storedSetting = input.id.replace('change-','');

      setAttributes(input, {
        value: settings[storedSetting]
      });
    });
  }

} 

[...document.querySelectorAll('.settings .setting:not(.modes)')].map(setting => {
  setting.label = setting.querySelector('span');
  setting.input = setting.querySelector('input');

  setting.label.onclick = () => {
    setting.input.value = setting.input.getAttribute('default');
    changeInput(setting.input.id.replace('change-', ''), setting.input.value, true);
  }
});

document.querySelector('#reset-settings').onclick = () => {
  [...document.querySelectorAll('.settings .setting > span')].map(setting => {
    setting.click();
  })
}

const destructureObject = (obj) => {
  console.log(obj);
}

const toggleInput = (type, el) => {
  changeInput(type, (el.checked) ? 90 : 22);
}

const toggleSizeClass = () => {
  if(realSizes === "true") {
    sizeButton.className += ' active';
  } else {
    sizeButton.className = sizeButton.className.replace('active', '');
  }
}

const toggleStarShipClass = (showStarShip) => {
  if(showStarShip === "true") {
    shipButton.classList.add('active');
  } else {
    shipButton.classList.remove('active');
  }
}

const storeLightWeightMode = () => {

  console.log(toggleLightWeight.checked);

  const initLightWeightMode = (toggleLightWeight.checked) ? "on" : "off";
  window.localStorage.setItem('lightweightMode', initLightWeightMode);

}

const toggleSizes = () => {
  if(realSizes === "true") {
    // urlParams.set('realSizes', "false");
    window.localStorage.setItem('realSizes', "false");
    realSizes = "false"; 
  } else {
    // urlParams.set('realSizes', "true");
    window.localStorage.setItem('realSizes', "true");
    realSizes = "true"; 
  }

  toggleSizeClass();

  initValues(settings, realSizes);

  if(currentHash.split('/').length >= 3) {
    location.reload();
  }
  
  // window.location.search = urlParams.toString();
  // .set('id', '101');
}

const toggleStarShip = () => {
  console.log()
  if(showStarShip === "true") {
    window.localStorage.setItem('showStarShip', "false");
    showStarShip = "false"; 
  } else {
    window.localStorage.setItem('showStarShip', "true");
    showStarShip = "true"; 
  }

  toggleStarShipClass(showStarShip);

  if(currentHash.split('/').length >= 2) {
    location.reload();
  }
}

toggleSizeClass(realSizes);
toggleStarShipClass(showStarShip);

var lightweightMode = (window.localStorage.getItem('lightweightMode') !== null) 
      ? window.localStorage.getItem('lightweightMode') 
      : "off";

if(lightweightMode === 'on') toggleLightWeight.checked = true;

toggleLightWeight.onchange = () => {
  storeLightWeightMode();
}

// initValues();

