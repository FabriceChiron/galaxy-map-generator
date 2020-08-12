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
      href: `#${spaceToDash(this.obj.name).toLowerCase()}`
    })

    this.galaxyEl.innerHTML += ` 
      <div class="galaxy-map">
        <div class="map-container">
          <div class="holder-image" style="background-image:url('img/galaxy-map/${spaceToDash(this.obj.name).toLowerCase()}.webp')"></div>
          <div class="clusters"></div>
        </div>
      </div>
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