/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(7);
	__webpack_require__(9);
	__webpack_require__(12);
	__webpack_require__(15);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	riot.tag2('autocomplete', '<input type="text" name="_input" class="input" onkeydown="{handleArrowKeys}" onkeyup="{filterOptions}" onfocus="{showOptions}" onblur="{hideOptions}" placeholder="{opts.placeholder}"> <ul class="menu" name="_optionList" if="{shouldShowOptions && filteredCount()}"> <li class="menu-item {active: index == active}" each="{option, index in filtered}" onmouseover="{hoverOption}" onmousedown="{chooseCurrent}">{option.text} </li> </ul>', '', 'class="{focus: document.hasFocus() && _input === document.activeElement}"', function (opts) {
	    var _this = this;

	    __webpack_require__(2);

	    var keycode = __webpack_require__(6);

	    this.active = 0;
	    this.filtered = (this.opts.options || []).filter(opt => {
	        return !_this.opts.filter || _this.opts.filter(opt);
	    });

	    this.filteredCount = () => _this.filtered.length;

	    this.hoverOption = e => {
	        !_this.hoverLocked && (_this.active = e.item.index);
	    };

	    this.reset = () => {
	        _this._input.value = '';
	        _this.selected = null;
	        _this.filterOptions();
	        _this.hideOptions();
	    };

	    this.hideOptions = () => {
	        _this.shouldShowOptions = false;
	    };

	    this.showOptions = () => {
	        if (!_this.shouldShowOptions) _this.active = 0;

	        _this.shouldShowOptions = true;
	    };

	    this.filterOptions = e => {
	        var keyCode = e ? e.keyCode : -1 || -1;

	        switch (keyCode) {
	            case keycode('LEFT'):
	            case keycode('RIGHT'):
	                return true;

	            case keycode('ESC'):
	            case keycode('ENTER'):
	                _this.hideOptions();
	                return true;

	            case keycode('DOWN'):
	            case keycode('UP'):
	                _this.showOptions();
	                return true;
	        }

	        var queryRegex = new RegExp(`(^|\\s)${ _this._input.value.trim() }`, 'i');

	        _this.filtered = (_this.opts.options || []).filter(opt => queryRegex.test(opt.text) && (!_this.opts.filter || _this.opts.filter(opt)));

	        _this.active = 0;
	        _this.showOptions();

	        return true;
	    };

	    this.chooseCurrent = () => {
	        var chosen = _this.filtered[_this.active];

	        _this._input.value = chosen.text;

	        if (_this.opts.onchange && _this.selected != chosen) _this.opts.onchange(chosen);

	        _this.selected = chosen;

	        _this.hideOptions();
	        _this.update();
	    };

	    this.handleArrowKeys = e => {
	        switch (e.keyCode) {
	            case keycode('DOWN'):
	                _this.lockHover();
	                e.preventDefault();
	                _this.active = Math.min(_this.active + 1, _this.filteredCount() - 1);
	                return false;

	            case keycode('UP'):
	                _this.lockHover();
	                e.preventDefault();
	                _this.active = Math.max(0, _this.active - 1);
	                return false;

	            case keycode('ENTER'):
	                _this.chooseCurrent();
	                return true;
	        }

	        return true;
	    };

	    this.lockHover = () => {
	        var _unlockHover = () => {
	            _this.hoverLocked = false;
	            window.removeEventListener('mousemove', _unlockHover);
	        };

	        window.addEventListener('mousemove', _unlockHover);
	        _this.hoverLocked = true;
	    };

	    this.on('updated', () => {
	        // Scroll options
	        var selectedOption = _this._optionList.querySelector('.active');

	        if (!selectedOption) return;

	        var optsHeight = _this._optionList.offsetHeight;
	        var scrollTop = _this._optionList.scrollTop;
	        var selOffset = selectedOption.offsetTop;
	        var selHeight = selectedOption.offsetHeight;

	        if (selOffset + selHeight > scrollTop + optsHeight) _this._optionList.scrollTop += selOffset + selHeight - scrollTop - optsHeight;

	        if (selOffset <= scrollTop) _this._optionList.scrollTop = selOffset;
	    });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./autocomplete.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./autocomplete.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "autocomplete {\n  display: block;\n  position: relative;\n}\nautocomplete .menu {\n  position: absolute;\n  left: 0;\n  top: 100%;\n  margin: 0;\n  padding: 0;\n  background-color: #fff;\n  max-height: 230px;\n  width: calc(100% + 14px);\n  overflow-y: hidden;\n  z-index: 99;\n  border: 1px solid #ccc;\n  border-top: 0;\n}\nautocomplete .menu-item {\n  padding: 7px;\n}\nautocomplete .menu-item:hover {\n  background-color: transparent;\n}\nautocomplete .menu-item.active {\n  background-color: #eee;\n}\nautocomplete .input {\n  outline: none;\n  width: 100%;\n  padding: 7px;\n  font-size: 1em;\n  border: 1px solid #ccc;\n}\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	// Source: http://jsfiddle.net/vWx8V/
	// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

	/**
	 * Conenience method returns corresponding value for given keyName or keyCode.
	 *
	 * @param {Mixed} keyCode {Number} or keyName {String}
	 * @return {Mixed}
	 * @api public
	 */

	exports = module.exports = function(searchInput) {
	  // Keyboard Events
	  if (searchInput && 'object' === typeof searchInput) {
	    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
	    if (hasKeyCode) searchInput = hasKeyCode
	  }

	  // Numbers
	  if ('number' === typeof searchInput) return names[searchInput]

	  // Everything else (cast to string)
	  var search = String(searchInput)

	  // check codes
	  var foundNamedKey = codes[search.toLowerCase()]
	  if (foundNamedKey) return foundNamedKey

	  // check aliases
	  var foundNamedKey = aliases[search.toLowerCase()]
	  if (foundNamedKey) return foundNamedKey

	  // weird character?
	  if (search.length === 1) return search.charCodeAt(0)

	  return undefined
	}

	/**
	 * Get by name
	 *
	 *   exports.code['enter'] // => 13
	 */

	var codes = exports.code = exports.codes = {
	  'backspace': 8,
	  'tab': 9,
	  'enter': 13,
	  'shift': 16,
	  'ctrl': 17,
	  'alt': 18,
	  'pause/break': 19,
	  'caps lock': 20,
	  'esc': 27,
	  'space': 32,
	  'page up': 33,
	  'page down': 34,
	  'end': 35,
	  'home': 36,
	  'left': 37,
	  'up': 38,
	  'right': 39,
	  'down': 40,
	  'insert': 45,
	  'delete': 46,
	  'command': 91,
	  'right click': 93,
	  'numpad *': 106,
	  'numpad +': 107,
	  'numpad -': 109,
	  'numpad .': 110,
	  'numpad /': 111,
	  'num lock': 144,
	  'scroll lock': 145,
	  'my computer': 182,
	  'my calculator': 183,
	  ';': 186,
	  '=': 187,
	  ',': 188,
	  '-': 189,
	  '.': 190,
	  '/': 191,
	  '`': 192,
	  '[': 219,
	  '\\': 220,
	  ']': 221,
	  "'": 222
	}

	// Helper aliases

	var aliases = exports.aliases = {
	  'windows': 91,
	  '⇧': 16,
	  '⌥': 18,
	  '⌃': 17,
	  '⌘': 91,
	  'ctl': 17,
	  'control': 17,
	  'option': 18,
	  'pause': 19,
	  'break': 19,
	  'caps': 20,
	  'return': 13,
	  'escape': 27,
	  'spc': 32,
	  'pgup': 33,
	  'pgdn': 33,
	  'ins': 45,
	  'del': 46,
	  'cmd': 91
	}


	/*!
	 * Programatically add the following
	 */

	// lower case chars
	for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

	// numbers
	for (var i = 48; i < 58; i++) codes[i - 48] = i

	// function keys
	for (i = 1; i < 13; i++) codes['f'+i] = i + 111

	// numpad keys
	for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

	/**
	 * Get by code
	 *
	 *   exports.name[13] // => 'Enter'
	 */

	var names = exports.names = exports.title = {} // title for backward compat

	// Create reverse mapping
	for (i in codes) names[codes[i]] = i

	// Add aliases
	for (var alias in aliases) {
	  codes[alias] = aliases[alias]
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	riot.tag2('connectable', '<div onmousedown="{startDrawing}" style="position: relative"> <yield></yield> </div> <div if="{drawing}" name="_svgContainer" class="svg-container"> <svg height="100%" width="100%"> <path name="_connectionLine" stroke="{color}" stroke-width="2" fill="none" d=""></path> <circle name="_circleOrigin" r="4" fill="{color}"></circle> <circle name="_circleTarget" r="4" fill="{color}"></circle> </svg> </div>', 'connectable,[riot-tag="connectable"],[data-is="connectable"]{ cursor: crosshair; display: block; } connectable .svg-container,[riot-tag="connectable"] .svg-container,[data-is="connectable"] .svg-container{ z-index: 800; width: 100%; height: 100%; position: fixed; top: 0; left: 0 }', '', function (opts) {
	    var _this = this;

	    var endDrawingEvent = 'connectable:endDrawing';
	    var offset = __webpack_require__(8).offset;

	    window.__connectableEventBus = window.__connectableEventBus || riot.observable({});

	    this.showOverlay = false;
	    this.drawing = false;
	    this.color = opts.color || 'rgba(0,180,0,.8)';

	    this.onconnect = this.opts.onconnect || (resolve => resolve());

	    this.drawLine = event => {
	        event.stopImmediatePropagation();

	        var to = {
	            x: event.clientX,
	            y: event.clientY
	        };

	        _this._connectionLine.setAttribute('d', `M ${ _this.from.x } ${ _this.from.y } q ${ to.x - _this.from.x } 0 ${ to.x - _this.from.x } ${ to.y - _this.from.y }`);
	        _this._circleOrigin.setAttribute('cx', _this.from.x);
	        _this._circleOrigin.setAttribute('cy', _this.from.y);
	        _this._circleTarget.setAttribute('cx', to.x);
	        _this._circleTarget.setAttribute('cy', to.y);
	    };

	    this.followScroll = event => {
	        _this._svgContainer.style.marginTop = `${ _this.from.scrollY - window.scrollY }px`;
	    };

	    this.startDrawing = event => {
	        if (/^(TEXTAREA|INPUT)$/.test(event.target.nodeName) && !event.target.getAttribute('disabled')) return;

	        window.__connectableOrigin = _this;

	        _this.from = {
	            x: event.clientX,
	            y: event.clientY,
	            scrollY: window.scrollY
	        };

	        var showDrawTimeout = setTimeout(() => {
	            _this.drawing = true;
	            _this.update();
	        }, 200); // Draw delay in milliseconds

	        var tag = _this;

	        window.addEventListener('scroll', _this.followScroll);
	        window.addEventListener('mousemove', _this.drawLine);
	        window.addEventListener('mouseup', function winMouseup(e) {
	            e.stopImmediatePropagation();

	            clearTimeout(showDrawTimeout);
	            window.removeEventListener('mousemove', tag.drawLine);
	            window.removeEventListener('mouseup', winMouseup);

	            // Discard draw if no target is found
	            var discardDrawTimeout = setTimeout(tag.discardDraw, 100);

	            window.__connectableEventBus.trigger(endDrawingEvent, e, discardDrawTimeout);
	        });
	    };

	    this.endDrawing = e => {
	        var tag = _this;

	        var origin = window.__connectableOrigin;
	        var originAboveTarget = offset(_this.root).top > offset(origin.root).top;

	        function propagateConnection(resolve) {
	            if (originAboveTarget) {
	                origin.onconnect(resolve, origin, tag, e);
	            } else {
	                tag.onconnect(resolve, tag, origin, e);
	            }
	        }

	        if (tag === origin) origin.discardDraw();else new Promise(propagateConnection).then(origin.discardDraw);
	    };

	    this.discardDraw = () => {
	        window.removeEventListener('scroll', _this.followScroll);

	        _this._svgContainer.style.marginTop = 0;

	        _this.drawing = false;
	        _this.update();
	    };

	    this.thirdEndDrawingHandler = (e, discardDrawTimeout) => {
	        var elemOffset = offset(_this.root);

	        if (!offset) return;

	        var offsetTop = elemOffset.top;

	        var minY = offsetTop;
	        var maxY = offsetTop + _this.root.offsetHeight;

	        if (e.pageY > minY && e.pageY < maxY) {
	            clearTimeout(discardDrawTimeout);
	            _this.endDrawing(e);
	        }
	    };

	    window.__connectableEventBus.on(endDrawingEvent, this.thirdEndDrawingHandler);
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = {
	    offset: function (elem, options) {
	        var docElem;
	        var rect;
	        var doc;

	        if (!elem) {
	            return;
	        }

	        rect = elem.getBoundingClientRect();

	        // Make sure element is not hidden (display: none) or disconnected
	        if (rect.width || rect.height || elem.getClientRects().length) {
	            doc = elem.ownerDocument;
	            docElem = doc.documentElement;

	            return {
	                top: rect.top + window.pageYOffset - docElem.clientTop,
	                left: rect.left + window.pageXOffset - docElem.clientLeft
	            };
	        }
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	riot.tag2('toggle-switch', '<div class="switch {checked: active}"> <div class="ball"></div> </div> <div class="label"> <yield></yield> </div>', '', 'onclick="{action}"', function (opts) {
	    var _this = this;

	    __webpack_require__(10);

	    this.active = this.opts.active;

	    this.setActive = active => {
	        _this.active = active;
	    };

	    this.action = () => {
	        _this.active = !_this.active;
	        _this.opts.onchange && _this.opts.onchange(_this.active);
	    };
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./toggle-switch.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./toggle-switch.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "toggle-switch {\n  display: table;\n}\ntoggle-switch .switch,\ntoggle-switch .label {\n  vertical-align: middle;\n  display: table-cell;\n}\ntoggle-switch .label {\n  padding-left: 10px;\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  cursor: default;\n}\ntoggle-switch .switch {\n  background: #ddd;\n  width: 48px;\n  height: 24px;\n  border-radius: 12px;\n}\ntoggle-switch .switch > .ball {\n  float: left;\n}\ntoggle-switch .switch.checked {\n  background: #32cd32;\n}\ntoggle-switch .switch.checked > .ball {\n  float: right;\n}\ntoggle-switch .ball {\n  background: #fff;\n  border-radius: 50%;\n  height: 20px;\n  width: 20px;\n  margin: 2px;\n}\n", ""]);

	// exports


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	riot.tag2('floating-menu', '<div class="target" onclick="{toggle}"> <yield></yield> </div> <ul class="options" each="{open ? [1] : []}"> <li each="{option in getOptions()}" onclick="{action}">{option.name}</li> </ul>', '', '', function (opts) {
	    var _this = this;

	    __webpack_require__(13);

	    var offset = __webpack_require__(8).offset;
	    var actions = {
	        CLOSE_OTHERS: "floating-menu:close-others"
	    };

	    window.__floatingMenuEventBus = window.__floatingMenuEventBus || riot.observable({});

	    this.open = false;
	    this.id = Math.random();

	    this.getOptions = () => {
	        return _this.open ? _this.opts.options : [];
	    };

	    this.action = e => {
	        _this.hideMenu();
	        e.item.option.action && e.item.option.action();
	    };

	    this.hideMenu = () => {
	        _this.open = false;
	        window.removeEventListener('click', _this.hideMenu);
	        _this.update();
	    };

	    this.toggle = event => {
	        _this.open = !_this.open;

	        if (_this.open) {
	            window.addEventListener('click', _this.hideMenu);
	            window.__floatingMenuEventBus.trigger(actions.CLOSE_OTHERS, _this.id);
	        }

	        event.stopPropagation();
	    };

	    window.__floatingMenuEventBus.on(actions.CLOSE_OTHERS, callerId => {
	        if (callerId != _this.id && _this.open) {
	            _this.hideMenu();
	            _this.update();
	        }
	    });
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./floating-menu.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./floating-menu.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "floating-menu {\n  display: block;\n}\nfloating-menu .target {\n  display: inline;\n  cursor: default;\n}\nfloating-menu .options {\n  background: #fff;\n  box-shadow: 1px 1px 20px rgba(0,0,0,0.4);\n  position: absolute;\n  z-index: 999;\n  width: 200px;\n  padding: 1px;\n  margin: 0;\n}\nfloating-menu .options li {\n  list-style: none;\n  color: #333;\n  padding: 10px 20px;\n  cursor: pointer;\n  text-align: left;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\nfloating-menu .options li:hover {\n  background: #e4e4e4;\n}\n", ""]);

	// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	riot.tag2('editable-text', '<div class="editable-container" ondblclick="{enableEditing}"> <textarea if="{editing}" name="_editable" class="textarea" onkeydown="{handleInput}" onblur="{cancelEditing}" type="text" placeholder="{opts.placeholder}">{content}</textarea> <div name="_static" class="static-text {editing: editing}">{content}</div> </div>', '', '', function (opts) {
	    var _this = this;

	    __webpack_require__(16);

	    var keycode = __webpack_require__(6);

	    this.editing = false;
	    this.content = this.opts.content;

	    this.resizeTextarea = () => {
	        _this._static.innerText = _this._editable.value || 'x';
	        _this._editable.style.height = _this._static.offsetHeight + 'px';
	        _this._static.innerText = _this._editable.value || '';
	    };

	    this.enableEditing = () => {
	        if (_this.editing) return;

	        _this.update({ editing: true });
	        _this._editable.focus();

	        // place the cursor at the end of the text field
	        _this._editable.value = '';
	        _this._editable.value = _this.content;

	        _this.resizeTextarea();
	    };

	    this.saveEditing = options => {
	        _this.content = _this._editable.value;
	        _this.opts.oncontentchange && _this.opts.oncontentchange(_this.content);

	        _this.editing = false;
	        _this.update();
	    };

	    this.cancelEditing = () => {
	        _this.editing = false;
	    };

	    this.handleInput = e => {
	        switch (e.keyCode) {
	            case keycode('enter'):
	                _this.saveEditing();
	                _this.resizeTextarea();
	                return false;

	            case keycode('esc'):
	                _this.cancelEditing();
	                _this.resizeTextarea();
	                return false;
	        }

	        _this.resizeTextarea();

	        return true;
	    };
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./editable-text.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./editable-text.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "editable-text .editable-container {\n  position: relative;\n  display: block;\n}\neditable-text .static-text {\n  background: transparent !important;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\neditable-text .static-text.editing {\n  opacity: 0;\n  position: absolute;\n  width: 100%;\n  top: 0;\n  left: 0;\n}\neditable-text .textarea {\n  font-family: sans-serif;\n  font-size: 1em;\n  color: inherit;\n  box-shadow: none !important;\n  outline: none !important;\n  padding: 0;\n  resize: none;\n  width: 100%;\n  display: block;\n  border: 0.5em solid transparent !important;\n  margin: -0.5em;\n  background: rgba(0,0,0,0.1);\n  overflow: hidden;\n}\n", ""]);

	// exports


/***/ }
/******/ ]);