var lyon = [45.750000, 4.850000];
//création de la map 
var map = L.map('mapid').setView(lyon, 13);

//création du claque images
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=91d0d9b75682de4ad09cf88f72a5f08ba6916ed8';
var oXhr = new XMLHttpRequest();
oXhr.onload = function () {
    var data = JSON.parse(this.responseText);
    // ici les données sont exploitables
    for (var i = 0; i < data.length; i++) {
        // personalisation marqueur
        var myIcon = L.icon({
            iconUrl: '../images/station.png',
            iconSize: [25, 32],
            
            popupAnchor: [-3, -76]
        });
        var marker = L.marker([data[i].position.lat, data[i].position.lng],{ icon: myIcon }).addTo(map);
        marker.bindPopup('<h5>' + data[i].name + '</h5> <p>' + data[i].address + ' </p> <p> Station : ' + data[i].status + '</p><p> Total places : ' + data[i].bike_stands + '</p>');

        afficherRéservation(i);
        
    }
    function afficherRéservation(i) {
        var adresseElt = document.querySelector('.adresse');
        adresseElt.textContent = data[i].address;
        var placeElt = document.querySelector('.place');
        placeElt.textContent = data[i].bike_stands;
        var disponibleElt = document.querySelector('.disponible');
        disponibleElt.textContent = data[i].available_bike_stands;
    };

};
oXhr.onerror = function (data) {
    console.log('Erreur ...');
};
oXhr.open('GET', url, true);
oXhr.send(null);
/*var requestURL ='../json/lyon.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    var  coord= request.response;

    for ( var i=0; i<coord.length;i++){
        var marker =L.marker([coord[i].latitude,coord[i].longitude]).addTo(map);
        marker.bindPopup('<h5>'+coord[i].name+'</h5> <p>'+coord[i].address+' </p>');
    }
  }*/





var marker = L.marker(lyon, { icon: myIcon }).addTo(map);
