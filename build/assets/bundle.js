/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/modules/custom-select.js":
/*!**********************************************!*\
  !*** ./src/scripts/modules/custom-select.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var custom_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! custom-select */ "./node_modules/custom-select/build/index.js");

const items = document.querySelectorAll(".custom-select");
if (items) {
  items.forEach(item => {
    (0,custom_select__WEBPACK_IMPORTED_MODULE_0__["default"])(item);
  });
  const firstItems = document.querySelectorAll(".custom-select-panel .custom-select-option:first-child");
  firstItems.forEach(it => {
    if (!it.parentNode.previousElementSibling.classList.contains("custom-pagination-select")) {
      it.innerHTML = "Не выбрано";
    }
  });
}
const pagSelect = document.querySelector(".lw-pagination-select");
if (pagSelect) {
  const options = pagSelect.querySelectorAll(".custom-select-option");
  const panel = pagSelect.querySelector(".custom-select-panel");
  const height = options[0].offsetHeight * options.length + 2 > 172 ? 172 : options[0].offsetHeight * options.length + 2;
  panel.style.top = `-${height}px`;
  console.log(options.length);
}

/***/ }),

/***/ "./src/scripts/modules/lw-checkbox-group-selecter.js":
/*!***********************************************************!*\
  !*** ./src/scripts/modules/lw-checkbox-group-selecter.js ***!
  \***********************************************************/
/***/ (() => {

document.addEventListener("DOMContentLoaded", function () {
  const selecters = document.querySelectorAll(".lw-checkbox-group-head-control input");
  if (!selecters.length) return;
  selecters.forEach(selecter => {
    if (!selecter) return;
    const onClickToggleCheckboxes = evt => {
      const target = evt.target;
      const group = target.closest('.lw-checkbox-group__header').nextElementSibling;
      group.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        if (target.checked) {
          checkbox.checked = true;
          const checkboxes = group.querySelectorAll('input[type="checkbox"]');
          const onClickChangeMainCheckboxState = () => {
            target.checked = false;
            checkboxes.forEach(checkbox => {
              checkbox.removeEventListener('change', onClickChangeMainCheckboxState);
            });
          };
          checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', onClickChangeMainCheckboxState);
          });
        } else {
          checkbox.checked = false;
        }
      });
    };
    selecter.addEventListener('change', onClickToggleCheckboxes);
  });
  const ctrls = document.querySelectorAll('.lw-control-group input[type="checkbox"]:not(.lw-checkbox-group-head-control input[type="checkbox"])');
  if (!ctrls.length) return;
  const onChangeSetHeadControlActive = evt => {
    const group = evt.target.closest('.lw-control-group');
    const checkboxes = group.querySelectorAll('input[type="checkbox"]');
    const checkedCheckboxes = group.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length === checkedCheckboxes.length) {
      group.previousElementSibling.querySelector('input[type="checkbox"]').checked = true;
    } else {
      group.previousElementSibling.querySelector('input[type="checkbox"]').checked = false;
    }
  };
  ctrls.forEach(ctrl => {
    ctrl.addEventListener('change', onChangeSetHeadControlActive);
  });
});

/***/ }),

/***/ "./src/scripts/modules/lw-fw-btn.js":
/*!******************************************!*\
  !*** ./src/scripts/modules/lw-fw-btn.js ***!
  \******************************************/
/***/ (() => {

const favs = document.querySelectorAll(".lw-fv-btn");
if (favs.length) {
  favs.forEach(f => {
    f.addEventListener("click", evt => {
      evt.currentTarget.classList.toggle("active");
    });
  });
}

/***/ }),

/***/ "./src/scripts/modules/lw-multiple-checker.js":
/*!****************************************************!*\
  !*** ./src/scripts/modules/lw-multiple-checker.js ***!
  \****************************************************/
