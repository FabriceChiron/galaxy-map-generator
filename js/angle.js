const stellarSystem = document.querySelector("#solar-system");

const updateInputDisplay = (inputEl, val) => {
  inputEl.nextElementSibling.innerHTML = val;
}

const changeInput = (type, val) => {

  let result = "";
  let dataSet = stellarSystem.dataset;
  switch(type) {
    case "angle":
      updateInputDisplay(document.getElementById(`change-${type}`), val);
      
      const angle = (val * 0.9 - 90) * -1;
      const decalY = val * -0.5;

      result = `--angle:${angle}deg; --decalY: ${decalY}%;`;

      dataSet.angle = result;
    break;

    case "orbit":

      if(!val) val = 3;

      const orbit = val * 5;
      updateInputDisplay(document.getElementById(`change-${type}`), orbit);

      result = `--earthOrbit:${orbit}rem;`;

      dataSet.orbit = result;
    break;

    case "planet":

      if(!val) val = 1;

      updateInputDisplay(document.getElementById(`change-${type}`), val);

      result = `--earthSize:${val}rem;`;

      dataSet.planet = result;
    break;

    case "speed":

      if(!val) val = 1;

      updateInputDisplay(document.getElementById(`change-${type}`), val);

      result = `--earthYear:${val}s;`;

      dataSet.speed = result;
    break;
  }


  stellarSystem.style= `${dataSet.angle} ${dataSet.orbit} ${dataSet.planet} ${dataSet.speed} ` ;
}

// const initValues = () => {
//   changeInput("angle", 22);
//   changeInput("orbit", 3);
//   changeInput("planet", 1);
//   changeInput("speed", 30);
// }; 

// const toggleInput = (type, el) => {
//   changeInput(type, (el.checked) ? 90 : 22);
// }

// initValues();