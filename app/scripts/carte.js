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
    for (let i = 0; i < data.length; i++) {
        // personalisation marqueur
        let myIcon = L.icon({
            iconUrl: '../images/station.png',
            iconSize: [25, 32],
        });
        if (data[i].status === 'CLOSED') {
            data[i].status = 'Indisponible';

        }
        else {
            data[i].status = 'Disponible';
        }
        let marker = L.marker([data[i].position.lat, data[i].position.lng], { icon: myIcon }).addTo(map);
        marker.bindPopup('<h5>' + data[i].name + '</h5> <p>' + data[i].address + ' </p> <p> Etat de station : <span class="indisponible">' + data[i].status + '</span></p><p> Total places : ' + data[i].bike_stands + '</p>');

        marker.addEventListener("click", function () {
            afficherRéservation(i);
            rendreIndispoonible(i);
            afficherCanvas();
        });


    }
    function afficherCanvas() {
        var para = document.createElement("p");
        var node = document.createTextNode("Signature : ");
        para.appendChild(node);
        var fElt = document.getElementById('from');
        fElt.appendChild(para);

        var canvasElt = document.querySelector('canvas');

        canvasElt.style.display = "initial";
        canvasElt.style.backgroundColor = "lightgray";
        var fromElt = document.getElementById('from');
        fromElt.style.display = "initial";
    }

    function rendreIndispoonible(i) {
        if (data[i].status === 'Indisponible') {
            document.querySelector('.indisponible').style.color = 'red';
            document.querySelector('.indisponible').style.fontWeight = "600";
            document.getElementById('reserver').disabled = true;
        } else {
            document.getElementById('reserver').disabled = false;
        }
    }
    function afficherRéservation(i) {
        var adresseElt = document.querySelector('.adresse');
        adresseElt.textContent = data[i].address;
        var placeElt = document.querySelector('.place');
        placeElt.textContent = data[i].bike_stands;
        var disponibleElt = document.querySelector('.disponible');
        disponibleElt.textContent = data[i].available_bike_stands;
        couleurDispo(i);
    };
    function couleurDispo(i) {
        var disponibleElt = document.querySelector('.disponible');
        if (data[i].available_bike_stands > 0) {
            disponibleElt.style.color = "green";
        } else {
            disponibleElt.style.color = "red";
            disponibleElt.style.fontWeight = "600";
        }
    }

};
oXhr.onerror = function (data) {
    console.log('Erreur ...');
};
oXhr.open('GET', url, true);
oXhr.send(null);
