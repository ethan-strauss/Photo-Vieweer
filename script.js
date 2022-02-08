const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiKey = 'XyvO783OhfrOvJ0ffU879JTsfrR3XwP9FDWRgF7CSJI'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;

//Check if Images leaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}
//Helper Function to Set Attribute to DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

//Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosarray
    photosArray.forEach((photo) => {
        //Create <a></a> for Unsplash
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //Create Image for Photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        //Event Listener, check when finished loading
        img.addEventListener('load', imageLoaded)
        //Put <img> inside <a></a>, then put both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item)

    });
}
// Get Unsplash Photos From API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch Errot
    }
}
// Check to see if near scrolling bottom to load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

//On Load
getPhotos();