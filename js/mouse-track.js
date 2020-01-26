
mousePosition = (e, selector) => {
  let elem = document.querySelector(selector);

  elem.setAttribute('style', `left: ${e.clientX}px; top: ${e.clientY}px;`);

}


function throttle (callback, limit) {

  var wait = false;
  return function () {
    if (!wait) {

      callback.apply(null, arguments);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  }
}


if(showStarShip === true) {
  // document.querySelector('body').className+= ' hideMouse';
  window.addEventListener('mousemove', throttle(function(e){mousePosition(e, '#mouseTracker')}, 10));
}