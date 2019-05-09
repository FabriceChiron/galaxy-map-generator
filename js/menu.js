const closeChildren = function(input) {
    [...input.parentElement.querySelectorAll(`ul input`)].map(input => {
      input.checked = false;
    });
}

const toggleNavLayer = function(input) {
  [...document.querySelectorAll(`[name="${input.name}"]:not(#${input.id})`)].map(input => {
    input.checked = false;
    closeChildren(input);
  });

  if(!input.checked){
    closeChildren(input);
  }
}

const generateMenu = (galaxyMap) => {
  const nav = document.createElement('nav');
  nav.id += 'navigation';


  let mapInput = createElem('input', nav, {
    name: 'toggle-map',
    id: 'toggle-map',
    type: 'checkbox',
    class: 'hidden-input',
    onchange: 'toggleNavLayer(this)',
  });

  let navDiv = createElem('div', nav);
  let mapLink = createElem('a', navDiv);
  mapLink.href = '#';
  mapLink.innerHTML += 'Map';

  let mapLabel = createElem('label', navDiv, {
    for: 'toggle-map',
  });


  let clustersUl = createElem('ul', nav);

  galaxyMap.clusters.map(cluster => {
    let clusterItem = createElem('li', clustersUl);
    let clusterDiv = createElem('div', clusterItem);
    let clusterLink = createElem('a', clusterDiv);
    clusterLink.href = `#${spaceToDash(cluster.name).toLowerCase()}`;
    clusterLink.id = `${spaceToDash(cluster.name).toLowerCase()}-link`;
    clusterLink.innerHTML += noFirstUnderscore(cluster.name);

    if(cluster.bodies && cluster.bodies.length > 0) {
      let clusterLabel = createElem('label', clusterDiv, {
        for: `input-${spaceToDash(cluster.name).toLowerCase()}`,
      });
      let clusterInput = createElem('input', clusterItem, {
        id: `input-${spaceToDash(cluster.name).toLowerCase()}`,
        type: 'checkbox',
        name: 'toggle-cluster',
        class: 'hidden-input',
        onchange: 'toggleNavLayer(this)',
      }, 'prepend');
      let systemsUl = createElem('ul', clusterItem);

      cluster.bodies.map(system => {
        let systemItem = createElem('li', systemsUl);
        let systemDiv = createElem('div', systemItem);
        let systemLink = createElem('a', systemDiv);
        systemLink.href = clusterLink.href + `/${spaceToDash(system.name).toLowerCase()}`;
        systemLink.id = `${spaceToDash(system.name).toLowerCase()}-link`;
        systemLink.innerHTML += noFirstUnderscore(system.name);

        if(system.bodies && system.bodies.length > 0) {
          let systemLabel = createElem('label', systemDiv, {
            for: `input-${spaceToDash(system.name).toLowerCase()}`,
          });
          let systemInput = createElem('input', systemItem, {
            id: `input-${spaceToDash(system.name).toLowerCase()}`,
            type: 'checkbox',
            // name: `toggle-system-${spaceToDash(cluster.name).toLowerCase()}`,
            name: `toggle-system`,
            class: 'hidden-input',
            onchange: 'toggleNavLayer(this)',
          }, 'prepend');
          let planetsUl = createElem('ul', systemItem);
          
          system.bodies.map(planet => {
            let planetItem = createElem('li', planetsUl);
            let planetDiv = createElem('div', planetItem);
            let planetLink = createElem('a', planetDiv);
            planetLink.href = systemLink.href + `/${spaceToDash(planet.name).toLowerCase()}`;
            planetLink.id = `${spaceToDash(planet.name).toLowerCase()}-link`;
            planetLink.innerHTML += noFirstUnderscore(planet.name);

            if(planet.bodies && planet.bodies.length > 0) {
              let planetLabel = createElem('label', planetDiv, {
                for: `input-${spaceToDash(planet.name).toLowerCase()}`,
              });
              let planetInput = createElem('input', planetItem, {
                id: `input-${spaceToDash(planet.name).toLowerCase()}`,
                type: 'checkbox',
                // name: `toggle-planet-${spaceToDash(system.name).toLowerCase()}`,
                name: `toggle-planet`,
                class: 'hidden-input',
                onchange: 'toggleNavLayer(this)',
              }, 'prepend');
              let satellitesUl = createElem('ul', planetItem);
              
              planet.bodies.map(satellite => {
                let satelliteItem = createElem('li', satellitesUl);
                let satelliteDiv = createElem('div', satelliteItem);
                let satelliteLink = createElem('a', satelliteDiv);
                satelliteLink.href = planetLink.href + `/${spaceToDash(satellite.name).toLowerCase()}`;
                satelliteLink.id = `${spaceToDash(satellite.name).toLowerCase()}-link`;
                satelliteLink.innerHTML += noFirstUnderscore(satellite.name);
              })
            } else {
              // planetLink.className += 'empty';
            }

          });
        } else {
          systemLink.className += 'empty';
        }
      });
    } else {
      clusterLink.className += 'empty';
    }
  });

  document.body.prepend(nav);
  hashHandler();

  [...nav.querySelectorAll('ul a')].map(link => {
    const thisHref = link.href.split('#')[1];
    
    link.onmouseenter = function() {
      const matchingCluster = document.querySelector(`a.cluster[href="#${thisHref}"], a.astralBody[href="#${thisHref}"]`);
      if(matchingCluster) matchingCluster.className += ' hovered';
    };

    link.onmouseleave = function() {
      const matchingCluster = document.querySelector(`a.cluster[href="#${thisHref}"], a.astralBody[href="#${thisHref}"]`);
      if(matchingCluster) matchingCluster.className = matchingCluster.className.replace(' hovered', '');
    };
  })
}