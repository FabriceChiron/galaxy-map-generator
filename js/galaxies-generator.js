class Galaxy {
  constructor(obj, container) {
    this.obj = obj,
    this.container = document.querySelector(container),
    this.galaxyEl = document.createElement('a');
  }

  createGalaxy() {
    setAttributes(this.galaxyEl, {
      class: "galaxy",
      id: `${spaceToDash(this.obj.name).toLowerCase()}`,
      href: `#${spaceToDash(this.obj.name).toLowerCase()}`,
    });

    this.galaxyEl.innerHTML += ` 
      <div class="galaxy-map">
        <div class="map-container" style="
        --galacticAngleX: ${this.obj.animation.x}deg;
        --galacticAngleY: ${this.obj.animation.y}deg;
        ">
          <div class="galactic-axis">
            <div class="galactic-spin" style="
            --galacticStartAngleZ: 0deg;
            --galacticEndAngleZ: 360deg;
            --galacticSpinDuration: ${this.obj.animation.duration};
            ">
              <div class="holder-image" style="background-image:url('img/galaxy-map/${spaceToDash(this.obj.name).toLowerCase()}-blur.${imgFormat}')"></div>
              <div class="clusters"></div>
            </div>
          </div>
        </div>  
      </div>
      <h2>${this.obj.name}</h2>
    `

    var self = this;

    return self.galaxyEl;
  }

  render() {
    this.container.appendChild(this.createGalaxy());
  }
}

// <section id="galaxy">
//     <div class="map-container">
//       <div id="galaxy-map">
//         <div id="holder-image"></div>
//         <div id="clusters"></div>
//       </div>
//     </div>
//   </section>