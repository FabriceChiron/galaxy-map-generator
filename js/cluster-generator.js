class StellarSystem {
  constructor(obj, container, path) {
    this.obj = obj;
    this.path = path;
    this.container = document.querySelector(container);
    this.stellarSystemEl = document.createElement('a');
    this.top = (obj.top) ? obj.top : (Math.floor(Math.random() * 60)) + 20;
    this.left = (obj.left) ? obj.left : (Math.floor(Math.random() * 60)) + 20;
    this.href = `#${path}/${spaceToDash(obj.name).toLowerCase()}`;
  }

  createStellarSystemInCluster() {

    setAttributes(this.stellarSystemEl, {
      class: `cluster cc ${(this.obj.bodies && this.obj.bodies.length > 0) ? '' : 'inactive'}`,
      id: `${spaceToDash(this.obj.name).toLowerCase()}`,
      href: `#${this.path}/${spaceToDash(this.obj.name).toLowerCase()}`,
      style: `
        opacity: 1;
        --top: ${this.top}%;
        --left: ${this.left}%;
      `, 
    });

    this.stellarSystemEl.innerHTML += `
      <div class="shape"></div>
      <div class="center"></div>
      <div class="name">
        ${this.obj.name}
      </div>
    `;

    if(this.obj.bodies && this.obj.bodies.length > 0 || (this.obj.asteroids && this.obj.asteroids.length > 0)) {
      let planets = 0;
      let constructs = 0;
      this.obj.bodies.map(item => {
        if(item.notSphere) {
          constructs++;
        } else {
          planets++;
        }
      })

      this.stellarSystemEl.querySelector('.name').innerHTML += `
      <ul class='details'>
        ${(planets > 0) ? '<li>Planets: <b>'+planets+'</b></li>':''}
        ${(constructs > 0) ? '<li>Constructs: <b>'+constructs+'</b></li>':''}
        ${(this.obj.asteroids && this.obj.asteroids.length > 0) ? '<li>Asteroid Fields: <b>'+this.obj.asteroids.length+'</b></li>':''}
      </ul>
      `
    }

    var self = this;

    this.stellarSystemEl.onclick = function(e) {
      const targetCoords = {
        top: e.target.closest('.cluster').offsetTop,
        left: e.target.closest('.cluster').offsetLeft,
      };

      // createStellarSystem(self.obj, targetCoords, self.href);
    }

    return this.stellarSystemEl;
  }

  render() {
    this.container.querySelector('.content').appendChild(this.createStellarSystemInCluster());
  }
}