/***/ (() => {

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".lw-multiple-checker");
  if (!items.length) return;
  const openers = document.querySelectorAll(".lw-multiple-checker-panel");
  let activePanel = null;
  const closeAllPanels = () => {
    openers.forEach(opener => {
      opener.classList.contains('is-open') ? opener.classList.remove('is-open') : null;
    });
  };
  const onClickSetActivePanel = evt => {
    if (activePanel === null) activePanel = evt.target;
    if (evt.target.classList.contains('lw-multiple-checker-panel')) {
      if (activePanel !== evt.target) {
        closeAllPanels();
        activePanel = evt.target;
      }
      activePanel.classList.toggle("is-open");
    }
  };
  openers.forEach(opener => {
    opener.addEventListener("click", onClickSetActivePanel);
  });
  let labels = document.querySelectorAll(".lw-multiple-checker label");
  const addLabelToPanel = (target, container) => {
    const panel = container.parentNode.querySelector('.lw-multiple-checker-panel.is-open');
    const control = container.querySelector(`input[id="${target.getAttribute('for')}"]`);
    if (!control.checked) {
      const label = document.createElement("label");
      label.setAttribute('for', target.getAttribute('for'));
      label.innerHTML = target.innerHTML;
      activePanel.appendChild(label);
      label.addEventListener('click', onClickFillLabel);
    } else {
      removeLabelFromPanel(target, panel);
    }
  };
  removeLabelFromPanel = (target, panel) => {
    setTimeout(() => {
      const elem = panel.querySelector(`label[for="${target.getAttribute('for')}"]`);
      panel.removeChild(elem);
    }, 0);
  };
  const onClickFillLabel = evt => {
    const parent = evt.currentTarget.parentNode;
    if (parent.classList.contains('lw-multiple-checker-container')) {
      addLabelToPanel(evt.currentTarget, parent);
    }
    if (parent.classList.contains('lw-multiple-checker-panel')) {
      removeLabelFromPanel(evt.currentTarget, parent);
    }
  };
  labels.forEach(label => {
    label.addEventListener('click', onClickFillLabel);
  });
  const onOverlayClickClosePanels = evt => {
    if (activePanel && activePanel.classList.contains('is-open')) {
      const activeContainer = activePanel.nextElementSibling;
      if (!activePanel.contains(evt.target) && !activeContainer.contains(evt.target)) {
        closeAllPanels();
        activePanel = null;
      }
    }
  };
  document.addEventListener('click', onOverlayClickClosePanels, true);
});

/***/ }),

/***/ "./src/scripts/modules/lw-object-list.js":
/*!***********************************************!*\
  !*** ./src/scripts/modules/lw-object-list.js ***!
  \***********************************************/
/***/ (() => {

const btns = document.querySelectorAll(".object-station-list-btn");
if (btns.length) {
  btns.forEach(btn => {
    btn.addEventListener("click", evt => {
      const list = evt.currentTarget.previousElementSibling;
      if (list) {
        const items = list.querySelectorAll("li");
        if (!list.classList.contains("expanded")) {
          items.forEach(item => {
            item.classList.contains("object-station-list-item--hidden") ? item.classList.remove("object-station-list-item--hidden") : null;
          });
          list.classList.add("expanded");
          evt.currentTarget.innerHTML = "Свернуть";
        } else {
          items.forEach((item, index) => {
            if (index > 1) {
              !item.classList.contains("object-station-list-item--hidden") ? item.classList.add("object-station-list-item--hidden") : null;
            }
          });
          list.classList.remove("expanded");
          evt.currentTarget.innerHTML = "Показать еще...";
        }
      }
    });
  });
}

/***/ }),

/***/ "./src/scripts/modules/y-maps-opener.js":
/*!**********************************************!*\
  !*** ./src/scripts/modules/y-maps-opener.js ***!
  \**********************************************/
/***/ (() => {

const opener = document.querySelector(".ymaps-opener");
const map = document.querySelector(".objects__map");
if (opener && map) {
  opener.addEventListener("click", () => {
    map.classList.toggle("is-open");
  });
}

/***/ }),

/***/ "./src/scripts/modules/yMaps.js":
/*!**************************************!*\
  !*** ./src/scripts/modules/yMaps.js ***!
  \**************************************/
