let first = true;

dimRet = (val, scale) => {
    if(val < 0)
        return -diminishing_returns(-val, scale);
    var mult = val / scale;
    var trinum = (Math.sqrt(4.0 * mult + 1.0) - 1.0) / 2.0;
    if(realSizes && realSizes === "true") {
      return val;
    } else {
      return trinum * scale;
    }
}

class Asteroids {
  constructor(obj, targetElement, parentName) {
    this.obj = obj;
    this.orbitSize = (obj.orbit) ? dimRet(obj.orbit, 3) : 1;
    this.orbitFactor = (obj.orbitFactor) ? obj.orbitFactor : 1;
    this.yearLength = (obj.year) ? obj.year : 1;
    this.bodySize = (obj.size) ? obj.size : 1;
    this.itemCount = (obj.bodies) ? obj.bodies : 100;
    this.targetElement = (targetElement) ? document.querySelector(targetElement) : null;
    this.starSize = (obj.starSize) ? obj.starSize : 0;
    this.variance = (obj.variance) ? obj.variance : 100;
  }

  appendAsteroid() {
    for (var i = 0; i < this.itemCount; i++) {
      const asteroidSize = (Math.floor(Math.random() * 5)) + 1;
      
      this.astralOrbit.querySelector('.anti-axis').innerHTML += `
        <div class="asteroid-holder position" style="
          transform: translate3d(${((Math.random() * this.variance) - 50) / 2}px, ${((Math.random() * this.variance) - 50) / 2}px, ${(Math.random() * 10) - 5}px ) rotateZ(${i*(360/this.itemCount)}deg);
          ">
          <div class="asteroid-wrapper astralBody-holder" style="width: ${asteroidSize}px; height: ${asteroidSize}px;">
            <div class="counter-orbit" style="transform: rotateZ(${i*(360/this.itemCount)* -1}deg);">
              <div class="asteroid"></div>
            </div>
          </div>
        </div>
      `;
    }
  }

  createBody() {
    const astralOrbit = document.createElement('div');
    
    this.astralOrbit = astralOrbit;
    var itemCount = this.itemCount;

    setAttributes(this.astralOrbit, {
      class: `cc orbit asteroids`,
      style: `
        --thisOrbit: ${this.orbitSize};
        --thisStarSize: ${this.starSize};
        --orbitFactor: ${this.orbitFactor};
        --thisSize: ${this.bodySize};
        --thisYear: ${this.yearLength};
         `,
    });

    this.astralOrbit.innerHTML = '<div class="anti-axis"></div>';

    this.appendAsteroid();

    return this.astralOrbit;    
  }

  render() {
    this.targetElement.appendChild(this.createBody());
  }

}

class AstralBody {

