
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
      nav.querySelector(`#${item}-link`).classList.add('highlight');
      if(nav.querySelector(`#input-${item}`)) { 
        nav.querySelector(`#input-${item}`).checked = true; 
      }
    }
  });
}

const decomposeHash = (sPath) => {
  const aPath = sPath.split('/');

  highlightNav(aPath);

  if(aPath[0] === '') {
    closeClusterUnless();
    removeStellarSystemUnless();
    removeActiveAstralBodyUnless();

    // Activate global view
    setAttributes(document.querySelector('#galaxies'), {
      class: 'active',
    });

    [...document.querySelectorAll('#galaxies .galaxy')].map(item => {
      setAttributes(item, {
        class: 'galaxy',
      });
    });

  } else {
    setAttributes(document.querySelector('#galaxies'), {
      class: '',
    });

    [...document.querySelectorAll('#galaxies .galaxy')].map(item => {
      setAttributes(item, {
        class: `galaxy ${(item.id === aPath[0]) ? 'active' : ''}`,
      });
    });
    
    if(aPath.length > 1) {
      // Clusters
      if(aPath[1] === ''){
        closeClusterUnless();
        removeStellarSystemUnless();
        removeActiveAstralBodyUnless();
      } else {  
        closeClusterUnless(aPath[1]);
        openCluster(aPath[1], showStarShip);
        
        // Stellar systems


        if(aPath.length > 2) {
          removeStellarSystemUnless(aPath[2]);
          
          activeCluster = document.getElementById(aPath[2])
          activeClusterCenter = activeCluster.querySelector('.center');

          if(document.getElementById(`${aPath[2]}_section`) === null) {
            createStellarSystem(
              window[`${noDash(toClassObject(camelize(aPath[2].replace("'",'-'))))}`].obj, 
              {
                top: activeClusterCenter.offsetTop,
                left: activeClusterCenter.offsetLeft,
              }, 
              activeCluster.href,
            );
          } else {
            removeActiveAstralBodyUnless();
          }

          // const myBlock = document.querySelector('body');
          if(!isMobile) {initDrag();}
      
          if(aPath.length > 3) {
            const astralBodyTarget = document.querySelector(`.orbit[id^=${aPath[aPath.length - 1]}]`);

            if(document.querySelector('.orbit.active') !== null) {
              removeElement(document.querySelector('.orbit.active').id);
            } 
            
            createActiveAstralBody(
              astralBodyTarget.querySelector('.astralBody'),
              document.getElementById(`${aPath[2]}_div`)
            )
            
            document.querySelector('.stellar-system').style = "";

            if(aPath.length > 4) {
            }
          }
        } else {
          removeStellarSystemUnless();
        }      
        // }, 100);  
      }
    } else {
      closeClusterUnless();
      removeStellarSystemUnless();
      removeActiveAstralBodyUnless();
    }
  }


}

function hashHandler() {
  // console.log('e', e);
  currentHash = window.location.hash.split('?')[0].substring(1);
  // console.log("currentHash", currentHash);
  decomposeHash(currentHash);
}

// window.addEventListener('hashchange', hashHandler, false);
window.onhashchange = function() {
  hashHandler();
}