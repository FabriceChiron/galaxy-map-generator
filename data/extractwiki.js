function getPlanetData () {
  var planetData = {
    "name": "",
    "image": "",
    "filter": "",
    "overlay": "",
    "clouds": "",
    "cloudsFilter": "",
    "rings": false,
    "ringsColor": "",
    "texture": true,
    "orbit": "",
    "year": "1",
    "size": "6378/6378",
    "day": "24/24",
    "coords": "",
    "details": ""
  }

  var arrayCoords = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

  function getPlanetDetails () {
    var aDetails = []
    $('#mw-content-text > h2:first-of-type ~ p').each(function(){
      aDetails.push($(this).text())
    });

    var sSetails = aDetails.join('<br><br>');

    return sSetails;
  }

  planetData.name = $('#PageHeader h1').html().toLowerCase();
  planetData.orbit = parseFloat($('[data-source="orbitaldistance"] div').html());
  planetData.year = parseFloat($('[data-source="orbitalperiod"] div').html());
  planetData.size = parseInt($('[data-source="radius"] div').html().replace(',', '')) + "/6378";
  planetData.day = ($('[data-source="daylength"] div').length > 0) ? parseFloat($('[data-source="daylength"] div').html()) + "/24" : "1";
  planetData.coords = arrayCoords[Math.floor(Math.random() * arrayCoords.length)];

  planetData.details = getPlanetDetails(); $('#mw-content-text h2 ~ p').each(function(){
    console.log($(this).text())
  })

  console.log(planetData);
  //alert(JSON.stringify(planetData, null, 4));

  var formattedData = JSON.stringify(planetData, null, 2)

  var dummy = $('<textarea id="dummy"></textarea>');
  dummy.text(formattedData).appendTo('body');

  dummy.select();
  // dummy.selectionRange(0,99999);

  document.execCommand("copy");
}

getPlanetData();