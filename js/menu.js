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

const homeAdress = "/local-cluster/solar-system/earth".split('/');

const highlightMatchingLink = (link) => {
  const thisHref = link.href.split('#')[1];
  
  link.onmouseenter = function() {
    const matchingLink = document.querySelector(`a.cluster[data-href="#${thisHref}"], a.cluster .cluster[href="#${thisHref}"], a.hover-area[href="#${thisHref}"]`);
    if(matchingLink) matchingLink.classList.add('hovered');
  };

  link.onmouseleave = function() {
    const matchingLink = document.querySelector(`a.cluster[data-href="#${thisHref}"], a.cluster .cluster[href="#${thisHref}"], a.hover-area[href="#${thisHref}"]`);
    if(matchingLink) matchingLink.classList.remove('hovered');
  };
}

const ui = document.querySelector('#ui');

const generateMenu = (galaxyMaps) => {
  const nav = document.createElement('nav');
  nav.id += 'navigation';

  const navContent = createElem('div', nav, {
    class: 'nav-container'
  });

  let nbGalaxies = 0;
  let nbClusters = 0;
  let nbSystems = 0;
  let nbPlanets = 0;
  let nbSatellites = 0;

  let mapInput = createElem('input', navContent, {
    name: 'toggle-map',
    id: 'toggle-map',
    type: 'checkbox',
    class: 'hidden-input',
    onchange: 'toggleNavLayer(this)',
  });

  let navDiv = createElem('div', navContent);
  let mapLink = createElem('a', navDiv);
  mapLink.href = '#';
  mapLink.innerHTML += 'Galaxies';

  let mapLabel = createElem('label', navDiv, {
    for: 'toggle-map',
  });

  let searchLabel = createElem('label', navDiv, {
    for: 'toggle-search',
  });

  let searchDiv = createElem('div', navContent, {
    class: "search",
  });

  let galaxiesUl = createElem('ul', navContent);

  let toggleSearch = createElem('input', searchDiv, {
    id: 'toggle-search',
    class: 'hidden-input',
    type: 'checkbox',
    // onchange: "focusMethod('#search-input')"
  });

  let searchInput = createElem('input', searchDiv, {
    type: "text",
    id: "search-input",
    name: "search-input",
    oninput: "search(this.value)",
  });

  let searchRes = createElem('div', searchDiv, {
    id: "search-results",
    class: "search-results"
  });

  galaxyMaps.galaxies.map(galaxy => {
    let galaxyItem = createElem('li', galaxiesUl); 
    let galaxyDiv = createElem('div', galaxyItem);
    let galaxyLink = createElem('a', galaxyDiv);
    galaxyLink.href = `#${spaceToDash(galaxy.name).toLowerCase()}`;
    galaxyLink.id = `${spaceToDash(galaxy.name).toLowerCase()}-link`;
    galaxyLink.innerHTML += noFirstUnderscore(galaxy.name.toLowerCase());

    nbGalaxies++;

    if(galaxy.clusters && galaxy.clusters.length > 0) {
      let galaxyLabel = createElem('label', galaxyDiv, {
        for: `input-${spaceToDash(galaxy.name).toLowerCase()}`,
      });
      let galaxyInput = createElem('input', galaxyItem, {
        id: `input-${spaceToDash(galaxy.name).toLowerCase()}`,
        type: 'checkbox',
        name: 'toggle-galaxy',
        class: 'hidden-input',
        onchange: 'toggleNavLayer(this)',
      }, 'prepend');
      let clustersUl = createElem('ul', galaxyItem);

      galaxy.clusters.map(cluster => {
        let clusterItem = createElem('li', clustersUl);
        let clusterDiv = createElem('div', clusterItem);
        let clusterLink = createElem('a', clusterDiv);
        clusterLink.href = galaxyLink.href + `/${spaceToDash(cluster.name).toLowerCase()}`;
        clusterLink.id = `${spaceToDash(cluster.name).toLowerCase()}-link`;
        clusterLink.innerHTML += noFirstUnderscore(cluster.name.toLowerCase());

        if(clusterLink.href.includes(homeAdress[1]) ){
          clusterLink.innerHTML += ` <span class="symbols home">u</span>`;
        }

        nbClusters++;

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
            systemLink.innerHTML += noFirstUnderscore(system.name.toLowerCase());


            if(systemLink.href.includes(homeAdress[2]) ){
              systemLink.innerHTML += ` <span class="symbols home">u</span>`;
            }

            nbSystems++;

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

                if(planet.rings && planet.rings !== false) {
                  setAttributes(planetLink, {
                    class: 'has-rings'
                  });
                }

                planetLink.href = systemLink.href + `/${spaceToDash(planet.name).toLowerCase()}`;
                planetLink.id = `${spaceToDash(planet.name).toLowerCase()}-link`;
                planetLink.innerHTML += noFirstUnderscore(planet.name.toLowerCase());


                if(planetLink.href.includes(homeAdress[3]) ){
                  planetLink.innerHTML += ` <span class="symbols home">u</span>`;
                }

                nbPlanets++;

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
                    satelliteLink.innerHTML += noFirstUnderscore(satellite.name.toLowerCase());

                    nbSatellites++;
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
      })

    }


  });

  console.log(
    `Galaxies: ${nbGalaxies}\n`,
    `Clusters: ${nbClusters}\n`,
    `Systems: ${nbSystems}\n`,
    `Planets: ${nbPlanets}\n`,
    `Satellites: ${nbSatellites}`
  );

  // galaxyMap;


  ui.prepend(nav);
  hashHandler();

  // console.log(search(document.querySelector("#search-input").value));

  // window.addEventListener('input', document.querySelector("#search-input"), search(document.querySelector("#search-input").value));



  [...nav.querySelectorAll('ul a, #search-results a')].map(link => {

    highlightMatchingLink(link);

  });

}
