const track = document.querySelector('.carousel__track'),
      slides = Array.from(track.children), 
      nextButton = document.querySelector('.carousel__button--right'),
      prevButton = document.querySelector('.carousel__button--left'),
      dotsNav = document.querySelector('.carousel__nav'),
      dots = Array.from(dotsNav.children),
      slideWidth = slides[0].getBoundingClientRect().width;


/**************************************
************* FUNCTIONS ****************
***************************************/


// arrange slides horizontally & adjacent
const setSlidePosition = (slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
};

const moveToSlide = (track, currentSlide, targetSlide) => {
    // move track
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    // delete & re-apply .current-slide class to correct slide/img
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (targetIndex, prevButton, nextButton) => {
    switch (targetIndex) {
        case 0:
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
            break;

        case dots.length - 1:
            nextButton.classList.add('is-hidden');
            prevButton.classList.remove('is-hidden');
            break;

        default:
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
    }
}


/********************************************
************* EVENT LISTNERS ****************
********************************************/


// click left - move slides left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(prevIndex, prevButton, nextButton)
})

// click right - move slides right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(nextIndex, prevButton, nextButton)
})

// click nav indicator - move to that slide
dotsNav.addEventListener('click', e => {

    // disregard if click not on button within dotsNav
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    // is a button so get current variables using assigned class
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    
    // return index of clicked dot by iterating over dot array & comparing to that clicked
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(targetIndex, prevButton, nextButton)
}) 


/***************************************
**** INITIAL PAGE LOAD SET CAROUSEL ****
***************************************/


slides.forEach(setSlidePosition);