<floating-menu>
    <div class="target" onclick="{ toggle }">
        <yield/>
    </div>
    <ul class="options" each="{ open ? [1] : [] }">
        <li each="{ option in getOptions() }" onclick="{action}" class="{ separator: option.separator }">{option.name}</li>
    </ul>

    <script type="text/babel">
        require('./floating-menu.styl');
        
        var offset = require('../utils').offset;
        var actions = {
            CLOSE_OTHERS: "floating-menu:close-others"
        };
        
        window.__floatingMenuEventBus = window.__floatingMenuEventBus || riot.observable({});
    
        this.open = false;
        this.id = Math.random();

        this.getOptions = () => {
            return this.open ? this.opts.options : [];
        };

        this.action = (e) => {
            this.hideMenu();
            e.item.option.action && e.item.option.action.apply(null, [e, ...(this.opts.extra || [])]);
        };

        this.hideMenu = () => {
            this.open = false;
            window.removeEventListener('click', this.hideMenu);
            this.update();
        };

        this.toggle = (event) => {
            this.open = !this.open;

            if (this.open) {
                window.addEventListener('click', this.hideMenu);
                window.__floatingMenuEventBus.trigger(actions.CLOSE_OTHERS, this.id);
            }

            event.stopPropagation();
        };

        window.__floatingMenuEventBus.on(actions.CLOSE_OTHERS, (callerId) => {
            if (callerId != this.id && this.open) {
                this.hideMenu();
                this.update();
            }
        });
    </script>
</floating-menu>
