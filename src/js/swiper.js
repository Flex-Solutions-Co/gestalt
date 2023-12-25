export function initSlider(slideEle, scrollbarEle, sliderSettings) {
  if (scrollbarEle) {
      sliderSettings = {
          speed: 1200,
          slidesPerView: 3.5,
          spaceBetween: 80,
      }

      sliderSettings.scrollbar = {
          el: ".swiper-scrollbar",
          draggable: true,
      };

      sliderSettings.breakpoints = {
          1024: {
              spaceBetween: 40,

          },
          640: {
              slidesPerView: 2.2,
              spaceBetween: 40,

          },
          320: {
              slidesPerView: 1.1,
              spaceBetween: 18,

          },
      };

      sliderSettings.autoplay = {
          delay: 4000,
          disableOnInteraction: false,
      };
  }
  const swiper = new Swiper(slideEle, sliderSettings);
}

export function initSliderCase(slideEle, scrollbarEle, sliderSettings) {
  if (scrollbarEle) {
      sliderSettings = {
          speed: 1200,
          slidesPerView: 2.5,
      }

      sliderSettings.scrollbar = {
          el: ".swiper-scrollbar",
          draggable: true,
      };

      sliderSettings.breakpoints = {
          1024: {
              spaceBetween: 12,
          },
          640: {
              slidesPerView: 1.5,
              spaceBetween: 50,

          },
          320: {
              slidesPerView: 1.1,
              spaceBetween: 18,
          },
      };

      sliderSettings.autoplay = {
          delay: 4000,
          disableOnInteraction: false,
      };
  }
  const swiper = new Swiper(slideEle, sliderSettings);
}