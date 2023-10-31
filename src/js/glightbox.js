// Using a bundler like webpack
import GLightbox from "glightbox";

if (document.querySelector(".glightbox")) {
    var lightboxDescription = GLightbox({
        selector: ".glightbox",
        autoplayVideos: true
    });
}
