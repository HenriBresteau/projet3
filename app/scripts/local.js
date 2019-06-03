class Nomlocal {
    constructor() {
        this.nomElt = document.getElementById('nom');
        this.prenomElt = document.getElementById('prenom');
        this.reserverElt = document.getElementById('reserver');
        this.stocker();
        this.lecture();
    }
    stocker() {
        //if (localStorage && sessionStorage) {
        this.reserverElt.addEventListener('click', () => {
            localStorage.clear();
            var identite = {
                nom: this.nomElt.value,
                prenom: this.prenomElt.value
            };
            localStorage.setItem("iden", JSON.stringify(identite));


        })
        //} else {
        // localStorage non supporté
        //}
    }
    lecture() {
        var identite = JSON.parse(localStorage.getItem('iden'));
        this.nomElt.value = identite.nom;
        this.prenomElt.value = identite.prenom;
        console.log('Vélo reserver à la station par ' + identite.nom + ' ' + identite.prenom);
    }
}


var loc = new Nomlocal();