  constructor(obj, targetElement, parentName, bodyType, index, path, override) {
    this.obj = obj;
    this.name = noFirstUnderscore(obj.name);
    this.path = `#${path.split('#')[1]}`;
    this.overrideStyle = (obj.style) ? obj.style : ''; 
    this.parentName = parentName;
    this.realOrbit = obj.orbit;
    this.orbitSize = (obj.orbit) ? dimRet(obj.orbit, 3) : 1;
    this.orbitTilt = (obj.orbitTilt) ? obj.orbitTilt : 0;
    this.tilt = (obj.tilt) ? obj.tilt : 0;
    this.orbitFactor = (obj.orbitFactor) ? obj.orbitFactor : 1;
    this.bodySize = (obj.size) 
      ? (
          (realSizes === "false" && bodyType.includes('star') && !bodyType.includes('black-hole')) 
          ? (
              (bodyType.includes('companion')) 
                ? 2
                : 3
            ) 
          : eval(obj.size)
        ) 
      : (bodyType.includes('star')) 
        ? (
            (realSizes === "true") 
            ? 75 
            : (
                (bodyType.includes('companion')) 
                  ? 2
                  : 3
              )
          ) 
        : 1;
    this.bodies = (obj.bodies) ? obj.bodies.length : 0;
    this.realYear = obj.year;
    this.yearLength = (obj.year) ? Math.round((eval(obj.year)) * 1000) / 1000 : 1;
    this.dayLength = (obj.day) ? ( (obj.day === "tidal") ? obj.day : eval(obj.day) ) : 0;
    this.dayDirection = (obj.rotationDirection) ? obj.rotationDirection : "normal";
    this.coords = (override && override.coords) ? override.coords : ((obj.coords) ? obj.coords : (bodyType.includes("star")) ? ((obj.coords) ? obj.coords : 'c') : 'nw');
    this.details = obj.details;
    this.rings = (obj.rings) ? obj.rings : null;
    this.ringsColor = (obj.ringsColor) ? obj.ringsColor : null;
    this.ringsDetails = (obj.ringsDetails) ? obj.ringsDetails : null;
    this.clouds = (obj.clouds) ? obj.clouds : null;
    this.cloudsFilter = (obj.cloudsFilter) ?obj.cloudsFilter : null;
    this.texture = (obj.texture) ? "-texture" : '';
    this.hide = (obj.hide) ? obj.hide : false;
    this.notSphere = (obj.notSphere) ? obj.notSphere : false;
    this.hideCoords = (obj.hideCoords) ? obj.hideCoords : false;
    this.filter = (obj.filter) ? obj.filter : 'none';
    this.overlay = (obj.overlay) ? obj.overlay : 'none';
    this.bgColor = (obj.color) ? obj.color : null;
    this.image = (obj.image) ? obj.image : null;
    this.isBlackHole = (bodyType.includes('black-hole')) ? true : false;
    this.bodyType = bodyType;
    this.isSystem = (targetElement) ? false : true;
    this.targetElement = (targetElement) ? document.querySelector(targetElement) : null;
    this.index = index;
    this.override = override;
    this.star = obj.star;
    this.id = (override && override.name) ? override.name : obj.star || obj.name;
    this.starSize = (obj.starSize) ? obj.starSize : 0;
  }

  addDetails() {
    this.astralOrbit.querySelector('.infos').innerHTML+=
      `<div class="details">
        ${(this.hideCoords === false) ? 
          `<ul>
            ${this.realOrbit ? `<li class="info-orbit">Orbit: ${this.realOrbit} AU</li>` : ''}
            ${this.yearLength ? `<li class="info-year">Orbital Period: ${this.yearLength} year(s)</li>` : ''}
            ${
              (this.dayLength && typeof this.dayLength === "number" && this.dayLength !== 0) 
                ? `<li class="info-day">Rotation Period: 
                  ${
                    (this.dayDirection && this.dayDirection === 'reverse') 
                    ? '-'
                    : ''
                  }
                  
                  ${Math.round((this.dayLength + Number.EPSILON) * 100) / 100} day(s)</li>` 
                : '<li class="info-day">Tidally locked</li>'}
          </ul>` : ''
        }
        ${this.details ? `<p class="details-content">${this.details}</p>` : ''}
      </div>`;
  }

  updateAstralBodyDetails(str) {

    data[0].bodies[this.index].details = str;

    const showData = document.createElement('textarea');
    showData.innerHTML = JSON.stringify(data, null, 4);

    document.querySelector('body').appendChild(showData);

    let detailsContent = this.astralOrbit.querySelector('.details-content');
    detailsContent.innerHTML='';
    detailsContent.innerHTML+=str;
  }

  makeBlackHole() {
    // console.log(this.ringsColor);
    this.astralOrbit.querySelector('.astralBody-holder').innerHTML+=
      `<div class="tilt-mask">
        <div class="mask-shadow">
          <div class="rings-holder">
            <div class="cc orbit rings"></div>
          </div>
        </div>
      </div>
      <div class="tilt-mask">
        <div class="mask-shadow">
          <div class="rings-holder">
            <div class="cc orbit rings"></div>
          </div>
        </div>
      </div>
      <div class="tilt-mask">
        <div class="mask-shadow">
          <div class="rings-holder">
            <div class="cc orbit rings"></div>
          </div>
        </div>
      </div>`;

    setAttributes(this.astralOrbit.querySelector('.astralBody-holder'), {
      style: `
      --images: url(../img/rings/black-hole/ripples-3.svg);
      --imagesLightWeight: url(../img/rings/medium-mobile-60.svg),url(../img/rings/thick-mobile-60.svg),url(../img/rings/medium-mobile-80.svg);
      --sizes: 100%,91%,87%,80%; 
      --filter: saturate(0.8) brightness(4.5) hue-rotate(15deg);
      --filter: brightness(1) hue-rotate(-15deg);
      `
    })

  }

