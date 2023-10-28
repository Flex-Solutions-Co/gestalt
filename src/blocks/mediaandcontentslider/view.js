import Splide from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', function () {

    if (document.querySelector('.ges-media-and-content-inner-wrapper')) {

        let sliderSelector = document.querySelectorAll(".ges-media-and-content-inner-wrapper");

        for (let i = 0; i < sliderSelector.length; i++) {

            let slideEle = sliderSelector[i];
            let dataSettings = slideEle.getAttribute("data-settings");
            let dataSettingsObj = JSON.parse(dataSettings);

            if (Splide) {
                const caseStudySlider = new Splide(slideEle, dataSettingsObj);

                let prevButton = slideEle.querySelector('.ges-custom-arrow .paginate--prev');
                let nextButton = slideEle.querySelector('.ges-custom-arrow .paginate--next');

                let currentIndex = 0;
                let currentPage = slideEle.querySelector('.ges-custom-arrow .pagination .current-page');
                let lastPage = slideEle.querySelector('.ges-custom-arrow .pagination .last-page');

                caseStudySlider.on('mounted', function () {
                    const paginationItems = slideEle.querySelectorAll('.splide__pagination__page');
                    const lastPaginationItem = paginationItems.length;
                    lastPage.textContent = lastPaginationItem;
                });
                caseStudySlider.on('moved', function (newIndex) {
                    currentIndex = newIndex;
                    currentPage.textContent = currentIndex + 1;

                    if (caseStudySlider.index === 0) {
                        prevButton.classList.add('disabled');
                    } else {
                        prevButton.classList.remove('disabled');
                    }

                    if (caseStudySlider.index >= caseStudySlider.length - caseStudySlider.options.perPage) {
                        nextButton.classList.add('disabled');
                    } else {
                        nextButton.classList.remove('disabled');
                    }

                });

                caseStudySlider.mount();

                if (prevButton) {
                    prevButton.addEventListener('click', function () {
                        caseStudySlider.go('<');
                    });
                }
                if (nextButton) {
                    nextButton.addEventListener('click', function () {
                        caseStudySlider.go('>');
                    });
                }
            }
        }
    }

});