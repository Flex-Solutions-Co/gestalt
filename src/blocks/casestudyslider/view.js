import Splide from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', function () {

    if (document.querySelector('.ges-verticle__slider')) {

        let sliderSelector = document.querySelectorAll(".ges-verticle__slider");
        var bar = document.querySelector('.case-study-progress-bar');
        for (var i = 0; i < sliderSelector.length; i++) {

            let slideEle = sliderSelector[i];
            let dataSettings = slideEle.getAttribute("data-settings");
            let dataSettingsObj = JSON.parse(dataSettings);
            if (Splide) {
                let caseStudySlider = new Splide(slideEle, dataSettingsObj);

                caseStudySlider.on('mounted move', function () {
                    var end = caseStudySlider.Components.Controller.getEnd() + 1;
                    var rate = Math.min((caseStudySlider.index + 1) / end, 1);
                    bar.style.width = String(100 * rate) + '%';
                });


                caseStudySlider.mount();
            }

            // splideInstance.on( 'move', function ( newIndex, prevIndex, destIndex) {

            //     const targetID = 'splide02-slide0'+(newIndex+1)+'';
            //     const currentID ='splide02-slide0'+(prevIndex+1)+'';

            //     const currentSlide = document.getElementById(currentID);
            //     currentSlide.querySelector('.ew-main-heading').classList.remove('wow', 'fadeInUp');

            //     const targetSlide = document.getElementById(targetID);
            //     targetSlide.querySelector('.ew-main-heading').classList.add('wow', 'fadeInUp');

            //     new WOW({ scrollContainer: splideInstance});
            //     wow.init();
            //     // do something
            // } );

            // splideInstance.on('moved', function(newIndex) {
            //    // console.log('Slide changed to index:', newIndex);
            //     let currentSlide = splideInstance.Components.Elements.slides[newIndex];
            //     let previousSlide = splideInstance.Components.Elements.slides[newIndex - 1];

            //      // Get all slides in the current slider.
            //      let slides = splideInstance.Components.Elements.slides;
            //   // console.log("slides", slides);

            //      // Loop through all slides and remove the class.
            //      for (let j = 0; j < slides.length; j++) {
            //          slides[j].querySelector('.ew-main-heading').classList.remove('wow', 'fadeInUp');
            //         // console.log("remove--");
            //      }

            //      // Add the class to the current slide's heading element.
            //      slides[newIndex].querySelector('.ew-main-heading').classList.add('wow', 'fadeInUp');

            // });

        }
    }

});