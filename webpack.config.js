const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
  ...{
      entry: {
        index: "./src/index.js",
        "js/swiper": "./src/js/swiper.js",
        "js/main": "./src/js/main.js",
        "js/splide": "./src/js/splide.js",
        "js/glightbox": "./src/js/glightbox.js",
      },
    }
};
