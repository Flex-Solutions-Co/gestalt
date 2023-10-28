import Splide from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', function () {

    if (document.querySelector('.ges-testimonials__slider')) {

        let sliderSelector = document.querySelectorAll(".ges-testimonials__slider");

        var bar = document.querySelector('.my-slider-progress-bar');

        for (var i = 0; i < sliderSelector.length; i++) {

            let slideEle = sliderSelector[i];
            let dataSettings = slideEle.getAttribute("data-settings");
            let dataSettingsObj = JSON.parse(dataSettings);
            if (Splide) {
                let splideInstance = new Splide(slideEle, dataSettingsObj);

                splideInstance.on('mounted move', function () {
                    var end = splideInstance.Components.Controller.getEnd() + 1;
                    var rate = Math.min((splideInstance.index + 1) / end, 1);
                    bar.style.width = String(100 * rate) + '%';
                });

                splideInstance.mount();
            }

        }
    }

});