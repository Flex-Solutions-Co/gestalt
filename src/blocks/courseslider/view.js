import Splide from '@splidejs/splide';

document.addEventListener( 'DOMContentLoaded', function () {
    
    if (document.querySelector('.media__slider')) {

        let sliderSelector = document.querySelectorAll(".media__slider");
      
        for (var i = 0; i < sliderSelector.length; i++) {

            let slideEle = sliderSelector[i];
            let dataSettings = slideEle.getAttribute("data-settings");
            let dataSettingsObj = JSON.parse(dataSettings);

            dataSettingsObj.autoplay = true;
            dataSettingsObj.type = 'loop';
            dataSettingsObj.interval = 4000;
            dataSettingsObj.speed = 1200;

            if(Splide){
                new Splide(slideEle, dataSettingsObj).mount();
            }
           
        }
    }
   
});