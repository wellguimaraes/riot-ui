<autocomplete class="{focus: document.hasFocus() && _input === document.activeElement}">
    <input type="text"
           name="_input"
           class="input"
           onkeydown="{handleArrowKeys}"
           onkeyup="{filterOptions}"
           onfocus="{showOptions}"
           onblur="{hideOptions}"
           placeholder="{opts.placeholder}"/>
    <ul class="menu" name="_optionList" if="{shouldShowOptions && filteredCount()}">
        <li class="menu-item {active: index == active}"
            each="{option, index in filtered}"
            onmouseover="{hoverOption}"
            onmousedown="{chooseCurrent}">{option.text}
        </li>
    </ul>
    

    <script type="text/babel">
        require('./autocomplete.styl');
        var latinMap = require('../utils').latinMap;

        var keycode = require('keycode');
        
        this.active = 0;
        this.filtered = (this.opts.options || []).filter((opt) => {
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
        
        var latinise = (s) => s.replace(/[^A-Za-z0-9\[\] ]/g, (x) => latinMap[x] || x);
        
        this.filterOptions = (e) => {
            var keyCode = e ? e.keyCode : -1 || -1;
        
            switch (keyCode) {
                case keycode('LEFT'):
                case keycode('RIGHT'):
                    return true;
        
                case keycode('ESC'):
                case keycode('ENTER'):
                    this.hideOptions();
                    return true;
        
                case keycode('DOWN'):
                case keycode('UP'):
                    this.showOptions();
                    return true;
            }
        
            var queryRegex = new RegExp(`(^|\\s)${latinise(this._input.value.trim())}`, 'i');
        
            this.filtered = (this.opts.options || []).filter((opt) =>
                queryRegex.test(latinise(opt.text)) && (!this.opts.filter || this.opts.filter(opt))
            );
        
            this.active = 0;
            this.showOptions();
        
            return true;
        };
        
        this.chooseCurrent = () => {
            if (this.active > this.filtered.length - 1)
                return;
            
            var chosen = this.filtered[this.active];
        
            this._input.value = chosen.text;
        
            if (this.opts.onselect && this.selected != chosen)
                this.opts.onselect(chosen);
        
            this.selected = chosen;
        
            this.hideOptions();
            this.update();
        };
        
        this.handleArrowKeys = (e) => {
            switch (e.keyCode) {
                case keycode('DOWN'):
                    this.lockHover();
                    e.preventDefault();
                    this.active = Math.min(this.active + 1, this.filteredCount() - 1);
                    return false;
        
                case keycode('UP'):
                    this.lockHover();
                    e.preventDefault();
                    this.active = Math.max(0, this.active - 1);
                    return false;
        
                case keycode('ENTER'):
                    this.chooseCurrent();
                    return true;
            }
        
            return true;
        };
        
        this.lockHover = () => {
            var _unlockHover = () => {
                this.hoverLocked = false;
                window.removeEventListener('mousemove', _unlockHover);
            };
        
            window.addEventListener('mousemove', _unlockHover);
            this.hoverLocked = true;
        };
        
        this.on('updated', () => {
            // Scroll options
            var selectedOption = this._optionList.querySelector('.active');
        
            if (!selectedOption)
                return;
        
            var optsHeight = this._optionList.offsetHeight;
            var scrollTop = this._optionList.scrollTop;
            var selOffset = selectedOption.offsetTop;
            var selHeight = selectedOption.offsetHeight;
        
            if (selOffset + selHeight > scrollTop + optsHeight)
                this._optionList.scrollTop +=
                selOffset + selHeight - scrollTop - optsHeight;
        
            if (selOffset <= scrollTop)
                this._optionList.scrollTop = selOffset;
        });
    </script>
</autocomplete>