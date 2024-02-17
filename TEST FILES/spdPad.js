// spdPad.js


// spdPad.js

// Global variable to store the original URL
let originalUrl = window.location.href; // This should point to the HTML file with the orange square

document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === 'P') {
        event.preventDefault();
        addHtmlPad(); // Call the function to add a new iframe
    }
});

// Function to add a new HTML pad iframe to the page
function addHtmlPad() {
    const container = document.getElementById('samplerContainer') || createSamplerContainer();
    const iframe = document.createElement('iframe');
    iframe.src = originalUrl; // Use the original URL for all iframes
    iframe.style.width = '100px'; // Set to the size of the orange square plus a little extra
    iframe.style.height = '100px'; // Set to the size of the orange square plus a little extra
    iframe.style.margin = '5px';
    iframe.style.border = '1px solid #fff';
    container.appendChild(iframe);
    iframe.onload = () => setupPadInteraction(iframe);
}

// Function to create the sampler container if it does not exist
function createSamplerContainer() {
    const container = document.createElement('div');
    container.id = 'samplerContainer';
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.alignItems = 'flex-start';
    container.style.justifyContent = 'flex-start';
    document.body.appendChild(container);
    return container;
}

// Function to handle iframe interaction
function setupPadInteraction(iframe) {
    iframe.contentWindow.addEventListener('click', function() {
        setSelectedPad(iframe);
    });
}

let currentSelectedPad = null;
function setSelectedPad(iframe) {
    if (currentSelectedPad) {
        currentSelectedPad.style.border = '1px solid #fff';
    }
    currentSelectedPad = iframe;
    iframe.style.border = '2px solid red';
}

// Remove the addButton as we are now creating iframes without asking for a URL
