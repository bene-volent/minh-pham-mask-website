const mask = document.querySelector("#masked-page");
const defaultMaskSize = 30;
const maxMaskSize = 500;
let maskSize = defaultMaskSize;
let curMaskX = 0,
    curMaskY = 0;
let destMaskX = 0;
let destMaskY = 0;
let currX = 0,
    currY = 0;

let mobileMaskButton = document.querySelector(".mask-button");

mobileMaskButton.addEventListener("click", () => {
    mobileMaskButton.dataset.open = mobileMaskButton.dataset.open != "true";
});

function subLerp(current, destination, rate) {
    return (destination - current) * rate;
}

function handleMaskEvents() {
    if (window.matchMedia("(min-width:900px").matches) {
        if (document.querySelector(".masked-cursor:hover")) {
            maskSize += subLerp(defaultMaskSize, maxMaskSize, 0.1);
        } else {
            maskSize -= subLerp(defaultMaskSize, maxMaskSize, 0.1);
        }
        maskSize = Math.min(maxMaskSize, Math.max(defaultMaskSize, maskSize));
        mask.style.setProperty("--mask-size", `${maskSize}px`);

        // console.log(maskSize,document.querySelector(".masked-cursor:hover"))

        if (
            Math.abs(currX - destMaskX) <= 0.01 &&
            Math.abs(currY - destMaskY) <= 0.01
        ) {
            mask.style.setProperty("--_x", `${destMaskX}px`);
            mask.style.setProperty("--_y", `${destMaskY}px`);

            requestAnimationFrame(handleMaskEvents);
            return;
        }

        currX += subLerp(curMaskX, destMaskX, 0.1);

        mask.style.setProperty("--_x", `${currX}px`);

        currY += subLerp(curMaskY, destMaskY, 0.1);
        mask.style.setProperty("--_y", `${currY}px`);
    } else {
        if (mobileMaskButton.dataset.open === "true") {
            maskSize += subLerp(defaultMaskSize, 3000, 0.05);
        } else {
            maskSize -= subLerp(defaultMaskSize, 3000, 0.05);
        }
        maskSize = Math.min(3000, Math.max(defaultMaskSize, maskSize));
        mask.style.setProperty("--mask-size", `${maskSize}px`);

        mask.style.setProperty("--_x",`${-15}px`)
        mask.style.setProperty("--_y",`${-15+Math.round(window.scrollY)}px`)
    }
    
    
    requestAnimationFrame(handleMaskEvents);
}

window.addEventListener("mousemove", (e) => {
    curMaskX = currX;
    curMaskY = currY;
    destMaskX = e.pageX;
    destMaskY = e.pageY;
});

requestAnimationFrame(handleMaskEvents);
