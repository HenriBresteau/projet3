class SessionStorage {
    constructor() {
        this.nom = document.getElementById('nom');
        this.prenom = document.getElementById('prenom');
        this.reserverElt = document.getElementById('reserver');
        this.station = document.querySelector('.station');
        this.missNom = document.getElementById('missNom');
        this.formatNom = document.getElementById('formatNom');
        this.formatPrenom = document.getElementById('formatPrenom');
        this.recapElt = document.getElementById('recap');
        this.minElt = document.getElementById('min');
        this.secElt = document.getElementById('sec');
        this.checkInput();
        this.afficherResa();
        this.chrono();
    }
    checkInput() { // Vérifier Nom et Prénom présent + Format "NOM" et "Prénom"        
        var nomValid = /^[zA-ZéèîïÉÈÎÏ][zA-ZéèîïÉÈÎÏ]+([-'\s][zA-ZéèîïÉÈÎÏ][zA-ZéèîïÉÈÎÏ]+)?$/; //REGEX [BRESTEAU]
        var prenomValid = /^[zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/; //REGEX [Henri]
        this.reserverElt.addEventListener("mouseover", validation);
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
                self.missNom.textContent = "";
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
        this.reserverElt.addEventListener("click", function (e) {
            that.recapElt.style.display = "initial";
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
        var counterSec = 10;
        var counterMin = 1;
        var intervalId = null;
        var finElt = document.getElementById('fin');
        finElt.style.display= "none";
        function fin() {
            clearInterval(intervalId);
            finElt.style.display ="initial";
            finElt.style.color ="red";
        }
        function bip() {
            counterSec--;
            if(counterSec <0){
                counterSec = 10;
                counterMin --;
            }
            if ((counterSec == 0) && (counterMin==0)) {
                fin();
            }             
            else {
                that.secElt.innerHTML = counterSec ;
                that.minElt.innerHTML = counterMin;
            }
        }
        this.reserverElt.addEventListener("click", function () {
            intervalId = setInterval(bip, 1000);
            that.reserverElt.addEventListener("click", function() {
                clearInterval(intervalId);
                counterMin = 1;
                counterSec = 10;
                finElt.style.display= "none";
                intervalId = setInterval(bip, 1000);
            });
        });
        
    }

}
var session = new SessionStorage();