/***/ (() => {

const map = document.querySelector("#yMaps");
if (map) {
  const centerCoords = [59.90297506420561, 30.39827949999997];
  let myMap = null;
  window.addEventListener("load", () => {
    ymaps.ready(init);
  });
  function init() {
    // Создание карты.
    myMap = new ymaps.Map("yMaps", {
      center: centerCoords,
      zoom: 17,
      controls: [],
      behaviors: ["drag"]
    });
    const MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div class="ymaps-icon-content-layout">$[properties.iconContent]</div>');

    // Метка
    const officePlacemark = new ymaps.Placemark([59.90297506420561, 30.39827949999997], {
      iconContent: "Завод металических дверей"
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: "default#imageWithContent",
      // Своё изображение иконки метки.
      iconImageHref: "assets/img/icon-pin.svg",
      // Размеры метки.
      iconImageSize: [26, 40],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-13, -20],
      iconContentOffset: [20, 15],
      iconContentLayout: MyIconContentLayout
    });
    myMap.geoObjects.add(officePlacemark);

    // ZOOM-CONTROL
    let ZoomLayout = ymaps.templateLayoutFactory.createClass(
    //Шаблон html кнопок зума
    "<div class='zoom-btns'>" + "<button id='zoom-in' class='zoom-btn zoom-btn-in' aria-label='Увеличить масштаб'>" + "<svg width='14' height='14'>" + "<use xlink:href='./assets/sprite.svg#icon-zoom-in'>" + "</svg>" + "</button>" + "<button id='zoom-out' class='zoom-btn zoom-btn-out' aria-label='Уменьшить масштаб'>" + "<svg width='14' height='2'>" + "<use xlink:href='./assets/sprite.svg#icon-zoom-out'>" + "</svg>" + "</button>" + "</div>", {
      // Переопределяем методы макета, чтобы выполнять дополнительные действия
      // при построении и очистке макета.
      build: function () {
        // Вызываем родительский метод build.
        ZoomLayout.superclass.build.call(this);

        // Привязываем функции-обработчики к контексту и сохраняем ссылки
        // на них, чтобы потом отписаться от событий.
        this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
        this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

        // Начинаем слушать клики на кнопках макета.
        let zoomInBtn = document.getElementById("zoom-in");
        let zoomOutBtn = document.getElementById("zoom-out");
        zoomInBtn.addEventListener("click", this.zoomInCallback);
        zoomOutBtn.addEventListener("click", this.zoomOutCallback);
      },
      clear: function () {
        // Снимаем обработчики кликов.
        zoomInBtn.removeEventListener("click", this.zoomInCallback);
        zoomOutBtn.removeEventListener("click", this.zoomOutCallback);
        // Вызываем родительский метод clear.
        ZoomLayout.superclass.clear.call(this);
      },
      zoomIn: function () {
        myMap.balloon.close();
        let map = this.getData().control.getMap();
        map.setZoom(map.getZoom() + 1, {
          checkZoomRange: true
        });
      },
      zoomOut: function () {
        myMap.balloon.close();
        let map = this.getData().control.getMap();
        map.setZoom(map.getZoom() - 1, {
          checkZoomRange: true
        });
      }
    });
    let zoomControl = new ymaps.control.ZoomControl({
      options: {
        layout: ZoomLayout,
        position: {
          right: "30px",
          bottom: "50px"
        }
      }
    });
    myMap.controls.add(zoomControl);
  }
}

/***/ }),

/***/ "./node_modules/custom-event-polyfill/custom-event-polyfill.js":
/*!*********************************************************************!*\
  !*** ./node_modules/custom-event-polyfill/custom-event-polyfill.js ***!
  \*********************************************************************/
/***/ (() => {

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
} catch(e) {
  var CustomEvent = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          }
        });
      } catch(e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}


/***/ }),

/***/ "./node_modules/custom-select/build/index.js":
/*!***************************************************!*\
  !*** ./node_modules/custom-select/build/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * custom-select
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * A lightweight JS script for custom select creation.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Needs no dependencies.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * v0.0.1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * (https://github.com/custom-select/custom-select)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright (c) 2016 Gionatan Lombardi & Marco Nucara
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * MIT License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

exports["default"] = customSelect;

__webpack_require__(/*! custom-event-polyfill */ "./node_modules/custom-event-polyfill/custom-event-polyfill.js");

