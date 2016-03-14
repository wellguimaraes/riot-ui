<floating-menu>
    <div class="target" onclick="{ toggle }">
        <yield/>
    </div>
    <ul class="float-menu-options" each="{ open ? [1] : [] }">
        <li each="{ option in getOptions() }" onclick="{action}">{option.name}</li>
    </ul>

    <style scoped>
        .target {
            display: inline
        }

        .float-menu-options {
            background: #fff;
            box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.25);
            position: absolute;
            z-index: 999;
            width: 200px;
            padding: 1px;
        }

        .float-menu-options li {
            color: #333;
            padding: 10px 20px;
            cursor: pointer;
            text-align: left;
             -webkit-user-select: none;
             -moz-user-select: none;
             -ms-user-select: none;
            user-select: none;
        }

        .float-menu-options li:hover {
            background: #f0f0f0
        }
    </style>

    <script type="text/babel">
        this.open = false;
        this.id = Math.random();

        var actions = {
            CLOSE_OTHERS: "floating-menu:close-others"
        };

        this.positionTag = (event) => {
            var offsetLeft = $(event.target).offset().left;
            $(this.root).find('.float-menu').offset({left: offsetLeft});
        };

        this.getOptions = () => {
            return this.open ? this.opts.options : [];
        };

        this.action = function(e) {
            this.hideMenu();
            e.item.option.action && e.item.option.action();
        };

        this.hideMenu = () => {
            this.open = false;
            $(window).unbind('click', this.hideMenu);
            this.update();
        };

        this.toggle = (event) => {
            this.open = !this.open;

            if (this.open) {
                $(window).click(this.hideMenu);
                eventBus.trigger(actions.CLOSE_OTHERS, this.id);
                event && this.positionTag(event);
            }

            event.stopPropagation();
        };

        eventBus.on(actions.CLOSE_OTHERS, (callerId) => {
            if (callerId != this.id && this.open) {
                this.hideMenu();
                this.update();
            }
        });
    </script>
</floating-menu>
