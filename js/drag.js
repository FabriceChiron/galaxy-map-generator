const dragInfosEl = document.getElementById('dragInfos');

const initDrag = (myBlock) => {
  if(isMobile) {
    const mc = new Hammer(myBlock);
    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0, domEvents: true }) );
    mc.on("pan", handleDrag);
  } else {
    // console.log("let's drag");
    dragElement(document.body.querySelector('.stellar-system'));
  }
}

var lastPosX = 0;
var lastPosY = 0;
var isDragging = false;
function handleDrag(ev) {
    var elem = document.body.querySelector('.stellar-system');

    if(ev.target.closest('#ui') === null) {
      if ( ! isDragging ) {
        isDragging = true;
        lastPosX = elem.offsetLeft;
        lastPosY = elem.offsetTop;
      }
      
      var posX = ev.deltaX + lastPosX;
      var posY = ev.deltaY + lastPosY;
      
      elem.style.left = posX + "px";
      elem.style.top = posY + "px";
      
      if (ev.isFinal) {
        isDragging = false;
      }
    }

}



function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  document.querySelector('.stellar-system_section').onmousedown = dragMouseDown;

  function dragMouseDown(e) {

    e = e || window.event;
    e.preventDefault();


    // get the mouse cursor position at startup:
    // call a function whenever the cursor moves:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
    if(e.target.tagName === 'A') {
      e.target.onclick = function(e) {
        e.preventDefault();
      }

      setTimeout(function() {
        if(!elmnt.classList.contains('dragging')) {
          if(e.button === 0) {
            window.location.hash = e.target.getAttribute('href');
          }
        }
      },100);
    }
  }

  function elementDrag(e) {
    elmnt.classList.add('dragging');
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    let newPos = {};

    newPos.top = elmnt.offsetTop - pos2;
    newPos.left = elmnt.offsetLeft - pos1;


    elmnt.style.top = newPos.top + "px";
    elmnt.style.left = newPos.left + "px";

  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.classList.remove('dragging');
  }
}

