import Splide from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', function () {
    /**
         * Testmonial Slider.
         */
    var splideElem = document.getElementById('gestalt-read-more_slider');
    if (splideElem !== null) {
        const splideSlider = new Splide(splideElem, {
            perPage: 3,
            perMove: 1,
            arrows: false,
            pagination : true,
            gap : "1.25rem",
            speed : 1200,
            drag: true,
            slideFocus: false,
            pauseOnHover: false,
            pauseOnFocus : false,
            breakpoints: {
                768: {
                    perPage: 1,
                },
                1024: {
                    perPage: 2,
                    gap : "0.875rem",
                },
          
            },
        });
        splideSlider.mount();
    }
});
