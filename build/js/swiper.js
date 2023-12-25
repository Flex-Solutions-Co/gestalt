/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/swiper.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initSlider: () => (/* binding */ initSlider),
/* harmony export */   initSliderCase: () => (/* binding */ initSliderCase)
/* harmony export */ });
function initSlider(slideEle, scrollbarEle, sliderSettings) {
  if (scrollbarEle) {
    sliderSettings = {
      speed: 1200,
      slidesPerView: 3.5,
      spaceBetween: 80
    };
    sliderSettings.scrollbar = {
      el: ".swiper-scrollbar",
      draggable: true
    };
    sliderSettings.breakpoints = {
      1024: {
        spaceBetween: 40
      },
      640: {
        slidesPerView: 2.2,
        spaceBetween: 40
      },
      320: {
        slidesPerView: 1.1,
        spaceBetween: 18
      }
    };
    sliderSettings.autoplay = {
      delay: 4000,
      disableOnInteraction: false
    };
  }
  const swiper = new Swiper(slideEle, sliderSettings);
}
function initSliderCase(slideEle, scrollbarEle, sliderSettings) {
  if (scrollbarEle) {
    sliderSettings = {
      speed: 1200,
      slidesPerView: 2.5
    };
    sliderSettings.scrollbar = {
      el: ".swiper-scrollbar",
      draggable: true
    };
    sliderSettings.breakpoints = {
      1024: {
        spaceBetween: 12
      },
      640: {
        slidesPerView: 1.5,
        spaceBetween: 50
      },
      320: {
        slidesPerView: 1.1,
        spaceBetween: 18
      }
    };
    sliderSettings.autoplay = {
      delay: 4000,
      disableOnInteraction: false
    };
  }
  const swiper = new Swiper(slideEle, sliderSettings);
}
/******/ })()
;
//# sourceMappingURL=swiper.js.map