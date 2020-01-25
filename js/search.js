
const search = (src, srcRes) => {

  const menuElems = [...document.querySelectorAll("#navigation ul a")];
  const searchRes = document.querySelector(srcRes);

  const emptySearchRes = () => {
  searchRes.innerHTML = "";
}

  if(src.length >= 3) {
    searchRes.innerHTML = "";

    menuElems.map(menuElem => {
      if(menuElem.textContent.includes(src)) {
        console.log(menuElem);
        menuElemClone = menuElem.cloneNode(true);
        menuElemClone.id += '_search';
        searchRes.appendChild(menuElemClone);
      }
    })

  } else {
    searchRes.innerHTML = "";
  }

}


/*for (const a of document.querySelectorAll("#navigation a")) {
  if (a.textContent.includes("ea")) {
    console.log(a);    
//a.click()
  }
}*/