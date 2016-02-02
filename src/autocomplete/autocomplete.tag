<autocomplete class="{focus: document.hasFocus() && _input === document.activeElement}">
    <div>
        <input type="text"
               name="_input"
               onkeydown="{handleArrowKeys}"
               onkeyup="{filterOptions}"
               onfocus="{showOptions}"
               onblur="{hideOptions}"
               placeholder="{opts.placeholder}"/>
        <ul name="_optionList" if="{shouldShowOptions && filteredCount()}">
            <li each="{option, index in filtered}"
                class="{highlight: index == highlightIndex}"
                onmouseover="{hoverOption}"
                onmousedown="{chooseCurrent}">{option.text}
            </li>
        </ul>
    </div>
    <script type="text/ecmascript-6">
        let keycode = rui.utils.keycode;

        this.shouldShowOptions = false;
        this.highlightIndex = 0;
        this.filtered = this.opts.options;
        this.selected = null;

        this.filteredCount = () => this.filtered.length;
        this.hoverOption = (e) => this.highlightIndex = e.item.index;

        this.reset = () => {
            this._input.value = '';
            this.selected = null;
            this.hideOptions();
        };

        this.hideOptions = () => {
            this.shouldShowOptions = false;
        };

        this.showOptions = () => {
            if (this.shouldShowOptions == false)
                this.highlightIndex = 0;

            this.shouldShowOptions = true;
        };

        this.filterOptions = (e) => {
            switch (e.keyCode) {
                case keycode.ESC:
                case keycode.ENTER:
                    this.hideOptions();
                    break;

                case keycode.ARROW_LEFT:
                case keycode.ARROW_RIGHT:
                    break;

                case keycode.ARROW_DOWN:
                case keycode.ARROW_UP:
                    this.showOptions();
                    break;

                default:
                    let queryRegex = new RegExp(`(^|\\s)${this._input.value.trim()}`, 'i');
                    this.filtered = this.opts.options.filter((opt) => queryRegex.test(opt.text));
                    this.highlightIndex = 0;
                    this.showOptions();
                    break;
            }

            return true;
        };

        this.chooseCurrent = () => {
            let chosen = this.filtered[this.highlightIndex];

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
                    e.preventDefault();
                    this.highlightIndex = Math.min(this.highlightIndex + 1, this.filteredCount() - 1);
                    return false;

                case keycode.ARROW_UP:
                    e.preventDefault();
                    this.highlightIndex = Math.max(0, this.highlightIndex - 1);
                    return false;

                case keycode.ENTER:
                    this.chooseCurrent();
                    return true;
            }

            return true;
        };


        this.on('updated', () => {

            // Scroll options

            let selectedOption = this._optionList.querySelector('.highlight');

            if (!selectedOption)
                return;

            let optsHeight = this._optionList.offsetHeight;
            let scrollTop = this._optionList.scrollTop;
            let optOffset = selectedOption.offsetTop;
            let optHeight = selectedOption.offsetHeight;

            if (optOffset + optHeight > scrollTop + optsHeight)
                this._optionList.scrollTop += optOffset + optHeight - scrollTop - optsHeight;

            if (optOffset <= scrollTop)
                this._optionList.scrollTop = optOffset;
        });
    </script>
</autocomplete>