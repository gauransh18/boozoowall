const totalImages = 76;
const imagePrefix = 'everyday_boozoo-20241106-';
const imageExtension = '.jpg';
const rows = document.querySelectorAll('.marquee-row');

function padNumber(number) {
    return String(number).padStart(4, '0');
}

function createImage(index) {
    const img = document.createElement('img');
    img.onerror = function() {
        console.warn(`Failed to load image: ${index}`);
        img.src = 'images/placeholder.jpg';
    };
    img.src = `images/${imagePrefix}${padNumber(index)}${imageExtension}`;
    img.alt = `Boozoo ${index}`;
    img.classList.add('gallery-item');
    return img;
}

function getRandomImageIndex() {
    return Math.floor(Math.random() * totalImages) + 1;
}

rows.forEach(row => {
    for (let i = 0; i < totalImages; i++) {
        row.appendChild(createImage(getRandomImageIndex()));
    }
    for (let i = 0; i < totalImages; i++) {
        row.appendChild(createImage(getRandomImageIndex()));
    }
});