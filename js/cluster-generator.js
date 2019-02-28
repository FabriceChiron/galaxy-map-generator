class StellarSystem {
  constructor(obj, container, path) {
    this.obj = obj;
    this.path = path;
    this.container = document.querySelector(container);
    this.stellarSystemEl = document.createElement('a');
    this.top = (obj.top) ? obj.top : (Math.random() * 60) + 20;
    this.left = (obj.left) ? obj.left : (Math.random() * 60) + 20;
    this.href = `#${path}/${spaceToDash(obj.name).toLowerCase()}`;
  }

  createStellarSystemInCluster() {

    setAttributes(this.stellarSystemEl, {
      class: `cluster cc ${(this.obj.bodies.length > 0) ? '' : 'inactive'}`,
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