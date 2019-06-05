class SessionStorage {
    constructor() {
        this.nom = document.getElementById('nom');
        this.prenom = document.getElementById('prenom');
        this.reserverElt = document.getElementById('reserver');
        this.missNom = document.getElementById('missNom');
        this.formatNom = document.getElementById('formatNom');
        this.formatPrenom = document.getElementById('formatPrenom');
        this.checkInput();
        //this.stocker();
        //this.lecture();
        //this.afficher();
    }
    checkInput() { // Vérifier Nom et Prénom présent + Format "NOM" et "Prénom"        
        var nomValid = /^[zA-ZéèîïÉÈÎÏ][zA-ZéèîïÉÈÎÏ]+([-'\s][zA-ZéèîïÉÈÎÏ][zA-ZéèîïÉÈÎÏ]+)?$/; //REGEX [BRESTEAU]
        var prenomValid = /^[zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/; //REGEX [Henri]
        this.reserverElt.addEventListener('click', validation);
        var self = this;
        function validation(event) {

            //Si le champ est vide
            if (self.nom.validity.valueMissing || self.prenom.validity.valueMissing) {
                event.preventDefault();
                self.missNom.textContent = 'Attention ! Nom et prenom sont obligatoire pour réserver !';
                self.missNom.style.color = 'red';
            } else {
                self.missNom.textContent = "";
            }
            if (nomValid.test(self.nom.value) == false) {
                event.preventDefault();
                //formatNom.textContent += 'Format incorrect';
                self.formatNom.style.color = 'orange';
            } else {
                self.formatNom.style.color = 'green';
            }
            if (prenomValid.test(self.prenom.value) == false) {
                event.preventDefault();
                self.formatPrenom.style.color = 'orange';
            }
            else {
                self.formatPrenom.style.color = 'green';
            }
        }
    }

}
var session = new SessionStorage();