var defaultParams = {
  containerClass: 'custom-select-container',
  openerClass: 'custom-select-opener',
  panelClass: 'custom-select-panel',
  optionClass: 'custom-select-option',
  optgroupClass: 'custom-select-optgroup',
  isSelectedClass: 'is-selected',
  hasFocusClass: 'has-focus',
  isDisabledClass: 'is-disabled',
  isOpenClass: 'is-open'
};

function builder(el, builderParams) {
  var containerClass = 'customSelect';
  var isOpen = false;
  var uId = '';
  var select = el;
  var container = void 0;
  var opener = void 0;
  var focusedElement = void 0;
  var selectedElement = void 0;
  var panel = void 0;
  var currLabel = void 0;

  var resetSearchTimeout = void 0;
  var searchKey = '';

  //
  // Inner Functions
  //

  // Sets the focused element with the neccessary classes substitutions
  function setFocusedElement(cstOption) {
    if (focusedElement) {
      focusedElement.classList.remove(builderParams.hasFocusClass);
    }
    if (typeof cstOption !== 'undefined') {
      focusedElement = cstOption;
      focusedElement.classList.add(builderParams.hasFocusClass);
      // Offset update: checks if the focused element is in the visible part of the panelClass
      // if not dispatches a custom event
      if (isOpen) {
        if (cstOption.offsetTop < cstOption.offsetParent.scrollTop || cstOption.offsetTop > cstOption.offsetParent.scrollTop + cstOption.offsetParent.clientHeight - cstOption.clientHeight) {
          cstOption.dispatchEvent(new CustomEvent('custom-select:focus-outside-panel', { bubbles: true }));
        }
      }
    } else {
      focusedElement = undefined;
    }
  }

  // Reassigns the focused and selected custom option
  // Updates the opener text
  // IMPORTANT: the setSelectedElement function doesn't change the select value!
  function setSelectedElement(cstOption) {
    if (selectedElement) {
      selectedElement.classList.remove(builderParams.isSelectedClass);
      selectedElement.removeAttribute('id');
      opener.removeAttribute('aria-activedescendant');
    }
    if (typeof cstOption !== 'undefined') {
      cstOption.classList.add(builderParams.isSelectedClass);
      cstOption.setAttribute('id', containerClass + '-' + uId + '-selectedOption');
      opener.setAttribute('aria-activedescendant', containerClass + '-' + uId + '-selectedOption');
      selectedElement = cstOption;
      opener.children[0].textContent = selectedElement.customSelectOriginalOption.text;
    } else {
      selectedElement = undefined;
      opener.children[0].textContent = '';
    }
    setFocusedElement(cstOption);
  }

  function setValue(value) {
    // Gets the option with the provided value
    var toSelect = select.querySelector('option[value=\'' + value + '\']');
    // If no option has the provided value get the first
    if (!toSelect) {
      var _select$options = _slicedToArray(select.options, 1);

      toSelect = _select$options[0];
    }
    // The option with the provided value becomes the selected one
    // And changes the select current value
    toSelect.selected = true;

    setSelectedElement(select.options[select.selectedIndex].customSelectCstOption);
  }

  function moveFocuesedElement(direction) {
    // Get all the .custom-select-options
    // Get the index of the current focused one
    var currentFocusedIndex = [].indexOf.call(select.options, focusedElement.customSelectOriginalOption);
    // If the next or prev custom option exist
    // Sets it as the new focused one
    if (select.options[currentFocusedIndex + direction]) {
      setFocusedElement(select.options[currentFocusedIndex + direction].customSelectCstOption);
    }
  }

  // Open/Close function (toggle)
  function open(bool) {
    // Open
    if (bool || typeof bool === 'undefined') {
      // If present closes an opened instance of the plugin
      // Only one at time can be open
      var openedCustomSelect = document.querySelector('.' + containerClass + '.' + builderParams.isOpenClass);
      if (openedCustomSelect) {
        openedCustomSelect.customSelect.open = false;
      }

      // Opens only the clicked one
      container.classList.add(builderParams.isOpenClass);

      // aria-expanded update
      container.classList.add(builderParams.isOpenClass);
      opener.setAttribute('aria-expanded', 'true');

      // Updates the scrollTop position of the panel in relation with the focused option
      if (selectedElement) {
        panel.scrollTop = selectedElement.offsetTop;
      }

      // Dispatches the custom event open
      container.dispatchEvent(new CustomEvent('custom-select:open'));

      // Sets the global state
      isOpen = true;

      // Close
    } else {
      // Removes the css classes
      container.classList.remove(builderParams.isOpenClass);

      // aria-expanded update
      opener.setAttribute('aria-expanded', 'false');

      // Sets the global state
      isOpen = false;

      // When closing the panel the focused custom option must be the selected one
      setFocusedElement(selectedElement);

      // Dispatches the custom event close
      container.dispatchEvent(new CustomEvent('custom-select:close'));
    }
    return isOpen;
  }

  function clickEvent(e) {
    // Opener click
    if (e.target === opener || opener.contains(e.target)) {
      if (isOpen) {
        open(false);
      } else {
        open();
      }
      // Custom Option click
    } else if (e.target.classList && e.target.classList.contains(builderParams.optionClass) && panel.contains(e.target)) {
      setSelectedElement(e.target);
      // Sets the corrisponding select's option to selected updating the select's value too
      selectedElement.customSelectOriginalOption.selected = true;
      open(false);
      // Triggers the native change event of the select
      select.dispatchEvent(new CustomEvent('change'));
      // click on label or select (click on label corrispond to select click)
    } else if (e.target === select) {
      // if the original select is focusable (for any external reason) let the focus
      // else trigger the focus on opener
      if (opener !== document.activeElement && select !== document.activeElement) {
        opener.focus();
      }
      // Click outside the container closes the panel
    } else if (isOpen && !container.contains(e.target)) {
      open(false);
    }
  }

  function mouseoverEvent(e) {
    // On mouse move over and options it bacames the focused one
    if (e.target.classList && e.target.classList.contains(builderParams.optionClass)) {
      setFocusedElement(e.target);
    }
  }

  function keydownEvent(e) {
    if (!isOpen) {
      // On "Arrow down", "Arrow up" and "Space" keys opens the panel
      if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 32) {
        open();
      }
    } else {
      switch (e.keyCode) {
        case 13:
        case 32:
          // On "Enter" or "Space" selects the focused element as the selected one
          setSelectedElement(focusedElement);
          // Sets the corrisponding select's option to selected updating the select's value too
          selectedElement.customSelectOriginalOption.selected = true;
          // Triggers the native change event of the select
          select.dispatchEvent(new CustomEvent('change'));
          open(false);
          break;
        case 27:
          // On "Escape" closes the panel
          open(false);
          break;

        case 38:
          // On "Arrow up" set focus to the prev option if present
          moveFocuesedElement(-1);
          break;
        case 40:
          // On "Arrow down" set focus to the next option if present
          moveFocuesedElement(+1);
          break;
        default:
          // search in panel (autocomplete)
          if (e.keyCode >= 48 && e.keyCode <= 90) {
            // clear existing reset timeout
            if (resetSearchTimeout) {
              clearTimeout(resetSearchTimeout);
            }

            // reset timeout for empty search key
            resetSearchTimeout = setTimeout(function () {
              searchKey = '';
            }, 1500);

            // update search keyword appending the current key
            searchKey += String.fromCharCode(e.keyCode);

            // search the element
            for (var i = 0, l = select.options.length; i < l; i++) {
              // removed cause not supported by IE:
              // if (options[i].text.startsWith(searchKey))
              if (select.options[i].text.toUpperCase().substr(0, searchKey.length) === searchKey) {
                setFocusedElement(select.options[i].customSelectCstOption);
                break;
              }
            }
          }
          break;
      }
    }
  }

  function changeEvent() {
    var index = select.selectedIndex;
    var element = index === -1 ? undefined : select.options[index].customSelectCstOption;

    setSelectedElement(element);
  }

  // When the option is outside the visible part of the opened panel, updates the scrollTop position
  // This is the default behaviour
  // To block it the plugin user must
  // add a "custom-select:focus-outside-panel" eventListener on the panel
  // with useCapture set to true
  // and stopPropagation
  function scrollToFocused(e) {
    var currPanel = e.currentTarget;
    var currOption = e.target;
    // Up
    if (currOption.offsetTop < currPanel.scrollTop) {
      currPanel.scrollTop = currOption.offsetTop;
      // Down
    } else {
      currPanel.scrollTop = currOption.offsetTop + currOption.clientHeight - currPanel.clientHeight;
    }
  }

  function addEvents() {
    document.addEventListener('click', clickEvent);
    panel.addEventListener('mouseover', mouseoverEvent);
    panel.addEventListener('custom-select:focus-outside-panel', scrollToFocused);
    select.addEventListener('change', changeEvent);
    container.addEventListener('keydown', keydownEvent);
  }

  function removeEvents() {
    document.removeEventListener('click', clickEvent);
    panel.removeEventListener('mouseover', mouseoverEvent);
    panel.removeEventListener('custom-select:focus-outside-panel', scrollToFocused);
    select.removeEventListener('change', changeEvent);
    container.removeEventListener('keydown', keydownEvent);
  }

  function disabled(bool) {
    if (bool && !select.disabled) {
      container.classList.add(builderParams.isDisabledClass);
      select.disabled = true;
      opener.removeAttribute('tabindex');
      container.dispatchEvent(new CustomEvent('custom-select:disabled'));
      removeEvents();
    } else if (!bool && select.disabled) {
      container.classList.remove(builderParams.isDisabledClass);
      select.disabled = false;
      opener.setAttribute('tabindex', '0');
      container.dispatchEvent(new CustomEvent('custom-select:enabled'));
      addEvents();
    }
  }

  // Form a given select children DOM tree (options and optgroup),
  // Creates the corresponding custom HTMLElements list (divs with different classes and attributes)
  function parseMarkup(children) {
    var nodeList = children;
    var cstList = [];

    if (typeof nodeList.length === 'undefined') {
      throw new TypeError('Invalid Argument');
    }

    for (var i = 0, li = nodeList.length; i < li; i++) {
      if (nodeList[i] instanceof HTMLElement && nodeList[i].tagName.toUpperCase() === 'OPTGROUP') {
        var cstOptgroup = document.createElement('div');
        cstOptgroup.classList.add(builderParams.optgroupClass);
        cstOptgroup.setAttribute('data-label', nodeList[i].label);

        // IMPORTANT: Stores in a property of the created custom option group
        // a hook to the the corrisponding select's option group
        cstOptgroup.customSelectOriginalOptgroup = nodeList[i];

        // IMPORTANT: Stores in a property of select's option group
        // a hook to the created custom option group
        nodeList[i].customSelectCstOptgroup = cstOptgroup;

        var subNodes = parseMarkup(nodeList[i].children);
        for (var j = 0, lj = subNodes.length; j < lj; j++) {
          cstOptgroup.appendChild(subNodes[j]);
        }

        cstList.push(cstOptgroup);
      } else if (nodeList[i] instanceof HTMLElement && nodeList[i].tagName.toUpperCase() === 'OPTION') {
        var cstOption = document.createElement('div');
        cstOption.classList.add(builderParams.optionClass);
        cstOption.textContent = nodeList[i].text;
        cstOption.setAttribute('data-value', nodeList[i].value);
        cstOption.setAttribute('role', 'option');

        // IMPORTANT: Stores in a property of the created custom option
        // a hook to the the corrisponding select's option
        cstOption.customSelectOriginalOption = nodeList[i];

        // IMPORTANT: Stores in a property of select's option
        // a hook to the created custom option
        nodeList[i].customSelectCstOption = cstOption;

        // If the select's option is selected
        if (nodeList[i].selected) {
          setSelectedElement(cstOption);
        }
        cstList.push(cstOption);
      } else {
        throw new TypeError('Invalid Argument');
      }
    }
    return cstList;
  }

  function _append(nodePar, appendIntoOriginal, targetPar) {
    var target = void 0;
    if (typeof targetPar === 'undefined' || targetPar === select) {
      target = panel;
    } else if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTGROUP' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }

    // If the node provided is a single HTMLElement it is stored in an array
    var node = nodePar instanceof HTMLElement ? [nodePar] : nodePar;

    // Injects the options|optgroup in the select
    if (appendIntoOriginal) {
      for (var i = 0, l = node.length; i < l; i++) {
        if (target === panel) {
          select.appendChild(node[i]);
        } else {
          target.customSelectOriginalOptgroup.appendChild(node[i]);
        }
      }
    }

    // The custom markup to append
    var markupToInsert = parseMarkup(node);

    // Injects the created DOM content in the panel
    for (var _i = 0, _l = markupToInsert.length; _i < _l; _i++) {
      target.appendChild(markupToInsert[_i]);
    }

    return node;
  }

  function _insertBefore(node, targetPar) {
    var target = void 0;
    if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTION' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOption;
    } else if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTGROUP' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }

    // The custom markup to append
    var markupToInsert = parseMarkup(node.length ? node : [node]);

    target.parentNode.insertBefore(markupToInsert[0], target);

    // Injects the option or optgroup node in the original select and returns the injected node
    return targetPar.parentNode.insertBefore(node.length ? node[0] : node, targetPar);
  }

  function remove(node) {
    var cstNode = void 0;
    if (node instanceof HTMLElement && node.tagName.toUpperCase() === 'OPTION' && select.contains(node)) {
      cstNode = node.customSelectCstOption;
    } else if (node instanceof HTMLElement && node.tagName.toUpperCase() === 'OPTGROUP' && select.contains(node)) {
      cstNode = node.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }
    cstNode.parentNode.removeChild(cstNode);
    var removedNode = node.parentNode.removeChild(node);
    changeEvent();
    return removedNode;
  }

  function empty() {
    var removed = [];
    while (select.children.length) {
      panel.removeChild(panel.children[0]);
      removed.push(select.removeChild(select.children[0]));
    }
    setSelectedElement();
    return removed;
  }

  function destroy() {
    for (var i = 0, l = select.options.length; i < l; i++) {
      delete select.options[i].customSelectCstOption;
    }
    var optGroup = select.getElementsByTagName('optgroup');
    for (var _i2 = 0, _l2 = optGroup.length; _i2 < _l2; _i2++) {
      delete optGroup.customSelectCstOptgroup;
    }

    removeEvents();

    return container.parentNode.replaceChild(select, container);
  }
  //
  // Custom Select DOM tree creation
  //

  // Creates the container/wrapper
  container = document.createElement('div');
  container.classList.add(builderParams.containerClass, containerClass);

  // Creates the opener
  opener = document.createElement('span');
  opener.className = builderParams.openerClass;
  opener.setAttribute('role', 'combobox');
  opener.setAttribute('aria-autocomplete', 'list');
  opener.setAttribute('aria-expanded', 'false');
  opener.innerHTML = '<span>\n   ' + (select.selectedIndex !== -1 ? select.options[select.selectedIndex].text : '') + '\n   </span>';

  // Creates the panel
  // and injects the markup of the select inside
  // with some tag and attributes replacement
  panel = document.createElement('div');
  // Create random id
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++) {
    uId += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  panel.id = containerClass + '-' + uId + '-panel';
  panel.className = builderParams.panelClass;
  panel.setAttribute('role', 'listbox');
  opener.setAttribute('aria-owns', panel.id);

  _append(select.children, false);

  // Injects the container in the original DOM position of the select
  container.appendChild(opener);
  select.parentNode.replaceChild(container, select);
  container.appendChild(select);
  container.appendChild(panel);

  // ARIA labelledby - label
  if (document.querySelector('label[for="' + select.id + '"]')) {
    currLabel = document.querySelector('label[for="' + select.id + '"]');
  } else if (container.parentNode.tagName.toUpperCase() === 'LABEL') {
    currLabel = container.parentNode;
  }
  if (typeof currLabel !== 'undefined') {
    currLabel.setAttribute('id', containerClass + '-' + uId + '-label');
    opener.setAttribute('aria-labelledby', containerClass + '-' + uId + '-label');
  }

  // Event Init
  if (select.disabled) {
    container.classList.add(builderParams.isDisabledClass);
  } else {
    opener.setAttribute('tabindex', '0');
    select.setAttribute('tabindex', '-1');
    addEvents();
  }

  // Stores the plugin public exposed methods and properties, directly in the container HTMLElement
  container.customSelect = {
    get pluginOptions() {
      return builderParams;
    },
    get open() {
      return isOpen;
    },
    set open(bool) {
      open(bool);
    },
    get disabled() {
      return select.disabled;
    },
    set disabled(bool) {
      disabled(bool);
    },
    get value() {
      return select.value;
    },
    set value(val) {
      setValue(val);
    },
    append: function append(node, target) {
      return _append(node, true, target);
    },
    insertBefore: function insertBefore(node, target) {
      return _insertBefore(node, target);
    },
    remove: remove,
    empty: empty,
    destroy: destroy,
    opener: opener,
    select: select,
    panel: panel,
    container: container
  };

  // Stores the plugin directly in the original select
  select.customSelect = container.customSelect;

  // Returns the plugin instance, with the public exposed methods and properties
  return container.customSelect;
}

