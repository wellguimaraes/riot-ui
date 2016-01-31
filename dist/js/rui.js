'use strict';

var rui = {
    utils: {
        keycode: {
            ENTER: 13,
            ARROW_DOWN: 40,
            ARROW_UP: 38,
            ARROW_LEFT: 37,
            ARROW_RIGHT: 39,
            BACKSPACE: 8,
            ESC: 27,
            DELETE: 46
        }
    }
};
riot.tag2('autocomplete', '<div class="{focus: _input === document.activeElement}"> <input type="text" name="_input" onkeydown="{handleArrowKeys}" onkeyup="{filterOptions}" onfocus="{showOptions}" onblur="{hideOptions}" placeholder="{opts.placeholder}"> <ul name="_optionList" if="{shouldShowOptions && filteredCount}"> <li each="{option, index in getFilteredOptions()}" class="{highlight: index == highlightIndex}" onmouseover="{hoverOption}" onmousedown="{chooseCurrent}">{option.text} </li> </ul> </div>', '', '', function (opts) {
    var _this = this;

    var keycode = rui.utils.keycode;

    this.options = this.opts.options;

    if (!Array.isArray(this.options)) this.options = Object.keys(this.options).map(function (key) {
        return {
            key: key,
            text: _this.options[key]
        };
    });

    this.shouldShowOptions = false;
    this.highlightIndex = 0;
    this.filteredCount = this.options.length;
    this.filteredOptions = this.options;

    this.hoverOption = function (e) {
        _this.highlightIndex = e.item.index;
    };

    this.hideOptions = function () {
        _this.shouldShowOptions = false;
    };

    this.showOptions = function () {
        if (_this.shouldShowOptions == false) _this.highlightIndex = 0;

        _this.shouldShowOptions = true;
    };

    this.filterOptions = function (e) {
        switch (e.keyCode) {
            case keycode.ESC:
            case keycode.ENTER:
                _this.hideOptions();
                break;

            case keycode.ARROW_LEFT:
            case keycode.ARROW_RIGHT:
                break;

            default:
                _this.showOptions();
                break;
        }

        return true;
    };

    this.chooseCurrent = function () {
        _this._input.value = _this.filteredOptions[_this.highlightIndex].text;
        _this.hideOptions();
        _this.update();
    };

    this.handleArrowKeys = function (e) {
        switch (e.keyCode) {
            case keycode.ARROW_DOWN:
                _this.highlightNext(e);
                return false;

            case keycode.ARROW_UP:
                _this.highlightPrevious(e);
                return false;

            case keycode.ENTER:
                _this.chooseCurrent();
                return true;
        }

        return true;
    };

    this.highlightPrevious = function (e) {
        e.preventDefault();
        _this.highlightIndex = Math.max(0, _this.highlightIndex - 1);
    };

    this.highlightNext = function (e) {
        e.preventDefault();
        _this.highlightIndex = Math.min(_this.highlightIndex + 1, _this.filteredCount - 1);
    };

    this.getFilteredOptions = function () {
        var query = _this._input.value.toLowerCase().trim();

        _this.filteredOptions = _this.options.filter(function (opt) {
            var optionText = opt.text.toLowerCase();
            var startsWithQuery = optionText.indexOf(query) == 0;
            var hasWordStartingWithQuery = optionText.split(/\s/).some(function (t) {
                return t.indexOf(query) == 0;
            });

            return startsWithQuery || hasWordStartingWithQuery;
        });

        _this.filteredCount = _this.filteredOptions.length;

        return _this.filteredOptions;
    };

    this.on('updated', function () {

        var optsHeight = _this._optionList.offsetHeight;
        var scrollTop = _this._optionList.scrollTop;
        var selectedOption = _this._optionList.querySelector('.highlight');

        if (!selectedOption) return;

        var optOffset = selectedOption.offsetTop;
        var optHeight = selectedOption.offsetHeight;

        if (optOffset + optHeight > scrollTop + optsHeight) _this._optionList.scrollTop += optOffset + optHeight - (scrollTop + optsHeight);

        if (optOffset <= scrollTop) _this._optionList.scrollTop = optOffset;
    });
}, '{ }');