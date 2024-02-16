// animate.js
let animationTimeoutId = null;


// Function to start animation
function startAnimation(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.classList.add('shake-animation');
    //
    // element.classList.add('shake-all-directions-animation');
    //
    // element.classList.add('bounce-zoom-in-animation');
    //
    // element.classList.add('zoom-out-animation');
    //
    // element.classList.add('pulse-animation');
    //
    // element.classList.add('spin-animation');


    // Clear any existing timeout to prevent stopping the animation prematurely
    if (animationTimeoutId) {
        clearTimeout(animationTimeoutId);
        animationTimeoutId = null;
    }

    // Set a timeout to remove the animation class if there are no further calls
    animationTimeoutId = setTimeout(() => {
        element.classList.remove('shake-animation');
        //
        // element.classList.remove('shake-all-directions-animation');
        //
        // element.classList.remove('bounce-zoom-in-animation');
        //
        // element.classList.remove('zoom-out-animation');
        //
        // element.classList.remove('pulse-animation');
        //
        // element.classList.remove('spin-animation');


        animationTimeoutId = null;
    }, 150); // Adjust timeout duration as needed based on testing
}

// Function to stop animation
function stopAnimation(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    // Remove shake animation class
    element.classList.remove('shake-animation');
    //
    // element.classList.remove('shake-all-directions-animation');
    //
    // element.classList.remove('bounce-zoom-in-animation');
    //
    // Optionally, reset any style properties modified by the animation
    //
    // element.classList.remove('zoom-out-animation');
    //
    // element.classList.remove('pulse-animation');
    //
    // element.classList.remove('spin-animation');

}


// element.classList.add('shake-all-directions-animation');
// element.classList.remove('shake-all-directions-animation');


// element.classList.add('bounce-zoom-in-animation');
// element.classList.remove('bounce-zoom-in-animation');


// element.classList.add('zoom-out-animation');
// element.classList.remove('zoom-out-animation');

// element.classList.add('pulse-animation');
// element.classList.remove('pulse-animation');


// element.classList.add('spin-animation');
// element.classList.remove('spin-animation');
