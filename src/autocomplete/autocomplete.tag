<autocomplete>
    <div>
        <input type="text" name="_input" onkeydown="{handleArrowKeys}" onkeyup="{filterOptions}"
               onfocus="{showOptions}"
               placeholder="{opts.placeholder}"/>
        <ul name="_options" if="{shouldShowOptions && filteredCount}">
            <li each="{option, index in getFilteredOptions()}"
                class="{selected: index == selected}"
                onmouseover="{hoverOption}"
                onclick="{selectCurrent}">{option.text}
            </li>
        </ul>
    </div>
    <style scoped>
        ul {
            margin: 0;
            padding: 0;
            position: absolute;
            background: white;
            border: 1px solid #ccc;
            max-height: 200px;
            overflow-y: auto;
            z-index: 99;
            border-top: 1px dotted #ccc;
            margin-top: -1px;
        }

        li {
            margin: 0;
            list-style: none;
            padding: 5px 10px;
        }

        li:hover,
        li.selected {
            background: #999;
            color: #fff;
            cursor: default;
        }


        input:focus,
        input {
            width: calc(100% - 12px);
            margin: 0;
            outline: none !important;
            box-shadow: none !important;
            padding: 5px !important;
            border: 1px solid #ccc !important;
        }
    </style>
    <script>
        var tag = this;

        tag.shouldShowOptions = false;
        tag.selected = 0;
        tag.filteredCount = tag.opts.options.length;
        tag.filteredOptions = tag.opts.options;

        tag.hoverOption = function (e) {
            tag.selected = e.item.index;
        };


        tag.showOptions = function () {
            if (tag.shouldShowOptions == false) {
                tag.shouldShowOptions = true;
                tag.selected = 0;
            }
        };

        tag.filterOptions = function (e) {
            tag.shouldShowOptions = true;

            switch (e.keyCode) {
                case 27: // ESC
                    tag.shouldShowOptions = false;
                    return true;

                case 37: // LEFT
                case 39: // RIGHT
                case 46: // DELETE
                case 8: // BACKSPACE
                    return true;
            }

            if ([40, 38, 13].indexOf(e.keyCode) == -1)
                tag.selected = 0;

            return true;
        };

        tag.selectCurrent = function () {
            tag._input.value = tag.filteredOptions[tag.selected].text;
            tag._hideOptions();
            tag.update();
        };

        tag.handleArrowKeys = function (e) {
            switch (e.keyCode) {
                case 40: // DOWN
                    tag.selectNext(e);
                    return true;

                case 38: // UP
                    tag.selectPrevious(e);
                    return true;

                case 13: // ENTER
                    tag.selectCurrent();
                    return true;
            }

            return true;
        };

        tag.selectPrevious = function (e) {
            e.preventDefault();
            tag.selected = Math.max(0, tag.selected-1);
        };

        tag.selectNext = function () {
            tag.selected = Math.min(tag.selected+1, tag.filteredCount-1);
        };

        tag.on('updated', function () {
            var optsHeight = 200;
            var scrollTop = tag._options.scrollTop;
            var selectedOption = tag._options.querySelector('.selected');

            if (!selectedOption)
                return;

            var optOffset = selectedOption.offsetTop;
            var optHeight = selectedOption.offsetHeight;

            if (optOffset + optHeight > scrollTop + optsHeight) {
                tag._options.scrollTop += optOffset + optHeight - (scrollTop + optsHeight);
            }

            if (optOffset <= scrollTop) {
                tag._options.scrollTop = optOffset;
            }
        });

        tag._hideOptions = function () {
            tag.shouldShowOptions = false;
            tag.selected = -1;
        };

        tag.getFilteredOptions = function () {
            var inputValue = tag._input.value.toLowerCase().trim();

            tag.filteredOptions = tag.opts.options.filter(function (item) {
                return item.text.toLowerCase().indexOf(inputValue) == 0 ||
                        item.text.toLowerCase().split(/\W/).some(function (t) {
                            return t.indexOf(inputValue) == 0;
                        });
            });

            tag.filteredCount = tag.filteredOptions.length;

            if (tag.filteredOptions.length == 1 && inputValue == tag.filteredOptions[0].text.toLowerCase()) {
                tag._hideOptions();
            }

            return tag.filteredOptions;
        };

        tag.on('mount', function () {
            tag._options.style.width = $(tag._input).outerWidth() - 3 + "px";
        })
    </script>
</autocomplete>