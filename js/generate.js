fetch('data/galaxy-maps.json')
.then(res => res.json())
.then(galaxyMaps => {
  galaxyMaps.galaxies.map(
    galaxy => {
      const GalaxyName =  toClassObject(camelize(galaxy.name));
      console.log("GalaxyName", GalaxyName);

      window[GalaxyName] = new Galaxy(galaxy, '#galaxies');
      window[GalaxyName].render();

      if(galaxy.clusters && galaxy.clusters.length > 0) {
        galaxy.clusters.map(
          cluster => {
            const ClusterName = toClassObject(camelize(cluster.name));
            window[ClusterName] = new Cluster(cluster, `#${spaceToDash(galaxy.name).toLowerCase()} .clusters`, `${spaceToDash(galaxy.name).toLowerCase()}`);
            window[ClusterName].render();

            if(cluster.bodies && cluster.bodies.length > 0) {
              cluster.bodies.map(stellarSystem => {
                const StellarSystemName = toClassObject(noDash(camelize(stellarSystem.name)));
                window[StellarSystemName] = new StellarSystem(stellarSystem, `#${spaceToDash(cluster.name).toLowerCase()}`, `${spaceToDash(cluster.name).toLowerCase()}`);
                window[StellarSystemName].render();
              })
            }
          }
        )
      }
    }
  )
  // galaxyMap.clusters.map(
  //   cluster => {
  //     const ClusterName = toClassObject(camelize(cluster.name));
  //     window[ClusterName] = new Cluster(cluster, '#clusters');
  //     window[ClusterName].render();

  //     if(cluster.bodies && cluster.bodies.length > 0) {
  //       cluster.bodies.map(stellarSystem => {
  //         const StellarSystemName = toClassObject(noDash(camelize(stellarSystem.name)));
  //         window[StellarSystemName] = new StellarSystem(stellarSystem, `#${spaceToDash(cluster.name).toLowerCase()}`, `${spaceToDash(cluster.name).toLowerCase()}`);
  //         window[StellarSystemName].render();
  //       })
  //     }
  //   }
  // )

  // generateMenu(galaxyMaps);

  if(allowDrag === true) {
    const myBlock = document.querySelector('body');
    initDrag(myBlock);
    }
  }
)



const calculateMaxDiagonal = (selector, containers) => {

  for (const container of document.querySelectorAll(containers)) {
    const bodies = container.querySelectorAll(selector);
    const arrayDiagonals = [];

    for (const body of bodies) {
      const squareWidth = Math.pow(Math.ceil(body.getBoundingClientRect().width), 2);
      const squareHeight = Math.pow(Math.ceil(body.getBoundingClientRect().height), 2);
      const squareDiagonal = squareWidth + squareHeight;
      arrayDiagonals.push(Math.sqrt(squareDiagonal));
    }

    const maxSize = Math.ceil(Math.max(...arrayDiagonals));

    console.log('maxSize', maxSize);

/*    container.style.width = `${maxSize}px`;
    container.style.height = `${maxSize}px`;*/
    container.parentElement.style.overflow = 'auto';

    container.style.setProperty('--maxSize', `${maxSize}px`);

    console.log('container.parentElement', container.parentElement);
    // // container.parentElement.className += ` allowScroll`;
    // container.parentElement.style.width = `${maxSize}px`;
    // container.parentElement.style.height = `${maxSize}px`;
    // container.parentElement.style.top = `${(maxSize - window.innerHeight) /2}px`;
    // container.parentElement.style.left = `${(maxSize - window.innerWidth) /2}px`;


    container.parentElement.scroll({
      top: (maxSize - window.innerHeight) /2,
      left: (maxSize - window.innerWidth) /2,
      behavior: 'smooth'
    });
  };
}

// calculateMaxDiagonal('.orbit', '.stellar-system');