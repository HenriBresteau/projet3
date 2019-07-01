class Carousel {
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisibles: 1
        }, options)
        let children = [].slice.call(element.children);
        this.currentItem = 0;
        //Modification du DOM
        this.root = this.createDivWithClass('carousel');
        this.container = this.createDivWithClass('carousel_container');
        this.root.setAttribute('tabindex', '0');
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        

        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel_item');

            item.appendChild(child);
            this.container.appendChild(item);
            return item;
        });
        this.setStyle();
        this.reformatCss(0);
        //Evenements
        this.createNavigation();
        this.root / addEventListener('keyup', e => {
            if (e.key === 'ArrowRight' || e.key === 'Right') {
                this.next();
            } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                this.prev();
            }
            if (e.key === 'ArrowUp' || e.key === 'Up') {
                this.play();
            } else if (e.key === 'ArrowDown' || e.key === 'Down') {
                this.pause();
            }
        });
        this.interval=0;
    }
    setStyle() {  //Applique les bonnes dimensions aux éléments du carousel
        let ratio = this.items.length / this.options.slidesVisibles;
        this.container.style.width = (100) + '%';
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisibles) / ratio) + '%');
        this.items.forEach(item => item.style.transformStyle = 'preserve-3d');

    }


    createNavigation() {
        let nextButton = this.createDivWithClass('carousel_next');
        let prevButton = this.createDivWithClass('carousel_prev');
        let playButton = this.createDivWithClass('carousel_play');
        let pauseButton = this.createDivWithClass('carousel_pause');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        this.root.appendChild(playButton);
        this.root.appendChild(pauseButton);
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
        playButton.addEventListener('click', this.play.bind(this));
        pauseButton.addEventListener('click', this.pause.bind(this));
    }
    play() { 
        this.interval = window.setInterval(() => this.next(),3000);
    }
    pause() {
        clearInterval(this.interval);
    }
    next() {
        this.goToItem(this.currentItem + this.options.slidesToScroll);
    }
    prev() {
        this.goToItem(this.currentItem - this.options.slidesToScroll);
    }
    goToItem(index) { //Déplace le carousel vers l'élement ciblé
        if (index < 0) {
            index = this.items.length - this.options.slidesVisibles;
        } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisibles] === undefined) {
            index = 0;
        }
        //let translateX = index * -100 / this.items.length;
        //this.container.style.transform = 'translate3d(' + translateX + '%,0,0)';
        this.currentItem = index;
        this.reformatCss(this.currentItem);
    }
    reformatCss(currentItem) {
        if (currentItem === 0) {
            this.items[0].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(0deg)';
            this.items[1].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(-50deg)';
            this.items[2].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(-50deg)';
            this.items[3].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(-50deg)';
            this.items[4].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(-50deg)';
        }
        else if (currentItem === 1) {
            this.items[0].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(50deg)';
            this.items[1].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(0deg)';
            this.items[2].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(-50deg)';
            this.items[3].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(-50deg)';
            this.items[4].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(-50deg)';
        }
        else if (currentItem === 2) {
            this.items[0].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(50deg)';
            this.items[1].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(50deg)';
            this.items[2].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(0deg)';
            this.items[3].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(-50deg)';
            this.items[4].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(-50deg)';
        }
        else if (currentItem === 3) {
            this.items[0].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(50deg)';
            this.items[1].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(50deg)';
            this.items[2].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(50deg)';
            this.items[3].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(0deg)';
            this.items[4].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(-50deg)';
        }
        else if (currentItem === 4) {
            this.items[0].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(50deg)';
            this.items[1].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(50deg)';
            this.items[2].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(50deg)';
            this.items[3].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(50deg)';
            this.items[4].style.transform = 'perspective(7.5cm) rotateX(0deg) rotateY(0deg)';
        }

    }
    createDivWithClass(className) {
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }
}
document.addEventListener('DOMContentLoaded', function () {


    new Carousel(document.querySelector('#carousel1'), {
        slidesToScroll: 1,
        slidesVisibles: 1
    })

})