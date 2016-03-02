<autocomplete class="{focus: document.hasFocus() && _input === document.activeElement}">
    <div>
        <input type="text"
               name="_input"
               class="input"
               onkeydown="{handleArrowKeys}"
               onkeyup="{filterOptions}"
               onfocus="{showOptions}"
               onblur="{hideOptions}"
               placeholder="{opts.placeholder}"/>
        <ul class="menu is-small" name="_optionList" if="{shouldShowOptions && filteredCount()}">
            <li class="menu-block is-small {active: index == active}"
               each="{option, index in filtered}"
               onmouseover="{hoverOption}"
               onmousedown="{chooseCurrent}">{option.text}
            </li>
        </ul>
    </div>
    <style scoped>
        :scope {
            display: block;
            position: relative;
        }

        nav.menu {
            position: absolute;
            left: 0;
            top: calc(100% + 5px);
            margin: 0;
            padding: 0;
            background-color: white;
            max-height: 200px;
            width: 100%;
            overflow-y: hidden;
            z-index: 99;
            border-color: #08e;
        }

        .menu-block:hover {
            background-color: transparent;
        }

        .menu-block.active {
            background-color: #ddd !important;
        }

    </style>
    <script type="text/ecmascript-6">
        let keycode = rui.utils.keycode;

        this.active = 0;
        this.filtered = this.opts.options;
        this.filteredCount = () => this.filtered.length;

        this.hoverOption = (e) => {
            !this.hoverLocked && (this.active = e.item.index);
        };

        this.reset = () => {
            this._input.value = '';
            this.selected = null;
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
            switch (e.keyCode) {
                case keycode.ARROW_LEFT:
                case keycode.ARROW_RIGHT:
                    break;

                case keycode.ESC:
                case keycode.ENTER:
                    this.hideOptions();
                    break;

                case keycode.ARROW_DOWN:
                case keycode.ARROW_UP:
                    this.showOptions();
                    break;

                default:
                    let queryRegex = new RegExp(`(^|\\s)${this._input.value.trim()}`, 'i');
                    this.filtered = this.opts.options.filter((opt) => queryRegex.test(opt.text));
                    this.active = 0;
                    this.showOptions();
                    break;
            }

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
            // Scroll options
            let selectedOption = this._optionList.querySelector('.active');

            if (!selectedOption)
                return;

            let optsHeight = this._optionList.offsetHeight;
            let scrollTop  = this._optionList.scrollTop;
            let selOffset  = selectedOption.offsetTop;
            let selHeight  = selectedOption.offsetHeight;

            if (selOffset + selHeight > scrollTop + optsHeight)
                this._optionList.scrollTop +=
                          selOffset
                        + selHeight
                        - scrollTop
                        - optsHeight;

            if (selOffset <= scrollTop)
                this._optionList.scrollTop = selOffset;
        });
    </script>
</autocomplete>