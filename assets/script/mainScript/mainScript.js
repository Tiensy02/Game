                    //SLIDER
var slider = document.querySelector(".slide-contain-wrap")
const slideCount = [0,2,4,6,4,2];
var slideCurrent = 0;
function slideAnimation() {
    if (slideCurrent <=slideCount.length -1 ) {
        slider.style.transform = `translateX(${-slideCount[slideCurrent]*10}%)`
        slideCurrent++;
    } else slideCurrent=0
}
setInterval(slideAnimation, 3000);

