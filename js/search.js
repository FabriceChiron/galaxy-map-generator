const emptySearch = () => {
  console.log('emptySearch');
  document.querySelector('#search-input').value = '';
}

const emptySearchRes = () => {
  document.querySelector('#search-results').innerHTML = '';
}

const search = (src) => {

  const menuElems = [...document.querySelectorAll("#navigation ul a")];
  const searchRes = document.querySelector('#search-results');

  if(src.length >= 3) {
    emptySearchRes();

    menuElems.map(menuElem => {
      if(menuElem.textContent.includes(src)) {
        console.log(menuElem);
        menuElemClone = menuElem.cloneNode(true);
        menuElemClone.id += '_search';
        searchRes.appendChild(menuElemClone);

        menuElemClone.setAttribute('onclick', 'emptySearchRes()');
      }
    })

  } else {
    emptySearchRes();
  }

}


/*for (const a of document.querySelectorAll("#navigation a")) {
  if (a.textContent.includes("ea")) {
    console.log(a);    
//a.click()
  }
}*/