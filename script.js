const light = document.querySelector('.light');
const glow = document.querySelector('.glow');
const scene = document.querySelector('.scene');
const powerButton = document.getElementById('powerButton');
const changeColorButton = document.getElementById('changeColorButton');
const cycleButton = document.getElementById('cycleButton');
const brightnessSlider = document.getElementById('brightnessSlider');

const colors = ['#ffff99', '#ff9999', '#99ff99', '#9999ff', '#ff99ff', '#99ffff', '#ffcc99', '#ff6666'];
let currentColorIndex = 0;
let isOn = true;
let isCycling = false;
let cycleInterval;

powerButton.addEventListener('click', function() {
    isOn = !isOn;
    light.style.opacity = isOn ? 1 : 0;
    glow.style.opacity = isOn ? 1 : 0;
    scene.style.background = isOn ? 'linear-gradient(120deg, #000, #333)' : 'linear-gradient(120deg, #333, #666)';
});

changeColorButton.addEventListener('click', function() {
    if (isOn) {
        changeColor();
    }
});

cycleButton.addEventListener('click', function() {
    if (isOn) {
        if (isCycling) {
            clearInterval(cycleInterval);
            isCycling = false;
        } else {
            cycleColors();
            isCycling = true;
        }
    }
});

brightnessSlider.addEventListener('input', function() {
    const brightness = brightnessSlider.value / 100;
    light.style.opacity = brightness;
    glow.style.opacity = brightness / 2;
});

function changeColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    light.style.backgroundColor = colors[currentColorIndex];
    glow.style.background = `radial-gradient(circle, ${hexToRgba(colors[currentColorIndex], 0.5)} 0%, rgba(255, 255, 153, 0) 70%)`;
}

function cycleColors() {
    cycleInterval = setInterval(() => {
        changeColor();
    }, 1000);
}

function hexToRgba(hex, alpha) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
}
