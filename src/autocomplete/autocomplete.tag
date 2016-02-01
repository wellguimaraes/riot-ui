<autocomplete>
    <div class="{focus: _input === document.activeElement}">
        <input type="text"
               name="_input"
               onkeydown="{handleArrowKeys}"
               onkeyup="{filterOptions}"
               onfocus="{showOptions}"
               onblur="{hideOptions}"
               placeholder="{opts.placeholder}"/>
        <ul name="_optionList" if="{shouldShowOptions && filteredCount}">
            <li each="{option, index in getFilteredOptions()}"
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
        this.filteredCount = this.opts.options.length;
        this.filteredOptions = this.opts.options;
        this.selected = null;


        this.hoverOption = (e) => {
            this.highlightIndex = e.item.index;
        };

        this.toggleFocus = function () {
            this.root.classList.toggle('focus', this._input === document.activeElement);
        };

        this.hideOptions = () => {
            this.toggleFocus();
            this.shouldShowOptions = false;
        };

        this.showOptions = () => {
            this.toggleFocus();

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
                    this.highlightIndex = 0;
                    this.showOptions();
                    break;
            }

            return true;
        };

        this.chooseCurrent = () => {
            let chosen = this.filteredOptions[this.highlightIndex];

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
                    this.highlightNext(e);
                    return false;

                case keycode.ARROW_UP:
                    this.highlightPrevious(e);
                    return false;

                case keycode.ENTER:
                    this.chooseCurrent();
                    return true;
            }

            return true;
        };

        this.highlightPrevious = (e) => {
            e.preventDefault();
            this.highlightIndex = Math.max(0, this.highlightIndex - 1);
        };

        this.highlightNext = (e) => {
            e.preventDefault();
            this.highlightIndex = Math.min(this.highlightIndex + 1, this.filteredCount - 1);
        };

        this.getFilteredOptions = () => {
            let query = this._input.value.toLowerCase().trim();

            this.filteredOptions = this.opts.options.filter((opt) => {
                let optionText = opt.text.toLowerCase();
                let startsWithQuery = optionText.indexOf(query) == 0;
                let hasWordStartingWithQuery = optionText.split(/\s/).some((t) => t.indexOf(query) == 0);

                return startsWithQuery || hasWordStartingWithQuery;
            });

            this.filteredCount = this.filteredOptions.length;

            return this.filteredOptions;
        };

        this.on('updated', () => {

            // Scroll options

            let optsHeight = this._optionList.offsetHeight;
            let scrollTop = this._optionList.scrollTop;
            let selectedOption = this._optionList.querySelector('.highlight');

            if (!selectedOption)
                return;

            let optOffset = selectedOption.offsetTop;
            let optHeight = selectedOption.offsetHeight;

            if (optOffset + optHeight > scrollTop + optsHeight)
                this._optionList.scrollTop += optOffset + optHeight - (scrollTop + optsHeight);

            if (optOffset <= scrollTop)
                this._optionList.scrollTop = optOffset;
        });
    </script>
</autocomplete>