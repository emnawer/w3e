/*	MIT License
	Copyright (c) 2026, Emnawer A. (https://github.com/emnawer) */
const _w3eBound = new WeakSet();

const w3e = {
    updateBar: function(barID, update) {
        const bar = document.getElementById(barID);
        if (!bar) return;
        var width = parseInt(bar.style.width);
        if (isNaN(width)) width = 0;
        bar.setAttribute("role", "progressbar");
        bar.setAttribute("aria-valuemin", "0");
        bar.setAttribute("aria-valuemax", "100");
        var newWidth = width + update;
        if (newWidth < 0) newWidth = 0;
        if (newWidth > 100) newWidth = 100;
        if (bar._w3eInterval) clearInterval(bar._w3eInterval);
        bar._w3eInterval = setInterval(function() {
            if (width == newWidth) {
                clearInterval(bar._w3eInterval);
            } else {
                width = width + (width < newWidth ? 1 : -1);
                bar.style.width = width + "%";
                bar.textContent = width + "%";
                bar.setAttribute("aria-valuenow", width);
            }
        }, 10);
    },
    ready: function(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback);
        } else {
            callback();
        }
    },
    showImg: function(images, n, slideArrayIndex, slideIndex) {
        if (!images || !images.length) return;
        if (n > images.length) {
            slideIndex[slideArrayIndex] = 1;
        }
        if (n < 1) {
            slideIndex[slideArrayIndex] = images.length;
        }
        for (let i = 0; i < images.length; i++) {
            images[i].classList.remove("w3-show");
        }
        images[slideIndex[slideArrayIndex] - 1].classList.add("w3-show");
    },
    sideBars: function(root) {
        const scope = root || document;
        const sideBars = scope.getElementsByClassName("w3-sidebar");
        for (var i = 0; i < sideBars.length; i++) {
            const closeButton = sideBars[i].getElementsByClassName("w3e-close")[0];
            if (closeButton && !_w3eBound.has(closeButton)) {
                _w3eBound.add(closeButton);
                closeButton.addEventListener("click", function() {
                    this.parentElement.classList.add("w3-collapse");
                });
            }
            if (sideBars[i].nextElementSibling && sideBars[i].nextElementSibling.className.indexOf("w3e-open") > -1) {
                if (!_w3eBound.has(sideBars[i].nextElementSibling)) {
                    _w3eBound.add(sideBars[i].nextElementSibling);
                    sideBars[i].nextElementSibling.addEventListener("click", function() {
                        this.previousElementSibling.classList.remove("w3-collapse");
                    });
                }
            } else if (sideBars[i].nextElementSibling && sideBars[i].nextElementSibling.getElementsByClassName("w3e-open")[0]) {
                const openButton = sideBars[i].nextElementSibling.getElementsByClassName("w3e-open")[0];
                if (!_w3eBound.has(openButton)) {
                    _w3eBound.add(openButton);
                    openButton.addEventListener("click", function() {
                        this.parentElement.previousElementSibling.classList.remove("w3-collapse");
                    });
                }
            }
        }
    },
    tabs: function(root) {
        const scope = root || document;
        const tabs = scope.getElementsByClassName("w3e-tabs");
        for (let i = 0; i < tabs.length; i++) {
            const tabElements = tabs[i].children;
            let defaultButtonID = null;
            let freshWiring = false;
            for (let j = 0; j < tabElements.length; j++) {
                if (!tabElements[j].id.endsWith("-tab")) continue;
                const buttonID = tabElements[j].id.split("-tab")[0];
                const button = document.getElementById(buttonID);
                if (!button || _w3eBound.has(button)) continue;
                _w3eBound.add(button);
                if (null == defaultButtonID) {
                    defaultButtonID = buttonID;
                    freshWiring = true;
                }
                button.setAttribute("aria-controls", tabElements[j].id);
                button.addEventListener("click", function() {
                    const _this = this;
                    const lastActive = _this.parentElement.getElementsByClassName("w3-theme-dark");
                    for (let i = 0; i < lastActive.length; i++) {
                        lastActive[i].classList.remove("w3-theme-dark");
                    }
                    _this.classList.add("w3-theme-dark");
                    for (let i = 0; i < tabElements.length; i++) {
                        tabElements[i].style.display = "";
                    }
                    tabElements[j].style.display = "block";
                });
            }
            if (defaultButtonID && freshWiring) document.getElementById(defaultButtonID).click();
        }
    },
    accordions: function(root) {
        (root || document).querySelectorAll('[id$="-acc"]').forEach(function(child) {
            const buttonID = child.id.split("-acc")[0];
            const button = document.getElementById(buttonID);
            if (!button || _w3eBound.has(button)) return;
            _w3eBound.add(button);
            button.setAttribute("aria-controls", child.id);
            button.setAttribute("aria-expanded", child.classList.contains("w3-show") ? "true" : "false");
            button.addEventListener("click", function() {
                const shown = child.classList.toggle("w3-show");
                button.setAttribute("aria-expanded", shown ? "true" : "false");
            });
        });
    },
    sliders: function(root) {
        const _this = this;
        var slideIndex = [];
        var sliders = (root || document).getElementsByClassName("w3e-slider");
        for (let i = 0; i < sliders.length; i++) {
            if (slideIndex[i] == null) slideIndex[i] = 1;
            const slider = sliders[i];
            const images = slider.getElementsByClassName("w3e-slide");
            const prevButton = slider.getElementsByClassName("w3-display-left")[0] || slider.getElementsByClassName("w3-button")[0];
            const w3Buttons = slider.getElementsByClassName("w3-button");
            const nextButton = slider.getElementsByClassName("w3-display-right")[0] || w3Buttons[w3Buttons.length - 1];
            if (prevButton && !_w3eBound.has(prevButton)) {
                _w3eBound.add(prevButton);
                prevButton.addEventListener("click", function() {
                    slideIndex[i] += -1;
                    _this.showImg(images, slideIndex[i], i, slideIndex);
                });
            }
            if (nextButton && nextButton !== prevButton && !_w3eBound.has(nextButton)) {
                _w3eBound.add(nextButton);
                nextButton.addEventListener("click", function() {
                    slideIndex[i] += 1;
                    _this.showImg(images, slideIndex[i], i, slideIndex);
                });
            }
            _this.showImg(images, 1, i, slideIndex);
        }
    },
    modals: function(root) {
        const modal = (root || document).getElementsByClassName("w3-modal");
        for (let i = 0; i < modal.length; i++) {
            if (!modal[i].id.endsWith("-modal")) continue;
            const buttonID = modal[i].id.split("-modal")[0];
            const overlay = modal[i];
            const button = document.getElementById(buttonID);
            if (!button) continue;
            overlay.setAttribute("role", "dialog");
            overlay.setAttribute("aria-modal", "true");
            if (!_w3eBound.has(button)) {
                _w3eBound.add(button);
                button.addEventListener("click", function(e) {
                    overlay.classList.add("w3-show");
                    overlay.classList.remove("w3-hide");
                });
            }
            const closeButton = overlay.getElementsByClassName("w3e-close")[0];
            if (closeButton && !_w3eBound.has(closeButton)) {
                _w3eBound.add(closeButton);
                const closeModal = function() {
                    overlay.classList.remove("w3-show");
                    overlay.classList.add("w3-hide");
                };
                closeButton.addEventListener("click", closeModal);
                document.addEventListener("keydown", function(e) {
                    if (e.key === "Escape" && overlay.classList.contains("w3-show")) {
                        closeModal();
                        button.focus();
                    }
                });
            }
        }
    },
    dropdowns: function(root) {
        const _this = this;
        const dropdownClicks = (root || document).getElementsByClassName("w3-dropdown-click");
        for (let i = 0; i < dropdownClicks.length; i++) {
            const dropdownClick = dropdownClicks[i];
            const barBlock = dropdownClick.getElementsByClassName("w3-bar-block")[0];
            const dropdownButton = dropdownClick.getElementsByClassName("w3-button")[0];
            if (barBlock && dropdownButton && !_w3eBound.has(dropdownButton)) {
                _w3eBound.add(dropdownButton);
                dropdownButton.addEventListener("click", () => {
                    if (barBlock.className.indexOf("w3-show") > -1) {
                        _this.hide(barBlock);
                    } else {
                        _this.show(barBlock);
                    }
                });
            }
            const dropdownContent = dropdownClick.getElementsByClassName("w3-dropdown-content")[0];
            if (dropdownContent && !_w3eBound.has(dropdownClick)) {
                _w3eBound.add(dropdownClick);
                dropdownClick.addEventListener("mouseenter", () => {
                    _this.show(dropdownContent);
                });
                dropdownClick.addEventListener("mouseleave", () => {
                    _this.hide(dropdownContent);
                });
            }
        }
    },
    panels: function(root) {
        const _this = this;
        const panels = (root || document).getElementsByClassName("w3-panel");
        for (let i = 0; i < panels.length; i++) {
            const button = panels[i].getElementsByClassName("w3-button")[0];
            if (!button || _w3eBound.has(button)) continue;
            _w3eBound.add(button);
            button.addEventListener("click", function(e) {
                _this.hide(panels[i]);
            });
        }
    },
    hide: function(obj) {
        if (typeof obj == "string") obj = document.getElementById(obj);
        if (!obj) return;
        obj.classList.remove("w3-show");
        obj.classList.add("w3-hide");
    },
    show: function(obj) {
        if (typeof obj == "string") obj = document.getElementById(obj);
        if (!obj) return;
        obj.classList.remove("w3-hide");
        obj.classList.add("w3-show");
    },
    apply: function(root) {
        const features = [ "sideBars", "tabs", "accordions", "sliders", "dropdowns", "panels", "modals" ];
        for (let i = 0; i < features.length; i++) {
            try {
                w3e[features[i]](root);
            } catch (e) {
                console.error("w3e." + features[i] + "() skipped, check its HTML structure:", e);
            }
        }
        return this;
    }
};

if (typeof document !== "undefined") {
    w3e.ready(function() {
        w3e.apply();
    });
    window.w3e = w3e;
}
export default w3e;
