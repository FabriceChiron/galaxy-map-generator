const dragInfosEl = document.getElementById('dragInfos');

const initDrag = (myBlock) => {
  const mc = new Hammer(myBlock);
  mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0, domEvents: true }) );
  mc.on("pan", handleDrag);
}


if(allowDrag === true) {

  var lastPosX = 0;
  var lastPosY = 0;
  var isDragging = false;
  function handleDrag(ev) {
    // dragInfosEl.innerHTML = 'handleDrag';
    // if(currentHash.split('/').length >= 3){
    if(ev.target.closest('.astralBody') === null && ev.target.querySelector('.stellar-system') !== null){

      console.log(ev);

      var elem = ev.target.querySelector('.stellar-system');
      if ( ! isDragging ) {
        isDragging = true;
        lastPosX = elem.offsetLeft;
        lastPosY = elem.offsetTop;

        // dragInfos.innerHTML = isDragging;
      }
      
      var posX = ev.deltaX + lastPosX;
      var posY = ev.deltaY + lastPosY;
      
      elem.style.left = posX + "px";
      elem.style.top = posY + "px";

      // document.querySelector('#dragInfos').innerHTML = `posX: ${posX}px <br>posY: ${posY}px`;
      
      if (ev.isFinal) {
        isDragging = false;
        // dragInfos.innerHTML = isDragging;
      }

      console.log('isDragging', isDragging);
    }
  }
}

