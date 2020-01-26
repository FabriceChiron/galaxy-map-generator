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

  activeAstralBody.querySelector('.hover-area').href = stripHref(activeAstralBody.querySelector('.hover-area'));

  // stripHref(activeAstralBody.querySelector('.astralBody').href);

  [...activeAstralBody.querySelectorAll('.orbit')].map(innerAstralBody =>{
    // innerAstralIndex = innerAstralBody.dataset.index;
    // innerAstralBody.style += `--thisActiveFactor: ${(1 + (innerAstralIndex * 0.25))};`;
  });

  toggleClass(stellarSystem, 'hovered');

  // setTimeout(function() {
    activeAstralBody.querySelector('.position').className += ' c';
    stellarSystem.appendChild(activeAstralBody);
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