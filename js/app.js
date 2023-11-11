(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function functions_getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function spollers() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                    spollerTitles.forEach((spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else spollerTitle.nextElementSibling.hidden = false;
                    }));
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", (function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                }));
            }));
        }
    }
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = functions_getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach(((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                initTabs(tabsBlock);
            }));
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems.forEach(((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsTitleItems[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("_tab-spoller");
                    } else {
                        tabsTitles.append(tabsTitleItems[index]);
                        tabsMediaItem.classList.remove("_tab-spoller");
                    }
                }));
            }));
        }
        function initTabs(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            if (tabsActiveHashBlock) {
                const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
            }
            if (tabsContent.length) {
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    tabsTitles[index].setAttribute("data-tabs-title", "");
                    tabsContentItem.setAttribute("data-tabs-item", "");
                    if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                    tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                }));
            }
        }
        function setTabsStatus(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            function isTabsAnamate(tabsBlock) {
                if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            const tabsBlockAnimate = isTabsAnamate(tabsBlock);
            if (tabsContent.length > 0) {
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    if (tabsTitles[index].classList.contains("_tab-active")) {
                        if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                        if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                }));
            }
        }
        function setTabsAction(e) {
            const el = e.target;
            if (el.closest("[data-tabs-title]")) {
                const tabTitle = el.closest("[data-tabs-title]");
                const tabsBlock = tabTitle.closest("[data-tabs]");
                if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                    let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                    tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                    tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                    tabTitle.classList.add("_tab-active");
                    setTabsStatus(tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    class Popup {
        constructor(options) {
            let config = {
                logging: true,
                init: true,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-popup-youtube",
                youtubePlaceAttribute: "data-popup-youtube-place",
                setAutoplayYoutube: true,
                classes: {
                    popup: "popup",
                    popupContent: "popup__content",
                    popupActive: "popup_show",
                    bodyActive: "popup-show"
                },
                focusCatch: true,
                closeEsc: true,
                bodyLock: true,
                hashSettings: {
                    location: true,
                    goHash: true
                },
                on: {
                    beforeOpen: function() {},
                    afterOpen: function() {},
                    beforeClose: function() {},
                    afterClose: function() {}
                }
            };
            this.youTubeCode;
            this.isOpen = false;
            this.targetOpen = {
                selector: false,
                element: false
            };
            this.previousOpen = {
                selector: false,
                element: false
            };
            this.lastClosed = {
                selector: false,
                element: false
            };
            this._dataValue = false;
            this.hash = false;
            this._reopen = false;
            this._selectorOpen = false;
            this.lastFocusEl = false;
            this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                hashSettings: {
                    ...config.hashSettings,
                    ...options?.hashSettings
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.bodyLock = false;
            this.options.init ? this.initPopups() : null;
        }
        initPopups() {
            this.popupLogging(`Проснулся`);
            this.eventsPopup();
        }
        eventsPopup() {
            document.addEventListener("click", function(e) {
                const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                if (buttonOpen) {
                    e.preventDefault();
                    this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                    this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                    if (this._dataValue !== "error") {
                        if (!this.isOpen) this.lastFocusEl = buttonOpen;
                        this.targetOpen.selector = `${this._dataValue}`;
                        this._selectorOpen = true;
                        this.open();
                        return;
                    } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                    return;
                }
                const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                if (this.options.closeEsc && e.which == 27 && e.code === "Escape" && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
                if (this.options.focusCatch && e.which == 9 && this.isOpen) {
                    this._focusCatch(e);
                    return;
                }
            }.bind(this));
            if (this.options.hashSettings.goHash) {
                window.addEventListener("hashchange", function() {
                    if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                }.bind(this));
                window.addEventListener("load", function() {
                    if (window.location.hash) this._openToHash();
                }.bind(this));
            }
        }
        open(selectorValue) {
            if (bodyLockStatus) {
                this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
                    this.targetOpen.selector = selectorValue;
                    this._selectorOpen = true;
                }
                if (this.isOpen) {
                    this._reopen = true;
                    this.close();
                }
                if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                if (!this._reopen) this.previousActiveElement = document.activeElement;
                this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                if (this.targetOpen.element) {
                    if (this.youTubeCode) {
                        const codeVideo = this.youTubeCode;
                        const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                        const iframe = document.createElement("iframe");
                        iframe.setAttribute("allowfullscreen", "");
                        const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                        iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                        iframe.setAttribute("src", urlVideo);
                        if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                        }
                        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                    }
                    if (this.options.hashSettings.location) {
                        this._getHash();
                        this._setHash();
                    }
                    this.options.on.beforeOpen(this);
                    document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.targetOpen.element.classList.add(this.options.classes.popupActive);
                    document.documentElement.classList.add(this.options.classes.bodyActive);
                    if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                    this.targetOpen.element.setAttribute("aria-hidden", "false");
                    this.previousOpen.selector = this.targetOpen.selector;
                    this.previousOpen.element = this.targetOpen.element;
                    this._selectorOpen = false;
                    this.isOpen = true;
                    setTimeout((() => {
                        this._focusTrap();
                    }), 50);
                    this.options.on.afterOpen(this);
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.popupLogging(`Открыл попап`);
                } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
            }
        }
        close(selectorValue) {
            if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") this.previousOpen.selector = selectorValue;
            if (!this.isOpen || !bodyLockStatus) return;
            this.options.on.beforeClose(this);
            document.dispatchEvent(new CustomEvent("beforePopupClose", {
                detail: {
                    popup: this
                }
            }));
            if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
            this.previousOpen.element.classList.remove(this.options.classes.popupActive);
            this.previousOpen.element.setAttribute("aria-hidden", "true");
            if (!this._reopen) {
                document.documentElement.classList.remove(this.options.classes.bodyActive);
                !this.bodyLock ? bodyUnlock() : null;
                this.isOpen = false;
            }
            this._removeHash();
            if (this._selectorOpen) {
                this.lastClosed.selector = this.previousOpen.selector;
                this.lastClosed.element = this.previousOpen.element;
            }
            this.options.on.afterClose(this);
            document.dispatchEvent(new CustomEvent("afterPopupClose", {
                detail: {
                    popup: this
                }
            }));
            setTimeout((() => {
                this._focusTrap();
            }), 50);
            this.popupLogging(`Закрыл попап`);
        }
        _getHash() {
            if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
        }
        _openToHash() {
            let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
            if (classInHash) {
                const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
                if (buttons && classInHash) this.open(classInHash);
            }
        }
        _setHash() {
            history.pushState("", "", this.hash);
        }
        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
            const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);
            if (e.shiftKey && focusedIndex === 0) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }
            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
        _focusTrap() {
            const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
            if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
        }
        popupLogging(message) {
            this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
        }
    }
    modules_flsModules.popup = new Popup({});
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if (formRequiredItem.dataset.required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (formRequiredItem.type === "radio" && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll(".select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    function formQuantity() {
        document.addEventListener("click", (function(e) {
            let targetElement = e.target;
            if (targetElement.closest(".quantity__button")) {
                let value = parseInt(targetElement.closest(".quantity").querySelector("input").value);
                if (targetElement.classList.contains("quantity__button_plus")) value++; else {
                    --value;
                    if (value < 1) value = 1;
                }
                targetElement.closest(".quantity").querySelector("input").value = value;
            }
        }));
    }
    class SelectConstructor {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.selectClasses = {
                classSelect: "select",
                classSelectBody: "select__body",
                classSelectTitle: "select__title",
                classSelectValue: "select__value",
                classSelectLabel: "select__label",
                classSelectInput: "select__input",
                classSelectText: "select__text",
                classSelectLink: "select__link",
                classSelectOptions: "select__options",
                classSelectOptionsScroll: "select__scroll",
                classSelectOption: "select__option",
                classSelectContent: "select__content",
                classSelectRow: "select__row",
                classSelectData: "select__asset",
                classSelectDisabled: "_select-disabled",
                classSelectTag: "_select-tag",
                classSelectOpen: "_select-open",
                classSelectActive: "_select-active",
                classSelectFocus: "_select-focus",
                classSelectMultiple: "_select-multiple",
                classSelectCheckBox: "_select-checkbox",
                classSelectOptionSelected: "_select-selected",
                classSelectPseudoLabel: "_select-pseudo-label"
            };
            this._this = this;
            if (this.config.init) {
                const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                if (selectItems.length) {
                    this.selectsInit(selectItems);
                    this.setLogging(`Проснулся, построил селектов: (${selectItems.length})`);
                } else this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
            }
        }
        getSelectClass(className) {
            return `.${className}`;
        }
        getSelectElement(selectItem, className) {
            return {
                originalSelect: selectItem.querySelector("select"),
                selectElement: selectItem.querySelector(this.getSelectClass(className))
            };
        }
        selectsInit(selectItems) {
            selectItems.forEach(((originalSelect, index) => {
                this.selectInit(originalSelect, index + 1);
            }));
            document.addEventListener("click", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusin", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusout", function(e) {
                this.selectsActions(e);
            }.bind(this));
        }
        selectInit(originalSelect, index) {
            const _this = this;
            let selectItem = document.createElement("div");
            selectItem.classList.add(this.selectClasses.classSelect);
            originalSelect.parentNode.insertBefore(selectItem, originalSelect);
            selectItem.appendChild(originalSelect);
            originalSelect.hidden = true;
            index ? originalSelect.dataset.id = index : null;
            if (this.getSelectPlaceholder(originalSelect)) {
                originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                if (this.getSelectPlaceholder(originalSelect).label.show) {
                    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                    selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                }
            }
            selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
            this.selectBuild(originalSelect);
            originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
            originalSelect.addEventListener("change", (function(e) {
                _this.selectChange(e);
            }));
        }
        selectBuild(originalSelect) {
            const selectItem = originalSelect.parentElement;
            selectItem.dataset.id = originalSelect.dataset.id;
            originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
            originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
            originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setOptions(selectItem, originalSelect);
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
            this.selectDisabled(selectItem, originalSelect);
        }
        selectsActions(e) {
            const targetElement = e.target;
            const targetType = e.type;
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                if (targetType === "click") {
                    if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                        const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                        this.optionAction(selectItem, originalSelect, optionItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                        const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                        this.optionAction(selectItem, originalSelect, optionItem);
                    }
                } else if (targetType === "focusin" || targetType === "focusout") {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) targetType === "focusin" ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                } else if (targetType === "keydown" && e.code === "Escape") this.selectsСlose();
            } else this.selectsСlose();
        }
        selectsСlose(selectOneGroup) {
            const selectsGroup = selectOneGroup ? selectOneGroup : document;
            const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
            if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                this.selectСlose(selectActiveItem);
            }));
        }
        selectСlose(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.remove(this.selectClasses.classSelectOpen);
                _slideUp(selectOptions, originalSelect.dataset.speed);
            }
        }
        selectAction(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (originalSelect.closest("[data-one-select]")) {
                const selectOneGroup = originalSelect.closest("[data-one-select]");
                this.selectsСlose(selectOneGroup);
            }
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                _slideToggle(selectOptions, originalSelect.dataset.speed);
            }
        }
        setSelectTitleValue(selectItem, originalSelect) {
            const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
            const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
            if (selectItemTitle) selectItemTitle.remove();
            selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
        }
        getSelectTitleValue(selectItem, originalSelect) {
            let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
            if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
                if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                    document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                    if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
                }
            }
            selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
            let pseudoAttribute = "";
            let pseudoAttributeClass = "";
            if (originalSelect.hasAttribute("data-pseudo-label")) {
                pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заполните атрибут"`;
                pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
            }
            this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
            if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`; else {
                const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
            }
        }
        getSelectElementContent(selectOption) {
            const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
            const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
            let selectOptionContentHTML = ``;
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
            selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
            selectOptionContentHTML += selectOption.textContent;
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            return selectOptionContentHTML;
        }
        getSelectPlaceholder(originalSelect) {
            const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
            if (selectPlaceholder) return {
                value: selectPlaceholder.textContent,
                show: selectPlaceholder.hasAttribute("data-show"),
                label: {
                    show: selectPlaceholder.hasAttribute("data-label"),
                    text: selectPlaceholder.dataset.label
                }
            };
        }
        getSelectedOptionsData(originalSelect, type) {
            let selectedOptions = [];
            if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
            return {
                elements: selectedOptions.map((option => option)),
                values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                html: selectedOptions.map((option => this.getSelectElementContent(option)))
            };
        }
        getOptions(originalSelect) {
            let selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
            let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : "";
            let selectOptions = Array.from(originalSelect.options);
            if (selectOptions.length > 0) {
                let selectOptionsHTML = ``;
                if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : "";
                selectOptions.forEach((selectOption => {
                    selectOptionsHTML += this.getOption(selectOption, originalSelect);
                }));
                selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
                return selectOptionsHTML;
            }
        }
        getOption(selectOption, originalSelect) {
            const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
            const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
            const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
            const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
            const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
            let selectOptionHTML = ``;
            selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
            selectOptionHTML += this.getSelectElementContent(selectOption);
            selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
            return selectOptionHTML;
        }
        setOptions(selectItem, originalSelect) {
            const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            selectItemOptions.innerHTML = this.getOptions(originalSelect);
        }
        optionAction(selectItem, originalSelect, optionItem) {
            if (originalSelect.multiple) {
                optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                    originalSelectSelectedItem.removeAttribute("selected");
                }));
                const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                selectSelectedItems.forEach((selectSelectedItems => {
                    originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                }));
            } else {
                if (!originalSelect.hasAttribute("data-show-selected")) {
                    if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                    optionItem.hidden = true;
                }
                originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                this.selectAction(selectItem);
            }
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setSelectChange(originalSelect);
        }
        selectChange(e) {
            const originalSelect = e.target;
            this.selectBuild(originalSelect);
            this.setSelectChange(originalSelect);
        }
        setSelectChange(originalSelect) {
            if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
            if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                let tempButton = document.createElement("button");
                tempButton.type = "submit";
                originalSelect.closest("form").append(tempButton);
                tempButton.click();
                tempButton.remove();
            }
            const selectItem = originalSelect.parentElement;
            this.selectCallback(selectItem, originalSelect);
        }
        selectDisabled(selectItem, originalSelect) {
            if (originalSelect.disabled) {
                selectItem.classList.add(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
            } else {
                selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
            }
        }
        searchActions(selectItem) {
            this.getSelectElement(selectItem).originalSelect;
            const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
            const _this = this;
            selectInput.addEventListener("input", (function() {
                selectOptionsItems.forEach((selectOptionsItem => {
                    if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                }));
                selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
            }));
        }
        selectCallback(selectItem, originalSelect) {
            document.dispatchEvent(new CustomEvent("selectCallback", {
                detail: {
                    select: originalSelect
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[select]: ${message}`) : null;
        }
    }
    modules_flsModules.select = new SelectConstructor({});
    function isObject(obj) {
        return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
    }
    function extend(target = {}, src = {}) {
        Object.keys(src).forEach((key => {
            if (typeof target[key] === "undefined") target[key] = src[key]; else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
        }));
    }
    const ssrDocument = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() {}
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return [];
                }
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function ssr_window_esm_getDocument() {
        const doc = typeof document !== "undefined" ? document : {};
        extend(doc, ssrDocument);
        return doc;
    }
    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return "";
                }
            };
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if (typeof setTimeout === "undefined") {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if (typeof setTimeout === "undefined") return;
            clearTimeout(id);
        }
    };
    function ssr_window_esm_getWindow() {
        const win = typeof window !== "undefined" ? window : {};
        extend(win, ssrWindow);
        return win;
    }
    function makeReactive(obj) {
        const proto = obj.__proto__;
        Object.defineProperty(obj, "__proto__", {
            get() {
                return proto;
            },
            set(value) {
                proto.__proto__ = value;
            }
        });
    }
    class Dom7 extends Array {
        constructor(items) {
            if (typeof items === "number") super(items); else {
                super(...items || []);
                makeReactive(this);
            }
        }
    }
    function arrayFlat(arr = []) {
        const res = [];
        arr.forEach((el => {
            if (Array.isArray(el)) res.push(...arrayFlat(el)); else res.push(el);
        }));
        return res;
    }
    function arrayFilter(arr, callback) {
        return Array.prototype.filter.call(arr, callback);
    }
    function arrayUnique(arr) {
        const uniqueArray = [];
        for (let i = 0; i < arr.length; i += 1) if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
        return uniqueArray;
    }
    function qsa(selector, context) {
        if (typeof selector !== "string") return [ selector ];
        const a = [];
        const res = context.querySelectorAll(selector);
        for (let i = 0; i < res.length; i += 1) a.push(res[i]);
        return a;
    }
    function dom7_esm_$(selector, context) {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        let arr = [];
        if (!context && selector instanceof Dom7) return selector;
        if (!selector) return new Dom7(arr);
        if (typeof selector === "string") {
            const html = selector.trim();
            if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                let toCreate = "div";
                if (html.indexOf("<li") === 0) toCreate = "ul";
                if (html.indexOf("<tr") === 0) toCreate = "tbody";
                if (html.indexOf("<td") === 0 || html.indexOf("<th") === 0) toCreate = "tr";
                if (html.indexOf("<tbody") === 0) toCreate = "table";
                if (html.indexOf("<option") === 0) toCreate = "select";
                const tempParent = document.createElement(toCreate);
                tempParent.innerHTML = html;
                for (let i = 0; i < tempParent.childNodes.length; i += 1) arr.push(tempParent.childNodes[i]);
            } else arr = qsa(selector.trim(), context || document);
        } else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (Array.isArray(selector)) {
            if (selector instanceof Dom7) return selector;
            arr = selector;
        }
        return new Dom7(arrayUnique(arr));
    }
    dom7_esm_$.fn = Dom7.prototype;
    function addClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        this.forEach((el => {
            el.classList.add(...classNames);
        }));
        return this;
    }
    function removeClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        this.forEach((el => {
            el.classList.remove(...classNames);
        }));
        return this;
    }
    function toggleClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        this.forEach((el => {
            classNames.forEach((className => {
                el.classList.toggle(className);
            }));
        }));
    }
    function hasClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        return arrayFilter(this, (el => classNames.filter((className => el.classList.contains(className))).length > 0)).length > 0;
    }
    function attr(attrs, value) {
        if (arguments.length === 1 && typeof attrs === "string") {
            if (this[0]) return this[0].getAttribute(attrs);
            return;
        }
        for (let i = 0; i < this.length; i += 1) if (arguments.length === 2) this[i].setAttribute(attrs, value); else for (const attrName in attrs) {
            this[i][attrName] = attrs[attrName];
            this[i].setAttribute(attrName, attrs[attrName]);
        }
        return this;
    }
    function removeAttr(attr) {
        for (let i = 0; i < this.length; i += 1) this[i].removeAttribute(attr);
        return this;
    }
    function transform(transform) {
        for (let i = 0; i < this.length; i += 1) this[i].style.transform = transform;
        return this;
    }
    function transition(duration) {
        for (let i = 0; i < this.length; i += 1) this[i].style.transitionDuration = typeof duration !== "string" ? `${duration}ms` : duration;
        return this;
    }
    function on(...args) {
        let [eventType, targetSelector, listener, capture] = args;
        if (typeof args[1] === "function") {
            [eventType, listener, capture] = args;
            targetSelector = void 0;
        }
        if (!capture) capture = false;
        function handleLiveEvent(e) {
            const target = e.target;
            if (!target) return;
            const eventData = e.target.dom7EventData || [];
            if (eventData.indexOf(e) < 0) eventData.unshift(e);
            if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData); else {
                const parents = dom7_esm_$(target).parents();
                for (let k = 0; k < parents.length; k += 1) if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
            }
        }
        function handleEvent(e) {
            const eventData = e && e.target ? e.target.dom7EventData || [] : [];
            if (eventData.indexOf(e) < 0) eventData.unshift(e);
            listener.apply(this, eventData);
        }
        const events = eventType.split(" ");
        let j;
        for (let i = 0; i < this.length; i += 1) {
            const el = this[i];
            if (!targetSelector) for (j = 0; j < events.length; j += 1) {
                const event = events[j];
                if (!el.dom7Listeners) el.dom7Listeners = {};
                if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
                el.dom7Listeners[event].push({
                    listener,
                    proxyListener: handleEvent
                });
                el.addEventListener(event, handleEvent, capture);
            } else for (j = 0; j < events.length; j += 1) {
                const event = events[j];
                if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
                if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
                el.dom7LiveListeners[event].push({
                    listener,
                    proxyListener: handleLiveEvent
                });
                el.addEventListener(event, handleLiveEvent, capture);
            }
        }
        return this;
    }
    function off(...args) {
        let [eventType, targetSelector, listener, capture] = args;
        if (typeof args[1] === "function") {
            [eventType, listener, capture] = args;
            targetSelector = void 0;
        }
        if (!capture) capture = false;
        const events = eventType.split(" ");
        for (let i = 0; i < events.length; i += 1) {
            const event = events[i];
            for (let j = 0; j < this.length; j += 1) {
                const el = this[j];
                let handlers;
                if (!targetSelector && el.dom7Listeners) handlers = el.dom7Listeners[event]; else if (targetSelector && el.dom7LiveListeners) handlers = el.dom7LiveListeners[event];
                if (handlers && handlers.length) for (let k = handlers.length - 1; k >= 0; k -= 1) {
                    const handler = handlers[k];
                    if (listener && handler.listener === listener) {
                        el.removeEventListener(event, handler.proxyListener, capture);
                        handlers.splice(k, 1);
                    } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                        el.removeEventListener(event, handler.proxyListener, capture);
                        handlers.splice(k, 1);
                    } else if (!listener) {
                        el.removeEventListener(event, handler.proxyListener, capture);
                        handlers.splice(k, 1);
                    }
                }
            }
        }
        return this;
    }
    function trigger(...args) {
        const window = ssr_window_esm_getWindow();
        const events = args[0].split(" ");
        const eventData = args[1];
        for (let i = 0; i < events.length; i += 1) {
            const event = events[i];
            for (let j = 0; j < this.length; j += 1) {
                const el = this[j];
                if (window.CustomEvent) {
                    const evt = new window.CustomEvent(event, {
                        detail: eventData,
                        bubbles: true,
                        cancelable: true
                    });
                    el.dom7EventData = args.filter(((data, dataIndex) => dataIndex > 0));
                    el.dispatchEvent(evt);
                    el.dom7EventData = [];
                    delete el.dom7EventData;
                }
            }
        }
        return this;
    }
    function transitionEnd(callback) {
        const dom = this;
        function fireCallBack(e) {
            if (e.target !== this) return;
            callback.call(this, e);
            dom.off("transitionend", fireCallBack);
        }
        if (callback) dom.on("transitionend", fireCallBack);
        return this;
    }
    function dom7_esm_outerWidth(includeMargins) {
        if (this.length > 0) {
            if (includeMargins) {
                const styles = this.styles();
                return this[0].offsetWidth + parseFloat(styles.getPropertyValue("margin-right")) + parseFloat(styles.getPropertyValue("margin-left"));
            }
            return this[0].offsetWidth;
        }
        return null;
    }
    function dom7_esm_outerHeight(includeMargins) {
        if (this.length > 0) {
            if (includeMargins) {
                const styles = this.styles();
                return this[0].offsetHeight + parseFloat(styles.getPropertyValue("margin-top")) + parseFloat(styles.getPropertyValue("margin-bottom"));
            }
            return this[0].offsetHeight;
        }
        return null;
    }
    function offset() {
        if (this.length > 0) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            const el = this[0];
            const box = el.getBoundingClientRect();
            const body = document.body;
            const clientTop = el.clientTop || body.clientTop || 0;
            const clientLeft = el.clientLeft || body.clientLeft || 0;
            const scrollTop = el === window ? window.scrollY : el.scrollTop;
            const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
            return {
                top: box.top + scrollTop - clientTop,
                left: box.left + scrollLeft - clientLeft
            };
        }
        return null;
    }
    function styles() {
        const window = ssr_window_esm_getWindow();
        if (this[0]) return window.getComputedStyle(this[0], null);
        return {};
    }
    function css(props, value) {
        const window = ssr_window_esm_getWindow();
        let i;
        if (arguments.length === 1) if (typeof props === "string") {
            if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
        } else {
            for (i = 0; i < this.length; i += 1) for (const prop in props) this[i].style[prop] = props[prop];
            return this;
        }
        if (arguments.length === 2 && typeof props === "string") {
            for (i = 0; i < this.length; i += 1) this[i].style[props] = value;
            return this;
        }
        return this;
    }
    function each(callback) {
        if (!callback) return this;
        this.forEach(((el, index) => {
            callback.apply(el, [ el, index ]);
        }));
        return this;
    }
    function filter(callback) {
        const result = arrayFilter(this, callback);
        return dom7_esm_$(result);
    }
    function html(html) {
        if (typeof html === "undefined") return this[0] ? this[0].innerHTML : null;
        for (let i = 0; i < this.length; i += 1) this[i].innerHTML = html;
        return this;
    }
    function dom7_esm_text(text) {
        if (typeof text === "undefined") return this[0] ? this[0].textContent.trim() : null;
        for (let i = 0; i < this.length; i += 1) this[i].textContent = text;
        return this;
    }
    function is(selector) {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        const el = this[0];
        let compareWith;
        let i;
        if (!el || typeof selector === "undefined") return false;
        if (typeof selector === "string") {
            if (el.matches) return el.matches(selector);
            if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
            if (el.msMatchesSelector) return el.msMatchesSelector(selector);
            compareWith = dom7_esm_$(selector);
            for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
            return false;
        }
        if (selector === document) return el === document;
        if (selector === window) return el === window;
        if (selector.nodeType || selector instanceof Dom7) {
            compareWith = selector.nodeType ? [ selector ] : selector;
            for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
            return false;
        }
        return false;
    }
    function index() {
        let child = this[0];
        let i;
        if (child) {
            i = 0;
            while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
            return i;
        }
        return;
    }
    function eq(index) {
        if (typeof index === "undefined") return this;
        const length = this.length;
        if (index > length - 1) return dom7_esm_$([]);
        if (index < 0) {
            const returnIndex = length + index;
            if (returnIndex < 0) return dom7_esm_$([]);
            return dom7_esm_$([ this[returnIndex] ]);
        }
        return dom7_esm_$([ this[index] ]);
    }
    function append(...els) {
        let newChild;
        const document = ssr_window_esm_getDocument();
        for (let k = 0; k < els.length; k += 1) {
            newChild = els[k];
            for (let i = 0; i < this.length; i += 1) if (typeof newChild === "string") {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = newChild;
                while (tempDiv.firstChild) this[i].appendChild(tempDiv.firstChild);
            } else if (newChild instanceof Dom7) for (let j = 0; j < newChild.length; j += 1) this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
        }
        return this;
    }
    function prepend(newChild) {
        const document = ssr_window_esm_getDocument();
        let i;
        let j;
        for (i = 0; i < this.length; i += 1) if (typeof newChild === "string") {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = newChild;
            for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        } else if (newChild instanceof Dom7) for (j = 0; j < newChild.length; j += 1) this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
        return this;
    }
    function next(selector) {
        if (this.length > 0) {
            if (selector) {
                if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) return dom7_esm_$([ this[0].nextElementSibling ]);
                return dom7_esm_$([]);
            }
            if (this[0].nextElementSibling) return dom7_esm_$([ this[0].nextElementSibling ]);
            return dom7_esm_$([]);
        }
        return dom7_esm_$([]);
    }
    function nextAll(selector) {
        const nextEls = [];
        let el = this[0];
        if (!el) return dom7_esm_$([]);
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if (dom7_esm_$(next).is(selector)) nextEls.push(next);
            } else nextEls.push(next);
            el = next;
        }
        return dom7_esm_$(nextEls);
    }
    function prev(selector) {
        if (this.length > 0) {
            const el = this[0];
            if (selector) {
                if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) return dom7_esm_$([ el.previousElementSibling ]);
                return dom7_esm_$([]);
            }
            if (el.previousElementSibling) return dom7_esm_$([ el.previousElementSibling ]);
            return dom7_esm_$([]);
        }
        return dom7_esm_$([]);
    }
    function prevAll(selector) {
        const prevEls = [];
        let el = this[0];
        if (!el) return dom7_esm_$([]);
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
            } else prevEls.push(prev);
            el = prev;
        }
        return dom7_esm_$(prevEls);
    }
    function dom7_esm_parent(selector) {
        const parents = [];
        for (let i = 0; i < this.length; i += 1) if (this[i].parentNode !== null) if (selector) {
            if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
        } else parents.push(this[i].parentNode);
        return dom7_esm_$(parents);
    }
    function parents(selector) {
        const parents = [];
        for (let i = 0; i < this.length; i += 1) {
            let parent = this[i].parentNode;
            while (parent) {
                if (selector) {
                    if (dom7_esm_$(parent).is(selector)) parents.push(parent);
                } else parents.push(parent);
                parent = parent.parentNode;
            }
        }
        return dom7_esm_$(parents);
    }
    function closest(selector) {
        let closest = this;
        if (typeof selector === "undefined") return dom7_esm_$([]);
        if (!closest.is(selector)) closest = closest.parents(selector).eq(0);
        return closest;
    }
    function find(selector) {
        const foundElements = [];
        for (let i = 0; i < this.length; i += 1) {
            const found = this[i].querySelectorAll(selector);
            for (let j = 0; j < found.length; j += 1) foundElements.push(found[j]);
        }
        return dom7_esm_$(foundElements);
    }
    function children(selector) {
        const children = [];
        for (let i = 0; i < this.length; i += 1) {
            const childNodes = this[i].children;
            for (let j = 0; j < childNodes.length; j += 1) if (!selector || dom7_esm_$(childNodes[j]).is(selector)) children.push(childNodes[j]);
        }
        return dom7_esm_$(children);
    }
    function remove() {
        for (let i = 0; i < this.length; i += 1) if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
        return this;
    }
    const noTrigger = "resize scroll".split(" ");
    function shortcut(name) {
        function eventHandler(...args) {
            if (typeof args[0] === "undefined") {
                for (let i = 0; i < this.length; i += 1) if (noTrigger.indexOf(name) < 0) if (name in this[i]) this[i][name](); else dom7_esm_$(this[i]).trigger(name);
                return this;
            }
            return this.on(name, ...args);
        }
        return eventHandler;
    }
    shortcut("click");
    shortcut("blur");
    shortcut("focus");
    shortcut("focusin");
    shortcut("focusout");
    shortcut("keyup");
    shortcut("keydown");
    shortcut("keypress");
    shortcut("submit");
    shortcut("change");
    shortcut("mousedown");
    shortcut("mousemove");
    shortcut("mouseup");
    shortcut("mouseenter");
    shortcut("mouseleave");
    shortcut("mouseout");
    shortcut("mouseover");
    shortcut("touchstart");
    shortcut("touchend");
    shortcut("touchmove");
    shortcut("resize");
    shortcut("scroll");
    const Methods = {
        addClass,
        removeClass,
        hasClass,
        toggleClass,
        attr,
        removeAttr,
        transform,
        transition,
        on,
        off,
        trigger,
        transitionEnd,
        outerWidth: dom7_esm_outerWidth,
        outerHeight: dom7_esm_outerHeight,
        styles,
        offset,
        css,
        each,
        html,
        text: dom7_esm_text,
        is,
        index,
        eq,
        append,
        prepend,
        next,
        nextAll,
        prev,
        prevAll,
        parent: dom7_esm_parent,
        parents,
        closest,
        find,
        children,
        filter,
        remove
    };
    Object.keys(Methods).forEach((methodName => {
        Object.defineProperty(dom7_esm_$.fn, methodName, {
            value: Methods[methodName],
            writable: true
        });
    }));
    const dom = dom7_esm_$;
    function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach((key => {
            try {
                object[key] = null;
            } catch (e) {}
            try {
                delete object[key];
            } catch (e) {}
        }));
    }
    function utils_nextTick(callback, delay = 0) {
        return setTimeout(callback, delay);
    }
    function utils_now() {
        return Date.now();
    }
    function utils_getComputedStyle(el) {
        const window = ssr_window_esm_getWindow();
        let style;
        if (window.getComputedStyle) style = window.getComputedStyle(el, null);
        if (!style && el.currentStyle) style = el.currentStyle;
        if (!style) style = el.style;
        return style;
    }
    function utils_getTranslate(el, axis = "x") {
        const window = ssr_window_esm_getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = utils_getComputedStyle(el, null);
        if (window.WebKitCSSMatrix) {
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
            transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
            matrix = transformMatrix.toString().split(",");
        }
        if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
        if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
        return curTransform || 0;
    }
    function utils_isObject(o) {
        return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
    }
    function isNode(node) {
        if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
        return node && (node.nodeType === 1 || node.nodeType === 11);
    }
    function utils_extend(...args) {
        const to = Object(args[0]);
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        for (let i = 1; i < args.length; i += 1) {
            const nextSource = args[i];
            if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
                const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== void 0 && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                        to[nextKey] = {};
                        if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                    } else to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    function utils_setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll({swiper, targetPosition, side}) {
        const window = ssr_window_esm_getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = "none";
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? "next" : "prev";
        const isOutOfBound = (current, target) => dir === "next" && current >= target || dir === "prev" && current <= target;
        const animate = () => {
            time = (new Date).getTime();
            if (startTime === null) startTime = time;
            const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
            let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
            if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
            swiper.wrapperEl.scrollTo({
                [side]: currentPosition
            });
            if (isOutOfBound(currentPosition, targetPosition)) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.scrollSnapType = "";
                setTimeout((() => {
                    swiper.wrapperEl.style.overflow = "";
                    swiper.wrapperEl.scrollTo({
                        [side]: currentPosition
                    });
                }));
                window.cancelAnimationFrame(swiper.cssModeFrameID);
                return;
            }
            swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
        animate();
    }
    let support;
    function calcSupport() {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        return {
            smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
            passiveListener: function checkPassiveListener() {
                let supportsPassive = false;
                try {
                    const opts = Object.defineProperty({}, "passive", {
                        get() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener("testPassiveListener", null, opts);
                } catch (e) {}
                return supportsPassive;
            }(),
            gestures: function checkGestures() {
                return "ongesturestart" in window;
            }()
        };
    }
    function getSupport() {
        if (!support) support = calcSupport();
        return support;
    }
    let deviceCached;
    function calcDevice({userAgent} = {}) {
        const support = getSupport();
        const window = ssr_window_esm_getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
            ios: false,
            android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = platform === "Win32";
        let macos = platform === "MacIntel";
        const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
            ipad = ua.match(/(Version)\/([\d.]+)/);
            if (!ipad) ipad = [ 0, 1, "13_0_0" ];
            macos = false;
        }
        if (android && !windows) {
            device.os = "android";
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = "ios";
            device.ios = true;
        }
        return device;
    }
    function getDevice(overrides = {}) {
        if (!deviceCached) deviceCached = calcDevice(overrides);
        return deviceCached;
    }
    let browser;
    function calcBrowser() {
        const window = ssr_window_esm_getWindow();
        function isSafari() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
        }
        return {
            isSafari: isSafari(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
        };
    }
    function getBrowser() {
        if (!browser) browser = calcBrowser();
        return browser;
    }
    function Resize({swiper, on, emit}) {
        const window = ssr_window_esm_getWindow();
        let observer = null;
        let animationFrame = null;
        const resizeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("beforeResize");
            emit("resize");
        };
        const createObserver = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            observer = new ResizeObserver((entries => {
                animationFrame = window.requestAnimationFrame((() => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach((({contentBoxSize, contentRect, target}) => {
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    }));
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                }));
            }));
            observer.observe(swiper.el);
        };
        const removeObserver = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            if (observer && observer.unobserve && swiper.el) {
                observer.unobserve(swiper.el);
                observer = null;
            }
        };
        const orientationChangeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("orientationchange");
        };
        on("init", (() => {
            if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
                createObserver();
                return;
            }
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationchange", orientationChangeHandler);
        }));
        on("destroy", (() => {
            removeObserver();
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationChangeHandler);
        }));
    }
    function Observer({swiper, extendParams, on, emit}) {
        const observers = [];
        const window = ssr_window_esm_getWindow();
        const attach = (target, options = {}) => {
            const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            const observer = new ObserverFunc((mutations => {
                if (mutations.length === 1) {
                    emit("observerUpdate", mutations[0]);
                    return;
                }
                const observerUpdate = function observerUpdate() {
                    emit("observerUpdate", mutations[0]);
                };
                if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
            }));
            observer.observe(target, {
                attributes: typeof options.attributes === "undefined" ? true : options.attributes,
                childList: typeof options.childList === "undefined" ? true : options.childList,
                characterData: typeof options.characterData === "undefined" ? true : options.characterData
            });
            observers.push(observer);
        };
        const init = () => {
            if (!swiper.params.observer) return;
            if (swiper.params.observeParents) {
                const containerParents = swiper.$el.parents();
                for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
            }
            attach(swiper.$el[0], {
                childList: swiper.params.observeSlideChildren
            });
            attach(swiper.$wrapperEl[0], {
                attributes: false
            });
        };
        const destroy = () => {
            observers.forEach((observer => {
                observer.disconnect();
            }));
            observers.splice(0, observers.length);
        };
        extendParams({
            observer: false,
            observeParents: false,
            observeSlideChildren: false
        });
        on("init", init);
        on("destroy", destroy);
    }
    const events_emitter = {
        on(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            events.split(" ").forEach((event => {
                if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                self.eventsListeners[event][method](handler);
            }));
            return self;
        },
        once(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            function onceHandler(...args) {
                self.off(events, onceHandler);
                if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                handler.apply(self, args);
            }
            onceHandler.__emitterProxy = handler;
            return self.on(events, onceHandler, priority);
        },
        onAny(handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
            return self;
        },
        offAny(handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsAnyListeners) return self;
            const index = self.eventsAnyListeners.indexOf(handler);
            if (index >= 0) self.eventsAnyListeners.splice(index, 1);
            return self;
        },
        off(events, handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            events.split(" ").forEach((event => {
                if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                    if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                }));
            }));
            return self;
        },
        emit(...args) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            let events;
            let data;
            let context;
            if (typeof args[0] === "string" || Array.isArray(args[0])) {
                events = args[0];
                data = args.slice(1, args.length);
                context = self;
            } else {
                events = args[0].events;
                data = args[0].data;
                context = args[0].context || self;
            }
            data.unshift(context);
            const eventsArray = Array.isArray(events) ? events : events.split(" ");
            eventsArray.forEach((event => {
                if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                    eventHandler.apply(context, [ event, ...data ]);
                }));
                if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                    eventHandler.apply(context, data);
                }));
            }));
            return self;
        }
    };
    function updateSize() {
        const swiper = this;
        let width;
        let height;
        const $el = swiper.$el;
        if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width; else width = $el[0].clientWidth;
        if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height; else height = $el[0].clientHeight;
        if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
        width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
        height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
            width,
            height,
            size: swiper.isHorizontal() ? width : height
        });
    }
    function updateSlides() {
        const swiper = this;
        function getDirectionLabel(property) {
            if (swiper.isHorizontal()) return property;
            return {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[property];
        }
        function getDirectionPropertyValue(node, label) {
            return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
        }
        const params = swiper.params;
        const {$wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
        if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
        let offsetAfter = params.slidesOffsetAfter;
        if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
        if (typeof swiperSize === "undefined") return;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
        swiper.virtualSize = -spaceBetween;
        if (rtl) slides.css({
            marginLeft: "",
            marginBottom: "",
            marginTop: ""
        }); else slides.css({
            marginRight: "",
            marginBottom: "",
            marginTop: ""
        });
        if (params.centeredSlides && params.cssMode) {
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
        }
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
        if (gridEnabled) swiper.grid.initSlides(slidesLength);
        let slideSize;
        const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key => typeof params.breakpoints[key].slidesPerView !== "undefined")).length > 0;
        for (let i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            const slide = slides.eq(i);
            if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
            if (slide.css("display") === "none") continue;
            if (params.slidesPerView === "auto") {
                if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                const slideStyles = getComputedStyle(slide[0]);
                const currentTransform = slide[0].style.transform;
                const currentWebKitTransform = slide[0].style.webkitTransform;
                if (currentTransform) slide[0].style.transform = "none";
                if (currentWebKitTransform) slide[0].style.webkitTransform = "none";
                if (params.roundLengths) slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true); else {
                    const width = getDirectionPropertyValue(slideStyles, "width");
                    const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                    const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                    const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                    const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                    const boxSizing = slideStyles.getPropertyValue("box-sizing");
                    if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight; else {
                        const {clientWidth, offsetWidth} = slide[0];
                        slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                    }
                }
                if (currentTransform) slide[0].style.transform = currentTransform;
                if (currentWebKitTransform) slide[0].style.webkitTransform = currentWebKitTransform;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
            } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
            }
            if (slides[i]) slides[i].swiperSlideSize = slideSize;
            slidesSizesGrid.push(slideSize);
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }
            swiper.virtualSize += slideSize + spaceBetween;
            prevSlideSize = slideSize;
            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) $wrapperEl.css({
            width: `${swiper.virtualSize + params.spaceBetween}px`
        });
        if (params.setWrapperSize) $wrapperEl.css({
            [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
        });
        if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
        if (!params.centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
        }
        if (snapGrid.length === 0) snapGrid = [ 0 ];
        if (params.spaceBetween !== 0) {
            const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
            slides.filter(((_, slideIndex) => {
                if (!params.cssMode) return true;
                if (slideIndex === slides.length - 1) return false;
                return true;
            })).css({
                [key]: `${spaceBetween}px`
            });
        }
        if (params.centeredSlides && params.centeredSlidesBounds) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
            }));
            allSlidesSize -= params.spaceBetween;
            const maxSnap = allSlidesSize - swiperSize;
            snapGrid = snapGrid.map((snap => {
                if (snap < 0) return -offsetBefore;
                if (snap > maxSnap) return maxSnap + offsetAfter;
                return snap;
            }));
        }
        if (params.centerInsufficientSlides) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
            }));
            allSlidesSize -= params.spaceBetween;
            if (allSlidesSize < swiperSize) {
                const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                snapGrid.forEach(((snap, snapIndex) => {
                    snapGrid[snapIndex] = snap - allSlidesOffset;
                }));
                slidesGrid.forEach(((snap, snapIndex) => {
                    slidesGrid[snapIndex] = snap + allSlidesOffset;
                }));
            }
        }
        Object.assign(swiper, {
            slides,
            snapGrid,
            slidesGrid,
            slidesSizesGrid
        });
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
            const addToSnapGrid = -swiper.snapGrid[0];
            const addToSlidesGrid = -swiper.slidesGrid[0];
            swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
            swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
        }
        if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            swiper.emit("snapGridLengthChange");
        }
        if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
            const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
            const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
            if (slidesLength <= params.maxBackfaceHiddenSlides) {
                if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
            } else if (hasClassBackfaceClassAdded) swiper.$el.removeClass(backFaceHiddenClass);
        }
    }
    function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
        if (typeof speed === "number") swiper.setTransition(speed); else if (speed === true) swiper.setTransition(swiper.params.speed);
        const getSlideByIndex = index => {
            if (isVirtual) return swiper.slides.filter((el => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index))[0];
            return swiper.slides.eq(index)[0];
        };
        if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || dom([])).each((slide => {
            activeSlides.push(slide);
        })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
        } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
        for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
        }
        if (newHeight || newHeight === 0) swiper.$wrapperEl.css("height", `${newHeight}px`);
    }
    function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
        for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
    function updateSlidesProgress(translate = this && this.translate || 0) {
        const swiper = this;
        const params = swiper.params;
        const {slides, rtlTranslate: rtl, snapGrid} = swiper;
        if (slides.length === 0) return;
        if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate;
        slides.removeClass(params.slideVisibleClass);
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            let slideOffset = slide.swiperSlideOffset;
            if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
            const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
            const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
            const slideBefore = -(offsetCenter - slideOffset);
            const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
            const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
            if (isVisible) {
                swiper.visibleSlides.push(slide);
                swiper.visibleSlidesIndexes.push(i);
                slides.eq(i).addClass(params.slideVisibleClass);
            }
            slide.progress = rtl ? -slideProgress : slideProgress;
            slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
        swiper.visibleSlides = dom(swiper.visibleSlides);
    }
    function updateProgress(translate) {
        const swiper = this;
        if (typeof translate === "undefined") {
            const multiplier = swiper.rtlTranslate ? -1 : 1;
            translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {progress, isBeginning, isEnd} = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
        if (translatesDiff === 0) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            isBeginning = progress <= 0;
            isEnd = progress >= 1;
        }
        Object.assign(swiper, {
            progress,
            isBeginning,
            isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
        if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
        if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
        swiper.emit("progress", progress);
    }
    function updateSlidesClasses() {
        const swiper = this;
        const {slides, params, $wrapperEl, activeIndex, realIndex} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
        let activeSlide;
        if (isVirtual) activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides.eq(activeIndex);
        activeSlide.addClass(params.slideActiveClass);
        if (params.loop) if (activeSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
        let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
        if (params.loop && nextSlide.length === 0) {
            nextSlide = slides.eq(0);
            nextSlide.addClass(params.slideNextClass);
        }
        let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
        if (params.loop && prevSlide.length === 0) {
            prevSlide = slides.eq(-1);
            prevSlide.addClass(params.slidePrevClass);
        }
        if (params.loop) {
            if (nextSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
            if (prevSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
        }
        swiper.emitSlidesClasses();
    }
    function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {slidesGrid, snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
        if (typeof activeIndex === "undefined") {
            for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
                if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
            } else if (translate >= slidesGrid[i]) activeIndex = i;
            if (params.normalizeSlideIndex) if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
        }
        if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
            const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
            snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        if (activeIndex === previousIndex) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit("snapIndexChange");
            }
            return;
        }
        const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
        Object.assign(swiper, {
            snapIndex,
            realIndex,
            previousIndex,
            activeIndex
        });
        swiper.emit("activeIndexChange");
        swiper.emit("snapIndexChange");
        if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
        if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
    }
    function updateClickedSlide(e) {
        const swiper = this;
        const params = swiper.params;
        const slide = dom(e).closest(`.${params.slideClass}`)[0];
        let slideFound = false;
        let slideIndex;
        if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
        }
        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
        } else {
            swiper.clickedSlide = void 0;
            swiper.clickedIndex = void 0;
            return;
        }
        if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
    }
    const update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
    };
    function getSwiperTranslate(axis = (this.isHorizontal() ? "x" : "y")) {
        const swiper = this;
        const {params, rtlTranslate: rtl, translate, $wrapperEl} = swiper;
        if (params.virtualTranslate) return rtl ? -translate : translate;
        if (params.cssMode) return translate;
        let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
    }
    function setTranslate(translate, byController) {
        const swiper = this;
        const {rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress} = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
        if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== progress) swiper.updateProgress(translate);
        swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
        return -this.snapGrid[0];
    }
    function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
        const swiper = this;
        const {params, wrapperEl} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition) return false;
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
        swiper.updateProgress(newTranslate);
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: -newTranslate,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: -newTranslate,
                    behavior: "smooth"
                });
            }
            return true;
        }
        if (speed === 0) {
            swiper.setTransition(0);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionEnd");
            }
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionStart");
            }
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.onTranslateToWrapperTransitionEnd = null;
                    delete swiper.onTranslateToWrapperTransitionEnd;
                    if (runCallbacks) swiper.emit("transitionEnd");
                };
                swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
            }
        }
        return true;
    }
    const translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
    };
    function setTransition(duration, byController) {
        const swiper = this;
        if (!swiper.params.cssMode) swiper.$wrapperEl.transition(duration);
        swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit({swiper, runCallbacks, direction, step}) {
        const {activeIndex, previousIndex} = swiper;
        let dir = direction;
        if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
        swiper.emit(`transition${step}`);
        if (runCallbacks && activeIndex !== previousIndex) {
            if (dir === "reset") {
                swiper.emit(`slideResetTransition${step}`);
                return;
            }
            swiper.emit(`slideChangeTransition${step}`);
            if (dir === "next") swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
        }
    }
    function transitionStart_transitionStart(runCallbacks = true, direction) {
        const swiper = this;
        const {params} = swiper;
        if (params.cssMode) return;
        if (params.autoHeight) swiper.updateAutoHeight();
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "Start"
        });
    }
    function transitionEnd_transitionEnd(runCallbacks = true, direction) {
        const swiper = this;
        const {params} = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "End"
        });
    }
    const core_transition = {
        setTransition,
        transitionStart: transitionStart_transitionStart,
        transitionEnd: transitionEnd_transitionEnd
    };
    function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
        if (typeof index !== "number" && typeof index !== "string") throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
        if (typeof index === "string") {
            const indexAsNumber = parseInt(index, 10);
            const isValidNumber = isFinite(indexAsNumber);
            if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
            index = indexAsNumber;
        }
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        const translate = -snapGrid[snapIndex];
        if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(translate * 100);
            const normalizedGrid = Math.floor(slidesGrid[i] * 100);
            const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
            if (typeof slidesGrid[i + 1] !== "undefined") {
                if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
            } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
        }
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
        }
        if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
        swiper.updateProgress(translate);
        let direction;
        if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
        if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
            swiper.updateActiveIndex(slideIndex);
            if (params.autoHeight) swiper.updateAutoHeight();
            swiper.updateSlidesClasses();
            if (params.effect !== "slide") swiper.setTranslate(translate);
            if (direction !== "reset") {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            const t = rtl ? translate : -translate;
            if (speed === 0) {
                const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                if (isVirtual) {
                    swiper.wrapperEl.style.scrollSnapType = "none";
                    swiper._immediateVirtual = true;
                }
                wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                if (isVirtual) requestAnimationFrame((() => {
                    swiper.wrapperEl.style.scrollSnapType = "";
                    swiper._swiperImmediateVirtual = false;
                }));
            } else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: t,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: t,
                    behavior: "smooth"
                });
            }
            return true;
        }
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (speed === 0) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
            swiper.animating = true;
            if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
                swiper.onSlideToWrapperTransitionEnd = null;
                delete swiper.onSlideToWrapperTransitionEnd;
                swiper.transitionEnd(runCallbacks, direction);
            };
            swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
        }
        return true;
    }
    function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
        if (typeof index === "string") {
            const indexAsNumber = parseInt(index, 10);
            const isValidNumber = isFinite(indexAsNumber);
            if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
            index = indexAsNumber;
        }
        const swiper = this;
        let newIndex = index;
        if (swiper.params.loop) newIndex += swiper.loopedSlides;
        return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }
    function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        const {animating, enabled, params} = swiper;
        if (!enabled) return swiper;
        let perGroup = params.slidesPerGroup;
        if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
        if (params.loop) {
            if (animating && params.loopPreventsSlide) return false;
            swiper.loopFix();
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        }
        if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        const {params, animating, snapGrid, slidesGrid, rtlTranslate, enabled} = swiper;
        if (!enabled) return swiper;
        if (params.loop) {
            if (animating && params.loopPreventsSlide) return false;
            swiper.loopFix();
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        }
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) return -Math.floor(Math.abs(val));
            return Math.floor(val);
        }
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        if (typeof prevSnap === "undefined" && params.cssMode) {
            let prevSnapIndex;
            snapGrid.forEach(((snap, snapIndex) => {
                if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
            }));
            if (typeof prevSnapIndex !== "undefined") prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
        let prevIndex = 0;
        if (typeof prevSnap !== "undefined") {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
            if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
                prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                prevIndex = Math.max(prevIndex, 0);
            }
        }
        if (params.rewind && swiper.isBeginning) {
            const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
            return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = .5) {
        const swiper = this;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        if (translate >= swiper.snapGrid[snapIndex]) {
            const currentSnap = swiper.snapGrid[snapIndex];
            const nextSnap = swiper.snapGrid[snapIndex + 1];
            if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
        } else {
            const prevSnap = swiper.snapGrid[snapIndex - 1];
            const currentSnap = swiper.snapGrid[snapIndex];
            if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
        }
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
        const swiper = this;
        const {params, $wrapperEl} = swiper;
        const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.clickedIndex;
        let realIndex;
        if (params.loop) {
            if (swiper.animating) return;
            realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
            if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                swiper.loopFix();
                slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                swiper.loopFix();
                slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex);
        } else swiper.slideTo(slideToIndex);
    }
    const slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
    };
    function loopCreate() {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const {params, $wrapperEl} = swiper;
        const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
        $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
        let slides = $selector.children(`.${params.slideClass}`);
        if (params.loopFillGroupWithBlank) {
            const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
            if (blankSlidesNum !== params.slidesPerGroup) {
                for (let i = 0; i < blankSlidesNum; i += 1) {
                    const blankNode = dom(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
                    $selector.append(blankNode);
                }
                slides = $selector.children(`.${params.slideClass}`);
            }
        }
        if (params.slidesPerView === "auto" && !params.loopedSlides) params.loopedSlides = slides.length;
        swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
        swiper.loopedSlides += params.loopAdditionalSlides;
        if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) swiper.loopedSlides = slides.length;
        const prependSlides = [];
        const appendSlides = [];
        slides.each(((el, index) => {
            const slide = dom(el);
            slide.attr("data-swiper-slide-index", index);
        }));
        for (let i = 0; i < swiper.loopedSlides; i += 1) {
            const index = i - Math.floor(i / slides.length) * slides.length;
            appendSlides.push(slides.eq(index)[0]);
            prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
        }
        for (let i = 0; i < appendSlides.length; i += 1) $selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        for (let i = prependSlides.length - 1; i >= 0; i -= 1) $selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
    function loopFix() {
        const swiper = this;
        swiper.emit("beforeLoopFix");
        const {activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl} = swiper;
        let newIndex;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        const snapTranslate = -snapGrid[activeIndex];
        const diff = snapTranslate - swiper.getTranslate();
        if (activeIndex < loopedSlides) {
            newIndex = slides.length - loopedSlides * 3 + activeIndex;
            newIndex += loopedSlides;
            const slideChanged = swiper.slideTo(newIndex, 0, false, true);
            if (slideChanged && diff !== 0) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        } else if (activeIndex >= slides.length - loopedSlides) {
            newIndex = -slides.length + activeIndex + loopedSlides;
            newIndex += loopedSlides;
            const slideChanged = swiper.slideTo(newIndex, 0, false, true);
            if (slideChanged && diff !== 0) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        swiper.emit("loopFix");
    }
    function loopDestroy() {
        const swiper = this;
        const {$wrapperEl, params, slides} = swiper;
        $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
        slides.removeAttr("data-swiper-slide-index");
    }
    const loop = {
        loopCreate,
        loopFix,
        loopDestroy
    };
    function setGrabCursor(moving) {
        const swiper = this;
        if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
        el.style.cursor = "move";
        el.style.cursor = moving ? "grabbing" : "grab";
    }
    function unsetGrabCursor() {
        const swiper = this;
        if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
    }
    const grab_cursor = {
        setGrabCursor,
        unsetGrabCursor
    };
    function closestElement(selector, base = this) {
        function __closestFrom(el) {
            if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
            if (el.assignedSlot) el = el.assignedSlot;
            const found = el.closest(selector);
            if (!found && !el.getRootNode) return null;
            return found || __closestFrom(el.getRootNode().host);
        }
        return __closestFrom(base);
    }
    function onTouchStart(event) {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const window = ssr_window_esm_getWindow();
        const data = swiper.touchEventsData;
        const {params, touches, enabled} = swiper;
        if (!enabled) return;
        if (swiper.animating && params.preventInteractionOnTransition) return;
        if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let $targetEl = dom(e.target);
        if (params.touchEventsTarget === "wrapper") if (!$targetEl.closest(swiper.wrapperEl).length) return;
        data.isTouchEvent = e.type === "touchstart";
        if (!data.isTouchEvent && "which" in e && e.which === 3) return;
        if (!data.isTouchEvent && "button" in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return;
        const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
        const eventPath = event.composedPath ? event.composedPath() : event.path;
        if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) $targetEl = dom(eventPath[0]);
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot);
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) if (!$targetEl.closest(params.swipeHandler)[0]) return;
        touches.currentX = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
        touches.currentY = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY;
        const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if (edgeSwipeDetection === "prevent") event.preventDefault(); else return;
        Object.assign(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: void 0,
            startMoving: void 0
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = utils_now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = void 0;
        if (params.threshold > 0) data.allowThresholdMove = false;
        if (e.type !== "touchstart") {
            let preventDefault = true;
            if ($targetEl.is(data.focusableElements)) {
                preventDefault = false;
                if ($targetEl[0].nodeName === "SELECT") data.isTouched = false;
            }
            if (document.activeElement && dom(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) document.activeElement.blur();
            const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
            if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) e.preventDefault();
        }
        if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
        swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
        const document = ssr_window_esm_getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, enabled} = swiper;
        if (!enabled) return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
            return;
        }
        if (data.isTouchEvent && e.type !== "touchmove") return;
        const targetTouch = e.type === "touchmove" && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
        const pageX = e.type === "touchmove" ? targetTouch.pageX : e.pageX;
        const pageY = e.type === "touchmove" ? targetTouch.pageY : e.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            if (!dom(e.target).is(data.focusableElements)) swiper.allowClick = false;
            if (data.isTouched) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    currentX: pageX,
                    currentY: pageY
                });
                data.touchStartTime = utils_now();
            }
            return;
        }
        if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
            }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
        if (data.isTouchEvent && document.activeElement) if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
        }
        if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
        if (e.targetTouches && e.targetTouches.length > 1) return;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
        if (typeof data.isScrolling === "undefined") {
            let touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
        }
        if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
        if (typeof data.startMoving === "undefined") if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
        if (data.isScrolling) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) return;
        swiper.allowClick = false;
        if (!params.cssMode && e.cancelable) e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
        if (!data.isMoved) {
            if (params.loop && !params.cssMode) swiper.loopFix();
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
            data.allowMomentumBounce = false;
            if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
            swiper.emit("sliderFirstMove", e);
        }
        swiper.emit("sliderMove", e);
        data.isMoved = true;
        let diff = swiper.isHorizontal() ? diffX : diffY;
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) diff = -diff;
        swiper.swipeDirection = diff > 0 ? "prev" : "next";
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) resistanceRatio = 0;
        if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
            disableParentSwiper = false;
            if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
        } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
            disableParentSwiper = false;
            if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
        }
        if (disableParentSwiper) e.preventedByNestedSwiper = true;
        if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
        if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
            }
        } else {
            data.currentTranslate = data.startTranslate;
            return;
        }
        if (!params.followFinger || params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
        swiper.updateProgress(data.currentTranslate);
        swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
        if (!enabled) return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
        const touchEndTime = utils_now();
        const timeDiff = touchEndTime - data.touchStartTime;
        if (swiper.allowClick) {
            const pathTree = e.path || e.composedPath && e.composedPath();
            swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
            swiper.emit("tap click", e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
        }
        data.lastClickTime = utils_now();
        utils_nextTick((() => {
            if (!swiper.destroyed) swiper.allowClick = true;
        }));
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
        if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
        if (params.cssMode) return;
        if (swiper.params.freeMode && params.freeMode.enabled) {
            swiper.freeMode.onTouchEnd({
                currentPos
            });
            return;
        }
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
            const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (typeof slidesGrid[i + increment] !== "undefined") {
                if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + increment] - slidesGrid[i];
                }
            } else if (currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
        if (params.rewind) if (swiper.isBeginning) rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (timeDiff > params.longSwipesMs) {
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
            if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
        } else {
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
            if (!isNavButtonTarget) {
                if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
                if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
            } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
        }
    }
    function onResize() {
        const swiper = this;
        const {params, el} = swiper;
        if (el && el.offsetWidth === 0) return;
        if (params.breakpoints) swiper.setBreakpoint();
        const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.run();
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
    }
    function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) e.preventDefault();
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }
    function onScroll() {
        const swiper = this;
        const {wrapperEl, rtlTranslate, enabled} = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
        if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
        if (swiper.translate === 0) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        swiper.emit("setTranslate", swiper.translate, false);
    }
    let dummyEventAttached = false;
    function dummyEventListener() {}
    const events = (swiper, method) => {
        const document = ssr_window_esm_getDocument();
        const {params, touchEvents, el, wrapperEl, device, support} = swiper;
        const capture = !!params.nested;
        const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        if (!support.touch) {
            el[domMethod](touchEvents.start, swiper.onTouchStart, false);
            document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
            document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
        } else {
            const passiveListener = touchEvents.start === "touchstart" && support.passiveListener && params.passiveListeners ? {
                passive: true,
                capture: false
            } : false;
            el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
            el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
                passive: false,
                capture
            } : capture);
            el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
            if (touchEvents.cancel) el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
        if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
        if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
        if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
    };
    function attachEvents() {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const {params, support} = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
        if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
        swiper.onClick = onClick.bind(swiper);
        if (support.touch && !dummyEventAttached) {
            document.addEventListener("touchstart", dummyEventListener);
            dummyEventAttached = true;
        }
        events(swiper, "on");
    }
    function detachEvents() {
        const swiper = this;
        events(swiper, "off");
    }
    const core_events = {
        attachEvents,
        detachEvents
    };
    const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
    function setBreakpoint() {
        const swiper = this;
        const {activeIndex, initialized, loopedSlides = 0, params, $el} = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
        const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasEnabled = params.enabled;
        if (wasMultiRow && !isMultiRow) {
            $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
            $el.addClass(`${params.containerModifierClass}grid`);
            if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") $el.addClass(`${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        }
        [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
            const wasModuleEnabled = params[prop] && params[prop].enabled;
            const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
            if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
            if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
        }));
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
        if (directionChanged && initialized) swiper.changeDirection();
        utils_extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        Object.assign(swiper, {
            allowTouchMove: swiper.params.allowTouchMove,
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev
        });
        if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
        swiper.currentBreakpoint = breakpoint;
        swiper.emit("_beforeBreakpoint", breakpointParams);
        if (needsReLoop && initialized) {
            swiper.loopDestroy();
            swiper.loopCreate();
            swiper.updateSlides();
            swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
        }
        swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints, base = "window", containerEl) {
        if (!breakpoints || base === "container" && !containerEl) return;
        let breakpoint = false;
        const window = ssr_window_esm_getWindow();
        const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map((point => {
            if (typeof point === "string" && point.indexOf("@") === 0) {
                const minRatio = parseFloat(point.substr(1));
                const value = currentHeight * minRatio;
                return {
                    value,
                    point
                };
            }
            return {
                value: point,
                point
            };
        }));
        points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
        for (let i = 0; i < points.length; i += 1) {
            const {point, value} = points[i];
            if (base === "window") {
                if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
            } else if (value <= containerEl.clientWidth) breakpoint = point;
        }
        return breakpoint || "max";
    }
    const breakpoints = {
        setBreakpoint,
        getBreakpoint
    };
    function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach((item => {
            if (typeof item === "object") Object.keys(item).forEach((classNames => {
                if (item[classNames]) resultClasses.push(prefix + classNames);
            })); else if (typeof item === "string") resultClasses.push(prefix + item);
        }));
        return resultClasses;
    }
    function addClasses() {
        const swiper = this;
        const {classNames, params, rtl, $el, device, support} = swiper;
        const suffixes = prepareClasses([ "initialized", params.direction, {
            "pointer-events": !support.touch
        }, {
            "free-mode": swiper.params.freeMode && params.freeMode.enabled
        }, {
            autoheight: params.autoHeight
        }, {
            rtl
        }, {
            grid: params.grid && params.grid.rows > 1
        }, {
            "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
        }, {
            android: device.android
        }, {
            ios: device.ios
        }, {
            "css-mode": params.cssMode
        }, {
            centered: params.cssMode && params.centeredSlides
        }, {
            "watch-progress": params.watchSlidesProgress
        } ], params.containerModifierClass);
        classNames.push(...suffixes);
        $el.addClass([ ...classNames ].join(" "));
        swiper.emitContainerClasses();
    }
    function removeClasses_removeClasses() {
        const swiper = this;
        const {$el, classNames} = swiper;
        $el.removeClass(classNames.join(" "));
        swiper.emitContainerClasses();
    }
    const classes = {
        addClasses,
        removeClasses: removeClasses_removeClasses
    };
    function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
        const window = ssr_window_esm_getWindow();
        let image;
        function onReady() {
            if (callback) callback();
        }
        const isPicture = dom(imageEl).parent("picture")[0];
        if (!isPicture && (!imageEl.complete || !checkForComplete)) if (src) {
            image = new window.Image;
            image.onload = onReady;
            image.onerror = onReady;
            if (sizes) image.sizes = sizes;
            if (srcset) image.srcset = srcset;
            if (src) image.src = src;
        } else onReady(); else onReady();
    }
    function preloadImages() {
        const swiper = this;
        swiper.imagesToLoad = swiper.$el.find("img");
        function onReady() {
            if (typeof swiper === "undefined" || swiper === null || !swiper || swiper.destroyed) return;
            if (swiper.imagesLoaded !== void 0) swiper.imagesLoaded += 1;
            if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
                if (swiper.params.updateOnImagesReady) swiper.update();
                swiper.emit("imagesReady");
            }
        }
        for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
            const imageEl = swiper.imagesToLoad[i];
            swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
        }
    }
    const core_images = {
        loadImage,
        preloadImages
    };
    function checkOverflow() {
        const swiper = this;
        const {isLocked: wasLocked, params} = swiper;
        const {slidesOffsetBefore} = params;
        if (slidesOffsetBefore) {
            const lastSlideIndex = swiper.slides.length - 1;
            const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
            swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else swiper.isLocked = swiper.snapGrid.length === 1;
        if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
        if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
        if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
        if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
    const check_overflow = {
        checkOverflow
    };
    const defaults = {
        init: true,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: false,
        userAgent: null,
        url: null,
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        autoHeight: false,
        setWrapperSize: false,
        virtualTranslate: false,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        watchOverflow: true,
        roundLengths: false,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 0,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        uniqueNavElements: true,
        resistance: true,
        resistanceRatio: .85,
        watchSlidesProgress: false,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        preloadImages: true,
        updateOnImagesReady: true,
        loop: false,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopedSlidesLimit: true,
        loopFillGroupWithBlank: false,
        loopPreventsSlide: true,
        rewind: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: true,
        _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj = {}) {
            const moduleParamName = Object.keys(obj)[0];
            const moduleParams = obj[moduleParamName];
            if (typeof moduleParams !== "object" || moduleParams === null) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) params[moduleParamName] = {
                auto: true
            };
            if (!(moduleParamName in params && "enabled" in moduleParams)) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (params[moduleParamName] === true) params[moduleParamName] = {
                enabled: true
            };
            if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
            if (!params[moduleParamName]) params[moduleParamName] = {
                enabled: false
            };
            utils_extend(allModulesParams, obj);
        };
    }
    const prototypes = {
        eventsEmitter: events_emitter,
        update,
        translate,
        transition: core_transition,
        slide,
        loop,
        grabCursor: grab_cursor,
        events: core_events,
        breakpoints,
        checkOverflow: check_overflow,
        classes,
        images: core_images
    };
    const extendedDefaults = {};
    class core_Swiper {
        constructor(...args) {
            let el;
            let params;
            if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0]; else [el, params] = args;
            if (!params) params = {};
            params = utils_extend({}, params);
            if (el && !params.el) params.el = el;
            if (params.el && dom(params.el).length > 1) {
                const swipers = [];
                dom(params.el).each((containerEl => {
                    const newParams = utils_extend({}, params, {
                        el: containerEl
                    });
                    swipers.push(new core_Swiper(newParams));
                }));
                return swipers;
            }
            const swiper = this;
            swiper.__swiper__ = true;
            swiper.support = getSupport();
            swiper.device = getDevice({
                userAgent: params.userAgent
            });
            swiper.browser = getBrowser();
            swiper.eventsListeners = {};
            swiper.eventsAnyListeners = [];
            swiper.modules = [ ...swiper.__modules__ ];
            if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
            const allModulesParams = {};
            swiper.modules.forEach((mod => {
                mod({
                    swiper,
                    extendParams: moduleExtendParams(params, allModulesParams),
                    on: swiper.on.bind(swiper),
                    once: swiper.once.bind(swiper),
                    off: swiper.off.bind(swiper),
                    emit: swiper.emit.bind(swiper)
                });
            }));
            const swiperParams = utils_extend({}, defaults, allModulesParams);
            swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = utils_extend({}, swiper.params);
            swiper.passedParams = utils_extend({}, params);
            if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                swiper.on(eventName, swiper.params.on[eventName]);
            }));
            if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
            swiper.$ = dom;
            Object.assign(swiper, {
                enabled: swiper.params.enabled,
                el,
                classNames: [],
                slides: dom(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return swiper.params.direction === "horizontal";
                },
                isVertical() {
                    return swiper.params.direction === "vertical";
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: true,
                isEnd: false,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
                touchEvents: function touchEvents() {
                    const touch = [ "touchstart", "touchmove", "touchend", "touchcancel" ];
                    const desktop = [ "pointerdown", "pointermove", "pointerup" ];
                    swiper.touchEventsTouch = {
                        start: touch[0],
                        move: touch[1],
                        end: touch[2],
                        cancel: touch[3]
                    };
                    swiper.touchEventsDesktop = {
                        start: desktop[0],
                        move: desktop[1],
                        end: desktop[2]
                    };
                    return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
                }(),
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: swiper.params.focusableElements,
                    lastClickTime: utils_now(),
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    isTouchEvent: void 0,
                    startMoving: void 0
                },
                allowClick: true,
                allowTouchMove: swiper.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            });
            swiper.emit("_swiper");
            if (swiper.params.init) swiper.init();
            return swiper;
        }
        enable() {
            const swiper = this;
            if (swiper.enabled) return;
            swiper.enabled = true;
            if (swiper.params.grabCursor) swiper.setGrabCursor();
            swiper.emit("enable");
        }
        disable() {
            const swiper = this;
            if (!swiper.enabled) return;
            swiper.enabled = false;
            if (swiper.params.grabCursor) swiper.unsetGrabCursor();
            swiper.emit("disable");
        }
        setProgress(progress, speed) {
            const swiper = this;
            progress = Math.min(Math.max(progress, 0), 1);
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const current = (max - min) * progress + min;
            swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const cls = swiper.el.className.split(" ").filter((className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0));
            swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
            const swiper = this;
            if (swiper.destroyed) return "";
            return slideEl.className.split(" ").filter((className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0)).join(" ");
        }
        emitSlidesClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const updates = [];
            swiper.slides.each((slideEl => {
                const classNames = swiper.getSlideClasses(slideEl);
                updates.push({
                    slideEl,
                    classNames
                });
                swiper.emit("_slideClass", slideEl, classNames);
            }));
            swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view = "current", exact = false) {
            const swiper = this;
            const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
            let spv = 1;
            if (params.centeredSlides) {
                let slideSize = slides[activeIndex].swiperSlideSize;
                let breakLoop;
                for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
                for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
            } else if (view === "current") for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) spv += 1;
            } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) spv += 1;
            }
            return spv;
        }
        update() {
            const swiper = this;
            if (!swiper || swiper.destroyed) return;
            const {snapGrid, params} = swiper;
            if (params.breakpoints) swiper.setBreakpoint();
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            function setTranslate() {
                const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            let translated;
            if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                setTranslate();
                if (swiper.params.autoHeight) swiper.updateAutoHeight();
            } else {
                if ((swiper.params.slidesPerView === "auto" || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                if (!translated) setTranslate();
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
            swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate = true) {
            const swiper = this;
            const currentDirection = swiper.params.direction;
            if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
            if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
            swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
            swiper.emitContainerClasses();
            swiper.params.direction = newDirection;
            swiper.slides.each((slideEl => {
                if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
            }));
            swiper.emit("changeDirection");
            if (needUpdate) swiper.update();
            return swiper;
        }
        changeLanguageDirection(direction) {
            const swiper = this;
            if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
            swiper.rtl = direction === "rtl";
            swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
            if (swiper.rtl) {
                swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "rtl";
            } else {
                swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "ltr";
            }
            swiper.update();
        }
        mount(el) {
            const swiper = this;
            if (swiper.mounted) return true;
            const $el = dom(el || swiper.params.el);
            el = $el[0];
            if (!el) return false;
            el.swiper = swiper;
            const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
            const getWrapper = () => {
                if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                    const res = dom(el.shadowRoot.querySelector(getWrapperSelector()));
                    res.children = options => $el.children(options);
                    return res;
                }
                if (!$el.children) return dom($el).children(getWrapperSelector());
                return $el.children(getWrapperSelector());
            };
            let $wrapperEl = getWrapper();
            if ($wrapperEl.length === 0 && swiper.params.createElements) {
                const document = ssr_window_esm_getDocument();
                const wrapper = document.createElement("div");
                $wrapperEl = dom(wrapper);
                wrapper.className = swiper.params.wrapperClass;
                $el.append(wrapper);
                $el.children(`.${swiper.params.slideClass}`).each((slideEl => {
                    $wrapperEl.append(slideEl);
                }));
            }
            Object.assign(swiper, {
                $el,
                el,
                $wrapperEl,
                wrapperEl: $wrapperEl[0],
                mounted: true,
                rtl: el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl",
                rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl"),
                wrongRTL: $wrapperEl.css("display") === "-webkit-box"
            });
            return true;
        }
        init(el) {
            const swiper = this;
            if (swiper.initialized) return swiper;
            const mounted = swiper.mount(el);
            if (mounted === false) return swiper;
            swiper.emit("beforeInit");
            if (swiper.params.breakpoints) swiper.setBreakpoint();
            swiper.addClasses();
            if (swiper.params.loop) swiper.loopCreate();
            swiper.updateSize();
            swiper.updateSlides();
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
            if (swiper.params.preloadImages) swiper.preloadImages();
            if (swiper.params.loop) swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
            swiper.attachEvents();
            swiper.initialized = true;
            swiper.emit("init");
            swiper.emit("afterInit");
            return swiper;
        }
        destroy(deleteInstance = true, cleanStyles = true) {
            const swiper = this;
            const {params, $el, $wrapperEl, slides} = swiper;
            if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
            swiper.emit("beforeDestroy");
            swiper.initialized = false;
            swiper.detachEvents();
            if (params.loop) swiper.loopDestroy();
            if (cleanStyles) {
                swiper.removeClasses();
                $el.removeAttr("style");
                $wrapperEl.removeAttr("style");
                if (slides && slides.length) slides.removeClass([ params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
            }
            swiper.emit("destroy");
            Object.keys(swiper.eventsListeners).forEach((eventName => {
                swiper.off(eventName);
            }));
            if (deleteInstance !== false) {
                swiper.$el[0].swiper = null;
                deleteProps(swiper);
            }
            swiper.destroyed = true;
            return null;
        }
        static extendDefaults(newDefaults) {
            utils_extend(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
            return extendedDefaults;
        }
        static get defaults() {
            return defaults;
        }
        static installModule(mod) {
            if (!core_Swiper.prototype.__modules__) core_Swiper.prototype.__modules__ = [];
            const modules = core_Swiper.prototype.__modules__;
            if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
        }
        static use(module) {
            if (Array.isArray(module)) {
                module.forEach((m => core_Swiper.installModule(m)));
                return core_Swiper;
            }
            core_Swiper.installModule(module);
            return core_Swiper;
        }
    }
    Object.keys(prototypes).forEach((prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
            core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }));
    }));
    core_Swiper.use([ Resize, Observer ]);
    const core = core_Swiper;
    function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        const document = ssr_window_esm_getDocument();
        if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
            if (!params[key] && params.auto === true) {
                let element = swiper.$el.children(`.${checkProps[key]}`)[0];
                if (!element) {
                    element = document.createElement("div");
                    element.className = checkProps[key];
                    swiper.$el.append(element);
                }
                params[key] = element;
                originalParams[key] = element;
            }
        }));
        return params;
    }
    function Navigation({swiper, extendParams, on, emit}) {
        extendParams({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: false,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        });
        swiper.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null
        };
        function getEl(el) {
            let $el;
            if (el) {
                $el = dom(el);
                if (swiper.params.uniqueNavElements && typeof el === "string" && $el.length > 1 && swiper.$el.find(el).length === 1) $el = swiper.$el.find(el);
            }
            return $el;
        }
        function toggleEl($el, disabled) {
            const params = swiper.params.navigation;
            if ($el && $el.length > 0) {
                $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
                if ($el[0] && $el[0].tagName === "BUTTON") $el[0].disabled = disabled;
                if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
            }
        }
        function update() {
            if (swiper.params.loop) return;
            const {$nextEl, $prevEl} = swiper.navigation;
            toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
            toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
        }
        function onPrevClick(e) {
            e.preventDefault();
            if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slidePrev();
            emit("navigationPrev");
        }
        function onNextClick(e) {
            e.preventDefault();
            if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slideNext();
            emit("navigationNext");
        }
        function init() {
            const params = swiper.params.navigation;
            swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            });
            if (!(params.nextEl || params.prevEl)) return;
            const $nextEl = getEl(params.nextEl);
            const $prevEl = getEl(params.prevEl);
            if ($nextEl && $nextEl.length > 0) $nextEl.on("click", onNextClick);
            if ($prevEl && $prevEl.length > 0) $prevEl.on("click", onPrevClick);
            Object.assign(swiper.navigation, {
                $nextEl,
                nextEl: $nextEl && $nextEl[0],
                $prevEl,
                prevEl: $prevEl && $prevEl[0]
            });
            if (!swiper.enabled) {
                if ($nextEl) $nextEl.addClass(params.lockClass);
                if ($prevEl) $prevEl.addClass(params.lockClass);
            }
        }
        function destroy() {
            const {$nextEl, $prevEl} = swiper.navigation;
            if ($nextEl && $nextEl.length) {
                $nextEl.off("click", onNextClick);
                $nextEl.removeClass(swiper.params.navigation.disabledClass);
            }
            if ($prevEl && $prevEl.length) {
                $prevEl.off("click", onPrevClick);
                $prevEl.removeClass(swiper.params.navigation.disabledClass);
            }
        }
        on("init", (() => {
            if (swiper.params.navigation.enabled === false) disable(); else {
                init();
                update();
            }
        }));
        on("toEdge fromEdge lock unlock", (() => {
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            const {$nextEl, $prevEl} = swiper.navigation;
            if ($nextEl) $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
            if ($prevEl) $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
        }));
        on("click", ((_s, e) => {
            const {$nextEl, $prevEl} = swiper.navigation;
            const targetEl = e.target;
            if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
                if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                let isHidden;
                if ($nextEl) isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass); else if ($prevEl) isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
                if (isHidden === true) emit("navigationShow"); else emit("navigationHide");
                if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
                if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
            }
        }));
        const enable = () => {
            swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
            init();
            update();
        };
        const disable = () => {
            swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
            destroy();
        };
        Object.assign(swiper.navigation, {
            enable,
            disable,
            update,
            init,
            destroy
        });
    }
    function classes_to_selector_classesToSelector(classes = "") {
        return `.${classes.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function Pagination({swiper, extendParams, on, emit}) {
        const pfx = "swiper-pagination";
        extendParams({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: false,
                hideOnClick: false,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: false,
                type: "bullets",
                dynamicBullets: false,
                dynamicMainBullets: 1,
                formatFractionCurrent: number => number,
                formatFractionTotal: number => number,
                bulletClass: `${pfx}-bullet`,
                bulletActiveClass: `${pfx}-bullet-active`,
                modifierClass: `${pfx}-`,
                currentClass: `${pfx}-current`,
                totalClass: `${pfx}-total`,
                hiddenClass: `${pfx}-hidden`,
                progressbarFillClass: `${pfx}-progressbar-fill`,
                progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                clickableClass: `${pfx}-clickable`,
                lockClass: `${pfx}-lock`,
                horizontalClass: `${pfx}-horizontal`,
                verticalClass: `${pfx}-vertical`,
                paginationDisabledClass: `${pfx}-disabled`
            }
        });
        swiper.pagination = {
            el: null,
            $el: null,
            bullets: []
        };
        let bulletSize;
        let dynamicBulletIndex = 0;
        function isPaginationDisabled() {
            return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0;
        }
        function setSideBullets($bulletEl, position) {
            const {bulletActiveClass} = swiper.params.pagination;
            $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
        }
        function update() {
            const rtl = swiper.rtl;
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            const $el = swiper.pagination.$el;
            let current;
            const total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
            if (swiper.params.loop) {
                current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
                if (current > slidesLength - 1 - swiper.loopedSlides * 2) current -= slidesLength - swiper.loopedSlides * 2;
                if (current > total - 1) current -= total;
                if (current < 0 && swiper.params.paginationType !== "bullets") current = total + current;
            } else if (typeof swiper.snapIndex !== "undefined") current = swiper.snapIndex; else current = swiper.activeIndex || 0;
            if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                const bullets = swiper.pagination.bullets;
                let firstIndex;
                let lastIndex;
                let midIndex;
                if (params.dynamicBullets) {
                    bulletSize = bullets.eq(0)[swiper.isHorizontal() ? "outerWidth" : "outerHeight"](true);
                    $el.css(swiper.isHorizontal() ? "width" : "height", `${bulletSize * (params.dynamicMainBullets + 4)}px`);
                    if (params.dynamicMainBullets > 1 && swiper.previousIndex !== void 0) {
                        dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
                        if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                    }
                    firstIndex = Math.max(current - dynamicBulletIndex, 0);
                    lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                    midIndex = (lastIndex + firstIndex) / 2;
                }
                bullets.removeClass([ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)).join(" "));
                if ($el.length > 1) bullets.each((bullet => {
                    const $bullet = dom(bullet);
                    const bulletIndex = $bullet.index();
                    if (bulletIndex === current) $bullet.addClass(params.bulletActiveClass);
                    if (params.dynamicBullets) {
                        if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) $bullet.addClass(`${params.bulletActiveClass}-main`);
                        if (bulletIndex === firstIndex) setSideBullets($bullet, "prev");
                        if (bulletIndex === lastIndex) setSideBullets($bullet, "next");
                    }
                })); else {
                    const $bullet = bullets.eq(current);
                    const bulletIndex = $bullet.index();
                    $bullet.addClass(params.bulletActiveClass);
                    if (params.dynamicBullets) {
                        const $firstDisplayedBullet = bullets.eq(firstIndex);
                        const $lastDisplayedBullet = bullets.eq(lastIndex);
                        for (let i = firstIndex; i <= lastIndex; i += 1) bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
                        if (swiper.params.loop) if (bulletIndex >= bullets.length) {
                            for (let i = params.dynamicMainBullets; i >= 0; i -= 1) bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                            bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                        } else {
                            setSideBullets($firstDisplayedBullet, "prev");
                            setSideBullets($lastDisplayedBullet, "next");
                        } else {
                            setSideBullets($firstDisplayedBullet, "prev");
                            setSideBullets($lastDisplayedBullet, "next");
                        }
                    }
                }
                if (params.dynamicBullets) {
                    const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                    const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                    const offsetProp = rtl ? "right" : "left";
                    bullets.css(swiper.isHorizontal() ? offsetProp : "top", `${bulletsOffset}px`);
                }
            }
            if (params.type === "fraction") {
                $el.find(classes_to_selector_classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
                $el.find(classes_to_selector_classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
            }
            if (params.type === "progressbar") {
                let progressbarDirection;
                if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                const scale = (current + 1) / total;
                let scaleX = 1;
                let scaleY = 1;
                if (progressbarDirection === "horizontal") scaleX = scale; else scaleY = scale;
                $el.find(classes_to_selector_classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
            }
            if (params.type === "custom" && params.renderCustom) {
                $el.html(params.renderCustom(swiper, current + 1, total));
                emit("paginationRender", $el[0]);
            } else emit("paginationUpdate", $el[0]);
            if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
        }
        function render() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            const $el = swiper.pagination.$el;
            let paginationHTML = "";
            if (params.type === "bullets") {
                let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
                $el.html(paginationHTML);
                swiper.pagination.bullets = $el.find(classes_to_selector_classesToSelector(params.bulletClass));
            }
            if (params.type === "fraction") {
                if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
                $el.html(paginationHTML);
            }
            if (params.type === "progressbar") {
                if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
                $el.html(paginationHTML);
            }
            if (params.type !== "custom") emit("paginationRender", swiper.pagination.$el[0]);
        }
        function init() {
            swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                el: "swiper-pagination"
            });
            const params = swiper.params.pagination;
            if (!params.el) return;
            let $el = dom(params.el);
            if ($el.length === 0) return;
            if (swiper.params.uniqueNavElements && typeof params.el === "string" && $el.length > 1) {
                $el = swiper.$el.find(params.el);
                if ($el.length > 1) $el = $el.filter((el => {
                    if (dom(el).parents(".swiper")[0] !== swiper.el) return false;
                    return true;
                }));
            }
            if (params.type === "bullets" && params.clickable) $el.addClass(params.clickableClass);
            $el.addClass(params.modifierClass + params.type);
            $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            if (params.type === "bullets" && params.dynamicBullets) {
                $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
                dynamicBulletIndex = 0;
                if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
            }
            if (params.type === "progressbar" && params.progressbarOpposite) $el.addClass(params.progressbarOppositeClass);
            if (params.clickable) $el.on("click", classes_to_selector_classesToSelector(params.bulletClass), (function onClick(e) {
                e.preventDefault();
                let index = dom(this).index() * swiper.params.slidesPerGroup;
                if (swiper.params.loop) index += swiper.loopedSlides;
                swiper.slideTo(index);
            }));
            Object.assign(swiper.pagination, {
                $el,
                el: $el[0]
            });
            if (!swiper.enabled) $el.addClass(params.lockClass);
        }
        function destroy() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const $el = swiper.pagination.$el;
            $el.removeClass(params.hiddenClass);
            $el.removeClass(params.modifierClass + params.type);
            $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);
            if (params.clickable) $el.off("click", classes_to_selector_classesToSelector(params.bulletClass));
        }
        on("init", (() => {
            if (swiper.params.pagination.enabled === false) disable(); else {
                init();
                render();
                update();
            }
        }));
        on("activeIndexChange", (() => {
            if (swiper.params.loop) update(); else if (typeof swiper.snapIndex === "undefined") update();
        }));
        on("snapIndexChange", (() => {
            if (!swiper.params.loop) update();
        }));
        on("slidesLengthChange", (() => {
            if (swiper.params.loop) {
                render();
                update();
            }
        }));
        on("snapGridLengthChange", (() => {
            if (!swiper.params.loop) {
                render();
                update();
            }
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            const {$el} = swiper.pagination;
            if ($el) $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.pagination.lockClass);
        }));
        on("lock unlock", (() => {
            update();
        }));
        on("click", ((_s, e) => {
            const targetEl = e.target;
            const {$el} = swiper.pagination;
            if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el && $el.length > 0 && !dom(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
                if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
                if (isHidden === true) emit("paginationShow"); else emit("paginationHide");
                $el.toggleClass(swiper.params.pagination.hiddenClass);
            }
        }));
        const enable = () => {
            swiper.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
            if (swiper.pagination.$el) swiper.pagination.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
            init();
            render();
            update();
        };
        const disable = () => {
            swiper.$el.addClass(swiper.params.pagination.paginationDisabledClass);
            if (swiper.pagination.$el) swiper.pagination.$el.addClass(swiper.params.pagination.paginationDisabledClass);
            destroy();
        };
        Object.assign(swiper.pagination, {
            enable,
            disable,
            render,
            update,
            init,
            destroy
        });
    }
    function Autoplay({swiper, extendParams, on, emit}) {
        let timeout;
        swiper.autoplay = {
            running: false,
            paused: false
        };
        extendParams({
            autoplay: {
                enabled: false,
                delay: 3e3,
                waitForTransition: true,
                disableOnInteraction: true,
                stopOnLastSlide: false,
                reverseDirection: false,
                pauseOnMouseEnter: false
            }
        });
        function run() {
            if (!swiper.size) {
                swiper.autoplay.running = false;
                swiper.autoplay.paused = false;
                return;
            }
            const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
            let delay = swiper.params.autoplay.delay;
            if ($activeSlideEl.attr("data-swiper-autoplay")) delay = $activeSlideEl.attr("data-swiper-autoplay") || swiper.params.autoplay.delay;
            clearTimeout(timeout);
            timeout = utils_nextTick((() => {
                let autoplayResult;
                if (swiper.params.autoplay.reverseDirection) if (swiper.params.loop) {
                    swiper.loopFix();
                    autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                    emit("autoplay");
                } else if (!swiper.isBeginning) {
                    autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                    emit("autoplay");
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                    autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
                    emit("autoplay");
                } else stop(); else if (swiper.params.loop) {
                    swiper.loopFix();
                    autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                    emit("autoplay");
                } else if (!swiper.isEnd) {
                    autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                    emit("autoplay");
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                    autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
                    emit("autoplay");
                } else stop();
                if (swiper.params.cssMode && swiper.autoplay.running) run(); else if (autoplayResult === false) run();
            }), delay);
        }
        function start() {
            if (typeof timeout !== "undefined") return false;
            if (swiper.autoplay.running) return false;
            swiper.autoplay.running = true;
            emit("autoplayStart");
            run();
            return true;
        }
        function stop() {
            if (!swiper.autoplay.running) return false;
            if (typeof timeout === "undefined") return false;
            if (timeout) {
                clearTimeout(timeout);
                timeout = void 0;
            }
            swiper.autoplay.running = false;
            emit("autoplayStop");
            return true;
        }
        function pause(speed) {
            if (!swiper.autoplay.running) return;
            if (swiper.autoplay.paused) return;
            if (timeout) clearTimeout(timeout);
            swiper.autoplay.paused = true;
            if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
                swiper.autoplay.paused = false;
                run();
            } else [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
            }));
        }
        function onVisibilityChange() {
            const document = ssr_window_esm_getDocument();
            if (document.visibilityState === "hidden" && swiper.autoplay.running) pause();
            if (document.visibilityState === "visible" && swiper.autoplay.paused) {
                run();
                swiper.autoplay.paused = false;
            }
        }
        function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
            if (e.target !== swiper.$wrapperEl[0]) return;
            [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
            }));
            swiper.autoplay.paused = false;
            if (!swiper.autoplay.running) stop(); else run();
        }
        function onMouseEnter() {
            if (swiper.params.autoplay.disableOnInteraction) stop(); else {
                emit("autoplayPause");
                pause();
            }
            [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
            }));
        }
        function onMouseLeave() {
            if (swiper.params.autoplay.disableOnInteraction) return;
            swiper.autoplay.paused = false;
            emit("autoplayResume");
            run();
        }
        function attachMouseEvents() {
            if (swiper.params.autoplay.pauseOnMouseEnter) {
                swiper.$el.on("mouseenter", onMouseEnter);
                swiper.$el.on("mouseleave", onMouseLeave);
            }
        }
        function detachMouseEvents() {
            swiper.$el.off("mouseenter", onMouseEnter);
            swiper.$el.off("mouseleave", onMouseLeave);
        }
        on("init", (() => {
            if (swiper.params.autoplay.enabled) {
                start();
                const document = ssr_window_esm_getDocument();
                document.addEventListener("visibilitychange", onVisibilityChange);
                attachMouseEvents();
            }
        }));
        on("beforeTransitionStart", ((_s, speed, internal) => {
            if (swiper.autoplay.running) if (internal || !swiper.params.autoplay.disableOnInteraction) swiper.autoplay.pause(speed); else stop();
        }));
        on("sliderFirstMove", (() => {
            if (swiper.autoplay.running) if (swiper.params.autoplay.disableOnInteraction) stop(); else pause();
        }));
        on("touchEnd", (() => {
            if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) run();
        }));
        on("destroy", (() => {
            detachMouseEvents();
            if (swiper.autoplay.running) stop();
            const document = ssr_window_esm_getDocument();
            document.removeEventListener("visibilitychange", onVisibilityChange);
        }));
        Object.assign(swiper.autoplay, {
            pause,
            run,
            start,
            stop
        });
    }
    function Thumb({swiper, extendParams, on}) {
        extendParams({
            thumbs: {
                swiper: null,
                multipleActiveThumbs: true,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-thumbs"
            }
        });
        let initialized = false;
        let swiperCreated = false;
        swiper.thumbs = {
            swiper: null
        };
        function onThumbClick() {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            const clickedIndex = thumbsSwiper.clickedIndex;
            const clickedSlide = thumbsSwiper.clickedSlide;
            if (clickedSlide && dom(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
            if (typeof clickedIndex === "undefined" || clickedIndex === null) return;
            let slideToIndex;
            if (thumbsSwiper.params.loop) slideToIndex = parseInt(dom(thumbsSwiper.clickedSlide).attr("data-swiper-slide-index"), 10); else slideToIndex = clickedIndex;
            if (swiper.params.loop) {
                let currentIndex = swiper.activeIndex;
                if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
                    swiper.loopFix();
                    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
                    currentIndex = swiper.activeIndex;
                }
                const prevIndex = swiper.slides.eq(currentIndex).prevAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
                const nextIndex = swiper.slides.eq(currentIndex).nextAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
                if (typeof prevIndex === "undefined") slideToIndex = nextIndex; else if (typeof nextIndex === "undefined") slideToIndex = prevIndex; else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex; else slideToIndex = prevIndex;
            }
            swiper.slideTo(slideToIndex);
        }
        function init() {
            const {thumbs: thumbsParams} = swiper.params;
            if (initialized) return false;
            initialized = true;
            const SwiperClass = swiper.constructor;
            if (thumbsParams.swiper instanceof SwiperClass) {
                swiper.thumbs.swiper = thumbsParams.swiper;
                Object.assign(swiper.thumbs.swiper.originalParams, {
                    watchSlidesProgress: true,
                    slideToClickedSlide: false
                });
                Object.assign(swiper.thumbs.swiper.params, {
                    watchSlidesProgress: true,
                    slideToClickedSlide: false
                });
            } else if (utils_isObject(thumbsParams.swiper)) {
                const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
                Object.assign(thumbsSwiperParams, {
                    watchSlidesProgress: true,
                    slideToClickedSlide: false
                });
                swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
                swiperCreated = true;
            }
            swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
            swiper.thumbs.swiper.on("tap", onThumbClick);
            return true;
        }
        function update(initial) {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            const slidesPerView = thumbsSwiper.params.slidesPerView === "auto" ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
            let thumbsToActivate = 1;
            const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
            if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) thumbsToActivate = swiper.params.slidesPerView;
            if (!swiper.params.thumbs.multipleActiveThumbs) thumbsToActivate = 1;
            thumbsToActivate = Math.floor(thumbsToActivate);
            thumbsSwiper.slides.removeClass(thumbActiveClass);
            if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) for (let i = 0; i < thumbsToActivate; i += 1) thumbsSwiper.$wrapperEl.children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`).addClass(thumbActiveClass); else for (let i = 0; i < thumbsToActivate; i += 1) thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);
            const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
            const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
            if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
                let currentThumbsIndex = thumbsSwiper.activeIndex;
                let newThumbsIndex;
                let direction;
                if (thumbsSwiper.params.loop) {
                    if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
                        thumbsSwiper.loopFix();
                        thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
                        currentThumbsIndex = thumbsSwiper.activeIndex;
                    }
                    const prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
                    const nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
                    if (typeof prevThumbsIndex === "undefined") newThumbsIndex = nextThumbsIndex; else if (typeof nextThumbsIndex === "undefined") newThumbsIndex = prevThumbsIndex; else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex; else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) newThumbsIndex = nextThumbsIndex; else newThumbsIndex = prevThumbsIndex;
                    direction = swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
                } else {
                    newThumbsIndex = swiper.realIndex;
                    direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
                }
                if (useOffset) newThumbsIndex += direction === "next" ? autoScrollOffset : -1 * autoScrollOffset;
                if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
                    if (thumbsSwiper.params.centeredSlides) if (newThumbsIndex > currentThumbsIndex) newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1; else newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1; else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) ;
                    thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : void 0);
                }
            }
        }
        on("beforeInit", (() => {
            const {thumbs} = swiper.params;
            if (!thumbs || !thumbs.swiper) return;
            init();
            update(true);
        }));
        on("slideChange update resize observerUpdate", (() => {
            update();
        }));
        on("setTransition", ((_s, duration) => {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            thumbsSwiper.setTransition(duration);
        }));
        on("beforeDestroy", (() => {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            if (swiperCreated) thumbsSwiper.destroy();
        }));
        Object.assign(swiper.thumbs, {
            init,
            update
        });
    }
    function effect_init_effectInit(params) {
        const {effect, swiper, on, setTranslate, setTransition, overwriteParams, perspective, recreateShadows, getEffectParams} = params;
        on("beforeInit", (() => {
            if (swiper.params.effect !== effect) return;
            swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
            if (perspective && perspective()) swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
            const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
            Object.assign(swiper.params, overwriteParamsResult);
            Object.assign(swiper.originalParams, overwriteParamsResult);
        }));
        on("setTranslate", (() => {
            if (swiper.params.effect !== effect) return;
            setTranslate();
        }));
        on("setTransition", ((_s, duration) => {
            if (swiper.params.effect !== effect) return;
            setTransition(duration);
        }));
        on("transitionEnd", (() => {
            if (swiper.params.effect !== effect) return;
            if (recreateShadows) {
                if (!getEffectParams || !getEffectParams().slideShadows) return;
                swiper.slides.each((slideEl => {
                    const $slideEl = swiper.$(slideEl);
                    $slideEl.find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove();
                }));
                recreateShadows();
            }
        }));
        let requireUpdateOnVirtual;
        on("virtualUpdate", (() => {
            if (swiper.params.effect !== effect) return;
            if (!swiper.slides.length) requireUpdateOnVirtual = true;
            requestAnimationFrame((() => {
                if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
                    setTranslate();
                    requireUpdateOnVirtual = false;
                }
            }));
        }));
    }
    function effect_target_effectTarget(effectParams, $slideEl) {
        if (effectParams.transformEl) return $slideEl.find(effectParams.transformEl).css({
            "backface-visibility": "hidden",
            "-webkit-backface-visibility": "hidden"
        });
        return $slideEl;
    }
    function effect_virtual_transition_end_effectVirtualTransitionEnd({swiper, duration, transformEl, allSlides}) {
        const {slides, activeIndex, $wrapperEl} = swiper;
        if (swiper.params.virtualTranslate && duration !== 0) {
            let eventTriggered = false;
            let $transitionEndTarget;
            if (allSlides) $transitionEndTarget = transformEl ? slides.find(transformEl) : slides; else $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex);
            $transitionEndTarget.transitionEnd((() => {
                if (eventTriggered) return;
                if (!swiper || swiper.destroyed) return;
                eventTriggered = true;
                swiper.animating = false;
                const triggerEvents = [ "webkitTransitionEnd", "transitionend" ];
                for (let i = 0; i < triggerEvents.length; i += 1) $wrapperEl.trigger(triggerEvents[i]);
            }));
        }
    }
    function EffectFade({swiper, extendParams, on}) {
        extendParams({
            fadeEffect: {
                crossFade: false,
                transformEl: null
            }
        });
        const setTranslate = () => {
            const {slides} = swiper;
            const params = swiper.params.fadeEffect;
            for (let i = 0; i < slides.length; i += 1) {
                const $slideEl = swiper.slides.eq(i);
                const offset = $slideEl[0].swiperSlideOffset;
                let tx = -offset;
                if (!swiper.params.virtualTranslate) tx -= swiper.translate;
                let ty = 0;
                if (!swiper.isHorizontal()) {
                    ty = tx;
                    tx = 0;
                }
                const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
                const $targetEl = effect_target_effectTarget(params, $slideEl);
                $targetEl.css({
                    opacity: slideOpacity
                }).transform(`translate3d(${tx}px, ${ty}px, 0px)`);
            }
        };
        const setTransition = duration => {
            const {transformEl} = swiper.params.fadeEffect;
            const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
            $transitionElements.transition(duration);
            effect_virtual_transition_end_effectVirtualTransitionEnd({
                swiper,
                duration,
                transformEl,
                allSlides: true
            });
        };
        effect_init_effectInit({
            effect: "fade",
            swiper,
            on,
            setTranslate,
            setTransition,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: true,
                spaceBetween: 0,
                virtualTranslate: !swiper.params.cssMode
            })
        });
    }
    function initSliders() {
        if (document.querySelector(".main-section__slider")) new core(".main-section__slider", {
            modules: [ EffectFade, Autoplay ],
            speed: 800,
            loop: true,
            crossFade: true,
            effect: "fade",
            autoplay: {
                delay: 3e3,
                disableOnInteraction: false
            },
            on: {}
        });
        if (document.querySelector(".product-slider-top__slider") && document.querySelector(".product-slider-bottom__slider")) {
            const thumbsSwiper = new core(".product-slider-bottom__slider ", {
                modules: [ Pagination, Navigation ],
                slidesPerView: 3,
                centerInsufficientSlides: true,
                watchOverflow: true,
                spaceBetween: 15,
                speed: 800,
                navigation: {
                    prevEl: ".product-slider-bottom__arrow_prev",
                    nextEl: ".product-slider-bottom__arrow_next"
                },
                breakpoints: {
                    300: {
                        slidesPerView: 2
                    },
                    400: {
                        slidesPerView: 3
                    },
                    768: {
                        slidesPerView: 3
                    }
                },
                on: {}
            });
            thumbsSwiper.on("click", (function() {
                const activeIndex = thumbsSwiper.activeIndex;
                const clickedIndex = thumbsSwiper.clickedIndex;
                if (window.innerWidth > 400) {
                    if (clickedIndex > activeIndex + 1) thumbsSwiper.slideTo(thumbsSwiper.clickedIndex - 1); else if (clickedIndex == activeIndex) thumbsSwiper.slideTo(thumbsSwiper.clickedIndex - 1);
                } else if (clickedIndex > activeIndex) thumbsSwiper.slideTo(thumbsSwiper.clickedIndex); else if (clickedIndex == activeIndex) thumbsSwiper.slideTo(thumbsSwiper.clickedIndex - 1);
            }));
            new core(".product-slider-top__slider", {
                modules: [ Thumb ],
                slidesPerView: 1,
                watchOverflow: true,
                spaceBetween: 30,
                speed: 800,
                thumbs: {
                    swiper: thumbsSwiper
                }
            });
        }
    }
    window.addEventListener("load", (function(e) {
        initSliders();
    }));
    let addWindowScrollEvent = false;
    function headerScroll() {
        addWindowScrollEvent = true;
        const header = document.querySelector("header.header");
        const headerShow = header.hasAttribute("data-scroll-show");
        const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
        const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
        let scrollDirection = 0;
        let timer;
        document.addEventListener("windowScroll", (function(e) {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                if (headerShow) {
                    if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    timer = setTimeout((() => {
                        !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    }), headerShowTimer);
                }
            } else {
                header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const t = (t, e = 1e4) => (t = parseFloat(t + "") || 0, Math.round((t + Number.EPSILON) * e) / e), e = function(t) {
        if (!(t && t instanceof Element && t.offsetParent)) return !1;
        const e = t.scrollHeight > t.clientHeight, i = window.getComputedStyle(t).overflowY, n = -1 !== i.indexOf("hidden"), s = -1 !== i.indexOf("visible");
        return e && !n && !s;
    }, i = function(t, n = void 0) {
        return !(!t || t === document.body || n && t === n) && (e(t) ? t : i(t.parentElement, n));
    }, n = function(t) {
        var e = (new DOMParser).parseFromString(t, "text/html").body;
        if (e.childElementCount > 1) {
            for (var i = document.createElement("div"); e.firstChild; ) i.appendChild(e.firstChild);
            return i;
        }
        return e.firstChild;
    }, s = t => `${t || ""}`.split(" ").filter((t => !!t)), o = (t, e, i) => {
        t && s(e).forEach((e => {
            t.classList.toggle(e, i || !1);
        }));
    };
    class a {
        constructor(t) {
            Object.defineProperty(this, "pageX", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "pageY", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "clientX", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "clientY", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "id", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "time", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "nativePointer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), this.nativePointer = t, this.pageX = t.pageX, this.pageY = t.pageY, this.clientX = t.clientX, 
            this.clientY = t.clientY, this.id = self.Touch && t instanceof Touch ? t.identifier : -1, 
            this.time = Date.now();
        }
    }
    const r = {
        passive: !1
    };
    class l {
        constructor(t, {start: e = (() => !0), move: i = (() => {}), end: n = (() => {})}) {
            Object.defineProperty(this, "element", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "startCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "moveCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "endCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "currentPointers", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "startPointers", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), this.element = t, this.startCallback = e, this.moveCallback = i, this.endCallback = n;
            for (const t of [ "onPointerStart", "onTouchStart", "onMove", "onTouchEnd", "onPointerEnd", "onWindowBlur" ]) this[t] = this[t].bind(this);
            this.element.addEventListener("mousedown", this.onPointerStart, r), this.element.addEventListener("touchstart", this.onTouchStart, r), 
            this.element.addEventListener("touchmove", this.onMove, r), this.element.addEventListener("touchend", this.onTouchEnd), 
            this.element.addEventListener("touchcancel", this.onTouchEnd);
        }
        onPointerStart(t) {
            if (!t.buttons || 0 !== t.button) return;
            const e = new a(t);
            this.currentPointers.some((t => t.id === e.id)) || this.triggerPointerStart(e, t) && (window.addEventListener("mousemove", this.onMove), 
            window.addEventListener("mouseup", this.onPointerEnd), window.addEventListener("blur", this.onWindowBlur));
        }
        onTouchStart(t) {
            for (const e of Array.from(t.changedTouches || [])) this.triggerPointerStart(new a(e), t);
            window.addEventListener("blur", this.onWindowBlur);
        }
        onMove(t) {
            const e = this.currentPointers.slice(), i = "changedTouches" in t ? Array.from(t.changedTouches || []).map((t => new a(t))) : [ new a(t) ], n = [];
            for (const t of i) {
                const e = this.currentPointers.findIndex((e => e.id === t.id));
                e < 0 || (n.push(t), this.currentPointers[e] = t);
            }
            n.length && this.moveCallback(t, this.currentPointers.slice(), e);
        }
        onPointerEnd(t) {
            t.buttons > 0 && 0 !== t.button || (this.triggerPointerEnd(t, new a(t)), window.removeEventListener("mousemove", this.onMove), 
            window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur));
        }
        onTouchEnd(t) {
            for (const e of Array.from(t.changedTouches || [])) this.triggerPointerEnd(t, new a(e));
        }
        triggerPointerStart(t, e) {
            return !!this.startCallback(e, t, this.currentPointers.slice()) && (this.currentPointers.push(t), 
            this.startPointers.push(t), !0);
        }
        triggerPointerEnd(t, e) {
            const i = this.currentPointers.findIndex((t => t.id === e.id));
            i < 0 || (this.currentPointers.splice(i, 1), this.startPointers.splice(i, 1), this.endCallback(t, e, this.currentPointers.slice()));
        }
        onWindowBlur() {
            this.clear();
        }
        clear() {
            for (;this.currentPointers.length; ) {
                const t = this.currentPointers[this.currentPointers.length - 1];
                this.currentPointers.splice(this.currentPointers.length - 1, 1), this.startPointers.splice(this.currentPointers.length - 1, 1), 
                this.endCallback(new Event("touchend", {
                    bubbles: !0,
                    cancelable: !0,
                    clientX: t.clientX,
                    clientY: t.clientY
                }), t, this.currentPointers.slice());
            }
        }
        stop() {
            this.element.removeEventListener("mousedown", this.onPointerStart, r), this.element.removeEventListener("touchstart", this.onTouchStart, r), 
            this.element.removeEventListener("touchmove", this.onMove, r), this.element.removeEventListener("touchend", this.onTouchEnd), 
            this.element.removeEventListener("touchcancel", this.onTouchEnd), window.removeEventListener("mousemove", this.onMove), 
            window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur);
        }
    }
    function c(t, e) {
        return e ? Math.sqrt(Math.pow(e.clientX - t.clientX, 2) + Math.pow(e.clientY - t.clientY, 2)) : 0;
    }
    function h(t, e) {
        return e ? {
            clientX: (t.clientX + e.clientX) / 2,
            clientY: (t.clientY + e.clientY) / 2
        } : t;
    }
    const d = t => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t), u = (t, ...e) => {
        const i = e.length;
        for (let n = 0; n < i; n++) {
            const i = e[n] || {};
            Object.entries(i).forEach((([e, i]) => {
                const n = Array.isArray(i) ? [] : {};
                t[e] || Object.assign(t, {
                    [e]: n
                }), d(i) ? Object.assign(t[e], u(n, i)) : Array.isArray(i) ? Object.assign(t, {
                    [e]: [ ...i ]
                }) : Object.assign(t, {
                    [e]: i
                });
            }));
        }
        return t;
    }, f = function(t, e) {
        return t.split(".").reduce(((t, e) => "object" == typeof t ? t[e] : void 0), e);
    };
    class p {
        constructor(t = {}) {
            Object.defineProperty(this, "options", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: t
            }), Object.defineProperty(this, "events", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: new Map
            }), this.setOptions(t);
            for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) t.startsWith("on") && "function" == typeof this[t] && (this[t] = this[t].bind(this));
        }
        setOptions(t) {
            this.options = t ? u({}, this.constructor.defaults, t) : {};
            for (const [t, e] of Object.entries(this.option("on") || {})) this.on(t, e);
        }
        option(t, ...e) {
            let i = f(t, this.options);
            return i && "function" == typeof i && (i = i.call(this, this, ...e)), i;
        }
        optionFor(t, e, i, ...n) {
            let s = f(e, t);
            var o;
            "string" != typeof (o = s) || isNaN(o) || isNaN(parseFloat(o)) || (s = parseFloat(s)), 
            "true" === s && (s = !0), "false" === s && (s = !1), s && "function" == typeof s && (s = s.call(this, this, t, ...n));
            let a = f(e, this.options);
            return a && "function" == typeof a ? s = a.call(this, this, t, ...n, s) : void 0 === s && (s = a), 
            void 0 === s ? i : s;
        }
        cn(t) {
            const e = this.options.classes;
            return e && e[t] || "";
        }
        localize(t, e = []) {
            t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, ((t, e, i) => {
                let n = "";
                return i ? n = this.option(`${e[0] + e.toLowerCase().substring(1)}.l10n.${i}`) : e && (n = this.option(`l10n.${e}`)), 
                n || (n = t), n;
            }));
            for (let i = 0; i < e.length; i++) t = t.split(e[i][0]).join(e[i][1]);
            return t = t.replace(/\{\{(.*?)\}\}/g, ((t, e) => e));
        }
        on(t, e) {
            let i = [];
            "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), this.events || (this.events = new Map), 
            i.forEach((t => {
                let i = this.events.get(t);
                i || (this.events.set(t, []), i = []), i.includes(e) || i.push(e), this.events.set(t, i);
            }));
        }
        off(t, e) {
            let i = [];
            "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), i.forEach((t => {
                const i = this.events.get(t);
                if (Array.isArray(i)) {
                    const t = i.indexOf(e);
                    t > -1 && i.splice(t, 1);
                }
            }));
        }
        emit(t, ...e) {
            [ ...this.events.get(t) || [] ].forEach((t => t(this, ...e))), "*" !== t && this.emit("*", t, ...e);
        }
    }
    Object.defineProperty(p, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "5.0.27"
    }), Object.defineProperty(p, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    });
    class g extends p {
        constructor(t = {}) {
            super(t), Object.defineProperty(this, "plugins", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            });
        }
        attachPlugins(t = {}) {
            const e = new Map;
            for (const [i, n] of Object.entries(t)) {
                const t = this.option(i), s = this.plugins[i];
                s || !1 === t ? s && !1 === t && (s.detach(), delete this.plugins[i]) : e.set(i, new n(this, t || {}));
            }
            for (const [t, i] of e) this.plugins[t] = i, i.attach();
        }
        detachPlugins(t) {
            t = t || Object.keys(this.plugins);
            for (const e of t) {
                const t = this.plugins[e];
                t && t.detach(), delete this.plugins[e];
            }
            return this.emit("detachPlugins"), this;
        }
    }
    var m;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Error = 1] = "Error", t[t.Ready = 2] = "Ready", t[t.Panning = 3] = "Panning", 
        t[t.Mousemove = 4] = "Mousemove", t[t.Destroy = 5] = "Destroy";
    }(m || (m = {}));
    const b = [ "a", "b", "c", "d", "e", "f" ], v = {
        PANUP: "Move up",
        PANDOWN: "Move down",
        PANLEFT: "Move left",
        PANRIGHT: "Move right",
        ZOOMIN: "Zoom in",
        ZOOMOUT: "Zoom out",
        TOGGLEZOOM: "Toggle zoom level",
        TOGGLE1TO1: "Toggle zoom level",
        ITERATEZOOM: "Toggle zoom level",
        ROTATECCW: "Rotate counterclockwise",
        ROTATECW: "Rotate clockwise",
        FLIPX: "Flip horizontally",
        FLIPY: "Flip vertically",
        FITX: "Fit horizontally",
        FITY: "Fit vertically",
        RESET: "Reset",
        TOGGLEFS: "Toggle fullscreen"
    }, y = {
        content: null,
        width: "auto",
        height: "auto",
        panMode: "drag",
        touch: !0,
        dragMinThreshold: 3,
        lockAxis: !1,
        mouseMoveFactor: 1,
        mouseMoveFriction: .12,
        zoom: !0,
        pinchToZoom: !0,
        panOnlyZoomed: "auto",
        minScale: 1,
        maxScale: 2,
        friction: .25,
        dragFriction: .35,
        decelFriction: .05,
        click: "toggleZoom",
        dblClick: !1,
        wheel: "zoom",
        wheelLimit: 7,
        spinner: !0,
        bounds: "auto",
        infinite: !1,
        rubberband: !0,
        bounce: !0,
        maxVelocity: 75,
        transformParent: !1,
        classes: {
            content: "f-panzoom__content",
            isLoading: "is-loading",
            canZoomIn: "can-zoom_in",
            canZoomOut: "can-zoom_out",
            isDraggable: "is-draggable",
            isDragging: "is-dragging",
            inFullscreen: "in-fullscreen",
            htmlHasFullscreen: "with-panzoom-in-fullscreen"
        },
        l10n: v
    }, w = '<div class="f-spinner"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"></circle><circle cx="25" cy="25" r="20"></circle></svg></div>', x = t => t && null !== t && t instanceof Element && "nodeType" in t, E = (t, e) => {
        t && s(e).forEach((e => {
            t.classList.remove(e);
        }));
    }, S = (t, e) => {
        t && s(e).forEach((e => {
            t.classList.add(e);
        }));
    }, P = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    }, C = 1e5, T = 1e4, M = "mousemove", O = "drag", A = "content";
    let L = null, z = null;
    class R extends g {
        get fits() {
            return this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1;
        }
        get isTouchDevice() {
            return null === z && (z = window.matchMedia("(hover: none)").matches), z;
        }
        get isMobile() {
            return null === L && (L = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), 
            L;
        }
        get panMode() {
            return this.options.panMode !== M || this.isTouchDevice ? O : M;
        }
        get panOnlyZoomed() {
            const t = this.options.panOnlyZoomed;
            return "auto" === t ? this.isTouchDevice : t;
        }
        get isInfinite() {
            return this.option("infinite");
        }
        get angle() {
            return 180 * Math.atan2(this.current.b, this.current.a) / Math.PI || 0;
        }
        get targetAngle() {
            return 180 * Math.atan2(this.target.b, this.target.a) / Math.PI || 0;
        }
        get scale() {
            const {a: t, b: e} = this.current;
            return Math.sqrt(t * t + e * e) || 1;
        }
        get targetScale() {
            const {a: t, b: e} = this.target;
            return Math.sqrt(t * t + e * e) || 1;
        }
        get minScale() {
            return this.option("minScale") || 1;
        }
        get fullScale() {
            const {contentRect: t} = this;
            return t.fullWidth / t.fitWidth || 1;
        }
        get maxScale() {
            return this.fullScale * (this.option("maxScale") || 1) || 1;
        }
        get coverScale() {
            const {containerRect: t, contentRect: e} = this, i = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1;
            return Math.min(this.fullScale, i);
        }
        get isScaling() {
            return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting;
        }
        get isContentLoading() {
            const t = this.content;
            return !!(t && t instanceof HTMLImageElement) && !t.complete;
        }
        get isResting() {
            if (this.isBouncingX || this.isBouncingY) return !1;
            for (const t of b) {
                const e = "e" == t || "f" === t ? 1e-4 : 1e-5;
                if (Math.abs(this.target[t] - this.current[t]) > e) return !1;
            }
            return !(!this.ignoreBounds && !this.checkBounds().inBounds);
        }
        constructor(t, e = {}, i = {}) {
            var s;
            if (super(e), Object.defineProperty(this, "pointerTracker", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "resizeObserver", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "updateTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "clickTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "rAF", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "isTicking", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "ignoreBounds", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "isBouncingX", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "isBouncingY", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "clicks", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "trackingPoints", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "pwt", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "cwd", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "pmme", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "friction", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: m.Init
            }), Object.defineProperty(this, "isDragging", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "content", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "spinner", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "containerRect", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0
                }
            }), Object.defineProperty(this, "contentRect", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    fullWidth: 0,
                    fullHeight: 0,
                    fitWidth: 0,
                    fitHeight: 0,
                    width: 0,
                    height: 0
                }
            }), Object.defineProperty(this, "dragStart", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    x: 0,
                    y: 0,
                    top: 0,
                    left: 0,
                    time: 0
                }
            }), Object.defineProperty(this, "dragOffset", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    x: 0,
                    y: 0,
                    time: 0
                }
            }), Object.defineProperty(this, "current", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: Object.assign({}, P)
            }), Object.defineProperty(this, "target", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: Object.assign({}, P)
            }), Object.defineProperty(this, "velocity", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                    e: 0,
                    f: 0
                }
            }), Object.defineProperty(this, "lockedAxis", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), !t) throw new Error("Container Element Not Found");
            this.container = t, this.initContent(), this.attachPlugins(Object.assign(Object.assign({}, R.Plugins), i)), 
            this.emit("attachPlugins"), this.emit("init");
            const o = this.content;
            if (o.addEventListener("load", this.onLoad), o.addEventListener("error", this.onError), 
            this.isContentLoading) {
                if (this.option("spinner")) {
                    t.classList.add(this.cn("isLoading"));
                    const e = n(w);
                    !t.contains(o) || o.parentElement instanceof HTMLPictureElement ? this.spinner = t.appendChild(e) : this.spinner = (null === (s = o.parentElement) || void 0 === s ? void 0 : s.insertBefore(e, o)) || null;
                }
                this.emit("beforeLoad");
            } else queueMicrotask((() => {
                this.enable();
            }));
        }
        initContent() {
            const {container: t} = this, e = this.cn(A);
            let i = this.option(A) || t.querySelector(`.${e}`);
            if (i || (i = t.querySelector("img,picture") || t.firstElementChild, i && S(i, e)), 
            i instanceof HTMLPictureElement && (i = i.querySelector("img")), !i) throw new Error("No content found");
            this.content = i;
        }
        onLoad() {
            const {spinner: t, container: e, state: i} = this;
            t && (t.remove(), this.spinner = null), this.option("spinner") && e.classList.remove(this.cn("isLoading")), 
            this.emit("afterLoad"), i === m.Init ? this.enable() : this.updateMetrics();
        }
        onError() {
            this.state !== m.Destroy && (this.spinner && (this.spinner.remove(), this.spinner = null), 
            this.stop(), this.detachEvents(), this.state = m.Error, this.emit("error"));
        }
        attachObserver() {
            var t;
            const e = () => {
                const {container: t, containerRect: e} = this;
                return Math.abs(e.width - t.getBoundingClientRect().width) > .1 || Math.abs(e.height - t.getBoundingClientRect().height) > .1;
            };
            this.resizeObserver || void 0 === window.ResizeObserver || (this.resizeObserver = new ResizeObserver((() => {
                this.updateTimer || (e() ? (this.onResize(), this.isMobile && (this.updateTimer = setTimeout((() => {
                    e() && this.onResize(), this.updateTimer = null;
                }), 500))) : this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null));
            }))), null === (t = this.resizeObserver) || void 0 === t || t.observe(this.container);
        }
        detachObserver() {
            var t;
            null === (t = this.resizeObserver) || void 0 === t || t.disconnect();
        }
        attachEvents() {
            const {container: t} = this;
            t.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.addEventListener("wheel", this.onWheel, {
                passive: !1
            }), this.pointerTracker = new l(t, {
                start: this.onPointerDown,
                move: this.onPointerMove,
                end: this.onPointerUp
            }), document.addEventListener(M, this.onMouseMove);
        }
        detachEvents() {
            var t;
            const {container: e} = this;
            e.removeEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), e.removeEventListener("wheel", this.onWheel, {
                passive: !1
            }), null === (t = this.pointerTracker) || void 0 === t || t.stop(), this.pointerTracker = null, 
            document.removeEventListener(M, this.onMouseMove), document.removeEventListener("keydown", this.onKeydown, !0), 
            this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.updateTimer && (clearTimeout(this.updateTimer), 
            this.updateTimer = null);
        }
        animate() {
            this.setTargetForce();
            const t = this.friction, e = this.option("maxVelocity");
            for (const i of b) t ? (this.velocity[i] *= 1 - t, e && !this.isScaling && (this.velocity[i] = Math.max(Math.min(this.velocity[i], e), -1 * e)), 
            this.current[i] += this.velocity[i]) : this.current[i] = this.target[i];
            this.setTransform(), this.setEdgeForce(), !this.isResting || this.isDragging ? this.rAF = requestAnimationFrame((() => this.animate())) : this.stop("current");
        }
        setTargetForce() {
            for (const t of b) "e" === t && this.isBouncingX || "f" === t && this.isBouncingY || (this.velocity[t] = (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]));
        }
        checkBounds(t = 0, e = 0) {
            const {current: i} = this, n = i.e + t, s = i.f + e, o = this.getBounds(), {x: a, y: r} = o, l = a.min, c = a.max, h = r.min, d = r.max;
            let u = 0, f = 0;
            return l !== 1 / 0 && n < l ? u = l - n : c !== 1 / 0 && n > c && (u = c - n), h !== 1 / 0 && s < h ? f = h - s : d !== 1 / 0 && s > d && (f = d - s), 
            Math.abs(u) < 1e-4 && (u = 0), Math.abs(f) < 1e-4 && (f = 0), Object.assign(Object.assign({}, o), {
                xDiff: u,
                yDiff: f,
                inBounds: !u && !f
            });
        }
        clampTargetBounds() {
            const {target: t} = this, {x: e, y: i} = this.getBounds();
            e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)), 
            i.min !== 1 / 0 && (t.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (t.f = Math.min(t.f, i.max));
        }
        calculateContentDim(t = this.current) {
            const {content: e, contentRect: i} = this, {fitWidth: n, fitHeight: s, fullWidth: o, fullHeight: a} = i;
            let r = o, l = a;
            if (this.option("zoom") || 0 !== this.angle) {
                const i = !(e instanceof HTMLImageElement) && ("none" === window.getComputedStyle(e).maxWidth || "none" === window.getComputedStyle(e).maxHeight), c = i ? o : n, h = i ? a : s, d = this.getMatrix(t), u = new DOMPoint(0, 0).matrixTransform(d), f = new DOMPoint(0 + c, 0).matrixTransform(d), p = new DOMPoint(0 + c, 0 + h).matrixTransform(d), g = new DOMPoint(0, 0 + h).matrixTransform(d), m = Math.abs(p.x - u.x), b = Math.abs(p.y - u.y), v = Math.abs(g.x - f.x), y = Math.abs(g.y - f.y);
                r = Math.max(m, v), l = Math.max(b, y);
            }
            return {
                contentWidth: r,
                contentHeight: l
            };
        }
        setEdgeForce() {
            if (this.ignoreBounds || this.isDragging || this.panMode === M || this.targetScale < this.scale) return this.isBouncingX = !1, 
            void (this.isBouncingY = !1);
            const {target: t} = this, {x: e, y: i, xDiff: n, yDiff: s} = this.checkBounds();
            const o = this.option("maxVelocity");
            let a = this.velocity.e, r = this.velocity.f;
            0 !== n ? (this.isBouncingX = !0, n * a <= 0 ? a += .14 * n : (a = .14 * n, e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)), 
            e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))), o && (a = Math.max(Math.min(a, o), -1 * o))) : this.isBouncingX = !1, 
            0 !== s ? (this.isBouncingY = !0, s * r <= 0 ? r += .14 * s : (r = .14 * s, i.min !== 1 / 0 && (this.target.f = Math.max(t.f, i.min)), 
            i.max !== 1 / 0 && (this.target.f = Math.min(t.f, i.max))), o && (r = Math.max(Math.min(r, o), -1 * o))) : this.isBouncingY = !1, 
            this.isBouncingX && (this.velocity.e = a), this.isBouncingY && (this.velocity.f = r);
        }
        enable() {
            const {content: t} = this, e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform);
            for (const t of b) this.current[t] = this.target[t] = e[t];
            this.updateMetrics(), this.attachObserver(), this.attachEvents(), this.state = m.Ready, 
            this.emit("ready");
        }
        onClick(t) {
            var e;
            "click" === t.type && 0 === t.detail && (this.dragOffset.x = 0, this.dragOffset.y = 0), 
            this.isDragging && (null === (e = this.pointerTracker) || void 0 === e || e.clear(), 
            this.trackingPoints = [], this.startDecelAnim());
            const i = t.target;
            if (!i || t.defaultPrevented) return;
            if (i.hasAttribute("disabled")) return t.preventDefault(), void t.stopPropagation();
            if ((() => {
                const t = window.getSelection();
                return t && "Range" === t.type;
            })() && !i.closest("button")) return;
            const n = i.closest("[data-panzoom-action]"), s = i.closest("[data-panzoom-change]"), o = n || s, a = o && x(o) ? o.dataset : null;
            if (a) {
                const e = a.panzoomChange, i = a.panzoomAction;
                if ((e || i) && t.preventDefault(), e) {
                    let t = {};
                    try {
                        t = JSON.parse(e);
                    } catch (t) {
                        console && console.warn("The given data was not valid JSON");
                    }
                    return void this.applyChange(t);
                }
                if (i) return void (this[i] && this[i]());
            }
            if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3) return t.preventDefault(), 
            void t.stopPropagation();
            if (i.closest("[data-fancybox]")) return;
            const r = this.content.getBoundingClientRect(), l = this.dragStart;
            if (l.time && !this.canZoomOut() && (Math.abs(r.x - l.x) > 2 || Math.abs(r.y - l.y) > 2)) return;
            this.dragStart.time = 0;
            const c = e => {
                this.option("zoom", t) && e && "string" == typeof e && /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e) && "function" == typeof this[e] && (t.preventDefault(), 
                this[e]({
                    event: t
                }));
            }, h = this.option("click", t), d = this.option("dblClick", t);
            d ? (this.clicks++, 1 == this.clicks && (this.clickTimer = setTimeout((() => {
                1 === this.clicks ? (this.emit("click", t), !t.defaultPrevented && h && c(h)) : (this.emit("dblClick", t), 
                t.defaultPrevented || c(d)), this.clicks = 0, this.clickTimer = null;
            }), 350))) : (this.emit("click", t), !t.defaultPrevented && h && c(h));
        }
        addTrackingPoint(t) {
            const e = this.trackingPoints.filter((t => t.time > Date.now() - 100));
            e.push(t), this.trackingPoints = e;
        }
        onPointerDown(t, e, i) {
            var n;
            if (!1 === this.option("touch", t)) return !1;
            this.pwt = 0, this.dragOffset = {
                x: 0,
                y: 0,
                time: 0
            }, this.trackingPoints = [];
            const s = this.content.getBoundingClientRect();
            if (this.dragStart = {
                x: s.x,
                y: s.y,
                top: s.top,
                left: s.left,
                time: Date.now()
            }, this.clickTimer) return !1;
            if (this.panMode === M && this.targetScale > 1) return t.preventDefault(), t.stopPropagation(), 
            !1;
            const o = t.composedPath()[0];
            if (!i.length) {
                if ([ "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO", "IFRAME" ].includes(o.nodeName) || o.closest("[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]")) return !1;
                null === (n = window.getSelection()) || void 0 === n || n.removeAllRanges();
            }
            if ("mousedown" === t.type) [ "A", "BUTTON" ].includes(o.nodeName) || t.preventDefault(); else if (Math.abs(this.velocity.a) > .3) return !1;
            return this.target.e = this.current.e, this.target.f = this.current.f, this.stop(), 
            this.isDragging || (this.isDragging = !0, this.addTrackingPoint(e), this.emit("touchStart", t)), 
            !0;
        }
        onPointerMove(e, n, s) {
            if (!1 === this.option("touch", e)) return;
            if (!this.isDragging) return;
            if (n.length < 2 && this.panOnlyZoomed && t(this.targetScale) <= t(this.minScale)) return;
            if (this.emit("touchMove", e), e.defaultPrevented) return;
            this.addTrackingPoint(n[0]);
            const {content: o} = this, a = h(s[0], s[1]), r = h(n[0], n[1]);
            let l = 0, d = 0;
            if (n.length > 1) {
                const t = o.getBoundingClientRect();
                l = a.clientX - t.left - .5 * t.width, d = a.clientY - t.top - .5 * t.height;
            }
            const u = c(s[0], s[1]), f = c(n[0], n[1]);
            let p = u ? f / u : 1, g = r.clientX - a.clientX, m = r.clientY - a.clientY;
            this.dragOffset.x += g, this.dragOffset.y += m, this.dragOffset.time = Date.now() - this.dragStart.time;
            let b = t(this.targetScale) === t(this.minScale) && this.option("lockAxis");
            if (b && !this.lockedAxis) if ("xy" === b || "y" === b || "touchmove" === e.type) {
                if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6) return void e.preventDefault();
                const t = Math.abs(180 * Math.atan2(this.dragOffset.y, this.dragOffset.x) / Math.PI);
                this.lockedAxis = t > 45 && t < 135 ? "y" : "x", this.dragOffset.x = 0, this.dragOffset.y = 0, 
                g = 0, m = 0;
            } else this.lockedAxis = b;
            if (i(e.target, this.content) && (b = "x", this.dragOffset.y = 0), b && "xy" !== b && this.lockedAxis !== b && t(this.targetScale) === t(this.minScale)) return;
            e.cancelable && e.preventDefault(), this.container.classList.add(this.cn("isDragging"));
            const v = this.checkBounds(g, m);
            this.option("rubberband") ? ("x" !== this.isInfinite && (v.xDiff > 0 && g < 0 || v.xDiff < 0 && g > 0) && (g *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitWidth * v.xDiff))), 
            "y" !== this.isInfinite && (v.yDiff > 0 && m < 0 || v.yDiff < 0 && m > 0) && (m *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitHeight * v.yDiff)))) : (v.xDiff && (g = 0), 
            v.yDiff && (m = 0));
            const y = this.targetScale, w = this.minScale, x = this.maxScale;
            y < .5 * w && (p = Math.max(p, w)), y > 1.5 * x && (p = Math.min(p, x)), "y" === this.lockedAxis && t(y) === t(w) && (g = 0), 
            "x" === this.lockedAxis && t(y) === t(w) && (m = 0), this.applyChange({
                originX: l,
                originY: d,
                panX: g,
                panY: m,
                scale: p,
                friction: this.option("dragFriction"),
                ignoreBounds: !0
            });
        }
        onPointerUp(t, e, n) {
            if (n.length) return this.dragOffset.x = 0, this.dragOffset.y = 0, void (this.trackingPoints = []);
            this.container.classList.remove(this.cn("isDragging")), this.isDragging && (this.addTrackingPoint(e), 
            this.panOnlyZoomed && this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1 && (this.trackingPoints = []), 
            i(t.target, this.content) && "y" === this.lockedAxis && (this.trackingPoints = []), 
            this.emit("touchEnd", t), this.isDragging = !1, this.lockedAxis = !1, this.state !== m.Destroy && (t.defaultPrevented || this.startDecelAnim()));
        }
        startDecelAnim() {
            var e;
            const i = this.isScaling;
            this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, 
            this.isBouncingY = !1;
            for (const t of b) this.velocity[t] = 0;
            this.target.e = this.current.e, this.target.f = this.current.f, E(this.container, "is-scaling"), 
            E(this.container, "is-animating"), this.isTicking = !1;
            const {trackingPoints: n} = this, s = n[0], o = n[n.length - 1];
            let a = 0, r = 0, l = 0;
            o && s && (a = o.clientX - s.clientX, r = o.clientY - s.clientY, l = o.time - s.time);
            const c = (null === (e = window.visualViewport) || void 0 === e ? void 0 : e.scale) || 1;
            1 !== c && (a *= c, r *= c);
            let h = 0, d = 0, u = 0, f = 0, p = this.option("decelFriction");
            const g = this.targetScale;
            if (l > 0) {
                u = Math.abs(a) > 3 ? a / (l / 30) : 0, f = Math.abs(r) > 3 ? r / (l / 30) : 0;
                const t = this.option("maxVelocity");
                t && (u = Math.max(Math.min(u, t), -1 * t), f = Math.max(Math.min(f, t), -1 * t));
            }
            u && (h = u / (1 / (1 - p) - 1)), f && (d = f / (1 / (1 - p) - 1)), ("y" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "y" === this.lockedAxis && t(g) === this.minScale) && (h = u = 0), 
            ("x" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "x" === this.lockedAxis && t(g) === this.minScale) && (d = f = 0);
            const m = this.dragOffset.x, v = this.dragOffset.y, y = this.option("dragMinThreshold") || 0;
            Math.abs(m) < y && Math.abs(v) < y && (h = d = 0, u = f = 0), (this.option("zoom") && (g < this.minScale - 1e-5 || g > this.maxScale + 1e-5) || i && !h && !d) && (p = .35), 
            this.applyChange({
                panX: h,
                panY: d,
                friction: p
            }), this.emit("decel", u, f, m, v);
        }
        onWheel(t) {
            var e = [ -t.deltaX || 0, -t.deltaY || 0, -t.detail || 0 ].reduce((function(t, e) {
                return Math.abs(e) > Math.abs(t) ? e : t;
            }));
            const i = Math.max(-1, Math.min(1, e));
            if (this.emit("wheel", t, i), this.panMode === M) return;
            if (t.defaultPrevented) return;
            const n = this.option("wheel");
            "pan" === n ? (t.preventDefault(), this.panOnlyZoomed && !this.canZoomOut() || this.applyChange({
                panX: 2 * -t.deltaX,
                panY: 2 * -t.deltaY,
                bounce: !1
            })) : "zoom" === n && !1 !== this.option("zoom") && this.zoomWithWheel(t);
        }
        onMouseMove(t) {
            this.panWithMouse(t);
        }
        onKeydown(t) {
            "Escape" === t.key && this.toggleFS();
        }
        onResize() {
            this.updateMetrics(), this.checkBounds().inBounds || this.requestTick();
        }
        setTransform() {
            this.emit("beforeTransform");
            const {current: e, target: i, content: n, contentRect: s} = this, o = Object.assign({}, P);
            for (const n of b) {
                const s = "e" == n || "f" === n ? T : C;
                o[n] = t(e[n], s), Math.abs(i[n] - e[n]) < ("e" == n || "f" === n ? .51 : .001) && (e[n] = i[n]);
            }
            let {a, b: r, c: l, d: c, e: h, f: d} = o, u = `matrix(${a}, ${r}, ${l}, ${c}, ${h}, ${d})`, f = n.parentElement instanceof HTMLPictureElement ? n.parentElement : n;
            if (this.option("transformParent") && (f = f.parentElement || f), f.style.transform === u) return;
            f.style.transform = u;
            const {contentWidth: p, contentHeight: g} = this.calculateContentDim();
            s.width = p, s.height = g, this.emit("afterTransform");
        }
        updateMetrics(e = !1) {
            var i;
            if (!this || this.state === m.Destroy) return;
            if (this.isContentLoading) return;
            const n = Math.max(1, (null === (i = window.visualViewport) || void 0 === i ? void 0 : i.scale) || 1), {container: s, content: o} = this, a = o instanceof HTMLImageElement, r = s.getBoundingClientRect(), l = getComputedStyle(this.container);
            let c = r.width * n, h = r.height * n;
            const d = parseFloat(l.paddingTop) + parseFloat(l.paddingBottom), u = c - (parseFloat(l.paddingLeft) + parseFloat(l.paddingRight)), f = h - d;
            this.containerRect = {
                width: c,
                height: h,
                innerWidth: u,
                innerHeight: f
            };
            let p = this.option("width") || "auto", g = this.option("height") || "auto";
            "auto" === p && (p = parseFloat(o.dataset.width || "") || (t => {
                let e = 0;
                return e = t instanceof HTMLImageElement ? t.naturalWidth : t instanceof SVGElement ? t.width.baseVal.value : Math.max(t.offsetWidth, t.scrollWidth), 
                e || 0;
            })(o)), "auto" === g && (g = parseFloat(o.dataset.height || "") || (t => {
                let e = 0;
                return e = t instanceof HTMLImageElement ? t.naturalHeight : t instanceof SVGElement ? t.height.baseVal.value : Math.max(t.offsetHeight, t.scrollHeight), 
                e || 0;
            })(o));
            let b = o.parentElement instanceof HTMLPictureElement ? o.parentElement : o;
            this.option("transformParent") && (b = b.parentElement || b);
            const v = b.getAttribute("style") || "";
            b.style.setProperty("transform", "none", "important"), a && (b.style.width = "", 
            b.style.height = ""), b.offsetHeight;
            const y = o.getBoundingClientRect();
            let w = y.width * n, x = y.height * n, E = 0, S = 0;
            a && (Math.abs(p - w) > 1 || Math.abs(g - x) > 1) && ({width: w, height: x, top: E, left: S} = ((t, e, i, n) => {
                const s = i / n;
                return s > t / e ? (i = t, n = t / s) : (i = e * s, n = e), {
                    width: i,
                    height: n,
                    top: .5 * (e - n),
                    left: .5 * (t - i)
                };
            })(w, x, p, g)), this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
                top: y.top - r.top + E,
                bottom: r.bottom - y.bottom + E,
                left: y.left - r.left + S,
                right: r.right - y.right + S,
                fitWidth: w,
                fitHeight: x,
                width: w,
                height: x,
                fullWidth: p,
                fullHeight: g
            }), b.style.cssText = v, a && (b.style.width = `${w}px`, b.style.height = `${x}px`), 
            this.setTransform(), !0 !== e && this.emit("refresh"), this.ignoreBounds || (t(this.targetScale) < t(this.minScale) ? this.zoomTo(this.minScale, {
                friction: 0
            }) : this.targetScale > this.maxScale ? this.zoomTo(this.maxScale, {
                friction: 0
            }) : this.state === m.Init || this.checkBounds().inBounds || this.requestTick()), 
            this.updateControls();
        }
        calculateBounds() {
            const {contentWidth: e, contentHeight: i} = this.calculateContentDim(this.target), {targetScale: n, lockedAxis: s} = this, {fitWidth: o, fitHeight: a} = this.contentRect;
            let r = 0, l = 0, c = 0, h = 0;
            const d = this.option("infinite");
            if (!0 === d || s && d === s) r = -1 / 0, c = 1 / 0, l = -1 / 0, h = 1 / 0; else {
                let {containerRect: s, contentRect: d} = this, u = t(o * n, T), f = t(a * n, T), {innerWidth: p, innerHeight: g} = s;
                if (s.width === u && (p = s.width), s.width === f && (g = s.height), e > p) {
                    c = .5 * (e - p), r = -1 * c;
                    let t = .5 * (d.right - d.left);
                    r += t, c += t;
                }
                if (o > p && e < p && (r -= .5 * (o - p), c -= .5 * (o - p)), i > g) {
                    h = .5 * (i - g), l = -1 * h;
                    let t = .5 * (d.bottom - d.top);
                    l += t, h += t;
                }
                a > g && i < g && (r -= .5 * (a - g), c -= .5 * (a - g));
            }
            return {
                x: {
                    min: r,
                    max: c
                },
                y: {
                    min: l,
                    max: h
                }
            };
        }
        getBounds() {
            const t = this.option("bounds");
            return "auto" !== t ? t : this.calculateBounds();
        }
        updateControls() {
            const e = this, i = e.container, {panMode: n, contentRect: s, fullScale: a, targetScale: r, coverScale: l, maxScale: c, minScale: h} = e;
            let d = {
                toggleMax: r - h < .5 * (c - h) ? c : h,
                toggleCover: r - h < .5 * (l - h) ? l : h,
                toggleZoom: r - h < .5 * (a - h) ? a : h
            }[e.option("click") || ""] || h, u = e.canZoomIn(), f = e.canZoomOut(), p = n === O && !!this.option("touch"), g = f && p;
            if (p && (t(r) < t(h) && !this.panOnlyZoomed && (g = !0), (t(s.width, 1) > t(s.fitWidth, 1) || t(s.height, 1) > t(s.fitHeight, 1)) && (g = !0)), 
            t(s.width * r, 1) < t(s.fitWidth, 1) && (g = !1), n === M && (g = !1), o(i, this.cn("isDraggable"), g), 
            !this.option("zoom")) return;
            let m = u && t(d) > t(r), b = !m && !g && f && t(d) < t(r);
            o(i, this.cn("canZoomIn"), m), o(i, this.cn("canZoomOut"), b);
            for (const t of i.querySelectorAll('[data-panzoom-action="zoomIn"]')) u ? (t.removeAttribute("disabled"), 
            t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
            for (const t of i.querySelectorAll('[data-panzoom-action="zoomOut"]')) f ? (t.removeAttribute("disabled"), 
            t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
            for (const t of i.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
                u || f ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), 
                t.setAttribute("tabindex", "-1"));
                const e = t.querySelector("g");
                e && (e.style.display = u ? "" : "none");
            }
        }
        panTo({x: t = this.target.e, y: e = this.target.f, scale: i = this.targetScale, friction: n = this.option("friction"), angle: s = 0, originX: o = 0, originY: a = 0, flipX: r = !1, flipY: l = !1, ignoreBounds: c = !1}) {
            this.state !== m.Destroy && this.applyChange({
                panX: t - this.target.e,
                panY: e - this.target.f,
                scale: i / this.targetScale,
                angle: s,
                originX: o,
                originY: a,
                friction: n,
                flipX: r,
                flipY: l,
                ignoreBounds: c
            });
        }
        applyChange({panX: e = 0, panY: i = 0, scale: n = 1, angle: s = 0, originX: o = -this.current.e, originY: a = -this.current.f, friction: r = this.option("friction"), flipX: l = !1, flipY: c = !1, ignoreBounds: h = !1, bounce: d = this.option("bounce")}) {
            const u = this.state;
            if (u === m.Destroy) return;
            this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.friction = r || 0, 
            this.ignoreBounds = h;
            const {current: f} = this, p = f.e, g = f.f, v = this.getMatrix(this.target);
            let y = (new DOMMatrix).translate(p, g).translate(o, a).translate(e, i);
            if (this.option("zoom")) {
                if (!h) {
                    const t = this.targetScale, e = this.minScale, i = this.maxScale;
                    t * n < e && (n = e / t), t * n > i && (n = i / t);
                }
                y = y.scale(n);
            }
            y = y.translate(-o, -a).translate(-p, -g).multiply(v), s && (y = y.rotate(s)), l && (y = y.scale(-1, 1)), 
            c && (y = y.scale(1, -1));
            for (const e of b) "e" !== e && "f" !== e && (y[e] > this.minScale + 1e-5 || y[e] < this.minScale - 1e-5) ? this.target[e] = y[e] : this.target[e] = t(y[e], T);
            (this.targetScale < this.scale || Math.abs(n - 1) > .1 || this.panMode === M || !1 === d) && !h && this.clampTargetBounds(), 
            u === m.Init ? this.animate() : this.isResting || (this.state = m.Panning, this.requestTick());
        }
        stop(t = !1) {
            if (this.state === m.Init || this.state === m.Destroy) return;
            const e = this.isTicking;
            this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, 
            this.isBouncingY = !1;
            for (const e of b) this.velocity[e] = 0, "current" === t ? this.current[e] = this.target[e] : "target" === t && (this.target[e] = this.current[e]);
            this.setTransform(), E(this.container, "is-scaling"), E(this.container, "is-animating"), 
            this.isTicking = !1, this.state = m.Ready, e && (this.emit("endAnimation"), this.updateControls());
        }
        requestTick() {
            this.isTicking || (this.emit("startAnimation"), this.updateControls(), S(this.container, "is-animating"), 
            this.isScaling && S(this.container, "is-scaling")), this.isTicking = !0, this.rAF || (this.rAF = requestAnimationFrame((() => this.animate())));
        }
        panWithMouse(e, i = this.option("mouseMoveFriction")) {
            if (this.pmme = e, this.panMode !== M || !e) return;
            if (t(this.targetScale) <= t(this.minScale)) return;
            this.emit("mouseMove", e);
            const {container: n, containerRect: s, contentRect: o} = this, a = s.width, r = s.height, l = n.getBoundingClientRect(), c = (e.clientX || 0) - l.left, h = (e.clientY || 0) - l.top;
            let {contentWidth: d, contentHeight: u} = this.calculateContentDim(this.target);
            const f = this.option("mouseMoveFactor");
            f > 1 && (d !== a && (d *= f), u !== r && (u *= f));
            let p = .5 * (d - a) - c / a * 100 / 100 * (d - a);
            p += .5 * (o.right - o.left);
            let g = .5 * (u - r) - h / r * 100 / 100 * (u - r);
            g += .5 * (o.bottom - o.top), this.applyChange({
                panX: p - this.target.e,
                panY: g - this.target.f,
                friction: i
            });
        }
        zoomWithWheel(e) {
            if (this.state === m.Destroy || this.state === m.Init) return;
            const i = Date.now();
            if (i - this.pwt < 45) return void e.preventDefault();
            this.pwt = i;
            var n = [ -e.deltaX || 0, -e.deltaY || 0, -e.detail || 0 ].reduce((function(t, e) {
                return Math.abs(e) > Math.abs(t) ? e : t;
            }));
            const s = Math.max(-1, Math.min(1, n)), {targetScale: o, maxScale: a, minScale: r} = this;
            let l = o * (100 + 45 * s) / 100;
            t(l) < t(r) && t(o) <= t(r) ? (this.cwd += Math.abs(s), l = r) : t(l) > t(a) && t(o) >= t(a) ? (this.cwd += Math.abs(s), 
            l = a) : (this.cwd = 0, l = Math.max(Math.min(l, a), r)), this.cwd > this.option("wheelLimit") || (e.preventDefault(), 
            t(l) !== t(o) && this.zoomTo(l, {
                event: e
            }));
        }
        canZoomIn() {
            return this.option("zoom") && (t(this.contentRect.width, 1) < t(this.contentRect.fitWidth, 1) || t(this.targetScale) < t(this.maxScale));
        }
        canZoomOut() {
            return this.option("zoom") && t(this.targetScale) > t(this.minScale);
        }
        zoomIn(t = 1.25, e) {
            this.zoomTo(this.targetScale * t, e);
        }
        zoomOut(t = .8, e) {
            this.zoomTo(this.targetScale * t, e);
        }
        zoomToFit(t) {
            this.zoomTo("fit", t);
        }
        zoomToCover(t) {
            this.zoomTo("cover", t);
        }
        zoomToFull(t) {
            this.zoomTo("full", t);
        }
        zoomToMax(t) {
            this.zoomTo("max", t);
        }
        toggleZoom(t) {
            this.zoomTo(this.targetScale - this.minScale < .5 * (this.fullScale - this.minScale) ? "full" : "fit", t);
        }
        toggleMax(t) {
            this.zoomTo(this.targetScale - this.minScale < .5 * (this.maxScale - this.minScale) ? "max" : "fit", t);
        }
        toggleCover(t) {
            this.zoomTo(this.targetScale - this.minScale < .5 * (this.coverScale - this.minScale) ? "cover" : "fit", t);
        }
        iterateZoom(t) {
            this.zoomTo("next", t);
        }
        zoomTo(t = 1, {friction: e = "auto", originX: i = "auto", originY: n = "auto", event: s} = {}) {
            if (this.isContentLoading || this.state === m.Destroy) return;
            const {targetScale: o} = this;
            this.stop();
            let a = 1;
            if (this.panMode === M && (s = this.pmme || s), s || "auto" === i || "auto" === n) {
                const t = this.content.getBoundingClientRect(), e = this.container.getBoundingClientRect(), o = s ? s.clientX : e.left + .5 * e.width, a = s ? s.clientY : e.top + .5 * e.height;
                i = o - t.left - .5 * t.width, n = a - t.top - .5 * t.height;
            }
            const r = this.fullScale, l = this.maxScale, c = this.coverScale;
            if ("number" == typeof t) a = t / o || 1; else if ("full" === t) a = r / o || 1; else if ("cover" === t) a = c / o || 1; else if ("max" === t) a = l / o || 1; else if ("fit" === t) a = 1 / o || 1; else if ("next" === t) {
                let t = [ 1, r, l ].sort(((t, e) => t - e)), e = t.findIndex((t => t > o + 1e-5));
                a = t[e] / o || 1 / o;
            }
            e = "auto" === e ? a > 1 ? .15 : .25 : e, this.applyChange({
                scale: a,
                originX: i,
                originY: n,
                friction: e
            }), s && this.panMode === M && this.panWithMouse(s, e);
        }
        rotateCCW() {
            this.applyChange({
                angle: -90
            });
        }
        rotateCW() {
            this.applyChange({
                angle: 90
            });
        }
        flipX() {
            this.applyChange({
                flipX: !0
            });
        }
        flipY() {
            this.applyChange({
                flipY: !0
            });
        }
        fitX() {
            this.stop("target");
            const {containerRect: t, contentRect: e, target: i} = this;
            this.applyChange({
                panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
                panY: .5 * t.height - (e.top + .5 * e.fitHeight) - i.f,
                scale: t.width / e.fitWidth / this.targetScale,
                originX: 0,
                originY: 0,
                ignoreBounds: !0
            });
        }
        fitY() {
            this.stop("target");
            const {containerRect: t, contentRect: e, target: i} = this;
            this.applyChange({
                panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
                panY: .5 * t.innerHeight - (e.top + .5 * e.fitHeight) - i.f,
                scale: t.height / e.fitHeight / this.targetScale,
                originX: 0,
                originY: 0,
                ignoreBounds: !0
            });
        }
        toggleFS() {
            const {container: t} = this, e = this.cn("inFullscreen"), i = this.cn("htmlHasFullscreen");
            t.classList.toggle(e);
            const n = t.classList.contains(e);
            n ? (document.documentElement.classList.add(i), document.addEventListener("keydown", this.onKeydown, !0)) : (document.documentElement.classList.remove(i), 
            document.removeEventListener("keydown", this.onKeydown, !0)), this.updateMetrics(), 
            this.emit(n ? "enterFS" : "exitFS");
        }
        getMatrix(t = this.current) {
            const {a: e, b: i, c: n, d: s, e: o, f: a} = t;
            return new DOMMatrix([ e, i, n, s, o, a ]);
        }
        reset(t) {
            if (this.state !== m.Init && this.state !== m.Destroy) {
                this.stop("current");
                for (const t of b) this.target[t] = P[t];
                this.target.a = this.minScale, this.target.d = this.minScale, this.clampTargetBounds(), 
                this.isResting || (this.friction = void 0 === t ? this.option("friction") : t, this.state = m.Panning, 
                this.requestTick());
            }
        }
        destroy() {
            this.stop(), this.state = m.Destroy, this.detachEvents(), this.detachObserver();
            const {container: t, content: e} = this, i = this.option("classes") || {};
            for (const e of Object.values(i)) t.classList.remove(e + "");
            e && (e.removeEventListener("load", this.onLoad), e.removeEventListener("error", this.onError)), 
            this.detachPlugins();
        }
    }
    Object.defineProperty(R, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: y
    }), Object.defineProperty(R, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    });
    const k = function(t, e) {
        let i = !0;
        return (...n) => {
            i && (i = !1, t(...n), setTimeout((() => {
                i = !0;
            }), e));
        };
    }, I = (t, e) => {
        let i = [];
        return t.childNodes.forEach((t => {
            t.nodeType !== Node.ELEMENT_NODE || e && !t.matches(e) || i.push(t);
        })), i;
    }, D = {
        viewport: null,
        track: null,
        enabled: !0,
        slides: [],
        axis: "x",
        transition: "fade",
        preload: 1,
        slidesPerPage: "auto",
        initialPage: 0,
        friction: .12,
        Panzoom: {
            decelFriction: .12
        },
        center: !0,
        infinite: !0,
        fill: !0,
        dragFree: !1,
        adaptiveHeight: !1,
        direction: "ltr",
        classes: {
            container: "f-carousel",
            viewport: "f-carousel__viewport",
            track: "f-carousel__track",
            slide: "f-carousel__slide",
            isLTR: "is-ltr",
            isRTL: "is-rtl",
            isHorizontal: "is-horizontal",
            isVertical: "is-vertical",
            inTransition: "in-transition",
            isSelected: "is-selected"
        },
        l10n: {
            NEXT: "Next slide",
            PREV: "Previous slide",
            GOTO: "Go to slide #%d"
        }
    };
    var F;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Destroy = 2] = "Destroy";
    }(F || (F = {}));
    const j = t => {
        if ("string" == typeof t || t instanceof HTMLElement) t = {
            html: t
        }; else {
            const e = t.thumb;
            void 0 !== e && ("string" == typeof e && (t.thumbSrc = e), e instanceof HTMLImageElement && (t.thumbEl = e, 
            t.thumbElSrc = e.src, t.thumbSrc = e.src), delete t.thumb);
        }
        return Object.assign({
            html: "",
            el: null,
            isDom: !1,
            class: "",
            customClass: "",
            index: -1,
            dim: 0,
            gap: 0,
            pos: 0,
            transition: !1
        }, t);
    }, H = (t = {}) => Object.assign({
        index: -1,
        slides: [],
        dim: 0,
        pos: -1
    }, t);
    class B extends p {
        constructor(t, e) {
            super(e), Object.defineProperty(this, "instance", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: t
            });
        }
        attach() {}
        detach() {}
    }
    const N = {
        classes: {
            list: "f-carousel__dots",
            isDynamic: "is-dynamic",
            hasDots: "has-dots",
            dot: "f-carousel__dot",
            isBeforePrev: "is-before-prev",
            isPrev: "is-prev",
            isCurrent: "is-current",
            isNext: "is-next",
            isAfterNext: "is-after-next"
        },
        dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
        dynamicFrom: 11,
        maxCount: 1 / 0,
        minCount: 2
    };
    class _ extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "isDynamic", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "list", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onRefresh() {
            this.refresh();
        }
        build() {
            let t = this.list;
            return t || (t = document.createElement("ul"), S(t, this.cn("list")), t.setAttribute("role", "tablist"), 
            this.instance.container.appendChild(t), S(this.instance.container, this.cn("hasDots")), 
            this.list = t), t;
        }
        refresh() {
            var t;
            const e = this.instance.pages.length, i = Math.min(2, this.option("minCount")), n = Math.max(2e3, this.option("maxCount")), s = this.option("dynamicFrom");
            if (e < i || e > n) return void this.cleanup();
            const a = "number" == typeof s && e > 5 && e >= s, r = !this.list || this.isDynamic !== a || this.list.children.length !== e;
            r && this.cleanup();
            const l = this.build();
            if (o(l, this.cn("isDynamic"), !!a), r) for (let t = 0; t < e; t++) l.append(this.createItem(t));
            let c, h = 0;
            for (const e of [ ...l.children ]) {
                const i = h === this.instance.page;
                i && (c = e), o(e, this.cn("isCurrent"), i), null === (t = e.children[0]) || void 0 === t || t.setAttribute("aria-selected", i ? "true" : "false");
                for (const t of [ "isBeforePrev", "isPrev", "isNext", "isAfterNext" ]) E(e, this.cn(t));
                h++;
            }
            if (c = c || l.firstChild, a && c) {
                const t = c.previousElementSibling, e = t && t.previousElementSibling;
                S(t, this.cn("isPrev")), S(e, this.cn("isBeforePrev"));
                const i = c.nextElementSibling, n = i && i.nextElementSibling;
                S(i, this.cn("isNext")), S(n, this.cn("isAfterNext"));
            }
            this.isDynamic = a;
        }
        createItem(t = 0) {
            var e;
            const i = document.createElement("li");
            i.setAttribute("role", "presentation");
            const s = n(this.instance.localize(this.option("dotTpl"), [ [ "%d", t + 1 ] ]).replace(/\%i/g, t + ""));
            return i.appendChild(s), null === (e = i.children[0]) || void 0 === e || e.setAttribute("role", "tab"), 
            i;
        }
        cleanup() {
            this.list && (this.list.remove(), this.list = null), this.isDynamic = !1, E(this.instance.container, this.cn("hasDots"));
        }
        attach() {
            this.instance.on([ "refresh", "change" ], this.onRefresh);
        }
        detach() {
            this.instance.off([ "refresh", "change" ], this.onRefresh), this.cleanup();
        }
    }
    Object.defineProperty(_, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: N
    });
    const index_esm_$ = "disabled", W = "next", X = "prev";
    class Y extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "prev", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "next", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onRefresh() {
            const t = this.instance, e = t.pages.length, i = t.page;
            if (e < 2) return void this.cleanup();
            this.build();
            let n = this.prev, s = this.next;
            n && s && (n.removeAttribute(index_esm_$), s.removeAttribute(index_esm_$), t.isInfinite || (i <= 0 && n.setAttribute(index_esm_$, ""), 
            i >= e - 1 && s.setAttribute(index_esm_$, "")));
        }
        createButton(t) {
            const e = this.instance, i = document.createElement("button");
            i.setAttribute("tabindex", "0"), i.setAttribute("title", e.localize(`{{${t.toUpperCase()}}}`)), 
            S(i, this.cn("button") + " " + this.cn(t === W ? "isNext" : "isPrev"));
            const n = e.isRTL ? t === W ? X : W : t;
            var s;
            return i.innerHTML = e.localize(this.option(`${n}Tpl`)), i.dataset[`carousel${s = t, 
            s ? s.match("^[a-z]") ? s.charAt(0).toUpperCase() + s.substring(1) : s : ""}`] = "true", 
            i;
        }
        build() {
            let t = this.container;
            t || (this.container = t = document.createElement("div"), S(t, this.cn("container")), 
            this.instance.container.appendChild(t)), this.next || (this.next = t.appendChild(this.createButton(W))), 
            this.prev || (this.prev = t.appendChild(this.createButton(X)));
        }
        cleanup() {
            this.prev && this.prev.remove(), this.next && this.next.remove(), this.container && this.container.remove(), 
            this.prev = null, this.next = null, this.container = null;
        }
        attach() {
            this.instance.on([ "refresh", "change" ], this.onRefresh);
        }
        detach() {
            this.instance.off([ "refresh", "change" ], this.onRefresh), this.cleanup();
        }
    }
    Object.defineProperty(Y, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            classes: {
                container: "f-carousel__nav",
                button: "f-button",
                isNext: "is-next",
                isPrev: "is-prev"
            },
            nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
            prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'
        }
    });
    class q extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "selectedIndex", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "target", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "nav", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        addAsTargetFor(t) {
            this.target = this.instance, this.nav = t, this.attachEvents();
        }
        addAsNavFor(t) {
            this.nav = this.instance, this.target = t, this.attachEvents();
        }
        attachEvents() {
            const {nav: t, target: e} = this;
            t && e && (t.options.initialSlide = e.options.initialPage, t.state === F.Ready ? this.onNavReady(t) : t.on("ready", this.onNavReady), 
            e.state === F.Ready ? this.onTargetReady(e) : e.on("ready", this.onTargetReady));
        }
        onNavReady(t) {
            t.on("createSlide", this.onNavCreateSlide), t.on("Panzoom.click", this.onNavClick), 
            t.on("Panzoom.touchEnd", this.onNavTouch), this.onTargetChange();
        }
        onTargetReady(t) {
            t.on("change", this.onTargetChange), t.on("Panzoom.refresh", this.onTargetChange), 
            this.onTargetChange();
        }
        onNavClick(t, e, i) {
            this.onNavTouch(t, t.panzoom, i);
        }
        onNavTouch(t, e, i) {
            var n, s;
            if (Math.abs(e.dragOffset.x) > 3 || Math.abs(e.dragOffset.y) > 3) return;
            const o = i.target, {nav: a, target: r} = this;
            if (!a || !r || !o) return;
            const l = o.closest("[data-index]");
            if (i.stopPropagation(), i.preventDefault(), !l) return;
            const c = parseInt(l.dataset.index || "", 10) || 0, h = r.getPageForSlide(c), d = a.getPageForSlide(c);
            a.slideTo(d), r.slideTo(h, {
                friction: (null === (s = null === (n = this.nav) || void 0 === n ? void 0 : n.plugins) || void 0 === s ? void 0 : s.Sync.option("friction")) || 0
            }), this.markSelectedSlide(c);
        }
        onNavCreateSlide(t, e) {
            e.index === this.selectedIndex && this.markSelectedSlide(e.index);
        }
        onTargetChange() {
            var t, e;
            const {target: i, nav: n} = this;
            if (!i || !n) return;
            if (n.state !== F.Ready || i.state !== F.Ready) return;
            const s = null === (e = null === (t = i.pages[i.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0 === e ? void 0 : e.index, o = n.getPageForSlide(s);
            this.markSelectedSlide(s), n.slideTo(o, null === n.prevPage && null === i.prevPage ? {
                friction: 0
            } : void 0);
        }
        markSelectedSlide(t) {
            const e = this.nav;
            e && e.state === F.Ready && (this.selectedIndex = t, [ ...e.slides ].map((e => {
                e.el && e.el.classList[e.index === t ? "add" : "remove"]("is-nav-selected");
            })));
        }
        attach() {
            const t = this;
            let e = t.options.target, i = t.options.nav;
            e ? t.addAsNavFor(e) : i && t.addAsTargetFor(i);
        }
        detach() {
            const t = this, e = t.nav, i = t.target;
            e && (e.off("ready", t.onNavReady), e.off("createSlide", t.onNavCreateSlide), e.off("Panzoom.click", t.onNavClick), 
            e.off("Panzoom.touchEnd", t.onNavTouch)), t.nav = null, i && (i.off("ready", t.onTargetReady), 
            i.off("refresh", t.onTargetChange), i.off("change", t.onTargetChange)), t.target = null;
        }
    }
    Object.defineProperty(q, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            friction: .35
        }
    });
    const V = {
        Navigation: Y,
        Dots: _,
        Sync: q
    }, Z = "animationend", U = "isSelected", G = "slide";
    class K extends g {
        get axis() {
            return this.isHorizontal ? "e" : "f";
        }
        get isEnabled() {
            return this.state === F.Ready;
        }
        get isInfinite() {
            let t = !1;
            const {contentDim: e, viewportDim: i, pages: n, slides: s} = this, o = s[0];
            return n.length >= 2 && o && e + o.dim >= i && (t = this.option("infinite")), t;
        }
        get isRTL() {
            return "rtl" === this.option("direction");
        }
        get isHorizontal() {
            return "x" === this.option("axis");
        }
        constructor(t, e = {}, i = {}) {
            if (super(), Object.defineProperty(this, "bp", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: ""
            }), Object.defineProperty(this, "lp", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "userOptions", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            }), Object.defineProperty(this, "userPlugins", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: F.Init
            }), Object.defineProperty(this, "page", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "prevPage", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "viewport", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "track", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "slides", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "pages", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "panzoom", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "inTransition", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: new Set
            }), Object.defineProperty(this, "contentDim", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "viewportDim", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), "string" == typeof t && (t = document.querySelector(t)), !t || !x(t)) throw new Error("No Element found");
            this.container = t, this.slideNext = k(this.slideNext.bind(this), 150), this.slidePrev = k(this.slidePrev.bind(this), 150), 
            this.userOptions = e, this.userPlugins = i, queueMicrotask((() => {
                this.processOptions();
            }));
        }
        processOptions() {
            var t, e;
            const i = u({}, K.defaults, this.userOptions);
            let n = "";
            const s = i.breakpoints;
            if (s && d(s)) for (const [t, e] of Object.entries(s)) window.matchMedia(t).matches && d(e) && (n += t, 
            u(i, e));
            n === this.bp && this.state !== F.Init || (this.bp = n, this.state === F.Ready && (i.initialSlide = (null === (e = null === (t = this.pages[this.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0 === e ? void 0 : e.index) || 0), 
            this.state !== F.Init && this.destroy(), super.setOptions(i), !1 === this.option("enabled") ? this.attachEvents() : setTimeout((() => {
                this.init();
            }), 0));
        }
        init() {
            this.state = F.Init, this.emit("init"), this.attachPlugins(Object.assign(Object.assign({}, K.Plugins), this.userPlugins)), 
            this.emit("attachPlugins"), this.initLayout(), this.initSlides(), this.updateMetrics(), 
            this.setInitialPosition(), this.initPanzoom(), this.attachEvents(), this.state = F.Ready, 
            this.emit("ready");
        }
        initLayout() {
            const {container: t} = this, e = this.option("classes");
            S(t, this.cn("container")), o(t, e.isLTR, !this.isRTL), o(t, e.isRTL, this.isRTL), 
            o(t, e.isVertical, !this.isHorizontal), o(t, e.isHorizontal, this.isHorizontal);
            let i = this.option("viewport") || t.querySelector(`.${e.viewport}`);
            i || (i = document.createElement("div"), S(i, e.viewport), i.append(...I(t, `.${e.slide}`)), 
            t.prepend(i)), i.addEventListener("scroll", this.onScroll);
            let n = this.option("track") || t.querySelector(`.${e.track}`);
            n || (n = document.createElement("div"), S(n, e.track), n.append(...Array.from(i.childNodes))), 
            n.setAttribute("aria-live", "polite"), i.contains(n) || i.prepend(n), this.viewport = i, 
            this.track = n, this.emit("initLayout");
        }
        initSlides() {
            const {track: t} = this;
            if (!t) return;
            const e = [ ...this.slides ], i = [];
            [ ...I(t, `.${this.cn(G)}`) ].forEach((t => {
                if (x(t)) {
                    const e = j({
                        el: t,
                        isDom: !0,
                        index: this.slides.length
                    });
                    i.push(e);
                }
            }));
            for (let t of [ ...this.option("slides", []) || [], ...e ]) {
                const e = j(t);
                i.push(e);
            }
            this.slides = i;
            for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
            for (const t of i) this.emit("beforeInitSlide", t, t.index), this.emit("initSlide", t, t.index);
            this.emit("initSlides");
        }
        setInitialPage() {
            const t = this.option("initialSlide");
            this.page = "number" == typeof t ? this.getPageForSlide(t) : parseInt(this.option("initialPage", 0) + "", 10) || 0;
        }
        setInitialPosition() {
            const {track: t, pages: e, isHorizontal: i} = this;
            if (!t || !e.length) return;
            let n = this.page;
            e[n] || (this.page = n = 0);
            const s = (e[n].pos || 0) * (this.isRTL && i ? 1 : -1), o = i ? `${s}px` : "0", a = i ? "0" : `${s}px`;
            t.style.transform = `translate3d(${o}, ${a}, 0) scale(1)`, this.option("adaptiveHeight") && this.setViewportHeight();
        }
        initPanzoom() {
            this.panzoom && (this.panzoom.destroy(), this.panzoom = null);
            const t = this.option("Panzoom") || {};
            this.panzoom = new R(this.viewport, u({}, {
                content: this.track,
                zoom: !1,
                panOnlyZoomed: !1,
                lockAxis: this.isHorizontal ? "x" : "y",
                infinite: this.isInfinite,
                click: !1,
                dblClick: !1,
                touch: t => !(this.pages.length < 2 && !t.options.infinite),
                bounds: () => this.getBounds(),
                maxVelocity: t => Math.abs(t.target[this.axis] - t.current[this.axis]) < 2 * this.viewportDim ? 100 : 0
            }, t)), this.panzoom.on("*", ((t, e, ...i) => {
                this.emit(`Panzoom.${e}`, t, ...i);
            })), this.panzoom.on("decel", this.onDecel), this.panzoom.on("refresh", this.onRefresh), 
            this.panzoom.on("beforeTransform", this.onBeforeTransform), this.panzoom.on("endAnimation", this.onEndAnimation);
        }
        attachEvents() {
            const t = this.container;
            t && (t.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.addEventListener("slideTo", this.onSlideTo)), window.addEventListener("resize", this.onResize);
        }
        createPages() {
            let t = [];
            const {contentDim: e, viewportDim: i} = this;
            let n = this.option("slidesPerPage");
            n = ("auto" === n || e <= i) && !1 !== this.option("fill") ? 1 / 0 : parseFloat(n + "");
            let s = 0, o = 0, a = 0;
            for (const e of this.slides) (!t.length || o + e.dim - i > .05 || a >= n) && (t.push(H()), 
            s = t.length - 1, o = 0, a = 0), t[s].slides.push(e), o += e.dim + e.gap, a++;
            return t;
        }
        processPages() {
            const e = this.pages, {contentDim: i, viewportDim: n, isInfinite: s} = this, o = this.option("center"), a = this.option("fill"), r = a && o && i > n && !s;
            if (e.forEach(((t, e) => {
                var s;
                t.index = e, t.pos = (null === (s = t.slides[0]) || void 0 === s ? void 0 : s.pos) || 0, 
                t.dim = 0;
                for (const [e, i] of t.slides.entries()) t.dim += i.dim, e < t.slides.length - 1 && (t.dim += i.gap);
                r && t.pos + .5 * t.dim < .5 * n ? t.pos = 0 : r && t.pos + .5 * t.dim >= i - .5 * n ? t.pos = i - n : o && (t.pos += -.5 * (n - t.dim));
            })), e.forEach(((e, o) => {
                a && !s && i > n && (e.pos = Math.max(e.pos, 0), e.pos = Math.min(e.pos, i - n)), 
                e.pos = t(e.pos, 1e3), e.dim = t(e.dim, 1e3), Math.abs(e.pos) <= .1 && (e.pos = 0);
            })), s) return e;
            const l = [];
            let c;
            return e.forEach((t => {
                const e = Object.assign({}, t);
                c && e.pos === c.pos ? (c.dim += e.dim, c.slides = [ ...c.slides, ...e.slides ]) : (e.index = l.length, 
                c = e, l.push(e));
            })), l;
        }
        getPageFromIndex(t = 0) {
            const e = this.pages.length;
            let i;
            return t = parseInt((t || 0).toString()) || 0, i = this.isInfinite ? (t % e + e) % e : Math.max(Math.min(t, e - 1), 0), 
            i;
        }
        getSlideMetrics(e) {
            var i, n;
            const s = this.isHorizontal ? "width" : "height";
            let o = 0, a = 0, r = e.el;
            const l = r && !r.parentNode;
            if (r ? o = parseFloat(r.dataset[s] || "") || 0 : (r = document.createElement("div"), 
            r.style.visibility = "hidden", (this.track || document.body).prepend(r)), S(r, this.cn(G) + " " + e.class + " " + e.customClass), 
            o) r.style[s] = `${o}px`, r.style["width" === s ? "height" : "width"] = ""; else {
                l && (this.track || document.body).prepend(r);
                const t = Math.max(1, (null === (i = window.visualViewport) || void 0 === i ? void 0 : i.scale) || 1);
                o = r.getBoundingClientRect()[s] * t;
            }
            const c = getComputedStyle(r);
            return "content-box" === c.boxSizing && (this.isHorizontal ? (o += parseFloat(c.paddingLeft) || 0, 
            o += parseFloat(c.paddingRight) || 0) : (o += parseFloat(c.paddingTop) || 0, o += parseFloat(c.paddingBottom) || 0)), 
            a = parseFloat(c[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0, l ? null === (n = r.parentElement) || void 0 === n || n.removeChild(r) : e.el || r.remove(), 
            {
                dim: t(o, 1e3),
                gap: t(a, 1e3)
            };
        }
        getBounds() {
            const {isInfinite: t, isRTL: e, isHorizontal: i, pages: n} = this;
            let s = {
                min: 0,
                max: 0
            };
            if (t) s = {
                min: -1 / 0,
                max: 1 / 0
            }; else if (n.length) {
                const t = n[0].pos, o = n[n.length - 1].pos;
                s = e && i ? {
                    min: t,
                    max: o
                } : {
                    min: -1 * o,
                    max: -1 * t
                };
            }
            return {
                x: i ? s : {
                    min: 0,
                    max: 0
                },
                y: i ? {
                    min: 0,
                    max: 0
                } : s
            };
        }
        repositionSlides() {
            let e, {isHorizontal: i, isRTL: n, isInfinite: s, viewport: o, viewportDim: a, contentDim: r, page: l, pages: c, slides: h, panzoom: d} = this, u = 0, f = 0, p = 0, g = 0;
            d ? g = -1 * d.current[this.axis] : c[l] && (g = c[l].pos || 0), e = i ? n ? "right" : "left" : "top", 
            n && i && (g *= -1);
            for (const i of h) {
                const n = i.el;
                n ? ("top" === e ? (n.style.right = "", n.style.left = "") : n.style.top = "", i.index !== u ? n.style[e] = 0 === f ? "" : `${t(f, 1e3)}px` : n.style[e] = "", 
                p += i.dim + i.gap, u++) : f += i.dim + i.gap;
            }
            if (s && p && o) {
                let n = getComputedStyle(o), s = "padding", l = i ? "Right" : "Bottom", c = parseFloat(n[s + (i ? "Left" : "Top")]);
                g -= c, a += c, a += parseFloat(n[s + l]);
                for (const i of h) i.el && (t(i.pos) < t(a) && t(i.pos + i.dim + i.gap) < t(g) && t(g) > t(r - a) && (i.el.style[e] = `${t(f + p, 1e3)}px`), 
                t(i.pos + i.gap) >= t(r - a) && t(i.pos) > t(g + a) && t(g) < t(a) && (i.el.style[e] = `-${t(p, 1e3)}px`));
            }
            let m, b, v = [ ...this.inTransition ];
            if (v.length > 1 && (m = c[v[0]], b = c[v[1]]), m && b) {
                let i = 0;
                for (const n of h) n.el ? this.inTransition.has(n.index) && m.slides.indexOf(n) < 0 && (n.el.style[e] = `${t(i + (m.pos - b.pos), 1e3)}px`) : i += n.dim + n.gap;
            }
        }
        createSlideEl(t) {
            const {track: e, slides: i} = this;
            if (!e || !t) return;
            if (t.el && t.el.parentNode) return;
            const n = t.el || document.createElement("div");
            S(n, this.cn(G)), S(n, t.class), S(n, t.customClass);
            const s = t.html;
            s && (s instanceof HTMLElement ? n.appendChild(s) : n.innerHTML = t.html + "");
            const o = [];
            i.forEach(((t, e) => {
                t.el && o.push(e);
            }));
            const a = t.index;
            let r = null;
            if (o.length) r = i[o.reduce(((t, e) => Math.abs(e - a) < Math.abs(t - a) ? e : t))];
            const l = r && r.el && r.el.parentNode ? r.index < t.index ? r.el.nextSibling : r.el : null;
            e.insertBefore(n, e.contains(l) ? l : null), t.el = n, this.emit("createSlide", t);
        }
        removeSlideEl(t, e = !1) {
            const i = t.el;
            if (!i || !i.parentNode) return;
            const n = this.cn(U);
            if (i.classList.contains(n) && (E(i, n), this.emit("unselectSlide", t)), t.isDom && !e) return i.removeAttribute("aria-hidden"), 
            i.removeAttribute("data-index"), void (i.style.left = "");
            this.emit("removeSlide", t);
            const s = new CustomEvent(Z);
            i.dispatchEvent(s), t.el && (t.el.remove(), t.el = null);
        }
        transitionTo(t = 0, e = this.option("transition")) {
            var i, n, s, o;
            if (!e) return !1;
            const {pages: a, panzoom: r} = this;
            t = parseInt((t || 0).toString()) || 0;
            const l = this.getPageFromIndex(t);
            if (!r || !a[l] || a.length < 2 || Math.abs(((null === (n = null === (i = a[this.page]) || void 0 === i ? void 0 : i.slides[0]) || void 0 === n ? void 0 : n.dim) || 0) - this.viewportDim) > 1) return !1;
            const c = t > this.page ? 1 : -1, h = this.pages[l].pos * (this.isRTL ? 1 : -1);
            if (this.page === l && Math.abs(h - r.target[this.axis]) < 1) return !1;
            this.clearTransitions();
            const d = r.isResting;
            S(this.container, this.cn("inTransition"));
            const u = (null === (s = this.pages[this.page]) || void 0 === s ? void 0 : s.slides[0]) || null, f = (null === (o = this.pages[l]) || void 0 === o ? void 0 : o.slides[0]) || null;
            this.inTransition.add(f.index), this.createSlideEl(f);
            let p = u.el, g = f.el;
            d || e === G || (e = "fadeFast", p = null);
            const m = this.isRTL ? "next" : "prev", b = this.isRTL ? "prev" : "next";
            return p && (this.inTransition.add(u.index), u.transition = e, p.addEventListener(Z, this.onAnimationEnd), 
            p.classList.add(`f-${e}Out`, `to-${c > 0 ? b : m}`)), g && (f.transition = e, g.addEventListener(Z, this.onAnimationEnd), 
            g.classList.add(`f-${e}In`, `from-${c > 0 ? m : b}`)), r.current[this.axis] = h, 
            r.target[this.axis] = h, r.requestTick(), this.onChange(l), !0;
        }
        manageSlideVisiblity() {
            const t = new Set, e = new Set, i = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0);
            for (const n of this.slides) i.has(n) ? t.add(n) : e.add(n);
            for (const e of this.inTransition) t.add(this.slides[e]);
            for (const e of t) this.createSlideEl(e), this.lazyLoadSlide(e);
            for (const i of e) t.has(i) || this.removeSlideEl(i);
            this.markSelectedSlides(), this.repositionSlides();
        }
        markSelectedSlides() {
            if (!this.pages[this.page] || !this.pages[this.page].slides) return;
            const t = "aria-hidden";
            let e = this.cn(U);
            if (e) for (const i of this.slides) {
                const n = i.el;
                n && (n.dataset.index = `${i.index}`, n.classList.contains("f-thumbs__slide") ? this.getVisibleSlides(0).has(i) ? n.removeAttribute(t) : n.setAttribute(t, "true") : this.pages[this.page].slides.includes(i) ? (n.classList.contains(e) || (S(n, e), 
                this.emit("selectSlide", i)), n.removeAttribute(t)) : (n.classList.contains(e) && (E(n, e), 
                this.emit("unselectSlide", i)), n.setAttribute(t, "true")));
            }
        }
        flipInfiniteTrack() {
            const t = this.panzoom;
            if (!t || !this.isInfinite) return;
            const e = "x" === this.option("axis") ? "e" : "f", {viewportDim: i, contentDim: n} = this;
            let s = t.current[e], o = t.target[e] - s, a = 0, r = .5 * i, l = n;
            this.isRTL && this.isHorizontal ? (s < -r && (a = -1, s += l), s > l - r && (a = 1, 
            s -= l)) : (s > r && (a = 1, s -= l), s < -l + r && (a = -1, s += l)), a && (t.current[e] = s, 
            t.target[e] = s + o);
        }
        lazyLoadSlide(t) {
            const e = this, i = t && t.el;
            if (!i) return;
            const s = new Set, o = "f-fadeIn";
            i.querySelectorAll("[data-lazy-srcset]").forEach((t => {
                t instanceof HTMLImageElement && s.add(t);
            }));
            let a = Array.from(i.querySelectorAll("[data-lazy-src]"));
            i.dataset.lazySrc && a.push(i), a.map((t => {
                t instanceof HTMLImageElement ? s.add(t) : x(t) && (t.style.backgroundImage = `url('${t.dataset.lazySrc || ""}')`, 
                delete t.dataset.lazySrc);
            }));
            const r = (t, i, n) => {
                n && (n.remove(), n = null), i.complete && (i.classList.add(o), setTimeout((() => {
                    i.classList.remove(o);
                }), 350), i.style.visibility = ""), this.option("adaptiveHeight") && t.el && this.pages[this.page].slides.indexOf(t) > -1 && (e.updateMetrics(), 
                e.setViewportHeight()), this.emit("load", t);
            };
            for (const e of s) {
                let i = null;
                e.src = e.dataset.lazySrcset || e.dataset.lazySrc || "", delete e.dataset.lazySrc, 
                delete e.dataset.lazySrcset, e.style.visibility = "hidden", e.addEventListener("error", (() => {
                    r(t, e, i);
                })), e.addEventListener("load", (() => {
                    r(t, e, i);
                })), setTimeout((() => {
                    e.parentNode && t.el && (e.complete ? r(t, e, i) : (i = n(w), e.parentNode.insertBefore(i, e)));
                }), 300);
            }
        }
        onAnimationEnd(t) {
            var e;
            const i = t.target, n = i ? parseInt(i.dataset.index || "", 10) || 0 : -1, s = this.slides[n], o = t.animationName;
            if (!i || !s || !o) return;
            const a = !!this.inTransition.has(n) && s.transition;
            a && o.substring(0, a.length + 2) === `f-${a}` && this.inTransition.delete(n), this.inTransition.size || this.clearTransitions(), 
            n === this.page && (null === (e = this.panzoom) || void 0 === e ? void 0 : e.isResting) && this.emit("settle");
        }
        onDecel(t, e = 0, i = 0, n = 0, s = 0) {
            const {isRTL: o, isHorizontal: a, axis: r, pages: l} = this, c = l.length, h = Math.abs(Math.atan2(i, e) / (Math.PI / 180));
            let d = 0;
            if (d = h > 45 && h < 135 ? a ? 0 : i : a ? e : 0, !c) return;
            const u = this.option("dragFree");
            let f = this.page, p = o && a ? 1 : -1;
            const g = t.target[r] * p, m = t.current[r] * p;
            let {pageIndex: b} = this.getPageFromPosition(g), {pageIndex: v} = this.getPageFromPosition(m);
            u ? this.onChange(b) : (Math.abs(d) > 5 ? (l[f].dim < document.documentElement["client" + (this.isHorizontal ? "Width" : "Height")] - 1 && (f = v), 
            f = o && a ? d < 0 ? f - 1 : f + 1 : d < 0 ? f + 1 : f - 1) : f = 0 === n && 0 === s ? f : v, 
            this.slideTo(f, {
                transition: !1,
                friction: t.option("decelFriction")
            }));
        }
        onClick(t) {
            const e = t.target, i = e && x(e) ? e.dataset : null;
            let n, s;
            i && (void 0 !== i.carouselPage ? (s = "slideTo", n = i.carouselPage) : void 0 !== i.carouselNext ? s = "slideNext" : void 0 !== i.carouselPrev && (s = "slidePrev")), 
            s ? (t.preventDefault(), t.stopPropagation(), e && !e.hasAttribute("disabled") && this[s](n)) : this.emit("click", t);
        }
        onSlideTo(t) {
            const e = t.detail || 0;
            this.slideTo(this.getPageForSlide(e), {
                friction: 0
            });
        }
        onChange(t, e = 0) {
            const i = this.page;
            this.prevPage = i, this.page = t, this.option("adaptiveHeight") && this.setViewportHeight(), 
            t !== i && (this.markSelectedSlides(), this.emit("change", t, i, e));
        }
        onRefresh() {
            let t = this.contentDim, e = this.viewportDim;
            this.updateMetrics(), this.contentDim === t && this.viewportDim === e || this.slideTo(this.page, {
                friction: 0,
                transition: !1
            });
        }
        onScroll() {
            var t;
            null === (t = this.viewport) || void 0 === t || t.scroll(0, 0);
        }
        onResize() {
            this.option("breakpoints") && this.processOptions();
        }
        onBeforeTransform(t) {
            this.lp !== t.current[this.axis] && (this.flipInfiniteTrack(), this.manageSlideVisiblity()), 
            this.lp = t.current.e;
        }
        onEndAnimation() {
            this.inTransition.size || this.emit("settle");
        }
        reInit(t = null, e = null) {
            this.destroy(), this.state = F.Init, this.userOptions = t || this.userOptions, this.userPlugins = e || this.userPlugins, 
            this.processOptions();
        }
        slideTo(t = 0, {friction: e = this.option("friction"), transition: i = this.option("transition")} = {}) {
            if (this.state === F.Destroy) return;
            t = parseInt((t || 0).toString()) || 0;
            const n = this.getPageFromIndex(t), {axis: s, isHorizontal: o, isRTL: a, pages: r, panzoom: l} = this, c = r.length, h = a && o ? 1 : -1;
            if (!l || !c) return;
            if (this.page !== n) {
                const e = new Event("beforeChange", {
                    bubbles: !0,
                    cancelable: !0
                });
                if (this.emit("beforeChange", e, t), e.defaultPrevented) return;
            }
            if (this.transitionTo(t, i)) return;
            let d = r[n].pos;
            if (this.isInfinite) {
                const e = this.contentDim, i = l.target[s] * h;
                if (2 === c) d += e * Math.floor(parseFloat(t + "") / 2); else d = [ d, d - e, d + e ].reduce((function(t, e) {
                    return Math.abs(e - i) < Math.abs(t - i) ? e : t;
                }));
            }
            d *= h, Math.abs(l.target[s] - d) < 1 || (l.panTo({
                x: o ? d : 0,
                y: o ? 0 : d,
                friction: e
            }), this.onChange(n));
        }
        slideToClosest(t) {
            if (this.panzoom) {
                const {pageIndex: e} = this.getPageFromPosition(this.panzoom.current[this.isHorizontal ? "e" : "f"]);
                this.slideTo(e, t);
            }
        }
        slideNext() {
            this.slideTo(this.page + 1);
        }
        slidePrev() {
            this.slideTo(this.page - 1);
        }
        clearTransitions() {
            this.inTransition.clear(), E(this.container, this.cn("inTransition"));
            const t = [ "to-prev", "to-next", "from-prev", "from-next" ];
            for (const e of this.slides) {
                const i = e.el;
                if (i) {
                    i.removeEventListener(Z, this.onAnimationEnd), i.classList.remove(...t);
                    const n = e.transition;
                    n && i.classList.remove(`f-${n}Out`, `f-${n}In`);
                }
            }
            this.manageSlideVisiblity();
        }
        addSlide(t, e) {
            var i, n, s, o;
            const a = this.panzoom, r = (null === (i = this.pages[this.page]) || void 0 === i ? void 0 : i.pos) || 0, l = (null === (n = this.pages[this.page]) || void 0 === n ? void 0 : n.dim) || 0, c = this.contentDim < this.viewportDim;
            let h = Array.isArray(e) ? e : [ e ];
            const d = [];
            for (const t of h) d.push(j(t));
            this.slides.splice(t, 0, ...d);
            for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
            for (const t of d) this.emit("beforeInitSlide", t, t.index);
            if (this.page >= t && (this.page += d.length), this.updateMetrics(), a) {
                const e = (null === (s = this.pages[this.page]) || void 0 === s ? void 0 : s.pos) || 0, i = (null === (o = this.pages[this.page]) || void 0 === o ? void 0 : o.dim) || 0, n = this.pages.length || 1, h = this.isRTL ? l - i : i - l, d = this.isRTL ? r - e : e - r;
                c && 1 === n ? (t <= this.page && (a.current[this.axis] -= h, a.target[this.axis] -= h), 
                a.panTo({
                    [this.isHorizontal ? "x" : "y"]: -1 * e
                })) : d && t <= this.page && (a.target[this.axis] -= d, a.current[this.axis] -= d, 
                a.requestTick());
            }
            for (const t of d) this.emit("initSlide", t, t.index);
        }
        prependSlide(t) {
            this.addSlide(0, t);
        }
        appendSlide(t) {
            this.addSlide(this.slides.length, t);
        }
        removeSlide(t) {
            const e = this.slides.length;
            t = (t % e + e) % e, this.removeSlideEl(this.slides[t], !0), this.slides.splice(t, 1);
            for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
            this.updateMetrics(), this.slideTo(this.page, {
                friction: 0,
                transition: !1
            });
        }
        updateMetrics() {
            const {panzoom: e, viewport: i, track: n, slides: s, isHorizontal: o, isInfinite: a} = this;
            if (!n) return;
            const r = o ? "width" : "height", l = o ? "offsetWidth" : "offsetHeight";
            if (i) {
                let e = Math.max(i[l], t(i.getBoundingClientRect()[r], 1e3)), n = getComputedStyle(i), s = "padding", a = o ? "Right" : "Bottom";
                e -= parseFloat(n[s + (o ? "Left" : "Top")]) + parseFloat(n[s + a]), this.viewportDim = e;
            }
            let c, h = 0;
            for (const [e, i] of s.entries()) {
                let n = 0, o = 0;
                !i.el && c ? (n = c.dim, o = c.gap) : (({dim: n, gap: o} = this.getSlideMetrics(i)), 
                c = i), n = t(n, 1e3), o = t(o, 1e3), i.dim = n, i.gap = o, i.pos = h, h += n, (a || e < s.length - 1) && (h += o);
            }
            h = t(h, 1e3), this.contentDim = h, e && (e.contentRect[r] = h, e.contentRect["e" === this.axis ? "fullWidth" : "fullHeight"] = h), 
            this.pages = this.createPages(), this.pages = this.processPages(), this.state === F.Init && this.setInitialPage(), 
            this.page = Math.max(0, Math.min(this.page, this.pages.length - 1)), this.manageSlideVisiblity(), 
            this.emit("refresh");
        }
        getProgress(e, i = !1, n = !1) {
            void 0 === e && (e = this.page);
            const s = this, o = s.panzoom, a = s.contentDim, r = s.pages[e] || 0;
            if (!r || !o) return e > this.page ? -1 : 1;
            let l = -1 * o.current.e, c = t((l - r.pos) / (1 * r.dim), 1e3), h = c, d = c;
            this.isInfinite && !0 !== n && (h = t((l - r.pos + a) / (1 * r.dim), 1e3), d = t((l - r.pos - a) / (1 * r.dim), 1e3));
            let u = [ c, h, d ].reduce((function(t, e) {
                return Math.abs(e) < Math.abs(t) ? e : t;
            }));
            return i ? u : u > 1 ? 1 : u < -1 ? -1 : u;
        }
        setViewportHeight() {
            const {page: t, pages: e, viewport: i, isHorizontal: n} = this;
            if (!i || !e[t]) return;
            let s = 0;
            n && this.track && (this.track.style.height = "auto", e[t].slides.forEach((t => {
                t.el && (s = Math.max(s, t.el.offsetHeight));
            }))), i.style.height = s ? `${s}px` : "";
        }
        getPageForSlide(t) {
            for (const e of this.pages) for (const i of e.slides) if (i.index === t) return e.index;
            return -1;
        }
        getVisibleSlides(t = 0) {
            var e;
            const i = new Set;
            let {contentDim: n, viewportDim: s, pages: o, page: a} = this;
            n = n + (null === (e = this.slides[this.slides.length - 1]) || void 0 === e ? void 0 : e.gap) || 0;
            let r = 0;
            r = this.panzoom && this.panzoom.state !== m.Init && this.panzoom.state !== m.Destroy ? -1 * this.panzoom.current[this.axis] : o[a] && o[a].pos || 0, 
            this.isInfinite && (r -= Math.floor(r / n) * n), this.isRTL && this.isHorizontal && (r *= -1);
            const l = r - s * t, c = r + s * (t + 1), h = this.isInfinite ? [ -1, 0, 1 ] : [ 0 ];
            for (const t of this.slides) for (const e of h) {
                const s = t.pos + e * n, o = s + t.dim + t.gap;
                s < c && o > l && i.add(t);
            }
            return i;
        }
        getPageFromPosition(t) {
            var e;
            const {viewportDim: i, contentDim: n} = this, s = this.pages.length, o = this.slides.length, a = this.slides[o - 1];
            let r = 0, l = 0, c = 0;
            const h = this.option("center");
            h && (t += .5 * i), this.isInfinite || (t = Math.max((null === (e = this.slides[0]) || void 0 === e ? void 0 : e.pos) || 0, Math.min(t, a.pos)));
            const d = n + a.gap;
            c = Math.floor(t / d) || 0, t -= c * d;
            let u = a, f = this.slides.find((e => {
                const i = t + (u && !h ? .5 * u.dim : 0);
                return u = e, e.pos <= i && e.pos + e.dim + e.gap > i;
            }));
            return f || (f = a), l = this.getPageForSlide(f.index), r = l + c * s, {
                page: r,
                pageIndex: l
            };
        }
        destroy() {
            if ([ F.Destroy ].includes(this.state)) return;
            this.state = F.Destroy;
            const {container: t, viewport: e, track: i, slides: n, panzoom: s} = this, o = this.option("classes");
            t.removeEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.removeEventListener("slideTo", this.onSlideTo), window.removeEventListener("resize", this.onResize), 
            s && (s.destroy(), this.panzoom = null), n && n.forEach((t => {
                this.removeSlideEl(t);
            })), this.detachPlugins(), e && (e.removeEventListener("scroll", this.onScroll), 
            e.offsetParent && i && i.offsetParent && e.replaceWith(...i.childNodes));
            for (const [e, i] of Object.entries(o)) "container" !== e && i && t.classList.remove(i);
            this.track = null, this.viewport = null, this.page = 0, this.slides = [];
            const a = this.events.get("ready");
            this.events = new Map, a && this.events.set("ready", a);
        }
    }
    Object.defineProperty(K, "Panzoom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: R
    }), Object.defineProperty(K, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: D
    }), Object.defineProperty(K, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: V
    });
    const J = function(t) {
        const e = window.pageYOffset, i = window.pageYOffset + window.innerHeight;
        if (!x(t)) return 0;
        const n = t.getBoundingClientRect(), s = n.y + window.pageYOffset, o = n.y + n.height + window.pageYOffset;
        if (e > o || i < s) return 0;
        if (e < s && i > o) return 100;
        if (s < e && o > i) return 100;
        let a = n.height;
        s < e && (a -= window.pageYOffset - s), o > i && (a -= o - i);
        const r = a / window.innerHeight * 100;
        return Math.round(r);
    }, Q = !("undefined" == typeof window || !window.document || !window.document.createElement);
    let tt;
    const et = [ "a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])' ].join(","), it = t => {
        if (t && Q) {
            void 0 === tt && document.createElement("div").focus({
                get preventScroll() {
                    return tt = !0, !1;
                }
            });
            try {
                if (tt) t.focus({
                    preventScroll: !0
                }); else {
                    const e = window.pageXOffset || document.body.scrollTop, i = window.pageYOffset || document.body.scrollLeft;
                    t.focus(), document.body.scrollTo({
                        top: e,
                        left: i,
                        behavior: "auto"
                    });
                }
            } catch (t) {}
        }
    }, nt = {
        dragToClose: !0,
        hideScrollbar: !0,
        Carousel: {
            classes: {
                container: "fancybox__carousel",
                viewport: "fancybox__viewport",
                track: "fancybox__track",
                slide: "fancybox__slide"
            }
        },
        contentClick: "toggleZoom",
        contentDblClick: !1,
        backdropClick: "close",
        animated: !0,
        idle: 3500,
        showClass: "f-zoomInUp",
        hideClass: "f-fadeOut",
        commonCaption: !1,
        parentEl: null,
        startIndex: 0,
        l10n: Object.assign(Object.assign({}, v), {
            CLOSE: "Close",
            NEXT: "Next",
            PREV: "Previous",
            MODAL: "You can close this modal content with the ESC key",
            ERROR: "Something Went Wrong, Please Try Again Later",
            IMAGE_ERROR: "Image Not Found",
            ELEMENT_NOT_FOUND: "HTML Element Not Found",
            AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
            AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
            IFRAME_ERROR: "Error Loading Page",
            TOGGLE_ZOOM: "Toggle zoom level",
            TOGGLE_THUMBS: "Toggle thumbnails",
            TOGGLE_SLIDESHOW: "Toggle slideshow",
            TOGGLE_FULLSCREEN: "Toggle full-screen mode",
            DOWNLOAD: "Download"
        }),
        tpl: {
            closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
            main: '<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">\n    <div class="fancybox__backdrop"></div>\n    <div class="fancybox__carousel"></div>\n    <div class="fancybox__footer"></div>\n  </div>'
        },
        groupAll: !1,
        groupAttr: "data-fancybox",
        defaultType: "image",
        defaultDisplay: "block",
        autoFocus: !0,
        trapFocus: !0,
        placeFocusBack: !0,
        closeButton: "auto",
        keyboard: {
            Escape: "close",
            Delete: "close",
            Backspace: "close",
            PageUp: "next",
            PageDown: "prev",
            ArrowUp: "prev",
            ArrowDown: "next",
            ArrowRight: "next",
            ArrowLeft: "prev"
        },
        Fullscreen: {
            autoStart: !1
        },
        compact: () => window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
        wheel: "zoom"
    };
    var st, ot;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Closing = 2] = "Closing", 
        t[t.CustomClosing = 3] = "CustomClosing", t[t.Destroy = 4] = "Destroy";
    }(st || (st = {})), function(t) {
        t[t.Loading = 0] = "Loading", t[t.Opening = 1] = "Opening", t[t.Ready = 2] = "Ready", 
        t[t.Closing = 3] = "Closing";
    }(ot || (ot = {}));
    const at = () => {
        queueMicrotask((() => {
            (() => {
                const {slug: t, index: e} = rt.parseURL(), i = ce.getInstance();
                if (i && !1 !== i.option("Hash")) {
                    const n = i.carousel;
                    if (t && n) {
                        for (let e of n.slides) if (e.slug && e.slug === t) return n.slideTo(e.index);
                        if (t === i.option("slug")) return n.slideTo(e - 1);
                        const s = i.getSlide(), o = s && s.triggerEl && s.triggerEl.dataset;
                        if (o && o.fancybox === t) return n.slideTo(e - 1);
                    }
                    rt.hasSilentClose = !0, i.close();
                }
                rt.startFromUrl();
            })();
        }));
    };
    class rt extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "origHash", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: ""
            }), Object.defineProperty(this, "timer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onChange() {
            const t = this.instance, e = t.carousel;
            this.timer && clearTimeout(this.timer);
            const i = t.getSlide();
            if (!e || !i) return;
            const n = t.isOpeningSlide(i), s = new URL(document.URL).hash;
            let o, a = i.slug || void 0, r = i.triggerEl || void 0;
            o = a || this.instance.option("slug"), !o && r && r.dataset && (o = r.dataset.fancybox);
            let l = "";
            o && "true" !== o && (l = "#" + o + (!a && e.slides.length > 1 ? "-" + (i.index + 1) : "")), 
            n && (this.origHash = s !== l ? s : ""), l && s !== l && (this.timer = setTimeout((() => {
                try {
                    t.state === st.Ready && window.history[n ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + l);
                } catch (t) {}
            }), 300));
        }
        onClose() {
            if (this.timer && clearTimeout(this.timer), !0 !== rt.hasSilentClose) try {
                window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (this.origHash || ""));
            } catch (t) {}
        }
        attach() {
            const t = this.instance;
            t.on([ "Carousel.ready", "Carousel.change" ], this.onChange), t.on("close", this.onClose);
        }
        detach() {
            const t = this.instance;
            t.off([ "Carousel.ready", "Carousel.change" ], this.onChange), t.off("close", this.onClose);
        }
        static parseURL() {
            const t = window.location.hash.slice(1), e = t.split("-"), i = e[e.length - 1], n = i && /^\+?\d+$/.test(i) && parseInt(e.pop() || "1", 10) || 1;
            return {
                hash: t,
                slug: e.join("-"),
                index: n
            };
        }
        static startFromUrl() {
            if (rt.hasSilentClose = !1, ce.getInstance() || !1 === ce.defaults.Hash) return;
            const {hash: t, slug: e, index: i} = rt.parseURL();
            if (!e) return;
            let n = document.querySelector(`[data-slug="${t}"]`);
            if (n && n.dispatchEvent(new CustomEvent("click", {
                bubbles: !0,
                cancelable: !0
            })), ce.getInstance()) return;
            const s = document.querySelectorAll(`[data-fancybox="${e}"]`);
            s.length && (n = s[i - 1], n && n.dispatchEvent(new CustomEvent("click", {
                bubbles: !0,
                cancelable: !0
            })));
        }
        static destroy() {
            window.removeEventListener("hashchange", at, !1);
        }
    }
    function lt() {
        window.addEventListener("hashchange", at, !1), setTimeout((() => {
            rt.startFromUrl();
        }), 500);
    }
    Object.defineProperty(rt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    }), Object.defineProperty(rt, "hasSilentClose", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
    }), Q && (/complete|interactive|loaded/.test(document.readyState) ? lt() : document.addEventListener("DOMContentLoaded", lt));
    const ct = "is-zooming-in";
    class ht extends B {
        onCreateSlide(t, e, i) {
            const n = this.instance.optionFor(i, "src") || "";
            i.el && "image" === i.type && "string" == typeof n && this.setImage(i, n);
        }
        onRemoveSlide(t, e, i) {
            i.panzoom && i.panzoom.destroy(), i.panzoom = void 0, i.imageEl = void 0;
        }
        onChange(t, e, i, n) {
            E(this.instance.container, ct);
            for (const t of e.slides) {
                const e = t.panzoom;
                e && t.index !== i && e.reset(.35);
            }
        }
        onClose() {
            var t;
            const e = this.instance, i = e.container, n = e.getSlide();
            if (!i || !i.parentElement || !n) return;
            const {el: s, contentEl: o, panzoom: a, thumbElSrc: r} = n;
            if (!s || !r || !o || !a || a.isContentLoading || a.state === m.Init || a.state === m.Destroy) return;
            a.updateMetrics();
            let l = this.getZoomInfo(n);
            if (!l) return;
            this.instance.state = st.CustomClosing, i.classList.remove(ct), i.classList.add("is-zooming-out"), 
            o.style.backgroundImage = `url('${r}')`;
            const c = i.getBoundingClientRect();
            1 === ((null === (t = window.visualViewport) || void 0 === t ? void 0 : t.scale) || 1) && Object.assign(i.style, {
                position: "absolute",
                top: `${window.scrollY}px`,
                left: `${window.scrollX}px`,
                bottom: "auto",
                right: "auto",
                width: `${c.width}px`,
                height: `${c.height}px`,
                overflow: "hidden"
            });
            const {x: h, y: d, scale: u, opacity: f} = l;
            if (f) {
                const t = ((t, e, i, n) => {
                    const s = e - t, o = n - i;
                    return e => i + ((e - t) / s * o || 0);
                })(a.scale, u, 1, 0);
                a.on("afterTransform", (() => {
                    o.style.opacity = t(a.scale) + "";
                }));
            }
            a.on("endAnimation", (() => {
                e.destroy();
            })), a.target.a = u, a.target.b = 0, a.target.c = 0, a.target.d = u, a.panTo({
                x: h,
                y: d,
                scale: u,
                friction: f ? .2 : .33,
                ignoreBounds: !0
            }), a.isResting && e.destroy();
        }
        setImage(t, e) {
            const i = this.instance;
            t.src = e, this.process(t, e).then((e => {
                const {contentEl: n, imageEl: s, thumbElSrc: o, el: a} = t;
                if (i.isClosing() || !n || !s) return;
                n.offsetHeight;
                const r = !!i.isOpeningSlide(t) && this.getZoomInfo(t);
                if (this.option("protected") && a) {
                    a.addEventListener("contextmenu", (t => {
                        t.preventDefault();
                    }));
                    const t = document.createElement("div");
                    S(t, "fancybox-protected"), n.appendChild(t);
                }
                if (o && r) {
                    const s = e.contentRect, a = Math.max(s.fullWidth, s.fullHeight);
                    let c = null;
                    !r.opacity && a > 1200 && (c = document.createElement("img"), S(c, "fancybox-ghost"), 
                    c.src = o, n.appendChild(c));
                    const h = () => {
                        c && (S(c, "f-fadeFastOut"), setTimeout((() => {
                            c && (c.remove(), c = null);
                        }), 200));
                    };
                    (l = o, new Promise(((t, e) => {
                        const i = new Image;
                        i.onload = t, i.onerror = e, i.src = l;
                    }))).then((() => {
                        i.hideLoading(t), t.state = ot.Opening, this.instance.emit("reveal", t), this.zoomIn(t).then((() => {
                            h(), this.instance.done(t);
                        }), (() => {})), c && setTimeout((() => {
                            h();
                        }), a > 2500 ? 800 : 200);
                    }), (() => {
                        i.hideLoading(t), i.revealContent(t);
                    }));
                } else {
                    const n = this.optionFor(t, "initialSize"), s = this.optionFor(t, "zoom"), o = {
                        event: i.prevMouseMoveEvent || i.options.event,
                        friction: s ? .12 : 0
                    };
                    let a = i.optionFor(t, "showClass") || void 0, r = !0;
                    i.isOpeningSlide(t) && ("full" === n ? e.zoomToFull(o) : "cover" === n ? e.zoomToCover(o) : "max" === n ? e.zoomToMax(o) : r = !1, 
                    e.stop("current")), r && a && (a = e.isDragging ? "f-fadeIn" : ""), i.hideLoading(t), 
                    i.revealContent(t, a);
                }
                var l;
            }), (() => {
                i.setError(t, "{{IMAGE_ERROR}}");
            }));
        }
        process(t, e) {
            return new Promise(((i, s) => {
                var o;
                const a = this.instance, r = t.el;
                a.clearContent(t), a.showLoading(t);
                let l = this.optionFor(t, "content");
                if ("string" == typeof l && (l = n(l)), !l || !x(l)) {
                    if (l = document.createElement("img"), l instanceof HTMLImageElement) {
                        let i = "", n = t.caption;
                        i = "string" == typeof n && n ? n.replace(/<[^>]+>/gi, "").substring(0, 1e3) : `Image ${t.index + 1} of ${null === (o = a.carousel) || void 0 === o ? void 0 : o.pages.length}`, 
                        l.src = e || "", l.alt = i, l.draggable = !1, t.srcset && l.setAttribute("srcset", t.srcset), 
                        this.instance.isOpeningSlide(t) && (l.fetchPriority = "high");
                    }
                    t.sizes && l.setAttribute("sizes", t.sizes);
                }
                S(l, "fancybox-image"), t.imageEl = l, a.setContent(t, l, !1);
                t.panzoom = new R(r, u({
                    transformParent: !0
                }, this.option("Panzoom") || {}, {
                    content: l,
                    width: a.optionFor(t, "width", "auto"),
                    height: a.optionFor(t, "height", "auto"),
                    wheel: () => {
                        const t = a.option("wheel");
                        return ("zoom" === t || "pan" == t) && t;
                    },
                    click: (e, i) => {
                        var n, s;
                        if (a.isCompact || a.isClosing()) return !1;
                        if (t.index !== (null === (n = a.getSlide()) || void 0 === n ? void 0 : n.index)) return !1;
                        if (i) {
                            const t = i.composedPath()[0];
                            if ([ "A", "BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO" ].includes(t.nodeName)) return !1;
                        }
                        let o = !i || i.target && (null === (s = t.contentEl) || void 0 === s ? void 0 : s.contains(i.target));
                        return a.option(o ? "contentClick" : "backdropClick") || !1;
                    },
                    dblClick: () => a.isCompact ? "toggleZoom" : a.option("contentDblClick") || !1,
                    spinner: !1,
                    panOnlyZoomed: !0,
                    wheelLimit: 1 / 0,
                    on: {
                        ready: t => {
                            i(t);
                        },
                        error: () => {
                            s();
                        },
                        destroy: () => {
                            s();
                        }
                    }
                }));
            }));
        }
        zoomIn(t) {
            return new Promise(((e, i) => {
                const n = this.instance, s = n.container, {panzoom: o, contentEl: a, el: r} = t;
                o && o.updateMetrics();
                const l = this.getZoomInfo(t);
                if (!(l && r && a && o && s)) return void i();
                const {x: c, y: h, scale: d, opacity: u} = l, f = () => {
                    t.state !== ot.Closing && (u && (a.style.opacity = Math.max(Math.min(1, 1 - (1 - o.scale) / (1 - d)), 0) + ""), 
                    o.scale >= 1 && o.scale > o.targetScale - .1 && e(o));
                }, p = t => {
                    (t.scale < .99 || t.scale > 1.01) && !t.isDragging || (E(s, ct), a.style.opacity = "", 
                    t.off("endAnimation", p), t.off("touchStart", p), t.off("afterTransform", f), e(t));
                };
                o.on("endAnimation", p), o.on("touchStart", p), o.on("afterTransform", f), o.on([ "error", "destroy" ], (() => {
                    i();
                })), o.panTo({
                    x: c,
                    y: h,
                    scale: d,
                    friction: 0,
                    ignoreBounds: !0
                }), o.stop("current");
                const g = {
                    event: "mousemove" === o.panMode ? n.prevMouseMoveEvent || n.options.event : void 0
                }, m = this.optionFor(t, "initialSize");
                S(s, ct), n.hideLoading(t), "full" === m ? o.zoomToFull(g) : "cover" === m ? o.zoomToCover(g) : "max" === m ? o.zoomToMax(g) : o.reset(.172);
            }));
        }
        getZoomInfo(t) {
            var e;
            const {el: i, imageEl: n, thumbEl: s, panzoom: o} = t;
            if (!i || !n || !s || !o || J(s) < 3 || !this.optionFor(t, "zoom") || this.instance.state === st.Destroy) return !1;
            if (1 !== ((null === (e = window.visualViewport) || void 0 === e ? void 0 : e.scale) || 1)) return !1;
            let {top: a, left: r, width: l, height: c} = s.getBoundingClientRect(), {top: h, left: d, fitWidth: u, fitHeight: f} = o.contentRect;
            if (!(l && c && u && f)) return !1;
            const p = o.container.getBoundingClientRect();
            d += p.left, h += p.top;
            const g = -1 * (d + .5 * u - (r + .5 * l)), m = -1 * (h + .5 * f - (a + .5 * c)), b = l / u;
            let v = this.option("zoomOpacity") || !1;
            return "auto" === v && (v = Math.abs(l / c - u / f) > .1), {
                x: g,
                y: m,
                scale: b,
                opacity: v
            };
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.change", t.onChange), e.on("Carousel.createSlide", t.onCreateSlide), 
            e.on("Carousel.removeSlide", t.onRemoveSlide), e.on("close", t.onClose);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.change", t.onChange), e.off("Carousel.createSlide", t.onCreateSlide), 
            e.off("Carousel.removeSlide", t.onRemoveSlide), e.off("close", t.onClose);
        }
    }
    Object.defineProperty(ht, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            initialSize: "fit",
            Panzoom: {
                maxScale: 1
            },
            protected: !1,
            zoom: !0,
            zoomOpacity: "auto"
        }
    }), "function" == typeof SuppressedError && SuppressedError;
    const dt = "html", ut = "image", ft = "map", pt = "youtube", gt = "vimeo", mt = "html5video", bt = (t, e = {}) => {
        const i = new URL(t), n = new URLSearchParams(i.search), s = new URLSearchParams;
        for (const [t, i] of [ ...n, ...Object.entries(e) ]) {
            let e = i.toString();
            "t" === t ? s.set("start", parseInt(e).toString()) : s.set(t, e);
        }
        let o = s.toString(), a = t.match(/#t=((.*)?\d+s)/);
        return a && (o += `#t=${a[1]}`), o;
    }, vt = {
        ajax: null,
        autoSize: !0,
        iframeAttr: {
            allow: "autoplay; fullscreen",
            scrolling: "auto"
        },
        preload: !0,
        videoAutoplay: !0,
        videoRatio: 16 / 9,
        videoTpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',
        videoFormat: "",
        vimeo: {
            byline: 1,
            color: "00adef",
            controls: 1,
            dnt: 1,
            muted: 0
        },
        youtube: {
            controls: 1,
            enablejsapi: 1,
            nocookie: 1,
            rel: 0,
            fs: 1
        }
    }, yt = [ "image", "html", "ajax", "inline", "clone", "iframe", "map", "pdf", "html5video", "youtube", "vimeo" ];
    class wt extends B {
        onBeforeInitSlide(t, e, i) {
            this.processType(i);
        }
        onCreateSlide(t, e, i) {
            this.setContent(i);
        }
        onClearContent(t, e) {
            e.xhr && (e.xhr.abort(), e.xhr = null);
            const i = e.iframeEl;
            i && (i.onload = i.onerror = null, i.src = "//about:blank", e.iframeEl = null);
            const n = e.contentEl, s = e.placeholderEl;
            if ("inline" === e.type && n && s) n.classList.remove("fancybox__content"), "none" !== n.style.display && (n.style.display = "none"), 
            s.parentNode && s.parentNode.insertBefore(n, s), s.remove(), e.contentEl = void 0, 
            e.placeholderEl = void 0; else for (;e.el && e.el.firstChild; ) e.el.removeChild(e.el.firstChild);
        }
        onSelectSlide(t, e, i) {
            i.state === ot.Ready && this.playVideo();
        }
        onUnselectSlide(t, e, i) {
            var n, s;
            if (i.type === mt) {
                try {
                    null === (s = null === (n = i.el) || void 0 === n ? void 0 : n.querySelector("video")) || void 0 === s || s.pause();
                } catch (t) {}
                return;
            }
            let o;
            i.type === gt ? o = {
                method: "pause",
                value: "true"
            } : i.type === pt && (o = {
                event: "command",
                func: "pauseVideo"
            }), o && i.iframeEl && i.iframeEl.contentWindow && i.iframeEl.contentWindow.postMessage(JSON.stringify(o), "*"), 
            i.poller && clearTimeout(i.poller);
        }
        onDone(t, e) {
            t.isCurrentSlide(e) && !t.isClosing() && this.playVideo();
        }
        onRefresh(t, e) {
            e.slides.forEach((t => {
                t.el && (this.resizeIframe(t), this.setAspectRatio(t));
            }));
        }
        onMessage(t) {
            try {
                let e = JSON.parse(t.data);
                if ("https://player.vimeo.com" === t.origin) {
                    if ("ready" === e.event) for (let e of Array.from(document.getElementsByClassName("fancybox__iframe"))) e instanceof HTMLIFrameElement && e.contentWindow === t.source && (e.dataset.ready = "true");
                } else if (t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && "onReady" === e.event) {
                    const t = document.getElementById(e.id);
                    t && (t.dataset.ready = "true");
                }
            } catch (t) {}
        }
        loadAjaxContent(t) {
            const e = this.instance.optionFor(t, "src") || "";
            this.instance.showLoading(t);
            const i = this.instance, n = new XMLHttpRequest;
            i.showLoading(t), n.onreadystatechange = function() {
                n.readyState === XMLHttpRequest.DONE && i.state === st.Ready && (i.hideLoading(t), 
                200 === n.status ? i.setContent(t, n.responseText) : i.setError(t, 404 === n.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"));
            };
            const s = t.ajax || null;
            n.open(s ? "POST" : "GET", e + ""), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
            n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(s), t.xhr = n;
        }
        setInlineContent(t) {
            let e = null;
            if (x(t.src)) e = t.src; else if ("string" == typeof t.src) {
                const i = t.src.split("#", 2).pop();
                e = i ? document.getElementById(i) : null;
            }
            if (e) {
                if ("clone" === t.type || e.closest(".fancybox__slide")) {
                    e = e.cloneNode(!0);
                    const i = e.dataset.animationName;
                    i && (e.classList.remove(i), delete e.dataset.animationName);
                    let n = e.getAttribute("id");
                    n = n ? `${n}--clone` : `clone-${this.instance.id}-${t.index}`, e.setAttribute("id", n);
                } else if (e.parentNode) {
                    const i = document.createElement("div");
                    i.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(i, e), t.placeholderEl = i;
                }
                this.instance.setContent(t, e);
            } else this.instance.setError(t, "{{ELEMENT_NOT_FOUND}}");
        }
        setIframeContent(t) {
            const {src: e, el: i} = t;
            if (!e || "string" != typeof e || !i) return;
            i.classList.add("is-loading");
            const n = this.instance, s = document.createElement("iframe");
            s.className = "fancybox__iframe", s.setAttribute("id", `fancybox__iframe_${n.id}_${t.index}`);
            for (const [e, i] of Object.entries(this.optionFor(t, "iframeAttr") || {})) s.setAttribute(e, i);
            s.onerror = () => {
                n.setError(t, "{{IFRAME_ERROR}}");
            }, t.iframeEl = s;
            const o = this.optionFor(t, "preload");
            if ("iframe" !== t.type || !1 === o) return s.setAttribute("src", t.src + ""), n.setContent(t, s, !1), 
            this.resizeIframe(t), void n.revealContent(t);
            n.showLoading(t), s.onload = () => {
                if (!s.src.length) return;
                const e = "true" !== s.dataset.ready;
                s.dataset.ready = "true", this.resizeIframe(t), e ? n.revealContent(t) : n.hideLoading(t);
            }, s.setAttribute("src", e), n.setContent(t, s, !1);
        }
        resizeIframe(t) {
            const {type: e, iframeEl: i} = t;
            if (e === pt || e === gt) return;
            const n = null == i ? void 0 : i.parentElement;
            if (!i || !n) return;
            let s = t.autoSize;
            void 0 === s && (s = this.optionFor(t, "autoSize"));
            let o = t.width || 0, a = t.height || 0;
            o && a && (s = !1);
            const r = n && n.style;
            if (!1 !== t.preload && !1 !== s && r) try {
                const t = window.getComputedStyle(n), e = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight), s = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom), l = i.contentWindow;
                if (l) {
                    const t = l.document, i = t.getElementsByTagName(dt)[0], n = t.body;
                    r.width = "", n.style.overflow = "hidden", o = o || i.scrollWidth + e, r.width = `${o}px`, 
                    n.style.overflow = "", r.flex = "0 0 auto", r.height = `${n.scrollHeight}px`, a = i.scrollHeight + s;
                }
            } catch (t) {}
            if (o || a) {
                const t = {
                    flex: "0 1 auto",
                    width: "",
                    height: ""
                };
                o && "auto" !== o && (t.width = `${o}px`), a && "auto" !== a && (t.height = `${a}px`), 
                Object.assign(r, t);
            }
        }
        playVideo() {
            const t = this.instance.getSlide();
            if (!t) return;
            const {el: e} = t;
            if (!e || !e.offsetParent) return;
            if (!this.optionFor(t, "videoAutoplay")) return;
            if (t.type === mt) try {
                const t = e.querySelector("video");
                if (t) {
                    const e = t.play();
                    void 0 !== e && e.then((() => {})).catch((e => {
                        t.muted = !0, t.play();
                    }));
                }
            } catch (t) {}
            if (t.type !== pt && t.type !== gt) return;
            const i = () => {
                if (t.iframeEl && t.iframeEl.contentWindow) {
                    let e;
                    if ("true" === t.iframeEl.dataset.ready) return e = t.type === pt ? {
                        event: "command",
                        func: "playVideo"
                    } : {
                        method: "play",
                        value: "true"
                    }, e && t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"), void (t.poller = void 0);
                    t.type === pt && (e = {
                        event: "listening",
                        id: t.iframeEl.getAttribute("id")
                    }, t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"));
                }
                t.poller = setTimeout(i, 250);
            };
            i();
        }
        processType(t) {
            if (t.html) return t.type = dt, t.src = t.html, void (t.html = "");
            const e = this.instance.optionFor(t, "src", "");
            if (!e || "string" != typeof e) return;
            let i = t.type, n = null;
            if (n = e.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) {
                const s = this.optionFor(t, pt), {nocookie: o} = s, a = function(t, e) {
                    var i = {};
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
                    if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                        var s = 0;
                        for (n = Object.getOwnPropertySymbols(t); s < n.length; s++) e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[s]) && (i[n[s]] = t[n[s]]);
                    }
                    return i;
                }(s, [ "nocookie" ]), r = `www.youtube${o ? "-nocookie" : ""}.com`, l = bt(e, a), c = encodeURIComponent(n[2]);
                t.videoId = c, t.src = `https://${r}/embed/${c}?${l}`, t.thumbSrc = t.thumbSrc || `https://i.ytimg.com/vi/${c}/mqdefault.jpg`, 
                i = pt;
            } else if (n = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/)) {
                const s = bt(e, this.optionFor(t, gt)), o = encodeURIComponent(n[1]), a = n[4] || "";
                t.videoId = o, t.src = `https://player.vimeo.com/video/${o}?${a ? `h=${a}${s ? "&" : ""}` : ""}${s}`, 
                i = gt;
            }
            if (!i && t.triggerEl) {
                const e = t.triggerEl.dataset.type;
                yt.includes(e) && (i = e);
            }
            i || "string" == typeof e && ("#" === e.charAt(0) ? i = "inline" : (n = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (i = mt, 
            t.videoFormat = t.videoFormat || "video/" + ("ogv" === n[1] ? "ogg" : n[1])) : e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? i = ut : e.match(/\.(pdf)((\?|#).*)?$/i) && (i = "pdf")), 
            (n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t.src = `https://maps.google.${n[1]}/?ll=${(n[2] ? n[2] + "&z=" + Math.floor(parseFloat(n[3])) + (n[4] ? n[4].replace(/^\//, "&") : "") : n[4] + "").replace(/\?/, "&")}&output=${n[4] && n[4].indexOf("layer=c") > 0 ? "svembed" : "embed"}`, 
            i = ft) : (n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t.src = `https://maps.google.${n[1]}/maps?q=${n[2].replace("query=", "q=").replace("api=1", "")}&output=embed`, 
            i = ft), i = i || this.instance.option("defaultType"), t.type = i, i === ut && (t.thumbSrc = t.thumbSrc || t.src);
        }
        setContent(t) {
            const e = this.instance.optionFor(t, "src") || "";
            if (t && t.type && e) {
                switch (t.type) {
                  case dt:
                    this.instance.setContent(t, e);
                    break;

                  case mt:
                    const i = this.option("videoTpl");
                    i && this.instance.setContent(t, i.replace(/\{\{src\}\}/gi, e + "").replace(/\{\{format\}\}/gi, this.optionFor(t, "videoFormat") || "").replace(/\{\{poster\}\}/gi, t.poster || t.thumbSrc || ""));
                    break;

                  case "inline":
                  case "clone":
                    this.setInlineContent(t);
                    break;

                  case "ajax":
                    this.loadAjaxContent(t);
                    break;

                  case "pdf":
                  case ft:
                  case pt:
                  case gt:
                    t.preload = !1;

                  case "iframe":
                    this.setIframeContent(t);
                }
                this.setAspectRatio(t);
            }
        }
        setAspectRatio(t) {
            const e = t.contentEl;
            if (!(t.el && e && t.type && [ pt, gt, mt ].includes(t.type))) return;
            let i, n = t.width || "auto", s = t.height || "auto";
            if ("auto" === n || "auto" === s) {
                i = this.optionFor(t, "videoRatio");
                const e = (i + "").match(/(\d+)\s*\/\s?(\d+)/);
                i = e && e.length > 2 ? parseFloat(e[1]) / parseFloat(e[2]) : parseFloat(i + "");
            } else n && s && (i = n / s);
            if (!i) return;
            e.style.aspectRatio = "", e.style.width = "", e.style.height = "", e.offsetHeight;
            const o = e.getBoundingClientRect(), a = o.width || 1, r = o.height || 1;
            e.style.aspectRatio = i + "", i < a / r ? (s = "auto" === s ? r : Math.min(r, s), 
            e.style.width = "auto", e.style.height = `${s}px`) : (n = "auto" === n ? a : Math.min(a, n), 
            e.style.width = `${n}px`, e.style.height = "auto");
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.on("Carousel.createSlide", t.onCreateSlide), 
            e.on("Carousel.selectSlide", t.onSelectSlide), e.on("Carousel.unselectSlide", t.onUnselectSlide), 
            e.on("Carousel.Panzoom.refresh", t.onRefresh), e.on("done", t.onDone), e.on("clearContent", t.onClearContent), 
            window.addEventListener("message", t.onMessage);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.off("Carousel.createSlide", t.onCreateSlide), 
            e.off("Carousel.selectSlide", t.onSelectSlide), e.off("Carousel.unselectSlide", t.onUnselectSlide), 
            e.off("Carousel.Panzoom.refresh", t.onRefresh), e.off("done", t.onDone), e.off("clearContent", t.onClearContent), 
            window.removeEventListener("message", t.onMessage);
        }
    }
    Object.defineProperty(wt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: vt
    });
    const xt = "play", Et = "pause", St = "ready";
    class Pt extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: St
            }), Object.defineProperty(this, "inHover", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "timer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "progressBar", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        get isActive() {
            return this.state !== St;
        }
        onReady(t) {
            this.option("autoStart") && (t.isInfinite || t.page < t.pages.length - 1) && this.start();
        }
        onChange() {
            var t;
            (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) || (this.removeProgressBar(), 
            this.pause());
        }
        onSettle() {
            this.resume();
        }
        onVisibilityChange() {
            "visible" === document.visibilityState ? this.resume() : this.pause();
        }
        onMouseEnter() {
            this.inHover = !0, this.pause();
        }
        onMouseLeave() {
            var t;
            this.inHover = !1, (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) && this.resume();
        }
        onTimerEnd() {
            const t = this.instance;
            "play" === this.state && (t.isInfinite || t.page !== t.pages.length - 1 ? t.slideNext() : t.slideTo(0));
        }
        removeProgressBar() {
            this.progressBar && (this.progressBar.remove(), this.progressBar = null);
        }
        createProgressBar() {
            var t;
            if (!this.option("showProgress")) return null;
            this.removeProgressBar();
            const e = this.instance, i = (null === (t = e.pages[e.page]) || void 0 === t ? void 0 : t.slides) || [];
            let n = this.option("progressParentEl");
            if (n || (n = (1 === i.length ? i[0].el : null) || e.viewport), !n) return null;
            const s = document.createElement("div");
            return S(s, "f-progress"), n.prepend(s), this.progressBar = s, s.offsetHeight, s;
        }
        set() {
            const t = this, e = t.instance;
            if (e.pages.length < 2) return;
            if (t.timer) return;
            const i = t.option("timeout");
            t.state = xt, S(e.container, "has-autoplay");
            let n = t.createProgressBar();
            n && (n.style.transitionDuration = `${i}ms`, n.style.transform = "scaleX(1)"), t.timer = setTimeout((() => {
                t.timer = null, t.inHover || t.onTimerEnd();
            }), i), t.emit("set");
        }
        clear() {
            const t = this;
            t.timer && (clearTimeout(t.timer), t.timer = null), t.removeProgressBar();
        }
        start() {
            const t = this;
            if (t.set(), t.state !== St) {
                if (t.option("pauseOnHover")) {
                    const e = t.instance.container;
                    e.addEventListener("mouseenter", t.onMouseEnter, !1), e.addEventListener("mouseleave", t.onMouseLeave, !1);
                }
                document.addEventListener("visibilitychange", t.onVisibilityChange, !1), t.emit("start");
            }
        }
        stop() {
            const t = this, e = t.state, i = t.instance.container;
            t.clear(), t.state = St, i.removeEventListener("mouseenter", t.onMouseEnter, !1), 
            i.removeEventListener("mouseleave", t.onMouseLeave, !1), document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), 
            E(i, "has-autoplay"), e !== St && t.emit("stop");
        }
        pause() {
            const t = this;
            t.state === xt && (t.state = Et, t.clear(), t.emit(Et));
        }
        resume() {
            const t = this, e = t.instance;
            if (e.isInfinite || e.page !== e.pages.length - 1) if (t.state !== xt) {
                if (t.state === Et && !t.inHover) {
                    const e = new Event("resume", {
                        bubbles: !0,
                        cancelable: !0
                    });
                    t.emit("resume", e), e.defaultPrevented || t.set();
                }
            } else t.set(); else t.stop();
        }
        toggle() {
            this.state === xt || this.state === Et ? this.stop() : this.start();
        }
        attach() {
            const t = this, e = t.instance;
            e.on("ready", t.onReady), e.on("Panzoom.startAnimation", t.onChange), e.on("Panzoom.endAnimation", t.onSettle), 
            e.on("Panzoom.touchMove", t.onChange);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("ready", t.onReady), e.off("Panzoom.startAnimation", t.onChange), e.off("Panzoom.endAnimation", t.onSettle), 
            e.off("Panzoom.touchMove", t.onChange), t.stop();
        }
    }
    Object.defineProperty(Pt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            autoStart: !0,
            pauseOnHover: !0,
            progressParentEl: null,
            showProgress: !0,
            timeout: 3e3
        }
    });
    class Ct extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "ref", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onPrepare(t) {
            const e = t.carousel;
            if (!e) return;
            const i = t.container;
            i && (e.options.Autoplay = u({
                autoStart: !1
            }, this.option("Autoplay") || {}, {
                pauseOnHover: !1,
                timeout: this.option("timeout"),
                progressParentEl: () => this.option("progressParentEl") || null,
                on: {
                    start: () => {
                        t.emit("startSlideshow");
                    },
                    set: e => {
                        var n;
                        i.classList.add("has-slideshow"), (null === (n = t.getSlide()) || void 0 === n ? void 0 : n.state) !== ot.Ready && e.pause();
                    },
                    stop: () => {
                        i.classList.remove("has-slideshow"), t.isCompact || t.endIdle(), t.emit("endSlideshow");
                    },
                    resume: (e, i) => {
                        var n, s, o;
                        !i || !i.cancelable || (null === (n = t.getSlide()) || void 0 === n ? void 0 : n.state) === ot.Ready && (null === (o = null === (s = t.carousel) || void 0 === s ? void 0 : s.panzoom) || void 0 === o ? void 0 : o.isResting) || i.preventDefault();
                    }
                }
            }), e.attachPlugins({
                Autoplay: Pt
            }), this.ref = e.plugins.Autoplay);
        }
        onReady(t) {
            const e = t.carousel, i = this.ref;
            i && e && this.option("playOnStart") && (e.isInfinite || e.page < e.pages.length - 1) && i.start();
        }
        onDone(t, e) {
            const i = this.ref, n = t.carousel;
            if (!i || !n) return;
            const s = e.panzoom;
            s && s.on("startAnimation", (() => {
                t.isCurrentSlide(e) && i.stop();
            })), t.isCurrentSlide(e) && i.resume();
        }
        onKeydown(t, e) {
            var i;
            const n = this.ref;
            n && e === this.option("key") && "BUTTON" !== (null === (i = document.activeElement) || void 0 === i ? void 0 : i.nodeName) && n.toggle();
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.init", t.onPrepare), e.on("Carousel.ready", t.onReady), e.on("done", t.onDone), 
            e.on("keydown", t.onKeydown);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.init", t.onPrepare), e.off("Carousel.ready", t.onReady), e.off("done", t.onDone), 
            e.off("keydown", t.onKeydown);
        }
    }
    Object.defineProperty(Ct, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            key: " ",
            playOnStart: !1,
            progressParentEl: t => {
                var e;
                return (null === (e = t.instance.container) || void 0 === e ? void 0 : e.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]")) || t.instance.container;
            },
            timeout: 3e3
        }
    });
    const Tt = {
        classes: {
            container: "f-thumbs f-carousel__thumbs",
            viewport: "f-thumbs__viewport",
            track: "f-thumbs__track",
            slide: "f-thumbs__slide",
            isResting: "is-resting",
            isSelected: "is-selected",
            isLoading: "is-loading",
            hasThumbs: "has-thumbs"
        },
        minCount: 2,
        parentEl: null,
        thumbTpl: '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
        type: "modern"
    };
    var Mt;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Hidden = 2] = "Hidden";
    }(Mt || (Mt = {}));
    const Ot = "isResting", At = "thumbWidth", Lt = "thumbHeight", zt = "thumbClipWidth";
    let Rt = class extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "type", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: "modern"
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "track", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "carousel", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "thumbWidth", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbClipWidth", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbHeight", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbGap", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbExtraGap", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: Mt.Init
            });
        }
        get isModern() {
            return "modern" === this.type;
        }
        onInitSlide(t, e) {
            const i = e.el ? e.el.dataset : void 0;
            i && (e.thumbSrc = i.thumbSrc || e.thumbSrc || "", e[zt] = parseFloat(i[zt] || "") || e[zt] || 0, 
            e[Lt] = parseFloat(i.thumbHeight || "") || e[Lt] || 0), this.addSlide(e);
        }
        onInitSlides() {
            this.build();
        }
        onChange() {
            var t;
            if (!this.isModern) return;
            const e = this.container, i = this.instance, n = i.panzoom, s = this.carousel, a = s ? s.panzoom : null, r = i.page;
            if (n && s && a) {
                if (n.isDragging) {
                    E(e, this.cn(Ot));
                    let n = (null === (t = s.pages[r]) || void 0 === t ? void 0 : t.pos) || 0;
                    n += i.getProgress(r) * (this[zt] + this.thumbGap);
                    let o = a.getBounds();
                    -1 * n > o.x.min && -1 * n < o.x.max && a.panTo({
                        x: -1 * n,
                        friction: .12
                    });
                } else o(e, this.cn(Ot), n.isResting);
                this.shiftModern();
            }
        }
        onRefresh() {
            this.updateProps();
            for (const t of this.instance.slides || []) this.resizeModernSlide(t);
            this.shiftModern();
        }
        isDisabled() {
            const t = this.option("minCount") || 0;
            if (t) {
                const e = this.instance;
                let i = 0;
                for (const t of e.slides || []) t.thumbSrc && i++;
                if (i < t) return !0;
            }
            const e = this.option("type");
            return [ "modern", "classic" ].indexOf(e) < 0;
        }
        getThumb(t) {
            const e = this.option("thumbTpl") || "";
            return {
                html: this.instance.localize(e, [ [ "%i", t.index ], [ "%d", t.index + 1 ], [ "%s", t.thumbSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ] ])
            };
        }
        addSlide(t) {
            const e = this.carousel;
            e && e.addSlide(t.index, this.getThumb(t));
        }
        getSlides() {
            const t = [];
            for (const e of this.instance.slides || []) t.push(this.getThumb(e));
            return t;
        }
        resizeModernSlide(t) {
            this.isModern && (t[At] = t[zt] && t[Lt] ? Math.round(this[Lt] * (t[zt] / t[Lt])) : this[At]);
        }
        updateProps() {
            const t = this.container;
            if (!t) return;
            const e = e => parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-" + e)) || 0;
            this.thumbGap = e("gap"), this.thumbExtraGap = e("extra-gap"), this[At] = e("width") || 40, 
            this[zt] = e("clip-width") || 40, this[Lt] = e("height") || 40;
        }
        build() {
            if (this.state !== Mt.Init) return;
            if (this.isDisabled()) return;
            const t = this.instance, e = t.container, i = this.getSlides(), n = this.option("type");
            this.type = n;
            const s = document.createElement("div");
            S(s, this.cn("container")), S(s, `is-${n}`);
            const o = this.option("parentEl");
            o ? o.appendChild(s) : e.after(s), S(e, this.cn("hasThumbs")), this.container = s, 
            this.updateProps();
            const a = document.createElement("div");
            S(a, this.cn("track")), s.appendChild(a), this.track = a;
            const r = u({}, {
                track: a,
                infinite: !1,
                center: !0,
                fill: "classic" === n,
                dragFree: !0,
                slidesPerPage: 1,
                transition: !1,
                preload: .25,
                friction: .12,
                Panzoom: {
                    maxVelocity: 0
                },
                Dots: !1,
                Navigation: !1,
                classes: {
                    container: "f-thumbs",
                    viewport: "f-thumbs__viewport",
                    track: "f-thumbs__track",
                    slide: "f-thumbs__slide"
                }
            }, this.option("Carousel") || {}, {
                Sync: {
                    target: t
                },
                slides: i
            }), l = new t.constructor(s, r);
            l.on("createSlide", ((t, e) => {
                this.setProps(e.index), this.emit("createSlide", e, e.el);
            })), l.on("ready", (() => {
                this.shiftModern(), this.emit("ready");
            })), l.on("refresh", (() => {
                this.shiftModern();
            })), l.on("Panzoom.click", ((t, e, i) => {
                this.onClick(i);
            })), this.carousel = l, this.state = Mt.Ready;
        }
        onClick(t) {
            t.preventDefault(), t.stopPropagation();
            const e = this.instance, {pages: i, page: n} = e, s = t => {
                if (t) {
                    const e = t.closest("[data-carousel-index]");
                    if (e) return [ parseInt(e.dataset.carouselIndex || "", 10) || 0, e ];
                }
                return [ -1, void 0 ];
            }, o = (t, e) => {
                const i = document.elementFromPoint(t, e);
                return i ? s(i) : [ -1, void 0 ];
            };
            let [a, r] = s(t.target);
            if (a > -1) return;
            const l = this[zt], c = t.clientX, h = t.clientY;
            let [d, u] = o(c - l, h), [f, p] = o(c + l, h);
            u && p ? (a = Math.abs(c - u.getBoundingClientRect().right) < Math.abs(c - p.getBoundingClientRect().left) ? d : f, 
            a === n && (a = a === d ? f : d)) : u ? a = d : p && (a = f), a > -1 && i[a] && e.slideTo(a);
        }
        getShift(t) {
            var e;
            const {instance: i} = this, n = this.carousel;
            if (!i || !n) return 0;
            const s = this[At], o = this[zt], a = this.thumbGap, r = this.thumbExtraGap;
            if (!(null === (e = n.slides[t]) || void 0 === e ? void 0 : e.el)) return 0;
            const l = .5 * (s - o), c = i.pages.length - 1;
            let h = i.getProgress(0), d = i.getProgress(c), u = i.getProgress(t, !1, !0), f = 0, p = l + r + a;
            const g = h < 0 && h > -1, m = d > 0 && d < 1;
            return 0 === t ? (f = p * Math.abs(h), m && 1 === h && (f -= p * Math.abs(d))) : t === c ? (f = p * Math.abs(d) * -1, 
            g && -1 === d && (f += p * Math.abs(h))) : g || m ? (f = -1 * p, f += p * Math.abs(h), 
            f += p * (1 - Math.abs(d))) : f = p * u, f;
        }
        setProps(e) {
            if (!this.isModern) return;
            const {instance: i} = this, n = this.carousel;
            if (i && n) {
                const s = n.slides[e].el;
                if (s && s.childNodes.length) {
                    let n = t(1 - Math.abs(i.getProgress(e))), o = t(this.getShift(e));
                    s.style.setProperty("--progress", n ? n + "" : ""), s.style.setProperty("--shift", o + "");
                }
            }
        }
        shiftModern() {
            if (!this.isModern) return;
            const {instance: t, track: e} = this, i = t.panzoom, n = this.carousel;
            if (!(t && e && i && n)) return;
            if (i.state === m.Init || i.state === m.Destroy) return;
            for (const e of t.slides) this.setProps(e.index);
            let s = (this[zt] + this.thumbGap) * (n.slides.length || 0);
            e.style.setProperty("--width", s + "");
        }
        cleanup() {
            this.carousel && this.carousel.destroy(), this.carousel = null, this.container && this.container.remove(), 
            this.container = null, this.track && this.track.remove(), this.track = null, this.state = Mt.Init, 
            E(this.instance.container, this.cn("hasThumbs"));
        }
        attach() {
            const t = this, e = t.instance;
            e.on("initSlide", t.onInitSlide), e.state === F.Init ? e.on("initSlides", t.onInitSlides) : t.onInitSlides(), 
            e.on([ "change", "Panzoom.afterTransform" ], t.onChange), e.on("Panzoom.refresh", t.onRefresh);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("initSlide", t.onInitSlide), e.off("initSlides", t.onInitSlides), e.off([ "change", "Panzoom.afterTransform" ], t.onChange), 
            e.off("Panzoom.refresh", t.onRefresh), t.cleanup();
        }
    };
    Object.defineProperty(Rt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Tt
    });
    const kt = Object.assign(Object.assign({}, Tt), {
        key: "t",
        showOnStart: !0,
        parentEl: null
    }), It = "is-masked", Dt = "aria-hidden";
    class Ft extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "ref", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "hidden", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            });
        }
        get isEnabled() {
            const t = this.ref;
            return t && !t.isDisabled();
        }
        get isHidden() {
            return this.hidden;
        }
        onClick(t, e) {
            e.stopPropagation();
        }
        onCreateSlide(t, e) {
            var i, n, s;
            const o = (null === (s = null === (n = null === (i = this.instance) || void 0 === i ? void 0 : i.carousel) || void 0 === n ? void 0 : n.slides[e.index]) || void 0 === s ? void 0 : s.type) || "", a = e.el;
            if (a && o) {
                let t = `for-${o}`;
                [ "video", "youtube", "vimeo", "html5video" ].includes(o) && (t += " for-video"), 
                S(a, t);
            }
        }
        onInit() {
            var t;
            const e = this, i = e.instance, n = i.carousel;
            if (e.ref || !n) return;
            const s = e.option("parentEl") || i.footer || i.container;
            if (!s) return;
            const o = u({}, e.options, {
                parentEl: s,
                classes: {
                    container: "f-thumbs fancybox__thumbs"
                },
                Carousel: {
                    Sync: {
                        friction: i.option("Carousel.friction") || 0
                    }
                },
                on: {
                    ready: t => {
                        const i = t.container;
                        i && this.hidden && (e.refresh(), i.style.transition = "none", e.hide(), i.offsetHeight, 
                        queueMicrotask((() => {
                            i.style.transition = "", e.show();
                        })));
                    }
                }
            });
            o.Carousel = o.Carousel || {}, o.Carousel.on = u((null === (t = e.options.Carousel) || void 0 === t ? void 0 : t.on) || {}, {
                click: this.onClick,
                createSlide: this.onCreateSlide
            }), n.options.Thumbs = o, n.attachPlugins({
                Thumbs: Rt
            }), e.ref = n.plugins.Thumbs, e.option("showOnStart") || (e.ref.state = Mt.Hidden, 
            e.hidden = !0);
        }
        onResize() {
            var t;
            const e = null === (t = this.ref) || void 0 === t ? void 0 : t.container;
            e && (e.style.maxHeight = "");
        }
        onKeydown(t, e) {
            const i = this.option("key");
            i && i === e && this.toggle();
        }
        toggle() {
            const t = this.ref;
            if (t && !t.isDisabled()) return t.state === Mt.Hidden ? (t.state = Mt.Init, void t.build()) : void (this.hidden ? this.show() : this.hide());
        }
        show() {
            const t = this.ref;
            if (!t || t.isDisabled()) return;
            const e = t.container;
            e && (this.refresh(), e.offsetHeight, e.removeAttribute(Dt), e.classList.remove(It), 
            this.hidden = !1);
        }
        hide() {
            const t = this.ref, e = t && t.container;
            e && (this.refresh(), e.offsetHeight, e.classList.add(It), e.setAttribute(Dt, "true")), 
            this.hidden = !0;
        }
        refresh() {
            const t = this.ref;
            if (!t || !t.state) return;
            const e = t.container, i = (null == e ? void 0 : e.firstChild) || null;
            e && i && i.childNodes.length && (e.style.maxHeight = `${i.getBoundingClientRect().height}px`);
        }
        attach() {
            const t = this, e = t.instance;
            e.state === st.Init ? e.on("Carousel.init", t.onInit) : t.onInit(), e.on("resize", t.onResize), 
            e.on("keydown", t.onKeydown);
        }
        detach() {
            var t;
            const e = this, i = e.instance;
            i.off("Carousel.init", e.onInit), i.off("resize", e.onResize), i.off("keydown", e.onKeydown), 
            null === (t = i.carousel) || void 0 === t || t.detachPlugins([ "Thumbs" ]), e.ref = null;
        }
    }
    Object.defineProperty(Ft, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: kt
    });
    const jt = {
        panLeft: {
            icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
            change: {
                panX: -100
            }
        },
        panRight: {
            icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
            change: {
                panX: 100
            }
        },
        panUp: {
            icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
            change: {
                panY: -100
            }
        },
        panDown: {
            icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
            change: {
                panY: 100
            }
        },
        zoomIn: {
            icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
            action: "zoomIn"
        },
        zoomOut: {
            icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "zoomOut"
        },
        toggle1to1: {
            icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
            action: "toggleZoom"
        },
        toggleZoom: {
            icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "toggleZoom"
        },
        iterateZoom: {
            icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "iterateZoom"
        },
        rotateCCW: {
            icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
            action: "rotateCCW"
        },
        rotateCW: {
            icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
            action: "rotateCW"
        },
        flipX: {
            icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
            action: "flipX"
        },
        flipY: {
            icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
            action: "flipY"
        },
        fitX: {
            icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
            action: "fitX"
        },
        fitY: {
            icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
            action: "fitY"
        },
        reset: {
            icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
            action: "reset"
        },
        toggleFS: {
            icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
            action: "toggleFS"
        }
    };
    var Ht;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Disabled = 2] = "Disabled";
    }(Ht || (Ht = {}));
    const Bt = {
        absolute: "auto",
        display: {
            left: [ "infobar" ],
            middle: [],
            right: [ "iterateZoom", "slideshow", "fullscreen", "thumbs", "close" ]
        },
        enabled: "auto",
        items: {
            infobar: {
                tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>'
            },
            download: {
                tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>'
            },
            prev: {
                tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>'
            },
            next: {
                tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>'
            },
            slideshow: {
                tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'
            },
            fullscreen: {
                tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'
            },
            thumbs: {
                tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>'
            },
            close: {
                tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>'
            }
        },
        parentEl: null
    }, Nt = {
        tabindex: "-1",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
    };
    class _t extends B {
        constructor() {
            super(...arguments), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: Ht.Init
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onReady(t) {
            var e;
            if (!t.carousel) return;
            let i = this.option("display"), n = this.option("absolute"), s = this.option("enabled");
            if ("auto" === s) {
                const t = this.instance.carousel;
                let e = 0;
                if (t) for (const i of t.slides) (i.panzoom || "image" === i.type) && e++;
                e || (s = !1);
            }
            s || (i = void 0);
            let o = 0;
            const a = {
                left: [],
                middle: [],
                right: []
            };
            if (i) for (const t of [ "left", "middle", "right" ]) for (const n of i[t]) {
                const i = this.createEl(n);
                i && (null === (e = a[t]) || void 0 === e || e.push(i), o++);
            }
            let r = null;
            if (o && (r = this.createContainer()), r) {
                for (const [t, e] of Object.entries(a)) {
                    const i = document.createElement("div");
                    S(i, "fancybox__toolbar__column is-" + t);
                    for (const t of e) i.appendChild(t);
                    "auto" !== n || "middle" !== t || e.length || (n = !0), r.appendChild(i);
                }
                !0 === n && S(r, "is-absolute"), this.state = Ht.Ready, this.onRefresh();
            } else this.state = Ht.Disabled;
        }
        onClick(t) {
            var e, i;
            const n = this.instance, s = n.getSlide(), o = null == s ? void 0 : s.panzoom, a = t.target, r = a && x(a) ? a.dataset : null;
            if (!r) return;
            if (void 0 !== r.fancyboxToggleThumbs) return t.preventDefault(), t.stopPropagation(), 
            void (null === (e = n.plugins.Thumbs) || void 0 === e || e.toggle());
            if (void 0 !== r.fancyboxToggleFullscreen) return t.preventDefault(), t.stopPropagation(), 
            void this.instance.toggleFullscreen();
            if (void 0 !== r.fancyboxToggleSlideshow) {
                t.preventDefault(), t.stopPropagation();
                const e = null === (i = n.carousel) || void 0 === i ? void 0 : i.plugins.Autoplay;
                let s = e.isActive;
                return o && "mousemove" === o.panMode && !s && o.reset(), void (s ? e.stop() : e.start());
            }
            const l = r.panzoomAction, c = r.panzoomChange;
            if ((c || l) && (t.preventDefault(), t.stopPropagation()), c) {
                let t = {};
                try {
                    t = JSON.parse(c);
                } catch (t) {}
                o && o.applyChange(t);
            } else l && o && o[l] && o[l]();
        }
        onChange() {
            this.onRefresh();
        }
        onRefresh() {
            if (this.instance.isClosing()) return;
            const t = this.container;
            if (!t) return;
            const e = this.instance.getSlide();
            if (!e || e.state !== ot.Ready) return;
            const i = e && !e.error && e.panzoom;
            for (const e of t.querySelectorAll("[data-panzoom-action]")) i ? (e.removeAttribute("disabled"), 
            e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            let n = i && i.canZoomIn(), s = i && i.canZoomOut();
            for (const e of t.querySelectorAll('[data-panzoom-action="zoomIn"]')) n ? (e.removeAttribute("disabled"), 
            e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            for (const e of t.querySelectorAll('[data-panzoom-action="zoomOut"]')) s ? (e.removeAttribute("disabled"), 
            e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            for (const e of t.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
                s || n ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), 
                e.setAttribute("tabindex", "-1"));
                const t = e.querySelector("g");
                t && (t.style.display = n ? "" : "none");
            }
        }
        onDone(t, e) {
            var i;
            null === (i = e.panzoom) || void 0 === i || i.on("afterTransform", (() => {
                this.instance.isCurrentSlide(e) && this.onRefresh();
            })), this.instance.isCurrentSlide(e) && this.onRefresh();
        }
        createContainer() {
            const t = this.instance.container;
            if (!t) return null;
            const e = this.option("parentEl") || t, i = document.createElement("div");
            return S(i, "fancybox__toolbar"), e.prepend(i), i.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !0
            }), t && S(t, "has-toolbar"), this.container = i, i;
        }
        createEl(t) {
            const e = this.instance, i = e.carousel;
            if (!i) return null;
            if ("toggleFS" === t) return null;
            if ("fullscreen" === t && !e.fsAPI) return null;
            let s = null;
            const o = i.slides.length || 0;
            let a = 0, r = 0;
            for (const t of i.slides) (t.panzoom || "image" === t.type) && a++, ("image" === t.type || t.downloadSrc) && r++;
            if (o < 2 && [ "infobar", "prev", "next" ].includes(t)) return s;
            if (void 0 !== jt[t] && !a) return null;
            if ("download" === t && !r) return null;
            if ("thumbs" === t) {
                const t = e.plugins.Thumbs;
                if (!t || !t.isEnabled) return null;
            }
            if ("slideshow" === t) if (!i.plugins.Autoplay || o < 2) return null;
            if (void 0 !== jt[t]) {
                const e = jt[t];
                s = document.createElement("button"), s.setAttribute("title", this.instance.localize(`{{${t.toUpperCase()}}}`)), 
                S(s, "f-button"), e.action && (s.dataset.panzoomAction = e.action), e.change && (s.dataset.panzoomChange = JSON.stringify(e.change)), 
                s.appendChild(n(this.instance.localize(e.icon)));
            } else {
                const e = (this.option("items") || [])[t];
                e && (s = n(this.instance.localize(e.tpl)), "function" == typeof e.click && s.addEventListener("click", (t => {
                    t.preventDefault(), t.stopPropagation(), "function" == typeof e.click && e.click.call(this, this, t);
                })));
            }
            const l = null == s ? void 0 : s.querySelector("svg");
            if (l) for (const [t, e] of Object.entries(Nt)) l.getAttribute(t) || l.setAttribute(t, String(e));
            return s;
        }
        removeContainer() {
            const t = this.container;
            t && t.remove(), this.container = null, this.state = Ht.Disabled;
            const e = this.instance.container;
            e && E(e, "has-toolbar");
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.initSlides", t.onReady), e.on("done", t.onDone), e.on([ "reveal", "Carousel.change" ], t.onChange), 
            t.onReady(t.instance);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.initSlides", t.onReady), e.off("done", t.onDone), e.off([ "reveal", "Carousel.change" ], t.onChange), 
            t.removeContainer();
        }
    }
    Object.defineProperty(_t, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Bt
    });
    const $t = {
        Hash: rt,
        Html: wt,
        Images: ht,
        Slideshow: Ct,
        Thumbs: Ft,
        Toolbar: _t
    }, Wt = "with-fancybox", Xt = "hide-scrollbar", Yt = "--fancybox-scrollbar-compensate", qt = "--fancybox-body-margin", Vt = "is-using-tab", Zt = "is-animated", Ut = "is-compact", Gt = "is-loading", Kt = "has-caption", Jt = "disabled", Qt = "tabindex", te = "download", ee = "href", ie = "src", ne = t => "string" == typeof t, se = function() {
        var t = window.getSelection();
        return t && "Range" === t.type;
    };
    let oe = null, ae = null;
    const re = new Map;
    let le = 0;
    class ce extends g {
        get isIdle() {
            return this.idle;
        }
        get isCompact() {
            return this.option("compact");
        }
        constructor(t = [], e = {}, i = {}) {
            super(e), Object.defineProperty(this, "userSlides", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "userPlugins", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            }), Object.defineProperty(this, "idle", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "idleTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "clickTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "pwt", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "ignoreFocusChange", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: st.Init
            }), Object.defineProperty(this, "id", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "footer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "caption", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "carousel", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "lastFocus", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "prevMouseMoveEvent", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "fsAPI", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), this.fsAPI = (() => {
                let t, e = "", i = "", n = "";
                return document.fullscreenEnabled ? (e = "requestFullscreen", i = "exitFullscreen", 
                n = "fullscreenElement") : document.webkitFullscreenEnabled && (e = "webkitRequestFullscreen", 
                i = "webkitExitFullscreen", n = "webkitFullscreenElement"), e && (t = {
                    request: function(t) {
                        return "webkitRequestFullscreen" === e ? t[e](Element.ALLOW_KEYBOARD_INPUT) : t[e]();
                    },
                    exit: function() {
                        return document[n] && document[i]();
                    },
                    isFullscreen: function() {
                        return document[n];
                    }
                }), t;
            })(), this.id = e.id || ++le, re.set(this.id, this), this.userSlides = t, this.userPlugins = i, 
            queueMicrotask((() => {
                this.init();
            }));
        }
        init() {
            if (this.state === st.Destroy) return;
            this.state = st.Init, this.attachPlugins(Object.assign(Object.assign({}, ce.Plugins), this.userPlugins)), 
            this.emit("init"), this.emit("attachPlugins"), !0 === this.option("hideScrollbar") && (() => {
                if (!Q) return;
                const t = document, e = t.body, i = t.documentElement;
                if (e.classList.contains(Xt)) return;
                let n = window.innerWidth - i.getBoundingClientRect().width;
                const s = parseFloat(window.getComputedStyle(e).marginRight);
                n < 0 && (n = 0), i.style.setProperty(Yt, `${n}px`), s && e.style.setProperty(qt, `${s}px`), 
                e.classList.add(Xt);
            })(), this.initLayout(), this.scale();
            const t = () => {
                this.initCarousel(this.userSlides), this.state = st.Ready, this.attachEvents(), 
                this.emit("ready"), setTimeout((() => {
                    this.container && this.container.setAttribute("aria-hidden", "false");
                }), 16);
            }, e = this.fsAPI;
            this.option("Fullscreen.autoStart") && e && !e.isFullscreen() ? e.request(this.container).then((() => t())).catch((() => t())) : t();
        }
        initLayout() {
            var t, e;
            const i = this.option("parentEl") || document.body, s = n(this.localize(this.option("tpl.main") || ""));
            s && (s.setAttribute("id", `fancybox-${this.id}`), s.setAttribute("aria-label", this.localize("{{MODAL}}")), 
            s.classList.toggle(Ut, this.isCompact), S(s, this.option("mainClass") || ""), this.container = s, 
            this.footer = s.querySelector(".fancybox__footer"), i.appendChild(s), S(document.documentElement, Wt), 
            oe && ae || (oe = document.createElement("span"), S(oe, "fancybox-focus-guard"), 
            oe.setAttribute(Qt, "0"), oe.setAttribute("aria-hidden", "true"), oe.setAttribute("aria-label", "Focus guard"), 
            ae = oe.cloneNode(), null === (t = s.parentElement) || void 0 === t || t.insertBefore(oe, s), 
            null === (e = s.parentElement) || void 0 === e || e.append(ae)), s.addEventListener("mousedown", (() => {
                E(s, Vt);
            })), this.option("animated") && (S(s, Zt), setTimeout((() => {
                this.isClosing() || E(s, Zt);
            }), 350)), this.emit("initLayout"));
        }
        initCarousel(t) {
            const i = this.container;
            if (!i) return;
            const n = i.querySelector(".fancybox__carousel");
            if (!n) return;
            const s = this.carousel = new K(n, u({}, {
                slides: t,
                transition: "fade",
                Panzoom: {
                    lockAxis: this.option("dragToClose") ? "xy" : "x",
                    infinite: !!this.option("dragToClose") && "y"
                },
                Dots: !1,
                Navigation: {
                    classes: {
                        container: "fancybox__nav",
                        button: "f-button",
                        isNext: "is-next",
                        isPrev: "is-prev"
                    }
                },
                initialPage: this.option("startIndex"),
                l10n: this.option("l10n")
            }, this.option("Carousel") || {}));
            s.on("*", ((t, e, ...i) => {
                this.emit(`Carousel.${e}`, t, ...i);
            })), s.on([ "ready", "change" ], (() => {
                this.manageCaption();
            })), this.on("Carousel.removeSlide", ((t, e, i) => {
                this.clearContent(i), i.state = void 0;
            })), s.on("Panzoom.touchStart", (() => {
                var t, e;
                this.isCompact || this.endIdle(), (null === (t = document.activeElement) || void 0 === t ? void 0 : t.closest(".f-thumbs")) && (null === (e = this.container) || void 0 === e || e.focus());
            })), s.on("settle", (() => {
                this.idleTimer || this.isCompact || !this.option("idle") || this.setIdle(), this.option("autoFocus") && !this.isClosing && this.checkFocus();
            })), this.option("dragToClose") && (s.on("Panzoom.afterTransform", ((t, i) => {
                const n = this.getSlide();
                if (n && e(n.el)) return;
                const s = this.container;
                if (s) {
                    const t = Math.abs(i.current.f), e = t < 1 ? "" : Math.max(.5, Math.min(1, 1 - t / i.contentRect.fitHeight * 1.5));
                    s.style.setProperty("--fancybox-ts", e ? "0s" : ""), s.style.setProperty("--fancybox-opacity", e + "");
                }
            })), s.on("Panzoom.touchEnd", ((t, i, n) => {
                var s;
                const o = this.getSlide();
                if (o && e(o.el)) return;
                if (i.isMobile && document.activeElement && -1 !== [ "TEXTAREA", "INPUT" ].indexOf(null === (s = document.activeElement) || void 0 === s ? void 0 : s.nodeName)) return;
                const a = Math.abs(i.dragOffset.y);
                "y" === i.lockedAxis && (a >= 200 || a >= 50 && i.dragOffset.time < 300) && (n && n.cancelable && n.preventDefault(), 
                this.close(n, "f-throwOut" + (i.current.f < 0 ? "Up" : "Down")));
            }))), s.on("change", (t => {
                var e;
                let i = null === (e = this.getSlide()) || void 0 === e ? void 0 : e.triggerEl;
                if (i) {
                    const e = new CustomEvent("slideTo", {
                        bubbles: !0,
                        cancelable: !0,
                        detail: t.page
                    });
                    i.dispatchEvent(e);
                }
            })), s.on([ "refresh", "change" ], (t => {
                const e = this.container;
                if (!e) return;
                for (const i of e.querySelectorAll("[data-fancybox-current-index]")) i.innerHTML = t.page + 1;
                for (const i of e.querySelectorAll("[data-fancybox-count]")) i.innerHTML = t.pages.length;
                if (!t.isInfinite) {
                    for (const i of e.querySelectorAll("[data-fancybox-next]")) t.page < t.pages.length - 1 ? (i.removeAttribute(Jt), 
                    i.removeAttribute(Qt)) : (i.setAttribute(Jt, ""), i.setAttribute(Qt, "-1"));
                    for (const i of e.querySelectorAll("[data-fancybox-prev]")) t.page > 0 ? (i.removeAttribute(Jt), 
                    i.removeAttribute(Qt)) : (i.setAttribute(Jt, ""), i.setAttribute(Qt, "-1"));
                }
                const i = this.getSlide();
                if (!i) return;
                let n = i.downloadSrc || "";
                n || "image" !== i.type || i.error || !ne(i[ie]) || (n = i[ie]);
                for (const t of e.querySelectorAll("[data-fancybox-download]")) {
                    const e = i.downloadFilename;
                    n ? (t.removeAttribute(Jt), t.removeAttribute(Qt), t.setAttribute(ee, n), t.setAttribute(te, e || n), 
                    t.setAttribute("target", "_blank")) : (t.setAttribute(Jt, ""), t.setAttribute(Qt, "-1"), 
                    t.removeAttribute(ee), t.removeAttribute(te));
                }
            })), this.emit("initCarousel");
        }
        attachEvents() {
            const t = this, e = t.container;
            if (!e) return;
            e.addEventListener("click", t.onClick, {
                passive: !1,
                capture: !1
            }), e.addEventListener("wheel", t.onWheel, {
                passive: !1,
                capture: !1
            }), document.addEventListener("keydown", t.onKeydown, {
                passive: !1,
                capture: !0
            }), document.addEventListener("visibilitychange", t.onVisibilityChange, !1), document.addEventListener("mousemove", t.onMousemove), 
            t.option("trapFocus") && document.addEventListener("focus", t.onFocus, !0), window.addEventListener("resize", t.onResize);
            const i = window.visualViewport;
            i && (i.addEventListener("scroll", t.onResize), i.addEventListener("resize", t.onResize));
        }
        detachEvents() {
            const t = this, e = t.container;
            if (!e) return;
            document.removeEventListener("keydown", t.onKeydown, {
                passive: !1,
                capture: !0
            }), e.removeEventListener("wheel", t.onWheel, {
                passive: !1,
                capture: !1
            }), e.removeEventListener("click", t.onClick, {
                passive: !1,
                capture: !1
            }), document.removeEventListener("mousemove", t.onMousemove), window.removeEventListener("resize", t.onResize);
            const i = window.visualViewport;
            i && (i.removeEventListener("resize", t.onResize), i.removeEventListener("scroll", t.onResize)), 
            document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), document.removeEventListener("focus", t.onFocus, !0);
        }
        scale() {
            const t = this.container;
            if (!t) return;
            const e = window.visualViewport, i = Math.max(1, (null == e ? void 0 : e.scale) || 1);
            let n = "", s = "", o = "";
            if (e && i > 1) {
                let t = `${e.offsetLeft}px`, a = `${e.offsetTop}px`;
                n = e.width * i + "px", s = e.height * i + "px", o = `translate3d(${t}, ${a}, 0) scale(${1 / i})`;
            }
            t.style.transform = o, t.style.width = n, t.style.height = s;
        }
        onClick(t) {
            var e, i;
            const {container: n, isCompact: s} = this;
            if (!n || this.isClosing()) return;
            !s && this.option("idle") && this.resetIdle();
            const o = t.composedPath()[0];
            if (o.closest(".f-spinner") || o.closest("[data-fancybox-close]")) return t.preventDefault(), 
            void this.close(t);
            if (o.closest("[data-fancybox-prev]")) return t.preventDefault(), void this.prev();
            if (o.closest("[data-fancybox-next]")) return t.preventDefault(), void this.next();
            const a = document.activeElement;
            if (se() && a && n.contains(a)) return;
            if (o === (null === (e = this.carousel) || void 0 === e ? void 0 : e.container)) return;
            if (s && "image" === (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.type)) return void (this.clickTimer ? (clearTimeout(this.clickTimer), 
            this.clickTimer = null) : this.clickTimer = setTimeout((() => {
                this.toggleIdle(), this.clickTimer = null;
            }), 350));
            if (this.emit("click", t), t.defaultPrevented) return;
            let r = !1;
            if (o.closest(".fancybox__content")) {
                if (a) {
                    if (a.closest("[contenteditable]")) return;
                    o.matches(et) || a.blur();
                }
                if (se()) return;
                r = this.option("contentClick");
            } else o.closest(".fancybox__carousel") && !o.matches(et) && (r = this.option("backdropClick"));
            "close" === r ? (t.preventDefault(), this.close(t)) : "next" === r ? (t.preventDefault(), 
            this.next()) : "prev" === r && (t.preventDefault(), this.prev());
        }
        onWheel(t) {
            const e = t.target;
            let n = this.option("wheel", t);
            e.closest(".fancybox__thumbs") && (n = "slide");
            const s = "slide" === n, o = [ -t.deltaX || 0, -t.deltaY || 0, -t.detail || 0 ].reduce((function(t, e) {
                return Math.abs(e) > Math.abs(t) ? e : t;
            })), a = Math.max(-1, Math.min(1, o)), r = Date.now();
            this.pwt && r - this.pwt < 300 ? s && t.preventDefault() : (this.pwt = r, this.emit("wheel", t, a), 
            t.defaultPrevented || ("close" === n ? (t.preventDefault(), this.close(t)) : "slide" === n && (i(e) || (t.preventDefault(), 
            this[a > 0 ? "prev" : "next"]()))));
        }
        onKeydown(t) {
            if (!this.isTopmost()) return;
            this.isCompact || !this.option("idle") || this.isClosing() || this.resetIdle();
            const e = t.key, i = this.option("keyboard");
            if (!i) return;
            const n = t.composedPath()[0], s = document.activeElement && document.activeElement.classList, o = s && s.contains("f-button") || n.dataset.carouselPage || n.dataset.carouselIndex;
            if ("Escape" !== e && !o && x(n)) if (n.isContentEditable || -1 !== [ "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO" ].indexOf(n.nodeName)) return;
            if ("Tab" === t.key ? S(this.container, Vt) : E(this.container, Vt), t.ctrlKey || t.altKey || t.shiftKey) return;
            this.emit("keydown", e, t);
            const a = i[e];
            a && "function" == typeof this[a] && (t.preventDefault(), this[a]());
        }
        onResize() {
            const t = this.container;
            if (!t) return;
            const e = this.isCompact;
            t.classList.toggle(Ut, e), this.manageCaption(this.getSlide()), this.isCompact ? this.clearIdle() : this.endIdle(), 
            this.scale(), this.emit("resize");
        }
        onFocus(t) {
            this.isTopmost() && this.checkFocus(t);
        }
        onMousemove(t) {
            this.prevMouseMoveEvent = t, !this.isCompact && this.option("idle") && this.resetIdle();
        }
        onVisibilityChange() {
            "visible" === document.visibilityState ? this.checkFocus() : this.endIdle();
        }
        manageCloseBtn(t) {
            const e = this.optionFor(t, "closeButton") || !1;
            if ("auto" === e) {
                const t = this.plugins.Toolbar;
                if (t && t.state === Ht.Ready) return;
            }
            if (!e) return;
            if (!t.contentEl || t.closeBtnEl) return;
            const i = this.option("tpl.closeButton");
            if (i) {
                const e = n(this.localize(i));
                t.closeBtnEl = t.contentEl.appendChild(e), t.el && S(t.el, "has-close-btn");
            }
        }
        manageCaption(t = void 0) {
            var e, i;
            const n = "fancybox__caption", s = this.container;
            if (!s) return;
            E(s, Kt);
            const o = this.isCompact || this.option("commonCaption"), a = !o;
            if (this.caption && this.stop(this.caption), a && this.caption && (this.caption.remove(), 
            this.caption = null), o && !this.caption) for (const t of (null === (e = this.carousel) || void 0 === e ? void 0 : e.slides) || []) t.captionEl && (t.captionEl.remove(), 
            t.captionEl = void 0, E(t.el, Kt), null === (i = t.el) || void 0 === i || i.removeAttribute("aria-labelledby"));
            if (t || (t = this.getSlide()), !t || o && !this.isCurrentSlide(t)) return;
            const r = t.el;
            let l = this.optionFor(t, "caption", "");
            if (!l) return void (o && this.caption && this.animate(this.caption, "f-fadeOut", (() => {
                this.caption && (this.caption.innerHTML = "");
            })));
            let c = null;
            if (a) {
                if (c = t.captionEl || null, r && !c) {
                    const e = n + `_${this.id}_${t.index}`;
                    c = document.createElement("div"), S(c, n), c.setAttribute("id", e), t.captionEl = r.appendChild(c), 
                    S(r, Kt), r.setAttribute("aria-labelledby", e);
                }
            } else {
                if (c = this.caption, c || (c = s.querySelector("." + n)), !c) {
                    c = document.createElement("div"), c.dataset.fancyboxCaption = "", S(c, n);
                    (this.footer || s).prepend(c);
                }
                S(s, Kt), this.caption = c;
            }
            c && (c.innerHTML = "", ne(l) || "number" == typeof l ? c.innerHTML = l + "" : l instanceof HTMLElement && c.appendChild(l));
        }
        checkFocus(t) {
            this.focus(t);
        }
        focus(t) {
            var e;
            if (this.ignoreFocusChange) return;
            const i = document.activeElement || null, n = (null == t ? void 0 : t.target) || null, s = this.container, o = this.getSlide();
            if (!s || !(null === (e = this.carousel) || void 0 === e ? void 0 : e.viewport)) return;
            if (!t && i && s.contains(i)) return;
            const a = o && o.state === ot.Ready ? o.el : null;
            if (!a || a.contains(i) || s === i) return;
            t && t.cancelable && t.preventDefault(), this.ignoreFocusChange = !0;
            const r = Array.from(s.querySelectorAll(et));
            let l = [], c = null;
            for (let t of r) {
                const e = !t.offsetParent || !!t.closest('[aria-hidden="true"]'), i = a && a.contains(t), n = !this.carousel.viewport.contains(t);
                if (t === s || (i || n) && !e) {
                    l.push(t);
                    const e = t.dataset.origTabindex;
                    void 0 !== e && e && (t.tabIndex = parseFloat(e)), t.removeAttribute("data-orig-tabindex"), 
                    !t.hasAttribute("autoFocus") && c || (c = t);
                } else {
                    const e = void 0 === t.dataset.origTabindex ? t.getAttribute("tabindex") || "" : t.dataset.origTabindex;
                    e && (t.dataset.origTabindex = e), t.tabIndex = -1;
                }
            }
            let h = null;
            t ? (!n || l.indexOf(n) < 0) && (h = c || s, l.length && (i === ae ? h = l[0] : this.lastFocus !== s && i !== oe || (h = l[l.length - 1]))) : h = o && "image" === o.type ? s : c || s, 
            h && it(h), this.lastFocus = document.activeElement, this.ignoreFocusChange = !1;
        }
        next() {
            const t = this.carousel;
            t && t.pages.length > 1 && t.slideNext();
        }
        prev() {
            const t = this.carousel;
            t && t.pages.length > 1 && t.slidePrev();
        }
        jumpTo(...t) {
            this.carousel && this.carousel.slideTo(...t);
        }
        isTopmost() {
            var t;
            return (null === (t = ce.getInstance()) || void 0 === t ? void 0 : t.id) == this.id;
        }
        animate(t = null, e = "", i) {
            if (!t || !e) return void (i && i());
            this.stop(t);
            const n = s => {
                s.target === t && t.dataset.animationName && (t.removeEventListener("animationend", n), 
                delete t.dataset.animationName, i && i(), E(t, e));
            };
            t.dataset.animationName = e, t.addEventListener("animationend", n), S(t, e);
        }
        stop(t) {
            t && t.dispatchEvent(new CustomEvent("animationend", {
                bubbles: !1,
                cancelable: !0,
                currentTarget: t
            }));
        }
        setContent(t, e = "", i = !0) {
            if (this.isClosing()) return;
            const s = t.el;
            if (!s) return;
            let o = null;
            if (x(e) ? o = e : (o = n(e + ""), x(o) || (o = document.createElement("div"), o.innerHTML = e + "")), 
            [ "img", "picture", "iframe", "video", "audio" ].includes(o.nodeName.toLowerCase())) {
                const t = document.createElement("div");
                t.appendChild(o), o = t;
            }
            x(o) && t.filter && !t.error && (o = o.querySelector(t.filter)), o && x(o) ? (S(o, "fancybox__content"), 
            t.id && o.setAttribute("id", t.id), "none" !== o.style.display && "none" !== getComputedStyle(o).getPropertyValue("display") || (o.style.display = t.display || this.option("defaultDisplay") || "flex"), 
            s.classList.add(`has-${t.error ? "error" : t.type || "unknown"}`), s.prepend(o), 
            t.contentEl = o, i && this.revealContent(t), this.manageCloseBtn(t), this.manageCaption(t)) : this.setError(t, "{{ELEMENT_NOT_FOUND}}");
        }
        revealContent(t, e) {
            const i = t.el, n = t.contentEl;
            i && n && (this.emit("reveal", t), this.hideLoading(t), t.state = ot.Opening, (e = this.isOpeningSlide(t) ? void 0 === e ? this.optionFor(t, "showClass") : e : "f-fadeIn") ? this.animate(n, e, (() => {
                this.done(t);
            })) : this.done(t));
        }
        done(t) {
            this.isClosing() || (t.state = ot.Ready, this.emit("done", t), S(t.el, "is-done"), 
            this.isCurrentSlide(t) && this.option("autoFocus") && queueMicrotask((() => {
                var e;
                null === (e = t.panzoom) || void 0 === e || e.updateControls(), this.option("autoFocus") && (this.option("autoFocus") ? this.focus() : this.checkFocus());
            })), this.isOpeningSlide(t) && !this.isCompact && this.option("idle") && this.setIdle());
        }
        isCurrentSlide(t) {
            const e = this.getSlide();
            return !(!t || !e) && e.index === t.index;
        }
        isOpeningSlide(t) {
            var e, i;
            return null === (null === (e = this.carousel) || void 0 === e ? void 0 : e.prevPage) && t.index === (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.index);
        }
        showLoading(t) {
            t.state = ot.Loading;
            const e = t.el;
            if (!e) return;
            S(e, Gt), this.emit("loading", t), t.spinnerEl || setTimeout((() => {
                if (!this.isClosing() && !t.spinnerEl && t.state === ot.Loading) {
                    let i = n(w);
                    t.spinnerEl = i, e.prepend(i), this.animate(i, "f-fadeIn");
                }
            }), 250);
        }
        hideLoading(t) {
            const e = t.el;
            if (!e) return;
            const i = t.spinnerEl;
            this.isClosing() ? null == i || i.remove() : (E(e, Gt), i && this.animate(i, "f-fadeOut", (() => {
                i.remove();
            })), t.state === ot.Loading && (this.emit("loaded", t), t.state = ot.Ready));
        }
        setError(t, e) {
            if (this.isClosing()) return;
            const i = new Event("error", {
                bubbles: !0,
                cancelable: !0
            });
            if (this.emit("error", i, t), i.defaultPrevented) return;
            t.error = e, this.hideLoading(t), this.clearContent(t);
            const n = document.createElement("div");
            n.classList.add("fancybox-error"), n.innerHTML = this.localize(e || "<p>{{ERROR}}</p>"), 
            this.setContent(t, n);
        }
        clearContent(t) {
            if (void 0 === t.state) return;
            this.emit("clearContent", t), t.contentEl && (t.contentEl.remove(), t.contentEl = void 0);
            const e = t.el;
            e && (E(e, "has-error"), E(e, "has-unknown"), E(e, `has-${t.type || "unknown"}`)), 
            t.closeBtnEl && t.closeBtnEl.remove(), t.closeBtnEl = void 0, t.captionEl && t.captionEl.remove(), 
            t.captionEl = void 0, t.spinnerEl && t.spinnerEl.remove(), t.spinnerEl = void 0;
        }
        getSlide() {
            var t;
            const e = this.carousel;
            return (null === (t = null == e ? void 0 : e.pages[null == e ? void 0 : e.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0;
        }
        close(t, e) {
            if (this.isClosing()) return;
            const i = new Event("shouldClose", {
                bubbles: !0,
                cancelable: !0
            });
            if (this.emit("shouldClose", i, t), i.defaultPrevented) return;
            t && t.cancelable && (t.preventDefault(), t.stopPropagation());
            const n = this.fsAPI, s = () => {
                this.proceedClose(t, e);
            };
            n && n.isFullscreen() === this.container ? Promise.resolve(n.exit()).then((() => s())) : s();
        }
        clearIdle() {
            this.idleTimer && clearTimeout(this.idleTimer), this.idleTimer = null;
        }
        setIdle(t = !1) {
            const e = () => {
                this.clearIdle(), this.idle = !0, S(this.container, "is-idle"), this.emit("setIdle");
            };
            if (this.clearIdle(), !this.isClosing()) if (t) e(); else {
                const t = this.option("idle");
                t && (this.idleTimer = setTimeout(e, t));
            }
        }
        endIdle() {
            this.clearIdle(), this.idle && !this.isClosing() && (this.idle = !1, E(this.container, "is-idle"), 
            this.emit("endIdle"));
        }
        resetIdle() {
            this.endIdle(), this.setIdle();
        }
        toggleIdle() {
            this.idle ? this.endIdle() : this.setIdle(!0);
        }
        toggleFullscreen() {
            const t = this.fsAPI;
            t && (t.isFullscreen() ? t.exit() : this.container && t.request(this.container));
        }
        isClosing() {
            return [ st.Closing, st.CustomClosing, st.Destroy ].includes(this.state);
        }
        proceedClose(t, e) {
            var i, n;
            this.state = st.Closing, this.clearIdle(), this.detachEvents();
            const s = this.container, o = this.carousel, a = this.getSlide(), r = a && this.option("placeFocusBack") ? a.triggerEl || this.option("triggerEl") : null;
            if (r && (J(r) ? it(r) : r.focus()), s && (S(s, "is-closing"), s.setAttribute("aria-hidden", "true"), 
            this.option("animated") && S(s, Zt), s.style.pointerEvents = "none"), o) {
                o.clearTransitions(), null === (i = o.panzoom) || void 0 === i || i.destroy(), null === (n = o.plugins.Navigation) || void 0 === n || n.detach();
                for (const t of o.slides) {
                    t.state = ot.Closing, this.hideLoading(t);
                    const e = t.contentEl;
                    e && this.stop(e);
                    const i = null == t ? void 0 : t.panzoom;
                    i && (i.stop(), i.detachEvents(), i.detachObserver()), this.isCurrentSlide(t) || o.emit("removeSlide", t);
                }
            }
            this.emit("close", t), this.state !== st.CustomClosing ? (void 0 === e && a && (e = this.optionFor(a, "hideClass")), 
            e && a ? (this.animate(a.contentEl, e, (() => {
                o && o.emit("removeSlide", a);
            })), setTimeout((() => {
                this.destroy();
            }), 500)) : this.destroy()) : setTimeout((() => {
                this.destroy();
            }), 500);
        }
        destroy() {
            var t;
            if (this.state === st.Destroy) return;
            this.state = st.Destroy, null === (t = this.carousel) || void 0 === t || t.destroy();
            const e = this.container;
            e && e.remove(), re.delete(this.id);
            const i = ce.getInstance();
            i ? i.focus() : (oe && (oe.remove(), oe = null), ae && (ae.remove(), ae = null), 
            E(document.documentElement, Wt), (() => {
                if (!Q) return;
                const t = document, e = t.body;
                e.classList.remove(Xt), e.style.setProperty(qt, ""), t.documentElement.style.setProperty(Yt, "");
            })(), this.emit("destroy"));
        }
        static bind(t, e, i) {
            if (!Q) return;
            let n, s = "", o = {};
            if (void 0 === t ? n = document.body : ne(t) ? (n = document.body, s = t, "object" == typeof e && (o = e || {})) : (n = t, 
            ne(e) && (s = e), "object" == typeof i && (o = i || {})), !n || !x(n)) return;
            s = s || "[data-fancybox]";
            const a = ce.openers.get(n) || new Map;
            a.set(s, o), ce.openers.set(n, a), 1 === a.size && n.addEventListener("click", ce.fromEvent);
        }
        static unbind(t, e) {
            let i, n = "";
            if (ne(t) ? (i = document.body, n = t) : (i = t, ne(e) && (n = e)), !i) return;
            const s = ce.openers.get(i);
            s && n && s.delete(n), n && s || (ce.openers.delete(i), i.removeEventListener("click", ce.fromEvent));
        }
        static destroy() {
            let t;
            for (;t = ce.getInstance(); ) t.destroy();
            for (const t of ce.openers.keys()) t.removeEventListener("click", ce.fromEvent);
            ce.openers = new Map;
        }
        static fromEvent(t) {
            if (t.defaultPrevented) return;
            if (t.button && 0 !== t.button) return;
            if (t.ctrlKey || t.metaKey || t.shiftKey) return;
            let e = t.composedPath()[0];
            const i = e.closest("[data-fancybox-trigger]");
            if (i) {
                const t = i.dataset.fancyboxTrigger || "", n = document.querySelectorAll(`[data-fancybox="${t}"]`), s = parseInt(i.dataset.fancyboxIndex || "", 10) || 0;
                e = n[s] || e;
            }
            if (!(e && e instanceof Element)) return;
            let n, s, o, a;
            if ([ ...ce.openers ].reverse().find((([t, i]) => !(!t.contains(e) || ![ ...i ].reverse().find((([i, r]) => {
                let l = e.closest(i);
                return !!l && (n = t, s = i, o = l, a = r, !0);
            }))))), !n || !s || !o) return;
            a = a || {}, t.preventDefault(), e = o;
            let r = [], l = u({}, nt, a);
            l.event = t, l.triggerEl = e, l.delegate = i;
            const c = l.groupAll, h = l.groupAttr, d = h && e ? e.getAttribute(`${h}`) : "";
            if ((!e || d || c) && (r = [].slice.call(n.querySelectorAll(s))), e && !c && (r = d ? r.filter((t => t.getAttribute(`${h}`) === d)) : [ e ]), 
            !r.length) return;
            const f = ce.getInstance();
            return f && f.options.triggerEl && r.indexOf(f.options.triggerEl) > -1 ? void 0 : (e && (l.startIndex = r.indexOf(e)), 
            ce.fromNodes(r, l));
        }
        static fromSelector(t, e, i) {
            let n = null, s = "", o = {};
            if (ne(t) ? (n = document.body, s = t, "object" == typeof e && (o = e || {})) : t instanceof HTMLElement && ne(e) && (n = t, 
            s = e, "object" == typeof i && (o = i || {})), !n || !s) return !1;
            const a = ce.openers.get(n);
            return !!a && (o = u({}, a.get(s) || {}, o), !!o && ce.fromNodes(Array.from(n.querySelectorAll(s)), o));
        }
        static fromNodes(t, e) {
            e = u({}, nt, e || {});
            const i = [];
            for (const n of t) {
                const t = n.dataset || {}, s = t[ie] || n.getAttribute(ee) || n.getAttribute("currentSrc") || n.getAttribute(ie) || void 0;
                let o;
                const a = e.delegate;
                let r;
                a && i.length === e.startIndex && (o = a instanceof HTMLImageElement ? a : a.querySelector("img:not([aria-hidden])")), 
                o || (o = n instanceof HTMLImageElement ? n : n.querySelector("img:not([aria-hidden])")), 
                o && (r = o.currentSrc || o[ie] || void 0, !r && o.dataset && (r = o.dataset.lazySrc || o.dataset[ie] || void 0));
                const l = {
                    src: s,
                    triggerEl: n,
                    thumbEl: o,
                    thumbElSrc: r,
                    thumbSrc: r
                };
                for (const e in t) {
                    let i = t[e] + "";
                    i = "false" !== i && ("true" === i || i), l[e] = i;
                }
                i.push(l);
            }
            return new ce(i, e);
        }
        static getInstance(t) {
            if (t) return re.get(t);
            return Array.from(re.values()).reverse().find((t => !t.isClosing() && t)) || null;
        }
        static getSlide() {
            var t;
            return (null === (t = ce.getInstance()) || void 0 === t ? void 0 : t.getSlide()) || null;
        }
        static show(t = [], e = {}) {
            return new ce(t, e);
        }
        static next() {
            const t = ce.getInstance();
            t && t.next();
        }
        static prev() {
            const t = ce.getInstance();
            t && t.prev();
        }
        static close(t = !0, ...e) {
            if (t) for (const t of re.values()) t.close(...e); else {
                const t = ce.getInstance();
                t && t.close(...e);
            }
        }
    }
    Object.defineProperty(ce, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "5.0.27"
    }), Object.defineProperty(ce, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: nt
    }), Object.defineProperty(ce, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: $t
    }), Object.defineProperty(ce, "openers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map
    });
    document.addEventListener("click", (e => {
        hoverSubMenuMobile(e);
        checkboxSpoller(e);
        cartChanging(e);
    }));
    function hoverSubMenuMobile(e) {
        const target = e.target;
        if (window.innerWidth > 1170) if (target.classList.contains("menu__arrow")) {
            const menuItem = target.closest(".menu__item");
            menuItem ? menuItem.classList.toggle("_hover") : null;
        } else {
            const links = document.querySelectorAll(".menu__item");
            if (links) links.forEach((item => item.classList.remove("_hover")));
        } else if (target.classList.contains("menu__link") && target.nextElementSibling.hasAttribute("data-spoller")) {
            e.preventDefault();
            target.nextElementSibling.click();
        }
    }
    function checkboxSpoller(e) {
        const target = e.target;
        if (target.hasAttribute("data-spoller-checkbox")) {
            const spollerBody = target.parentElement.nextElementSibling;
            const allInputs = spollerBody.querySelectorAll("input,select");
            _slideToggle(spollerBody, 500);
            target.disabled = true;
            setTimeout((() => {
                if (spollerBody.classList.contains("_open")) allInputs.forEach((input => input.setAttribute("disabled", ""))); else allInputs.forEach((input => input.removeAttribute("disabled")));
                spollerBody.classList.toggle("_open");
                target.disabled = false;
            }), 500);
        }
    }
    const cartItems = document.getElementsByClassName("cart-item");
    function cartChanging(e) {
        const target = e.target;
        if (target.classList.contains("cart-item__btn-remove")) {
            e.preventDefault();
            const cartItem = target.closest(".cart-item");
            cartItem.classList.add("_removing");
            setTimeout((() => {
                cartItem.remove();
                chargeCartTotalPrice();
            }), 300);
        }
        if (target.classList.contains("quantity__button")) setTimeout((() => {
            chargeTotalPriceCartItem(target);
            chargeCartTotalPrice();
        }), 0);
        if (target.closest("[data-additional-services]") && target.closest(".checkbox-item") && target.localName === "label") setTimeout((() => {
            chargeCartTotalPrice();
        }));
    }
    const cartItemsInputsQuantity = document.querySelectorAll("[data-quantity-cart-item-input]");
    if (cartItemsInputsQuantity) cartItemsInputsQuantity.forEach((input => {
        input.addEventListener("input", (e => {
            if (input.value === "") input.value = 1;
            chargeTotalPriceCartItem(input);
            chargeCartTotalPrice();
        }));
    }));
    function chargeTotalPriceCartItem(target) {
        const cartItem = target.closest(".cart-item");
        const priceByOneItem = +cartItem.querySelector(".cart-item__price mark[data-price]").textContent;
        const quantity = +cartItem.querySelector("input").value;
        const total = cartItem.querySelector(".cart-item__total mark[data-price]");
        const totalPriceCalc = (quantity * priceByOneItem).toFixed(2);
        total.textContent = totalPriceCalc;
    }
    function chargeCartTotalPrice() {
        const totalPrice = document.querySelector(".total-payment__price mark[data-price]");
        let totalPriceCalc = Array.from(cartItems).reduce(((acc, item) => {
            const totalPriceOfItem = +item.querySelector(".cart-item__total mark[data-price]").textContent;
            return acc + totalPriceOfItem;
        }), 0);
        const additionalServices = document.querySelector("[data-additional-services]").querySelectorAll("input");
        if (additionalServices.length) additionalServices.forEach((service => {
            if (service.checked) totalPriceCalc += +service.dataset.amount;
        }));
        totalPrice.textContent = totalPriceCalc.toFixed(2);
    }
    const formDelivery = document.querySelector(".form-delivery");
    if (formDelivery) {
        validateForm(formDelivery, validateFormDelivery);
        const radioItems = formDelivery.querySelectorAll('input[type="radio"]');
        radioItems.forEach((radio => {
            radio.addEventListener("change", (e => {
                console.log("Radio Btn ==>", radio, "Value ==>", radio.value);
            }));
        }));
    }
    function validateFormDelivery(error, form) {
        const radios = getRadioGroup(form);
        const selects = form.querySelectorAll("select");
        if (radios.size !== 0) radios.forEach(((value, key, map) => {
            const isChekedRadioGroup = value.some((item => item.checked === true));
            if (!isChekedRadioGroup) error[key] = value[0].closest("[data-radio-group-error-ms]").dataset.radioGroupErrorMs;
        }));
        selects.forEach((select => {
            if (select.value === "") error[select.name] = select.dataset.errorMs;
        }));
    }
    const formFeedback = document.querySelector(".form-feedback");
    if (formFeedback) validateForm(formFeedback, validateFormFeedback);
    function validateFormFeedback(error, form) {
        const inputCheckbox = form.querySelector('input[type="checkbox"]');
        if (!inputCheckbox.checked) error[inputCheckbox.name] = inputCheckbox.dataset.errorMs;
    }
    const formPayment = document.querySelector('[data-form="payment"]');
    if (formPayment) validateForm(formPayment, validateFormPayment);
    function validateFormPayment(error, form) {
        const radios = getRadioGroup(form);
        if (radios.size !== 0) radios.forEach(((value, key, map) => {
            const isChekedRadioGroup = value.some((item => item.checked === true));
            if (!isChekedRadioGroup) error[key] = value[0].closest("[data-radio-group-error-ms]").dataset.radioGroupErrorMs;
        }));
    }
    const modifyProfile = document.querySelector('[data-form="modifi-profile"]');
    if (modifyProfile) validateForm(modifyProfile, validateFormModifiProfile);
    function validateFormModifiProfile(error, form) {
        const selects = form.querySelectorAll("selects");
        const inputCheckboxPrivacy = form.querySelector("input[data-input-agree]");
        selects.forEach((select => {
            if (select.value === "") error[select.name] = select.dataset.errorMs;
        }));
        if (!inputCheckboxPrivacy.checked) error[inputCheckboxPrivacy.name] = inputCheckboxPrivacy.dataset.errorMs;
    }
    function validateForm(form, vilidateFunc) {
        form.addEventListener("submit", (e => {
            e.preventDefault();
            const error = {};
            vilidateFunc(error, form);
            const customAlertText = document.querySelector(".custom-alert__text");
            customAlertText.textContent = "";
            for (let key in error) {
                customAlertText.textContent = error[key];
                modules_flsModules.popup.open("#custom-alert");
                break;
            }
            const isValidated = Object.keys(error).length === 0;
            isValidated ? form.submit() : null;
        }));
    }
    function getRadioGroup(form) {
        const radioGroups = new Map;
        form.querySelectorAll('input[type="radio"]').forEach((radio => {
            const name = radio.getAttribute("name");
            if (!radioGroups.has(name)) radioGroups.set(name, []);
            radioGroups.get(name).push(radio);
        }));
        return radioGroups;
    }
    document.addEventListener("selectCallback", (function(e) {
        const currentSelect = e.detail.select;
        console.log("Select ==>", currentSelect, "Value ==>", currentSelect.value);
    }));
    ce.bind("[data-fancybox]", {});
    window["FLS"] = false;
    isWebp();
    menuInit();
    spollers();
    tabs();
    formQuantity();
    headerScroll();
})();