class CanvasObjet {
    constructor() { //Paramètres du canvas
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3;
        this.draw = false;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        this.lastPosition = this.mousePosition;
        this.clearButton = document.querySelector('#btn_clear');
        this.canvas.width = 200;
        this.canvas.height = 150;
    }

    //Gestion des événements 
    
    evenements() {
        var self = this;
        //Souris
        this.canvas.addEventListener('mousedown', function (e) {
            self.draw = true;
            self.lastPosition = self.getMposition(e);
        });

        this.canvas.addEventListener('mousemove', function (e) {
            self.mousePosition = self.getMposition(e);
            self.canvasResult()
        });

        document.addEventListener('mouseup', function (e) {
            self.draw = false;
        });

        //Effacer
        this.clearButton.addEventListener('click', function (e) {
            self.clearCanvas()
        });
    }

    // Renvoie les coordonnées de la souris 
    getMposition(mouseEvent) {
        if (this.draw) {
            var oRect = this.canvas.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - oRect.left,
                y: mouseEvent.clientY - oRect.top
            };
        }
    }

    // Dessin du canvas
    canvasResult() {
        if (this.draw) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
            this.ctx.stroke();
            this.lastPosition = this.mousePosition;
        }
    };

    // Vide le dessin du canvas
    clearCanvas() {
        this.canvas.width = this.canvas.width;
        this.ctx.lineWidth = 3;
    }

}

var obj = new CanvasObjet();
obj.evenements();