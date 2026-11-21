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
            const groupButtons = [];
            const groupParents = [];
            for (let j = 0; j < tabElements.length; j++) {
                if (!tabElements[j].id.endsWith("-tab")) continue;
                const buttonID = tabElements[j].id.split("-tab")[0];
                const button = document.getElementById(buttonID);
                if (!button) continue;
                groupButtons.push(button);
                if (groupParents.indexOf(button.parentElement) === -1) {
                    groupParents.push(button.parentElement);
                }
                tabElements[j].setAttribute("role", "tabpanel");
                tabElements[j].setAttribute("aria-labelledby", buttonID);
                tabElements[j].setAttribute("tabindex", "0");
                button.setAttribute("role", "tab");
                button.setAttribute("aria-controls", tabElements[j].id);
                if (_w3eBound.has(button)) continue;
                _w3eBound.add(button);
                if (null == defaultButtonID) {
                    defaultButtonID = buttonID;
                    freshWiring = true;
                }
                const buttonIndex = groupButtons.length - 1;
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
                    for (let k = 0; k < groupButtons.length; k++) {
                        const active = groupButtons[k] === _this;
                        groupButtons[k].setAttribute("aria-selected", active ? "true" : "false");
                        groupButtons[k].setAttribute("tabindex", active ? "0" : "-1");
                    }
                });
                button.addEventListener("keydown", function(e) {
                    let next = null;
                    if (e.key === "ArrowRight") {
                        next = (buttonIndex + 1) % groupButtons.length;
                    } else if (e.key === "ArrowLeft") {
                        next = (buttonIndex - 1 + groupButtons.length) % groupButtons.length;
                    } else if (e.key === "Home") {
                        next = 0;
                    } else if (e.key === "End") {
                        next = groupButtons.length - 1;
                    }
                    if (next === null) return;
                    e.preventDefault();
                    groupButtons[next].click();
                    groupButtons[next].focus();
                });
            }
            if (groupParents.length === 1 && !groupParents[0].hasAttribute("role")) {
                groupParents[0].setAttribute("role", "tablist");
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
                dropdownButton.setAttribute("aria-haspopup", "true");
                dropdownButton.setAttribute("aria-expanded", barBlock.classList.contains("w3-show") ? "true" : "false");
                dropdownButton.addEventListener("click", function(e) {
                    e.preventDefault();
                    if (barBlock.className.indexOf("w3-show") > -1) {
                        _this.hide(barBlock);
                        dropdownButton.setAttribute("aria-expanded", "false");
                    } else {
                        _this.show(barBlock);
                        dropdownButton.setAttribute("aria-expanded", "true");
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
    fabs: function(root) {
        const fabs = (root || document).getElementsByClassName("w3e-fab");
        for (let i = 0; i < fabs.length; i++) {
            const fab = fabs[i];
            const mainButton = fab.getElementsByClassName("w3e-fab-main")[0];
            if (!mainButton || _w3eBound.has(mainButton)) continue;
            _w3eBound.add(mainButton);
            mainButton.setAttribute("aria-expanded", "false");
            mainButton.setAttribute("aria-haspopup", "true");
            mainButton.addEventListener("click", function() {
                const expanded = fab.classList.toggle("w3e-expanded");
                mainButton.setAttribute("aria-expanded", expanded ? "true" : "false");
            });
            const actions = fab.getElementsByClassName("w3e-fab-action");
            for (let j = 0; j < actions.length; j++) {
                if (_w3eBound.has(actions[j])) continue;
                _w3eBound.add(actions[j]);
                actions[j].addEventListener("click", function() {
                    fab.classList.remove("w3e-expanded");
                    mainButton.setAttribute("aria-expanded", "false");
                });
            }
        }
    },
    sheets: function(root) {
        const sheets = (root || document).getElementsByClassName("w3e-sheet");
        for (let i = 0; i < sheets.length; i++) {
            if (!sheets[i].id.endsWith("-sheet")) continue;
            const buttonID = sheets[i].id.split("-sheet")[0];
            const overlay = sheets[i];
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
            const closeSheet = function() {
                overlay.classList.remove("w3-show");
                overlay.classList.add("w3-hide");
                button.focus();
            };
            const closeButton = overlay.getElementsByClassName("w3e-close")[0];
            if (closeButton && !_w3eBound.has(closeButton)) {
                _w3eBound.add(closeButton);
                closeButton.addEventListener("click", closeSheet);
            }
            if (!_w3eBound.has(overlay)) {
                _w3eBound.add(overlay);
                overlay.addEventListener("click", function(e) {
                    if (e.target === overlay) closeSheet();
                });
                document.addEventListener("keydown", function(e) {
                    if (e.key === "Escape" && overlay.classList.contains("w3-show")) {
                        closeSheet();
                    }
                });
            }
        }
    },
    segments: function(root) {
        const segments = (root || document).getElementsByClassName("w3e-segment");
        for (let i = 0; i < segments.length; i++) {
            const buttons = segments[i].getElementsByClassName("w3e-segment-btn");
            for (let j = 0; j < buttons.length; j++) {
                if (_w3eBound.has(buttons[j])) continue;
                _w3eBound.add(buttons[j]);
                buttons[j].setAttribute("aria-pressed", buttons[j].classList.contains("w3e-active") ? "true" : "false");
                buttons[j].addEventListener("click", function() {
                    for (let k = 0; k < buttons.length; k++) {
                        buttons[k].classList.remove("w3e-active");
                        buttons[k].setAttribute("aria-pressed", "false");
                    }
                    this.classList.add("w3e-active");
                    this.setAttribute("aria-pressed", "true");
                });
            }
        }
    },
    searchBars: function(root) {
        (root || document).querySelectorAll("input.w3e-search[data-w3e-filter]").forEach(function(input) {
            if (_w3eBound.has(input)) return;
            _w3eBound.add(input);
            input.addEventListener("input", function() {
                const target = document.querySelector(input.getAttribute("data-w3e-filter"));
                if (!target) return;
                const needle = input.value.trim().toLowerCase();
                const items = target.children;
                for (let i = 0; i < items.length; i++) {
                    items[i].style.display = items[i].textContent.toLowerCase().indexOf(needle) > -1 ? "" : "none";
                }
            });
        });
    },
    toast: function(message, duration) {
        if (typeof document === "undefined") return;
        const toast = document.createElement("div");
        toast.className = "w3e-toast";
        toast.setAttribute("role", "status");
        toast.textContent = message;
        document.body.appendChild(toast);
        void toast.offsetWidth;
        toast.classList.add("w3-show");
        setTimeout(function() {
            toast.classList.remove("w3-show");
            setTimeout(function() {
                if (toast.parentElement) toast.parentElement.removeChild(toast);
            }, 400);
        }, duration || 3e3);
        return toast;
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
        const features = [ "sideBars", "tabs", "accordions", "sliders", "dropdowns", "panels", "modals", "fabs", "sheets", "segments", "searchBars" ];
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
