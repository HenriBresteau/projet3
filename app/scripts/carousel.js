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
        this.reformatCss();
        //Evenements
        this.createNavigation();
        this.root / addEventListener('keyup', e => {
            if (e.key === 'ArrowRight' || e.key === 'Right') {
                this.next();
            } else if (e.key === "ArrowLeft" || e.key === 'Left') {
                this.prev();
            }
        })
    }
    setStyle() {  //Applique les bonnes dimensions aux éléments du carousel
        let ratio = this.items.length / this.options.slidesVisibles;
        this.container.style.width = (100) + "%";
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisibles) / ratio) + "%");
        this.items.forEach(item => item.style.transformStyle = "preserve-3d");

    }


    createNavigation() {
        let nextButton = this.createDivWithClass('carousel_next');
        let prevButton = this.createDivWithClass('carousel_prev');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
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
        console.log(this.currentItem);
        console.log(this.items);
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
// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });
