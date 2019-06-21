class Nomlocal {
    constructor() {
        this.nomElt = document.getElementById('nom');
        this.prenomElt = document.getElementById('prenom');
        this.reserverElt = document.getElementById('reserver');
        this.effacerElt = document.getElementById('btn_clear');
        this.stocker();
        this.effacer();
    }
    stocker() {
        //if (localStorage && sessionStorage) {
        this.reserverElt.addEventListener('click', () => {
            localStorage.clear();
            var identite = {
                nom: this.nomElt.value,
                prenom: this.prenomElt.value,
            };
            localStorage.setItem('iden', JSON.stringify(identite));
            var id = JSON.parse(localStorage.getItem('iden'));
            this.nomElt.value = id.nom;
            this.prenomElt.value = id.prenom;

        })
        //} else {
        //console.log('localStorage non supporté');
        //}
    }

    effacer() {
        this.effacerElt.addEventListener('click', () => {
            this.nomElt.value = '';
            this.prenomElt.value = '';
        })
    }
}


var loc = new Nomlocal();
