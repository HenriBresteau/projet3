class SessionStorage {
    constructor() {
        this.nom = document.getElementById('nom');
        this.prenom = document.getElementById('prenom');
        this.reserverElt = document.getElementById('reserver');
        this.effacerElt = document.getElementById('btn_clear');
        this.station = document.querySelector('.station');
        this.missNom = document.getElementById('missNom');
        this.formatNom = document.getElementById('formatNom');
        this.formatPrenom = document.getElementById('formatPrenom');
        this.recapElt = document.getElementById('recap');
        this.minElt = document.getElementById('min');
        this.secElt = document.getElementById('sec');
        this.delayCheck();
        this.afficherResa();
        this.chrono();
        this.counterSec = 0;
        this.counterMin = 0;
    }
    delayCheck() {
        var timeoutId = window.setTimeout(this.checkInput(), 5000);
    }

    checkInput() { // Vérifier Nom et Prénom présent + Format "NOM" et "Prénom"        
        var nomValid = /^[zA-ZéèîïÉÈÎÏ][zA-ZéèîïÉÈÎÏ]+([-'\s][zA-ZéèîïÉÈÎÏ][zA-ZéèîïÉÈÎÏ]+)?$/; //REGEX [BRESTEAU]
        var prenomValid = /^[zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/; //REGEX [Henri]
        this.reserverElt.addEventListener('mouseover', validation);
        var self = this;
        function validation(event) {
            var nomVide = self.nom.validity.valueMissing; //Si le champ est vide !()=>rempli
            var prenomVide = self.prenom.validity.valueMissing;
            var testFromatNom = nomValid.test(self.nom.value);
            var testFromatPrenom = prenomValid.test(self.prenom.value);

            if (nomVide || prenomVide) {
                //event.preventDefault();
                self.missNom.textContent = 'Attention ! Nom et prenom sont obligatoire pour réserver !';
                self.missNom.style.color = 'red';
            } else {
                self.missNom.textContent = '';
            }
            if (testFromatNom == false) {
                self.formatNom.style.color = 'orange';

            } else {
                self.formatNom.style.color = 'green';
            }
            if (testFromatPrenom == false) {
                self.formatPrenom.style.color = 'orange';
            }
            else {
                self.formatPrenom.style.color = 'green';
            }
            // Si le nom et Prenom sont valide = BTN disponible
            if (!(nomVide) && !(prenomVide) && (testFromatNom == true) && (testFromatPrenom == true)) {
                self.reserverElt.disabled = false;
            } else {
                self.reserverElt.disabled = true;
            }
        }

    }
    afficherResa() {
        var that = this;
        this.reserverElt.addEventListener('click', function (e) {
            that.recapElt.style.display = 'block';
            that.recapElt.style.backgroundColor = 'peachpuff';
            that.recapElt.style.padding = '10px';
            var stationReserver = document.getElementById('station');
            stationReserver.textContent = that.station.textContent;
            var nomResa = document.querySelector('#nomResa');
            nomResa.textContent = that.nom.value;
            var prenomResa = document.querySelector('#prenomResa');
            prenomResa.textContent = that.prenom.value;
        });
    }
    chrono() {
        var that = this;
        var intervalId = null;
        var finElt = document.getElementById('fin');

        function initialiser() {
            that.counterSec = 59;
            that.counterMin = 19;
            finElt.style.display = 'none';
        }
        function fin() {
            clearInterval(intervalId);
            finElt.style.display = 'initial';
            finElt.style.color = 'red';
            document.getElementById('reserver').disabled = true;
        }
        function bip() {
            that.counterSec--;
            if (that.counterSec < 0) {
                that.counterSec = 59;
                that.counterMin--;
            }

            if ((that.counterSec == 0) && (that.counterMin <= 0)) {
                fin();
            }
            else {
                that.secElt.innerHTML = that.counterSec;
                sessionStorage.setItem('Secondes :', that.counterSec);
                that.minElt.innerHTML = that.counterMin;
                sessionStorage.setItem('Minutes :', that.counterMin);
            }
        }
        this.reserverElt.addEventListener('click', function () {
            fin();
            initialiser();
            intervalId = setInterval(bip, 1000);
            document.getElementById('reserver').disabled = true;

        });
        this.effacerElt.addEventListener('click', () => {
            clearInterval(intervalId);
            console.log('Fin ?');
            sessionStorage.clear();
        })

    }

}
var session = new SessionStorage();