function customSelect(element, customParams) {
  // Overrides the default options with the ones provided by the user
  var nodeList = [];
  var selects = [];

  return function init() {
    // The plugin is called on a single HTMLElement
    if (element && element instanceof HTMLElement && element.tagName.toUpperCase() === 'SELECT') {
      nodeList.push(element);
      // The plugin is called on a selector
    } else if (element && typeof element === 'string') {
      var elementsList = document.querySelectorAll(element);
      for (var i = 0, l = elementsList.length; i < l; ++i) {
        if (elementsList[i] instanceof HTMLElement && elementsList[i].tagName.toUpperCase() === 'SELECT') {
          nodeList.push(elementsList[i]);
        }
      }
      // The plugin is called on any HTMLElements list (NodeList, HTMLCollection, Array, etc.)
    } else if (element && element.length) {
      for (var _i3 = 0, _l3 = element.length; _i3 < _l3; ++_i3) {
        if (element[_i3] instanceof HTMLElement && element[_i3].tagName.toUpperCase() === 'SELECT') {
          nodeList.push(element[_i3]);
        }
      }
    }

    // Launches the plugin over every HTMLElement
    // And stores every plugin instance
    for (var _i4 = 0, _l4 = nodeList.length; _i4 < _l4; ++_i4) {
      selects.push(builder(nodeList[_i4], _extends({}, defaultParams, customParams)));
    }

    // Returns all plugin instances
    return selects;
  }();
}

