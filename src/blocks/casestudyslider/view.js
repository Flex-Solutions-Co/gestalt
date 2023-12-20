import Splide from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', function () {

    if (document.querySelector('.ges-verticle__slider')) {

        let sliderSelector = document.querySelectorAll(".ges-verticle__slider");
        var bar = document.querySelector('.case-study-progress-bar');
        for (var i = 0; i < sliderSelector.length; i++) {

            let slideEle = sliderSelector[i];
            let dataSettings = slideEle.getAttribute("data-settings");
            let dataSettingsObj = JSON.parse(dataSettings);

            dataSettingsObj.autoplay = true;
            // dataSettingsObj.type = 'loop';
            dataSettingsObj.rewind = true;
            dataSettingsObj.interval = 4000;
            dataSettingsObj.speed = 1200;

            if (Splide) {
                let caseStudySlider = new Splide(slideEle, dataSettingsObj);

                caseStudySlider.on('mounted move', function () {
                    var end = caseStudySlider.Components.Controller.getEnd() + 1;
                    var rate = Math.min((caseStudySlider.index + 1) / end, 1);
                    bar.style.width = String(100 * rate) + '%';
                });


                caseStudySlider.mount();
            }

        }
    }

});