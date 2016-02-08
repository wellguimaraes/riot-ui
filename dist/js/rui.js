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
riot.tag2('autocomplete', '<div> <input type="text" name="_input" class="input" onkeydown="{handleArrowKeys}" onkeyup="{filterOptions}" onfocus="{showOptions}" onblur="{hideOptions}" placeholder="{opts.placeholder}"> <nav class="menu is-small" name="_optionList" if="{shouldShowOptions && filteredCount()}"> <a class="menu-block is-small {active: index == active}" each="{option, index in filtered}" onmouseover="{hoverOption}" onmousedown="{chooseCurrent}">{option.text} </a> </nav> </div>', '', 'class="{focus: document.hasFocus() && _input === document.activeElement}"', function (opts) {
    var _this = this;

    var keycode = rui.utils.keycode;

    this.active = 0;
    this.filtered = this.opts.options;
    this.filteredCount = function () {
        return _this.filtered.length;
    };

    this.hoverOption = function (e) {
        !_this.hoverLocked && (_this.active = e.item.index);
    };

    this.reset = function () {
        _this._input.value = '';
        _this.selected = null;
        _this.hideOptions();
    };

    this.hideOptions = function () {
        _this.shouldShowOptions = false;
    };

    this.showOptions = function () {
        if (!_this.shouldShowOptions) _this.active = 0;

        _this.shouldShowOptions = true;
    };

    this.filterOptions = function (e) {
        switch (e.keyCode) {
            case keycode.ARROW_LEFT:
            case keycode.ARROW_RIGHT:
                break;

            case keycode.ESC:
            case keycode.ENTER:
                _this.hideOptions();
                break;

            case keycode.ARROW_DOWN:
            case keycode.ARROW_UP:
                _this.showOptions();
                break;

            default:
                var queryRegex = new RegExp('(^|\\s)' + _this._input.value.trim(), 'i');
                _this.filtered = _this.opts.options.filter(function (opt) {
                    return queryRegex.test(opt.text);
                });
                _this.active = 0;
                _this.showOptions();
                break;
        }

        return true;
    };

    this.chooseCurrent = function () {
        var chosen = _this.filtered[_this.active];

        _this._input.value = chosen.text;

        if (_this.opts.onchange && _this.selected != chosen) _this.opts.onchange(chosen);

        _this.selected = chosen;

        _this.hideOptions();
        _this.update();
    };

    this.handleArrowKeys = function (e) {
        switch (e.keyCode) {
            case keycode.ARROW_DOWN:
                _this.lockHover();
                e.preventDefault();
                _this.active = Math.min(_this.active + 1, _this.filteredCount() - 1);
                return false;

            case keycode.ARROW_UP:
                _this.lockHover();
                e.preventDefault();
                _this.active = Math.max(0, _this.active - 1);
                return false;

            case keycode.ENTER:
                _this.chooseCurrent();
                return true;
        }

        return true;
    };

    this.lockHover = function () {
        var _this2 = this;

        var _unlockHover = function _unlockHover() {
            _this2.hoverLocked = false;
            window.removeEventListener('mousemove', _unlockHover);
        };

        window.addEventListener('mousemove', _unlockHover);
        this.hoverLocked = true;
    };

    this.on('updated', function () {

        var selectedOption = _this._optionList.querySelector('.active');

        if (!selectedOption) return;

        var optsHeight = _this._optionList.offsetHeight;
        var scrollTop = _this._optionList.scrollTop;
        var selOffset = selectedOption.offsetTop;
        var selHeight = selectedOption.offsetHeight;

        if (selOffset + selHeight > scrollTop + optsHeight) _this._optionList.scrollTop += selOffset + selHeight - scrollTop - optsHeight;

        if (selOffset <= scrollTop) _this._optionList.scrollTop = selOffset;
    });
}, '{ }');

riot.tag2('datepicker', '', '', '', function (opts) {});