//# sourceMappingURL=index.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_custom_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/custom-select */ "./src/scripts/modules/custom-select.js");
/* harmony import */ var _modules_y_maps_opener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/y-maps-opener */ "./src/scripts/modules/y-maps-opener.js");
/* harmony import */ var _modules_y_maps_opener__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_y_maps_opener__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_yMaps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/yMaps */ "./src/scripts/modules/yMaps.js");
/* harmony import */ var _modules_yMaps__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_yMaps__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_lw_multiple_checker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/lw-multiple-checker */ "./src/scripts/modules/lw-multiple-checker.js");
/* harmony import */ var _modules_lw_multiple_checker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_lw_multiple_checker__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_lw_checkbox_group_selecter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/lw-checkbox-group-selecter */ "./src/scripts/modules/lw-checkbox-group-selecter.js");
/* harmony import */ var _modules_lw_checkbox_group_selecter__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_lw_checkbox_group_selecter__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_lw_object_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/lw-object-list */ "./src/scripts/modules/lw-object-list.js");
/* harmony import */ var _modules_lw_object_list__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_lw_object_list__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_lw_fw_btn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/lw-fw-btn */ "./src/scripts/modules/lw-fw-btn.js");
/* harmony import */ var _modules_lw_fw_btn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_modules_lw_fw_btn__WEBPACK_IMPORTED_MODULE_6__);
// import "./modules/header-menu";







})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map