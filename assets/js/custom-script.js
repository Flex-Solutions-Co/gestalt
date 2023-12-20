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
        var element = document.querySelector('header');
        var scrollPosition = window.scrollY;

        if (scrollPosition >= 20) { // Adjust 200 to your desired scroll position
            element.classList.add('has-scroll'); // Add your class name
        } else {
            element.classList.remove('has-scroll'); // Remove the class if not scrolled far enough
        }
    });

    // Navigation header.
    if (document.querySelectorAll('.ges-responsive-menu  .wp-block-navigation-item.has-child .wp-block-navigation__submenu-icon')) {
        let navigationMenuIconButton = document.querySelectorAll('.ges-responsive-menu  .wp-block-navigation-item.has-child .wp-block-navigation__submenu-icon');
        for (var i = 0; i < navigationMenuIconButton.length; i++) {
            navigationMenuIconButton[i].addEventListener('click', navigationMenuEvent, false);
        };

        function navigationMenuEvent() {

            if (this.parentNode.classList.contains('is-open-navigation-menu')) {
                this.parentNode.classList.remove('is-open-navigation-menu');
                return;
            }

            var panel = this.nextElementSibling;
            if (panel) {
                this.parentNode.classList.add('is-open-navigation-menu');
            }
        };
    }

    let navigationMenuCloseButton = document.querySelector('.wp-block-navigation__responsive-container-close');
    navigationMenuCloseButton.addEventListener('click', navigationCloseEvent, false);
    function navigationCloseEvent() {
        let navigationMenuIconButton = document.querySelectorAll('.ges-responsive-menu  .wp-block-navigation-item.has-child');
        for (var i = 0; i < navigationMenuIconButton.length; i++) {
            navigationMenuIconButton[i].classList.remove('is-open-navigation-menu');
        };
    }

    // Work Expertise items custom Scrollbar.
    function appendStructure() {

        const existingDivision = document.querySelector('.ges-expertise-wrapper');
        const carousel = document.querySelector(".ges-expertise-inner-wrapper");

        if (existingDivision) {

            if (window.innerWidth <= 781) {

                const newStructure = document.createElement('div');
                newStructure.className = 'carousel-scrollbar';
                newStructure.innerHTML = `
                        <div class="scrollbar-track">
                            <div class="scrollbar-thumb"></div>
                        </div>
                    `;

                existingDivision.appendChild(newStructure);

                const sliderScrollbar = document.querySelector(".carousel-scrollbar");
                const sliderScrollbarThumb = document.querySelector(".carousel-scrollbar .scrollbar-thumb");
                let carouselMaxScroll = carousel.scrollWidth - carousel.clientWidth;

                const resizeScrollbarThumb = () => {
                    sliderScrollbarThumb.style.width = `${(carousel.clientWidth / carousel.scrollWidth) * 100}%`;
                };

                resizeScrollbarThumb();

                let startX,
                    thumbPosition,
                    isMouseDown = false;

                const positionScrollbarThumb = () => {
                    const scrollPositionX = carousel.scrollLeft;
                    const thumbPositionX = (scrollPositionX / carouselMaxScroll) * (sliderScrollbar.clientWidth - sliderScrollbarThumb.offsetWidth);
                    sliderScrollbarThumb.style.left = `${thumbPositionX}px`;
                };

                if (carousel) {
                    carousel.addEventListener("scroll", (event) => {
                        positionScrollbarThumb();
                    });
                }

                if (sliderScrollbarThumb) {
                    const startDrag = (event) => {
                        isMouseDown = true;
                        sliderScrollbarThumb.classList.add("dragging");
                        carousel.classList.add("dragging");

                        if (event.touches) {
                            startX = event.touches[0].clientX;

                        } else {
                            startX = event.clientX;
                        }

                        thumbPosition = event.target.getBoundingClientRect().left - sliderScrollbar.getBoundingClientRect().left;
                    };

                    const drag = (event) => {
                        if (!isMouseDown) return;
                        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
                        const deltaX = clientX - startX;
                        const newThumbPosition = thumbPosition + deltaX;
                        const maxThumbPosition = sliderScrollbar.clientWidth - sliderScrollbarThumb.offsetWidth;
                        const thumbPositionX = Math.max(0, Math.min(maxThumbPosition, newThumbPosition))
                        const sliderScrollLeft = Math.max(0, (thumbPositionX / maxThumbPosition) * carouselMaxScroll);

                        sliderScrollbarThumb.style.left = `${thumbPositionX}px`;
                        carousel.scrollLeft = sliderScrollLeft;
                    };

                    const stopScrolling = (event) => {
                        isMouseDown = false;
                        sliderScrollbarThumb.classList.remove("dragging");
                        carousel.classList.remove("dragging");
                    };

                    sliderScrollbarThumb.addEventListener("mousedown", startDrag);
                    sliderScrollbarThumb.addEventListener("touchstart", startDrag);

                    document.addEventListener("mousemove", drag);
                    document.addEventListener("touchmove", drag);

                    document.addEventListener("mouseup", stopScrolling);
                    document.addEventListener("touchend", stopScrolling);
                }

            } else {
                const appendedStructure = existingDivision.querySelector('.carousel-scrollbar');
                if (appendedStructure) {
                    existingDivision.removeChild(appendedStructure);
                }
            }
        }
    }
    appendStructure();
});
