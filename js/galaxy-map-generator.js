const galaxyMapEl = document.getElementById('galaxy-map');

class Cluster {
  constructor(obj, container, path) {
    this.obj = obj;
    this.path = path;
    this.name = obj.name;
    this.top = obj.top;
    this.left = obj.left;
    this.container = document.querySelector(container);
    this.clusterEl = document.createElement('a');
    this.id = spaceToDash(obj.name).toLowerCase();
    this.innerContainer = '<div class="rotate-content"><div class="content"></div></div>';
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
      class: `cluster cc ${(this.obj.bodies && this.obj.bodies.length > 0) ? '' : 'inactive'}`,
      id: `${spaceToDash(this.obj.name).toLowerCase()}`,
      href: `#${this.path}/${spaceToDash(this.obj.name).toLowerCase()}`,
      style: `
        --top: ${this.obj.top}%;
        --left: ${this.obj.left}%;
      `,
    });

    this.clusterEl.dataset.href = this.clusterEl.getAttribute('href');

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

    if(this.obj.bodies && this.obj.bodies.length > 0) {
      this.clusterEl.querySelector('.name').innerHTML += `
      <ul class='details'>
        <li>${this.obj.bodies.length} stellar system(s)</li>
      </ul>
      `
    }

    // if(this.obj.details) {
    //   const inputDetails = document.createElement('input');

    //   setAttributes(inputDetails, {
    //     type: "checkbox",
    //     id: `${spaceToDash(this.obj.name).toLowerCase()}__details" class="hidden-input"/>`,
    //     class: 'hidden-input'
    //   });

    //   this.clusterEl.prepend(inputDetails);

    //   this.clusterEl.querySelector('.name').innerHTML += `
    //   <span class="cluster-infos">
    //     <label for="${spaceToDash(this.obj.name).toLowerCase()}-details" class="toggle-details">i</label>
    //     <div class="cluster-details">
    //       ${this.obj.details}
    //     </div>
    //   </span>
    //   `
    // }

    if(this.image) {
      setAttributes(this.clusterEl.querySelector('.container'), {
        style: `
          background: url('img/galaxy-map/clusters/${this.image}.${imgFormat}') center no-repeat;
          background-size: contain;`,
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