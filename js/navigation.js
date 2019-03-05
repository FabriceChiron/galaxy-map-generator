
const highlightNav = (aPath) => {
  const nav = document.getElementById('navigation');
  // console.log(aPath);

  [...nav.querySelector('ul').querySelectorAll('input')].map(input => {
    input.checked = false;
  });

  [...nav.querySelectorAll('.highlight')].map(item => {
    item.className = item.className.replace('highlight', '');
  });

  aPath.map((item, index) => {
    if(aPath[0].length > 0) {
      nav.querySelector(`#${item}-link`).className += 'highlight';
      if(nav.querySelector(`#input-${item}`)) { 
        nav.querySelector(`#input-${item}`).checked = true; 
      }
    }
  });
}

const decomposeHash = (sPath) => {
  const aPath = sPath.split('/');

  highlightNav(aPath);

  if(aPath[0] === ''){
    closeClusterUnless();
    removeStellarSystemUnless();
    removeActiveAstralBodyUnless();
  } else {
    closeClusterUnless(aPath[0]);
    openCluster(aPath[0], showStarShip);
    
    // setTimeout(function() {
    if(aPath.length > 1) {
      removeStellarSystemUnless(aPath[1]);
      
      activeCluster = document.getElementById(aPath[1])
      activeClusterCenter = activeCluster.querySelector('.center');

      if(document.getElementById(`${aPath[1]}_section`) === null) {
        createStellarSystem(
          window[`${toClassObject(noDash(camelize(aPath[1])))}`].obj, 
          {
            top: activeClusterCenter.offsetTop,
            left: activeClusterCenter.offsetLeft,
          }, 
          activeCluster.href,
        );
      } else {
        removeActiveAstralBodyUnless();
      }
  
      if(aPath.length > 2) {
        const astralBodyTarget = document.querySelector(`.orbit[id^=${aPath[aPath.length - 1]}]`);

        if(document.querySelector('.orbit.active') !== null) {
          removeElement(document.querySelector('.orbit.active').id);
        } 
        
        createActiveAstralBody(
          astralBodyTarget.querySelector('.astralBody'),
          document.getElementById(`${aPath[1]}_div`)
        )
        
        document.querySelector('.stellar-system').style = "";

        if(aPath.length > 3) {
        }
      }
    } else {
      removeStellarSystemUnless();
    }      
    // }, 100);

    
  }
}

function hashHandler() {
  // console.log('e', e);
  const currentHash = window.location.hash.split('?')[0].substring(1);
  decomposeHash(currentHash);
}

// window.addEventListener('hashchange', hashHandler, false);
window.onhashchange = function() {
  hashHandler();
}