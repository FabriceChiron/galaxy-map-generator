const galaxyMapEl = document.getElementById('galaxy-map');

class Cluster {
  constructor(obj, container) {
    this.name = obj.name;
    this.top = obj.top;
    this.left = obj.left;
    this.container = document.querySelector(container);
    this.clusterEl = document.createElement('a');
    this.id = spaceToDash(obj.name).toLowerCase();
    this.obj = obj;
    this.innerContainer = (obj.bodies.length > 0) ? '<div class="rotate-content"><div class="content"></div></div>' : '';
    this.image = (obj.image) ? obj.image : null;
  }

  toggleCluster(el, action) {
    
    switch(action) {
      case 'open':
        if(!el.classList.contains('active')){
          el.className += ' active';
          galaxyMapEl.className += ' active';
        }
      break;

      case 'close':
        if(el.classList.contains('active')){
          el.className = el.className.replace(' active', '');
          galaxyMapEl.className = galaxyMapEl.className.replace(' active', '');
        }
      break;

      default:
      return;
    }
  }

  createCluster() {
    setAttributes(this.clusterEl, {
      class: `cluster cc ${(this.obj.bodies.length > 0) ? '' : 'inactive'}`,
      id: `${spaceToDash(this.obj.name).toLowerCase()}`,
      href: `#${spaceToDash(this.obj.name).toLowerCase()}`,
      style: `
        --top: ${this.obj.top}%;
        --left: ${this.obj.left}%;
      `,
    });


    this.clusterEl.dataset.href = this.clusterEl.href;

    this.clusterEl.innerHTML += `
      <div class="container">
        ${this.innerContainer}
      </div>
      <div class="shape"></div>
      <div class="center"></div>
      <div class="name">
        ${this.obj.name}
        <span class="symbols close-cluster">Î</span>
      </div>
    `;

    if(this.image) {
      setAttributes(this.clusterEl.querySelector('.container'), {
        style: `
          background: url('img/galaxy-map/clusters/${this.image}') center #000 no-repeat;
          background-size: cover;`,
      });
    }

    var self = this;

    // this.clusterEl.onclick = function(e){
    //   if(!e.target.classList.contains('close-cluster')) {
    //     self.toggleCluster(self.clusterEl, 'open');
    //   }
    // }

    // this.clusterEl.querySelector('.close-cluster').onclick = function(e) {
    //   e.preventDefault();
    //   window.location.hash = '';

    //   self.toggleCluster(self.clusterEl, 'close');

    //   removeElement(document.body.children[document.body.childElementCount-1].id, null);
    // }

    return self.clusterEl;
  }

  render() {
    this.container.appendChild(this.createCluster());
  }
}