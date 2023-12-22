import { initSlider } from "../../js/swiper";

document.addEventListener("DOMContentLoaded", function () {
	if (document.querySelector(".swiper")) {
		let sliderSelector = document.querySelectorAll(".swiper");
		let sliderSettingEle = document.querySelector(".ges-testimonials--slider-section");
		if ( sliderSettingEle ) {
			let dataSettings = sliderSettingEle.getAttribute("data-settings");
			const sliderSettings = dataSettings ? JSON.parse(dataSettings) : {};
			sliderSelector.forEach(function (sliderEle) {
				var scrollBar = sliderEle.querySelector(".swiper-scrollbar");
				initSlider(sliderEle, scrollBar, sliderSettings);
			});
		}
	


	}
});
