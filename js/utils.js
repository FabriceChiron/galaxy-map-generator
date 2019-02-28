const setAttributes = (el, attrs) => {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

const toClassObject = (str) => (
  strClassObj = str.replace(/\b\w/g, l => l.toUpperCase())
)

const spaceToUnderscore = (str) => (
  strToFix = str.replace(/ /g, "_")
)

const spaceToDash = (str) => (
  strToFix = str.replace(/ /g, "-").replace("'", "-")
)

const noDash = (str) => (
  strToFix = str.replace('-', '')
)

const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

const toggleClass = (el, classToToggle, action) => {
  if(el.classList.contains(classToToggle) || action === "remove") {
    // console.log('if', {el: el, action: action});
    el.className = el.className.replace(` ${classToToggle}`,'');
  } else if (action === "add") {
    // console.log('else if', {el: el, action: action});
    el.className += ` ${classToToggle}`;
  } else {
    // console.log('else', {el: el, action: action});
    el.className += ` ${classToToggle}`;
  }
}


const stripHref = (el) => {
  hash = el.href.split('#')[1];
  hashArr = el.hash.split('/');

  if(el.classList.contains('satellite')){
    hashArr.pop();
    hashArr.pop();
  } else {
    hashArr.pop();
  }

  const strippedHash = hashArr.join('/');

  return strippedHash;
}

const createElem = (el, ctnr, attrs, where) => {
  const element = document.createElement(el);
  if(attrs) {
    setAttributes(element, attrs);
  }
  if(where && where === 'prepend') {
    ctnr.prepend(element);
  } else {
    ctnr.append(element);
  }
  return element;
}

const openCluster = (elId, showStarship) => {
  const el = document.getElementById(elId);
  if(!el.classList.contains('active')){
    el.className += ' active';
    if(showStarship === true) document.body.className += ' allows-starship';
    el.href = '#';
    galaxyMapEl.className += ' active';
  }
}

const closeClusterUnless = (clusterToKeepId) => {
  const el = document.querySelector('.cluster.active');
  if(el !== null) {
    if(el.id !== clusterToKeepId) {
      el.className = el.className.replace(' active', '');
      document.body.className = document.body.className.replace(' allows-starship', '');
      el.href = el.dataset.href;
      galaxyMapEl.className = galaxyMapEl.className.replace(' active', '');
    }
    el.querySelector('.container').style.transform = 'scale(1)';
    el.querySelector('.container').style.opacity = null;
  }
}

const removeActiveAstralBodyUnless = (astralBodyToKeepId) => {
  const el = document.querySelector('.orbit.active');
  if(el !== null) {
    if(el.id !== astralBodyToKeepId+'Active') {
      removeElement(el.id);
      document.querySelector('.stellar-system').className = document.querySelector('.stellar-system').className.replace(' hovered', '')
    }
  }

} 

const removeStellarSystemUnless = (systemToKeepId) => {
  const el = document.querySelector('.stellar-system_section');
  if(el !== null && el.id !== `${systemToKeepId}_section`) {
    const activeCluster = document.getElementById(el.id.replace('_section', ''));

    el.style.setProperty('--top', `${activeCluster.offsetTop}px`);
    el.style.setProperty('--left', `${activeCluster.offsetLeft}px`);
    el.style.setProperty('--scale', '0');

    setTimeout(function() {
      removeElement(el.id);
      // document.body.className = document.body.className.replace(' allows-starship', '');
    }, 500);
  }
}

const isInViewport = function (elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};