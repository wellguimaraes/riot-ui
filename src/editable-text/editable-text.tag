<!--suppress ThisExpressionReferencesGlobalObjectJS -->
<editable-text>
    <div class="editable-container" ondblclick="{enableEditing}">
        <textarea if="{editing}"
                  name="_editable"
                  class="textarea"
                  onkeydown="{handleInput}"
                  onblur="{cancelEditing}"
                  type="text"
                  placeholder="{opts.placeholder}">{content}</textarea>

        <div name="_static" class="static-text {editing: editing}">{content}</div>
    </div>

    <script type="text/babel">
        require('./editable-text.styl');
    
        var keycode = require('keycode');

        this.editing = false;
        this.content = this.opts.content;

        this.resizeTextarea = () => {
            this._static.innerText = this._editable.value || 'x';
            this._editable.style.height = this._static.offsetHeight + 'px';
            this._static.innerText = this._editable.value || '';
        };

        this.enableEditing = () => {
            if (this.editing) return;

            this.update({editing: true});
            this._editable.focus();

            // place the cursor at the end of the text field
            this._editable.value = '';
            this._editable.value = this.content;

            this.resizeTextarea();
        };

        this.saveEditing = (options) => {
            this.content = this._editable.value;
            this.opts.oncontentchange && this.opts.oncontentchange(this.content);

            this.editing = false;
            this.update();
        };

        this.cancelEditing = () => {
            this.editing = false;
        };

        this.handleInput = (e) => {
            switch (e.keyCode) {
                case keycode('enter'):
                    this.saveEditing();
                    this.resizeTextarea();
                    return false;

                case keycode('esc'):
                    this.cancelEditing();
                    this.resizeTextarea();
                    return false;
            }

            this.resizeTextarea();
            
            return true;
        };
    </script>
</editable-text>