  addRings() {
    // console.log(this.ringsColor);
    this.astralOrbit.querySelector('.astralBody-holder').innerHTML+=
      `<div class="tilt-mask ${(this.tilt !== 0) ? 'has-no-mask' : ''}"><div class="mask-shadow"><div class="rings-holder"><div class="cc orbit rings"></div></div></div></div>`;

    if(this.ringsColor) {
      // console.log(this.astralOrbit.querySelector('.orbit.rings'));
      this.astralOrbit.querySelector('.astralBody-holder').style.setProperty('--ringsColor', `${this.ringsColor}`);
    }
  }

  addRingsSet() {
    let ringsImages = [];
    let ringsImagesLightWeight = [];
    let ringsSizes = [];

    if(this.rings.details !== undefined) {
      [...this.rings.details].map(thisRing => {
        ringsImages.push(`url('../img/rings/${thisRing.image}.svg')`);
        ringsImagesLightWeight.push(`url('../img/rings/${thisRing.image.replace('-', '-mobile-')}.svg')`);
        ringsSizes.push(`${thisRing.size}%`);
      });

      this.astralOrbit.querySelector('.cc.orbit.rings').style.setProperty('--images', `${ringsImages.join(',')}`);
      this.astralOrbit.querySelector('.cc.orbit.rings').style.setProperty('--imagesLightWeight', `${ringsImagesLightWeight.join(',')}`);
      this.astralOrbit.querySelector('.cc.orbit.rings').style.setProperty('--sizes', `${ringsSizes.join(',')}`);

    }
    if(this.rings.filter !== undefined) {
      this.astralOrbit.querySelector('.cc.orbit.rings').style.setProperty('--filter', `${this.rings.filter}`);   
    }

  }

  addSatellitesHolder() {
    this.astralOrbit.querySelector('.astralBody-holder').innerHTML+= `
    <div class="mask-shadow satellites" style="--addParentSize: var(--planet-size);">
      <div class="toclip">
        <div class="checkArea"></div>
      </div>
    </div>`;
  }

  addClouds() {
    let cloudsBg;
    if(this.clouds === true) {
      cloudsBg = `background-image: url('img/png-hd/${this.name}-clouds.png');`;
    } else {
      cloudsBg = `background-image: url('img/textures/${this.clouds}');`;
    }

    let cloudsFlt;
    if(this.cloudsFilter && this.cloudsFilter !== null) {
      cloudsFlt = `filter: ${this.cloudsFilter}`;
    } else {
      cloudsFlt = 'filter: none;';
    }

    var clouds = document.createElement('div');
    clouds.style = `${cloudsBg} ${cloudsFlt}`;
    clouds.className += 'cc clouds';
    this.astralBody.prepend(clouds);
  }

  addLight() {
    var light = document.createElement('div');
    let lightEffects = `    
      position: absolute;
      width: 50%;
      height: 50%;
      background: radial-gradient(at center, rgba(255, 255, 255, 0.5) 5%, rgba(255, 255, 255, 0) 70%);
      border-radius: 70% 60% 60%;
      top: 10%;
      left: 10%;
      opacity: 0.6;`;
    light.style = lightEffects;
    light.className += 'light';
    this.astralBody.prepend(light);
  } 

  addShadow() {
    if(!this.bodyType.includes('star')) {
      if(this.bodyType === 'planet') {
        this.astralOrbit.style.setProperty('--planetYear', this.yearLength);
        this.astralOrbit.style.setProperty('--animationName', `shadow`);
        this.astralOrbit.style.setProperty('--animationLiteName', `shadow-old`);
        this.astralOrbit.style.setProperty('--animationName2', `drop-shadow`);
      }
    }
  }

