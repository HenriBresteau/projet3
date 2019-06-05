class SessionStorage {
    constructor() {
        this.checkInput();
    }
    checkInput() { // Vérifier Nom et Prénom présent + Format "NOM" et "Prénom"
        var reserver = document.getElementById('reserver');
        var nom = document.getElementById('nom');
        var prenom = document.getElementById('prenom');
        var missNom = document.getElementById('missNom');
        var formatNom = document.getElementById('formatNom');
        var formatPrenom = document.getElementById('formatPrenom');
        var nomValid = /^[zA-ZéèîïÉÈÎÏ][zA-ZéèîïÉÈÎÏ]+([-'\s][zA-ZéèîïÉÈÎÏ][zA-ZéèîïÉÈÎÏ]+)?$/;
        var prenomValid = /^[zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

        reserver.addEventListener('click', validation);
        function validation(event) {
            //Si le champ est vide
            if (nom.validity.valueMissing || prenom.validity.valueMissing) {
                event.preventDefault();
                missNom.textContent = 'Attention ! Nom et prenom sont obligatoire pour réserver !';
                missNom.style.color = 'red';
            }
            if (nomValid.test(nom.value) == false) {
                event.preventDefault();
                //formatNom.textContent += 'Format incorrect';
                formatNom.style.color = 'orange';
            }
            if (prenomValid.test(prenom.value) == false) {
                event.preventDefault();
                //formatNom.textContent += 'Format incorrect';
                formatPrenom.style.color = 'orange';
            }
            else {
                formatNom.style.color = 'green';
                formatPrenom.style.color = 'green';
                missNom.textContent = "";
            }
        }
    }
}
var session = new SessionStorage();