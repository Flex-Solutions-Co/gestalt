addEventListener("DOMContentLoaded", (e) => {

    // if ( document.querySelector('.wp-block-video') ) {

    //     let videoParent = document.querySelector('.wp-block-video');
    //     let videoTag = document.querySelector('.wp-block-video video');

    //     var videoSource = videoTag.getAttribute('src');

    //     videoParent.setAttribute('href', videoSource);
    //     videoTag.setAttribute('data-fancybox', 'video-gallery');

    //     Fancybox.bind('[data-fancybox]', {});
    // }

    window.addEventListener('scroll', function () {
        var element = document.querySelector('.ges-header');
        var scrollPosition = window.scrollY;

        if (scrollPosition >= 20) { // Adjust 200 to your desired scroll position
            element.classList.add('has-scroll'); // Add your class name
        } else {
            element.classList.remove('has-scroll'); // Remove the class if not scrolled far enough
        }
    });

});