  addBackground() {
    let bg = '';

    if(this.image) {
      if(this.image !== 'png' && this.image !== 'jpg') {
        bg = `background-image: url('img/textures/${this.image}');`; 
      } else {
        let subFolder = (this.bodyType === 'satellite') ? `${this.parentName}/` : '';
        bg = `background-image: url('img/png-hd/${subFolder}${this.name}${this.texture}.${this.image}');`;
      }
      
      if(this.notSphere === false) {
        var mask = document.createElement('div');
        mask.className += 'cc mask'; 
        mask.style.background = this.overlay;
        this.astralBody.prepend(mask);
      }
      if(this.texture){
        this.astralBody.className += ' texture';
      }
    } else {
      bg = `background-color: ${this.bgColor};`;
    }
    if(this.dayDirection){
      bg += ` animation-direction: ${this.dayDirection};`;
    }
    if(this.notSphere) {
      console.log('notSphere!')
      bg += ` border-radius: 0;`
    }
    if(this.filter){
      bg += ` --filter: ${this.filter};`;
    }
    this.astralBody.style = bg;
  }

  checkIntersections() {
    const toClipElem = this.astralOrbit.querySelector('.toclip .checkArea');

    [...this.astralOrbit.querySelectorAll('.satellite-holder')].map(satelliteHolder => {
      if(!satelliteHolder.querySelector('.orbit').classList.contains('has-orbit-tilt')) {

        const rectToCheck = toClipElem.getBoundingClientRect();
        
        const satelliteBody = satelliteHolder.querySelector('.astralBody-holder');
        const rectSatelliteBody = satelliteBody.getBoundingClientRect();

        if(rectSatelliteBody.top + rectSatelliteBody.height > rectToCheck.top
        && rectSatelliteBody.left + rectSatelliteBody.width > rectToCheck.left
        && rectSatelliteBody.bottom - rectSatelliteBody.height < rectToCheck.bottom
        && rectSatelliteBody.right - rectSatelliteBody.width < rectToCheck.right) {
          satelliteBody.classList.add("hidden");
          // console.log('add hidden');
        } else {
          satelliteBody.classList.remove("hidden");
          // console.log('remove hidden');
        }

      }

    })
  }

