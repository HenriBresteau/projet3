class Nomlocal {
    constructor() {
        this.nomElt = document.getElementById('nom');
        this.prenomElt = document.getElementById('prenom');
        this.reserverElt = document.getElementById('reserver');
        this.effacerElt = document.getElementById('btn_clear');
        this.stocker();
        this.lecture();
        this.effacer();
    }
    stocker() {
        //if (localStorage && sessionStorage) {
        this.reserverElt.addEventListener('click', () => {
            localStorage.clear();
            var identite = {
                nom: this.nomElt.value,
                prenom: this.prenomElt.value
            };
            localStorage.setItem('iden', JSON.stringify(identite));


        })
        //} else {
        // localStorage non supporté
        //}
    }
    lecture() {
        var identite = JSON.parse(localStorage.getItem('iden'));
        this.nomElt.value = identite.nom;
        this.prenomElt.value = identite.prenom;
    }
    effacer(){ 
    this.effacerElt.addEventListener('click', () => {
        this.nomElt.value ='';
        this.prenomElt.value='';
        return false;
    })
    }
}


var loc = new Nomlocal();
