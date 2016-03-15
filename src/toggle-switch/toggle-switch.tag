<toggle-switch onclick="{action}">
    <div class="switch {checked: active}">
        <div class="ball"></div>
    </div>
    <div class="label">
        <yield/>
    </div>

    <script type="text/babel">
        require('./toggle-switch.styl')
    
        this.active = !!this.opts.active;

        this.setActive = (active) => {
            this.active = active;
        };

        this.action = () => {
            this.active = !this.active;
            this.opts.onchange && this.opts.onchange(this.active);
        };
    </script>
</toggle-switch>