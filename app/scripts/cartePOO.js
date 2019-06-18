class Carte {
    constructor() {
        //carte
        this.lyon = [45.750000, 4.850000];
        this.map = L.map('mapid').setView(this.lyon, 13);

        //DOM
        this.canvasElt = document.querySelector('canvas');
        this.fromElt = document.getElementById('from');
        this.signatureElt = document.querySelector('#signature');
        this.indisponible = document.querySelector('.indisponible');
        this.reserverElt = document.getElementById('reserver');
        this.stationElt = document.querySelector('.station');
        this.adresseElt = document.querySelector('.adresse');
        this.placeElt = document.querySelector('.place');
        this.disponibleElt = document.querySelector('.disponible');

        //this.creationCarte();
        /*this.creationCalque();
        this.creationMarker();
    }
    //creationCarte() {
    //    this.map = L.map('mapid').setView(this.lyon, 13);
    //}
    creationCalque() {*/
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(this.map);
    /*}
    creationMarker() {*/
        var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=91d0d9b75682de4ad09cf88f72a5f08ba6916ed8';
        var oXhr = new XMLHttpRequest();
        oXhr.onload = function () {
            var data = JSON.parse(this.responseText);
            // ici les données sont exploitables
            for (let i = 0; i < data.length; i++) {
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
                let marker = L.marker([data[i].position.lat, data[i].position.lng], { icon: myIcon }).addTo(Carte.map); // map  doit etre this.map
                marker.bindPopup('<h5>' + data[i].name + '</h5> <p>' + data[i].address + ' </p> <p> Etat de station : <span class="indisponible">' + data[i].status + '</span></p><p> Total places : ' + data[i].bike_stands + '</p>');

                marker.addEventListener('click', function () {
                    afficherRéservation(i);
                    rendreIndisponible(i);
                    afficherCanvas();
                }); 
            }
            function afficherCanvas() {
                Carte.canvasElt.style.display = 'initial';
                Carte.canvasElt.style.backgroundColor = 'lightgray';
                Carte.fromElt.style.display = 'initial';
                Carte.signatureElt.style.display = 'initial';
            }

            function rendreIndisponible(i) {
                if (data[i].status === 'Indisponible' || data[i].available_bike_stands === 0) {
                    Carte.indisponible.style.color = 'red';
                    Carte.indisponible.style.fontWeight = '600';

                } else {
                    Carte.reserver.disabled = true;
                }
            }
            function afficherRéservation(i) {
                Carte.stationElt.textContent = data[i].name;
                Carte.adresseElt.textContent = data[i].address;
                Carte.placeElt.textContent = data[i].bike_stands;
                Carte.disponibleElt.textContent = data[i].available_bike_stands;
                couleurDispo(i);
            };
            function couleurDispo(i) {
                var disponibleElt = document.querySelector('.disponible');
                if (data[i].available_bike_stands > 0) {
                    disponibleElt.style.color = 'green';
                } else {
                    disponibleElt.style.color = 'red';
                    disponibleElt.style.fontWeight = '600';
                }
            }

        };
        oXhr.onerror = function (data) {
            console.log('Erreur ...');
        };
        oXhr.open('GET', url, true);
        oXhr.send(null);
    }
}
var carte = new Carte();