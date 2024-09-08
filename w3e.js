/*	MIT License
	Copyright (c) 2024, Emnawer (https://github.com/emnawer) */

const w3e = {
    updateBar: function(barID, update) {
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
    },
    ready: function(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback);
        } else {
            callback();
        }
    },
    showImg: function(images, n, slideArrayIndex, slideIndex) {
        if (n > images.length) {
            slideIndex[slideArrayIndex] = 1;
        }
        if (n < 1) {
            slideIndex[slideArrayIndex] = images.length;
        }
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace(" w3-show", "");
        }
        images[slideIndex[slideArrayIndex] - 1].className += " w3-show";
    },
    sideBars: function() {
        const sideBars = document.getElementsByClassName("w3-sidebar");
        for (var i = 0; i < sideBars.length; i++) {
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
    },
    tabs: function() {
        const tabs = document.getElementsByClassName("w3e-tabs");
        for (let i = 0; i < tabs.length; i++) {
            const tabElements = tabs[i].children;
            let defaultButtonID = null;
            for (let j = 0; j < tabElements.length; j++) {
                if (!tabElements[j].id.split("-tab")[0]) continue;
                if (null == defaultButtonID) defaultButtonID = tabElements[j].id.split("-tab")[0];
                const buttonID = tabElements[j].id.split("-tab")[0];
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
            document.getElementById(defaultButtonID).click();
        }
    },
    accordions: function() {
        document.querySelectorAll("*").forEach((function(child) {
            const buttonID = child.id.split("-acc")[0];
            if (buttonID + "-acc" == child.id && document.getElementById(buttonID)) {
                document.getElementById(buttonID).addEventListener("click", (function() {
                    const _this = this;
                    if (child.className.indexOf("w3-show") == -1) {
                        child.className += " w3-show";
                    } else {
                        child.className = child.className.replace(" w3-show", "");
                    }
                }));
            }
        }));
    },
    sliders: function() {
        const _this = this;
        var slideIndex = [];
        var sliders = document.getElementsByClassName("w3e-slider");
        for (let i = 0; i < sliders.length; i++) {
            if (slideIndex[i] == null) slideIndex[i] = 1;
            const slider = sliders[i];
            const images = slider.getElementsByClassName("w3e-slide");
            const buttons = slider.getElementsByClassName("w3-button");
            buttons[0].addEventListener("click", (function() {
                slideIndex[i] += -1;
                _this.showImg(images, slideIndex[i], i, slideIndex);
            }));
            buttons[buttons.length - 1].addEventListener("click", (function() {
                slideIndex[i] += 1;
                _this.showImg(images, slideIndex[i], i, slideIndex);
            }));
            _this.showImg(images, 1, i, slideIndex);
        }
    },
    modals: function() {
        var _this = this;
        const modal = document.getElementsByClassName("w3-modal");
        for (let i = 0; i < modal.length; i++) {
            if (!modal[i].id.split("-modal")[0]) continue;
            const buttonID = modal[i].id.split("-modal")[0];
            const button = document.getElementById(buttonID);
            if (!button) continue;
            button.addEventListener("click", (function(e) {
                modal[i].className += " w3-show";
                modal[i].className = modal[i].className.replace("w3-hide", "");
            }));
            modal[i].getElementsByClassName("w3e-close")[0].addEventListener("click", (function(e) {
                modal[i].className = modal[i].className.replace("w3-show", "");
                modal[i].className += " w3-hide";
            }));
        }
    },
    dropdowns: function() {
        const _this = this;
        const dropdownClicks = document.getElementsByClassName("w3-dropdown-click");
        for (let i = 0; i < dropdownClicks.length; i++) {
            const dropdownClick = dropdownClicks[i];
            const dropdownContent = dropdownClick.getElementsByClassName("w3-dropdown-content")[0];
            if (!dropdownContent) continue;
            dropdownClick.getElementsByClassName("w3-button")[0].addEventListener("click", (() => {
                if (dropdownContent.className.indexOf("w3-show") > -1) {
                    _this.hide(dropdownContent);
                } else {
                    _this.show(dropdownContent);
                }
            }));
            dropdownClick.addEventListener("mouseover", (() => {
                _this.show(dropdownContent);
            }));
            dropdownClick.addEventListener("mouseout", (() => {
                _this.hide(dropdownContent);
            }));
        }
    },
    panels: function() {
        const _this = this;
        const panels = document.getElementsByClassName("w3-panel");
        for (let i = 0; i < panels.length; i++) {
            const button = panels[i].getElementsByClassName("w3-button")[0];
            if (!button) continue;
            button.addEventListener("click", (function(e) {
                _this.hide(panels[i]);
            }));
        }
    },
    hide: function(obj) {
        if (typeof obj == "string") obj = document.getElementById(obj);
        obj.className = obj.className.replace("w3-show", "");
        if (obj.className.indexOf("-hide") == -1) obj.className += " w3-hide";
        obj.className = obj.className.replace("  ", " ");
    },
    show: function(obj) {
        if (typeof obj == "string") obj = document.getElementById(obj);
        obj.className = obj.className.replace("w3-hide", "");
        if (obj.className.indexOf("-show") == -1) obj.className += " w3-show";
        obj.className = obj.className.replace("  ", " ");
    }
};

w3e.ready(function(){w3e.sideBars(); w3e.tabs(); w3e.accordions(); w3e.sliders();w3e.dropdowns();w3e.panels();w3e.modals();});