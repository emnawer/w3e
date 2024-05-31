/* Copyright (c) 2024, Emnawer A. (https://github.com/emnawer) */

var slideIndex = [];

function updateBar(barID, update) {
    var bar = document.getElementById(barID);
    var width = parseInt(bar.style.width);
    var newWidth = width + update;
    var id = setInterval((function() {
        if (width >= newWidth) {
            clearInterval(id);
        } else if (width >= 100) {
            bar.style.width = 100 + "%";
            bar.innerHTML = 100 + "%";
            clearInterval(id);
        } else {
            width = width + 1;
            bar.style.width = width + "%";
            bar.innerHTML = width * 1 + "%";
        }
    }), 10);
}

function showImg(images, n, slideArrayIndex) {
    console.log("slideIndex 1:", slideIndex);
    if (n > images.length) {
        slideIndex[slideArrayIndex] = 1;
    }
    console.log("slideIndex 2:", slideIndex);
    if (n < 1) {
        slideIndex[slideArrayIndex] = images.length;
    }
    console.log("slideIndex 3:", slideIndex);
    for (i = 0; i < images.length; i++) {
        images[i].className = images[i].className.replace(" w3-show", "");
        console.log("images[i]", images[i]);
    }
    console.log("images[slideIndex[slideArrayIndex] - 1]", images[slideIndex[slideArrayIndex] - 1]);
    images[slideIndex[slideArrayIndex] - 1].className += " w3-show";
}

document.addEventListener("DOMContentLoaded", (function() {
    const sideBars = document.getElementsByClassName("w3-sidebar");
    for (var i = 0; i < sideBars.length; i++) {
        console.log("sideBars[i]: ", sideBars[i]);
        sideBars[i].getElementsByClassName("w3e-close")[0].addEventListener("click", (function() {
            this.parentElement.classList.add("w3-collapse");
        }));
        if (sideBars[i].nextElementSibling && sideBars[i].nextElementSibling.className.indexOf("w3e-open") > -1) {
            sideBars[i].nextElementSibling.addEventListener("click", (function() {
                this.previousElementSibling.classList.remove("w3-collapse");
            }));
        } else if (sideBars[i].nextElementSibling.getElementsByClassName("w3e-open")[0]) {
            sideBars[i].nextElementSibling.getElementsByClassName("w3e-open")[0].addEventListener("click", (function() {
                this.parentElement.previousElementSibling.classList.remove("w3-collapse");
            }));
        }
    }
    const tabs = document.getElementsByClassName("w3e-tabs");
    for (let i = 0; i < tabs.length; i++) {
        const tabElements = tabs[i].children;
        let defaultButtonID = null;
        for (let j = 0; j < tabElements.length; j++) {
            if (!tabElements[j].id.split("-tab")[0]) continue;
            if (null == defaultButtonID) defaultButtonID = tabElements[j].id.split("-tab")[0];
            const buttonID = tabElements[j].id.split("-tab")[0];
            console.log("buttonID: ", buttonID);
            document.getElementById(buttonID).addEventListener("click", (function() {
                const _this = this;
                const lastActive = _this.parentElement.getElementsByClassName("w3-theme-dark");
                for (let i = 0; i < lastActive.length; i++) {
                    lastActive[i].classList.remove("w3-theme-dark");
                }
                _this.classList.add("w3-theme-dark");
                for (let i = 0; i < tabElements.length; i++) {
                    tabElements[i].style.display = null;
                }
                tabElements[j].style.display = "block";
            }));
        }
        console.log("defaultButtonID: ", defaultButtonID);
        document.getElementById(defaultButtonID).click();
    }
    var accordions = document.getElementsByClassName("w3e-accordion");
    for (let i = 0; i < accordions.length; i++) {
        let children = accordions[i].children;
        console.log("children", accordions[i]);
        for (let j = 0; j < children.length; j++) {
            const buttonID = children[j].id.split("-acc")[0];
            if (buttonID && document.getElementById(buttonID)) {
                document.getElementById(buttonID).addEventListener("click", (function() {
                    if (children[j].className.indexOf("w3-show") == -1) {
                        children[j].className += " w3-show";
                    } else {
                        children[j].className = children[j].className.replace(" w3-show", "");
                    }
                }));
            }
        }
    }
    var sliders = document.getElementsByClassName("w3e-slider");
    console.log("sliders", sliders);
    for (let i = 0; i < sliders.length; i++) {
        if (slideIndex[i] == null) slideIndex[i] = 1;
        const slider = sliders[i];
        const images = slider.getElementsByClassName("w3e-slide");
        const buttons = slider.getElementsByClassName("w3-button");
        console.log("images", images);
        console.log("buttons", buttons);
        buttons[0].addEventListener("click", (function() {
            slideIndex[i] += -1;
            showImg(images, slideIndex[i], i);
        }));
        buttons[buttons.length - 1].addEventListener("click", (function() {
            slideIndex[i] += 1;
            showImg(images, slideIndex[i], i);
        }));
        showImg(images, 1, i);
    }
}));