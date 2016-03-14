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

    <style scoped>
        .editable-container {
            position: relative;
            display: block;
        }

        .static-text {
            background: transparent !important;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .static-text.editing {
            opacity: 0;
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
        }

        .textarea {
            color: inherit;
            box-shadow: none !important;
            outline: none !important;
            padding: 0;
            resize: none;
            width: 100%;
            display: block;
            border: 5px solid transparent !important;
            margin: -5px;
            background: rgba(0, 0, 0, .06);
            overflow: hidden;
            border-radius: 4px;
        }
    </style>

    <script type="text/babel">
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