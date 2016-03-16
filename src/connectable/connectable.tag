<connectable>
    <div onmousedown="{startDrawing}" class="content">
        <yield/>
    </div>

    <div if="{drawing}" name="_svgContainer" class="svg-container">
        <svg height="100%" width="100%">
            <path name="_connectionLine" stroke="{color}" stroke-width="2" fill="none" d=""/>
            <circle name="_circleOrigin" r="4" fill="{color}"/>
            <circle name="_circleTarget" r="4" fill="{color}"/>
        </svg>
    </div>

    <script type="text/babel">
        require('./connectable.styl');
    
        var endDrawingEvent = 'connectable:endDrawing';
        var offset = require('../utils').offset;
        
        window.__connectableEventBus = window.__connectableEventBus || riot.observable({});

        this.showOverlay = false;
        this.drawing = false;
        this.color = opts.color || 'rgba(0,180,0,.8)';
        
        this.onconnect = this.opts.onconnect || ((resolve) => resolve());
        
        this.drawLine = (event) => {
            event.stopImmediatePropagation();

            var to = {
                x: event.clientX,
                y: event.clientY
            };

            var line = `M 
                ${this.from.x} 
                ${this.from.y} q 
                ${to.x - this.from.x} 0 
                ${to.x - this.from.x} 
                ${to.y - this.from.y}`;
            
            this._connectionLine.setAttribute('d', line);
            this._circleOrigin.setAttribute('cx', this.from.x);
            this._circleOrigin.setAttribute('cy', this.from.y);
            this._circleTarget.setAttribute('cx', to.x);
            this._circleTarget.setAttribute('cy', to.y);
        };
        
        this.followScroll = (event) => {
            this._svgContainer.style.marginTop = `${this.from.scrollY - window.scrollY}px`;
        };

        this.startDrawing = (event) => {
            if (event.target.getAttribute('contenteditable') || (/^(TEXTAREA|INPUT)$/.test(event.target.nodeName) && !event.target.getAttribute('disabled')))
                return true;

            window.__connectableOrigin = this;

            this.from = {
                x: event.clientX,
                y: event.clientY,
                scrollY: window.scrollY
            };

            var showDrawTimeout = setTimeout(() => {
                this.drawing = true;
                this.update();
            }, 200); // Draw delay in milliseconds

            var tag = this;

            window.addEventListener('scroll', this.followScroll);
            window.addEventListener('mousemove', this.drawLine);
            window.addEventListener('mouseup', function winMouseup(e) {
                e.stopImmediatePropagation();

                clearTimeout(showDrawTimeout);
                window.removeEventListener('mousemove', tag.drawLine);
                window.removeEventListener('mouseup', winMouseup);
                
                // Discard draw if no target is found
                var discardDrawTimeout = setTimeout(tag.discardDraw, 100);

                window.__connectableEventBus.trigger(endDrawingEvent, e, discardDrawTimeout);
            });
            
            return true;
        };

        this.endDrawing = (e) => {
            var tag = this;

            var origin = window.__connectableOrigin;
            var originAboveTarget = offset(this.root).top > offset(origin.root).top;

            function propagateConnection(resolve) {
                if (originAboveTarget) {
                    origin.onconnect(resolve, origin, tag, e);
                } else {
                    tag.onconnect(resolve, tag, origin, e);
                }
            }

            if (tag === origin)
                origin.discardDraw();
            else
                new Promise(propagateConnection).then(origin.discardDraw);
        };

        this.discardDraw = () => {
            window.removeEventListener('scroll', this.followScroll);

            this._svgContainer.style.marginTop = 0;

            this.drawing = false;
            this.update();
        };
        
        this.thirdEndDrawingHandler = (e, discardDrawTimeout) => {
            var elemOffset = offset(this.root);
            
            if (!elemOffset) return;
            
            var offsetTop = elemOffset.top;
            
            var minY = offsetTop;
            var maxY = offsetTop + this.root.offsetHeight;

            if (e.pageY > minY && e.pageY < maxY) {
                clearTimeout(discardDrawTimeout);
                this.endDrawing(e);
            }
        };
        
        window.__connectableEventBus.on(endDrawingEvent, this.thirdEndDrawingHandler);

    </script>
</connectable>