  createBody() {
    if(realSizes && realSizes === "true") {
      this.sizeFactor = 1;
    } else {
      this.sizeFactor = (this.bodySize > 5) ? .5 : 1;
    }

    const astralOrbit = document.createElement('div');
    
    this.astralOrbit = astralOrbit;
    
    setAttributes(this.astralOrbit, {
      id: `${spaceToDash(this.id).toLowerCase()}`,
      class: `
        cc orbit 
        ${this.bodyType} ${(this.dayLength === 'tidal') ? 'tidal' : ''} ${(this.orbitTilt > 0) ? 'has-orbit-tilt' : ''} ${(this.override) ? 'active' : ''}`,
      'data-index': this.index,
    });


    if(!this.override && !this.isSystem) {
      setAttributes(this.astralOrbit, {
        style: `
        --thisOrbit: ${this.orbitSize};
        --orbit-tilt: ${this.orbitTilt}deg;
        --tilt: ${this.tilt}deg;
        --thisStarSize: ${this.starSize};
        --orbitFactor: ${this.orbitFactor};
        --thisSize: ${this.bodySize}; 
        --sizeFactor: ${this.sizeFactor};
        --thisYear: ${this.yearLength};
        --thisDay: ${(this.dayLength !== 0) ? this.dayLength : 1};
        --thisActiveFactor: 1;
         `,
      });
    }

    if(this.bodyType === 'planet') {
      this.astralOrbit.style.setProperty('--planetFactor', `${this.bodySize}`);
    }

    let tag = 'a'
    if(this.bodyType === 'star') {
      tag = 'div';
    }

    // console.log(`${this.name} is a ${this.bodyType} with ${this.bodies} satellite(s)`);

    this.astralOrbit.innerHTML += 
      `<div class="position ${this.coords}">
          <div class="astralBody-holder">
            <div class="cc astralBody ${this.bodyType} ${(this.hide) ? 'hidden' : ''}">
            ${(!this.bodyType.includes('star')) 
            ? `<${tag} href="${this.path}/${spaceToDash(this.id).toLowerCase()}" class="hover-area"></${tag}>`
            : ''
            }
            </div>
            
          </div>
        </div>
      </div>`;

    this.astralBody = astralOrbit.querySelector('.astralBody');

    if(this.bodyType.includes('star')) {
      this.astralBody.innerHTML += 
      `<div class="holder-infos">
        <div class="infos">
            <div class="name">${this.star || this.name}</div>
        </div>
      </div>`
    } else {
      if((this.bodyType === 'planet' || this.bodyType === 'satellite') && this.name !== '') {
        this.astralBody.innerHTML +=`<div class="holder-infos" ${(this.notSphere === true) ? 'style="left: 100%;"' : ''}>
          <div class="infos">
              <div class="name">${this.star || this.name}</div>
          </div>
        </div>`
      }
    }

    this.addShadow();

    this.addBackground();

    this.astralOrbit.style.setProperty('--tilt', `${(this.tilt) ? this.tilt : '0'}deg)`);
    
    
    if(this.name !== '' && !this.isBlackHole && !this.notSphere){
      this.addLight();
    }

    if(this.clouds) {
      this.addClouds();
    }

    if(this.rings) {
      this.addRings();
      this.addRingsSet();
    }

    if(this.isBlackHole) {
      this.makeBlackHole();
    }

    if(this.bodies > 0 && this.bodyType === 'planet'){
      this.addSatellitesHolder();
    }


    // if(this.details && this.details.length) {
      this.addDetails();
    // }

    if(this.bodyType === 'satellite') {
      const container =  document.createElement('div');
      this.container = container;

      setAttributes(this.container, {
        class: 'satellite-holder',
      });
    }


    this.container && this.container.appendChild(this.astralOrbit);

    // console.log(this.container && this.container);
 
    const self = this;   

    if(this.bodyType.includes('star')) {
      this.targetElement.parentElement.style.setProperty('--addStarSize', `${this.bodySize}`);
      this.targetElement.parentElement.style.setProperty('--addParentSize', `${this.bodySize}`);
    }
    
    // this.targetElement.parentElement.style.setProperty('--thisParentSize', `${this.bodySize}`);

    if(this.bodies > 0 && this.bodyType === 'planet'){
      setInterval(function(){
        self.checkIntersections();      
      }, 100)
    }

    return (this.container || this.astralOrbit);
  }


  render() {
    this.targetElement.appendChild(this.createBody());
  }
}

instantiateAstralBody = (bodyToCreate, containerSelector, parentName, type, name, index, path) => {
  let Name = toClassObject(name).replace(' ', '');

  if(type.includes('star')) {
    Name += 'Star';
  }
  
  window[Name] = new AstralBody(
    bodyToCreate,
    containerSelector,
    parentName,
    type,
    index,
    path,
  );

  window[Name].render();
}


