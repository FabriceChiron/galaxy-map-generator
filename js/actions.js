const btnFullScreen = document.getElementById('toggle-fullscreen');

btnFullScreen.onclick = () => {
  document.documentElement.requestFullscreen();
}

removeElement = (id, elToToggle) => {
  if(elToToggle) {toggleClass(elToToggle, 'hovered');}
  const bodyToRemove = document.getElementById(id);
  bodyToRemove.parentNode.removeChild(bodyToRemove);
}

const createActiveAstralBody = (astralBody, stellarSystem) => {

  if(!stellarSystem) {
    stellarSystem = astralBody.closest('.stellar-system');
  }

  let astralBodyToActivate = astralBody.closest('.orbit');
    // history.pushState(astralBodyToActivate.id, astralBodyToActivate.id, astralBodyToActivate.id);
  let activeAstralBody = astralBodyToActivate.cloneNode(true);
  
  // activeAstralBody.style = '';
  activeAstralBody.id += 'Active';
  activeAstralBody.className += ' active';

  activeAstralBody.style.setProperty('--thisSize', `1`);
  activeAstralBody.style.setProperty('--sizeFactor', `1`);
  activeAstralBody.style.setProperty('--orbit-tilt', `0deg`);

  activeAstralBody.querySelector('.hover-area').href = stripHref(activeAstralBody.querySelector('.hover-area'));

  if(activeAstralBody.querySelector('.drop-shadow') !== null) {
    activeAstralBody.querySelector('.drop-shadow').remove();
  }

  if(activeAstralBody.querySelector('.tilt-mask') !== null) {
    activeAstralBody.querySelector('.tilt-mask').className += ' has-no-mask';
  }

  [...activeAstralBody.querySelectorAll('.satellite-holder .orbit')].map((satellite, index) => {
    if(parseFloat(satellite.style.getPropertyValue('--orbitFactor')) > 1) {
      satellite.style.setProperty('--orbitFactor', `${(index / 3) + 1}`);
    }
  })
  
  if(activeAstralBody.querySelector('.astralBody-holder') !== null) {
    [...activeAstralBody.querySelectorAll('.astralBody-holder')].map(item => {
      item.classList.remove('hidden');
      item.querySelector('.astralBody').classList.add('adjust-margin');
    });
  }
  
  // stripHref(activeAstralBody.querySelector('.astralBody').href);

  [...activeAstralBody.querySelectorAll('.orbit')].map(innerAstralBody =>{
    // innerAstralIndex = innerAstralBody.dataset.index;
    // innerAstralBody.style += `--thisActiveFactor: ${(1 + (innerAstralIndex * 0.25))};`;
  });

  toggleClass(stellarSystem, 'hovered');

  // setTimeout(function() {
    activeAstralBody.querySelector('.position').className += ' c';
    // stellarSystem.appendChild(activeAstralBody);
    stellarSystem.insertBefore(activeAstralBody,stellarSystem.firstChild);
  // }, 100);

  // activeAstralBody.onclick = function(e) {
  //   removeElement(`${astralBodyToActivate.id}Active`, stellarSystem);
  //   if(!e.target.closest('.orbit').classList.contains('active')) {
  //     createActiveAstralBody(e.target.closest('.astralBody'));
  //   }
  // }
}

// const astralBodies = [...document.querySelectorAll('.astralBody')];

// astralBodies.map(astralBody => {

//   astralBody.onclick = function() {
    
//     createActiveAstralBody(astralBody);
    

//     // stellarSystem.appendChild(activeAstralBody);
//   };
// });