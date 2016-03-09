riot.tag2('autocomplete', '<input type="text" name="_input" class="input" onkeydown="{handleArrowKeys}" onkeyup="{filterOptions}" onfocus="{showOptions}" onblur="{hideOptions}" placeholder="{opts.placeholder}"> <ul class="menu" name="_optionList" if="{shouldShowOptions && filteredCount()}"> <li class="menu-block {active: index == active}" each="{option, index in filtered}" onmouseover="{hoverOption}" onmousedown="{chooseCurrent}">{option.text} </li> </ul>', 'autocomplete,[riot-tag="autocomplete"] { display: block; position: relative; } autocomplete .menu,[riot-tag="autocomplete"] .menu { position: absolute; left: 0; top: calc(100% + 5px); margin: 0; padding: 0; background-color: white; max-height: 200px; width: 100%; overflow-y: hidden; z-index: 99; border-color: #08e; } autocomplete .menu-block:hover,[riot-tag="autocomplete"] .menu-block:hover { background-color: transparent; } autocomplete .menu-block.active,[riot-tag="autocomplete"] .menu-block.active { background-color: #ddd !important; } autocomplete .input,[riot-tag="autocomplete"] .input { width: 100%; }', 'class="{focus: document.hasFocus() && _input === document.activeElement}"', function(opts) {
        let keycode = rui.utils.keycode;

        this.active = 0;
        this.filtered = this.opts.options.filter((opt) => {
            return !this.opts.filter || this.opts.filter(opt);
        });

        this.filteredCount = () => this.filtered.length;

        this.hoverOption = (e) => {
            !this.hoverLocked && (this.active = e.item.index);
        };

        this.reset = () => {
            this._input.value = '';
            this.selected = null;
            this.filterOptions();
            this.hideOptions();
        };

        this.hideOptions = () => {
            this.shouldShowOptions = false;
        };

        this.showOptions = () => {
            if (!this.shouldShowOptions)
                this.active = 0;

            this.shouldShowOptions = true;
        };

        this.filterOptions = (e) => {
            var keyCode = e ? e.keyCode : -1 || -1;

            switch (keyCode) {
                case keycode.ARROW_LEFT:
                case keycode.ARROW_RIGHT:
                    return true;

                case keycode.ESC:
                case keycode.ENTER:
                    this.hideOptions();
                    return true;

                case keycode.ARROW_DOWN:
                case keycode.ARROW_UP:
                    this.showOptions();
                    return true;
            }

            let queryRegex = new RegExp(`(^|\\s)${this._input.value.trim()}`, 'i');

            this.filtered = this.opts.options.filter((opt) =>
                queryRegex.test(opt.text) && (!this.opts.filter || this.opts.filter(opt))
            );

            this.active = 0;
            this.showOptions();

            return true;
        };

        this.chooseCurrent = () => {
            let chosen = this.filtered[this.active];

            this._input.value = chosen.text;

            if (this.opts.onchange && this.selected != chosen)
                this.opts.onchange(chosen);

            this.selected = chosen;

            this.hideOptions();
            this.update();
        };

        this.handleArrowKeys = (e) => {
            switch (e.keyCode) {
                case keycode.ARROW_DOWN:
                    this.lockHover();
                    e.preventDefault();
                    this.active = Math.min(this.active + 1, this.filteredCount() - 1);
                    return false;

                case keycode.ARROW_UP:
                    this.lockHover();
                    e.preventDefault();
                    this.active = Math.max(0, this.active - 1);
                    return false;

                case keycode.ENTER:
                    this.chooseCurrent();
                    return true;
            }

            return true;
        };

        this.lockHover = function () {
            let _unlockHover = () => {
                this.hoverLocked = false;
                window.removeEventListener('mousemove', _unlockHover);
            };

            window.addEventListener('mousemove', _unlockHover);
            this.hoverLocked = true;
        };

        this.on('updated', () => {

            let selectedOption = this._optionList.querySelector('.active');

            if (!selectedOption)
                return;

            let optsHeight = this._optionList.offsetHeight;
            let scrollTop = this._optionList.scrollTop;
            let selOffset = selectedOption.offsetTop;
            let selHeight = selectedOption.offsetHeight;

            if (selOffset + selHeight > scrollTop + optsHeight)
                this._optionList.scrollTop +=
                        selOffset
                        + selHeight
                        - scrollTop
                        - optsHeight;

            if (selOffset <= scrollTop)
                this._optionList.scrollTop = selOffset;
        });
}, '{ }');