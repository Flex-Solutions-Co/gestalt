import { initSliderCase } from "../../js/swiper";

document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector(".swiper")) {
        let sliderSelector = document.querySelectorAll(".swiper");
        let sliderSettingEle = document.querySelector(".ges-verticle--slider-section");
        if ( sliderSettingEle ) {
            let dataSettings = sliderSettingEle.getAttribute("data-settings");
            const sliderSettings = dataSettings ? JSON.parse(dataSettings) : {};
    
            sliderSelector.forEach(function (sliderEle) {
                var scrollBar = sliderEle.querySelector(".swiper-scrollbar");
                initSliderCase(sliderEle, scrollBar, sliderSettings);
            });
        }

    }
});