createStellarSystem = (system, targetCoords, path, showStarShip) => {
  if(system.bodies.length > 0) {
    const sectionSystem = document.createElement('section');
    setAttributes(sectionSystem, {
      id: `${spaceToDash(system.name).toLowerCase()}_section`,
      class: `stellar-system_section `,
      style: `
        top: ${targetCoords.top}px; 
        bottom: ${window.innerHeight - targetCoords.top}px; 
        left: ${targetCoords.left}px;
        right: ${window.innerWidth - targetCoords.left}px;
        width: 0;
        height: 0;
        ${(system.image && system.image.length > 0) ? `background-image: ${system.image}; background-repeat: no-repeat;` : '' }`,
        
    });

    if(system.bgImage) {
      // console.log('system.bgImage', system.bgImage);
      sectionSystem.style.background = `url(img/galaxy-map/clusters/${system.bgImage})`;
      sectionSystem.style.backgroundSize = `contain`;
    }

    document.body.className += (showStarShip === 'true') ? ' allows-starship' : '';

    const pathToCluster = (sPath) => {
      aPath = sPath.split('/');
      aPath.pop();
      clusterPath = aPath.join('/');
      return clusterPath;
    }

    const closeSystemLink = document.createElement('a');
    closeSystemLink.className += 'name';
    closeSystemLink.href = pathToCluster(path);
    closeSystemLink.innerHTML += `${system.name}
        <span class="symbols close-cluster">Î</span>`;

    const parentClusterContainer = document.querySelector(`a[href="#${path.split('#')[1]}"]`).parentElement.closest('.cluster').querySelector('.container');

/*    setAttributes(parentClusterContainer, {
      style: `
        transform-origin: ${targetCoords.left}% ${targetCoords.top}% 0;
        transform: scale(10);
        opacity: 0;
      `
    });*/

    parentClusterContainer.style.transformOrigin = `${targetCoords.left}% ${targetCoords.top}% 0`;
    parentClusterContainer.style.transform = `scale(10)`;
    // parentClusterContainer.style.display = `none`;
    // parentClusterContainer.offsetHeight;
    // parentClusterContainer.style.display = ``;
    parentClusterContainer.style.opacity = `0`;

    const divSystem = document.createElement('div');
    
    setAttributes(divSystem, {
      id: `${spaceToDash(system.name).toLowerCase()}_div`,
      class: `stellar-system`, 
    });

    sectionSystem.appendChild(closeSystemLink);
    sectionSystem.appendChild(divSystem);
    document.body.appendChild(sectionSystem);

    // if(allowDrag === true && first === true) {
   const myBlock = document.querySelector('body');

   // initDrag(myBlock);

    //   first = false;
    // }

    instantiateAstralBody(system, `#${divSystem.id}`, `${system.star}`, system.type || "star", system.star, 0, path);
    
    system.bodies.map((item, index) => {
      if(realSizes && realSizes === "true") {
        item.starSize = system.size;
        item.pushSize = document.getElementById(`${divSystem.id}`).querySelector('.orbit.star .astralBody').clientWidth;
      }

      instantiateAstralBody(item, `#${divSystem.id}`, `${system.name}`, item.type || 'planet', item.name, index, path);

      if(item.bodies) {
        item.bodies.map((subItem, index) => {
          instantiateAstralBody(subItem, `#${item.name} .astralBody-holder .satellites`, item.name, "satellite", subItem.name, index, `${path}/${spaceToDash(item.name).toLowerCase()}`);
        });
      }
    });

    if(system.asteroids) {
      
      system.asteroids.map((asteroid, index) => {
        if(realSizes && realSizes === "true") {
          asteroid.starSize = system.size;
          asteroid.pushSize = document.getElementById(`${divSystem.id}`).querySelector('.orbit.star .astralBody').clientWidth;
        }
        const sAsteroidField = `${spaceToDash(system.name).toLowerCase()}_asteroid${index}`;
        window[sAsteroidField] = new Asteroids(asteroid, `#${divSystem.id}`, index);
        window[sAsteroidField].render();
      });
    }


    [...document.querySelectorAll('.astralBody.planet')].map(planet => {
      const parentOrbit = planet.closest('.orbit');
      setInterval(function(){
        if(!isInViewport(planet)) {
          // console.log('!isInViewport', self.name);
          if(!parentOrbit.classList.contains('outside')) {
            parentOrbit.classList.add('outside');
          }
        } else {
          // console.log('isInViewport', self.name);
          parentOrbit.classList.remove('outside');
        }
      }, 2000)
    })

    setTimeout(function() {
      // setAttributes(sectionSystem, {
      //   style: 'top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100vh;'
      // });
      sectionSystem.style.top = '0';
      sectionSystem.style.left = '0';
      sectionSystem.style.right = '0';
      sectionSystem.style.bottom = '0';
      sectionSystem.style.width = '100%';
      sectionSystem.style.height = '100vh';
      if(allowDrag === true) {
        // sectionSystem.style.cursor = "move";
      } else {
        calculateMaxDiagonal('.orbit', '.stellar-system');
      }
    }, 100);

    // const astralBodies = [...divSystem.querySelectorAll('.astralBody')];

    // astralBodies.map(astralBody => {

    //   astralBody.onclick = function() {
    //     createActiveAstralBody(astralBody, divSystem);
    //   };
    // });

  }
  // });
}

// createStellarSystem(test);




