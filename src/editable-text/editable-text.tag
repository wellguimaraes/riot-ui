<editable-text ondblclick="{enableEditing}">
    <div class="placeholder" if="{!editing && showPlaceholder}">{opts.placeholder || '&nbsp;'}</div>
    <div 
        name="_editable"
        class="editable"
        onkeydown="{handleInput}"
        onblur="{saveEditing}"
        onpaste="{handlePaste}"
        contenteditable="{editing}">{content}</div>
    

    <script type="text/babel">
        require('./editable-text.styl');
    
        var keycode = require('keycode');

        this.editing = false;
        this.content = this.opts.content;
        
        this.handlePaste = (e) => {
            var pastedText = undefined;
            
            if (window.clipboardData && window.clipboardData.getData) { // IE
                pastedText = window.clipboardData.getData('Text');
            } else if (e.clipboardData && e.clipboardData.getData) {
                pastedText = e.clipboardData.getData('text/plain');
            }
            
            e.preventDefault();

            document.execCommand("insertHTML", false, pastedText);
            
            return false;
        }
        
        this.moveCaretToTheEnd = () =>
        {
            var range, selection;
            
            if (document.createRange) {
                range = document.createRange();
                range.selectNodeContents(this._editable);
                range.collapse(false);
                selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            } else if (document.selection) {
                range = document.body.createTextRange();
                range.moveToElementText(this._editable);
                range.collapse(false);
                range.select();
            }
        }

        this.enableEditing = () => {
            if (this.editing) return;

            this.update({editing: true});
            this._editable.focus();
            this.moveCaretToTheEnd();
        };

        this.saveEditing = (options) => {
            if (!this.editing) return;
            
            this.content = this._editable.textContent;
            this._editable.innerHTML = this.content;
            this.showPlaceholder = !this.content;
            this.opts.oncontentchange && this.opts.oncontentchange(this.content);

            this.editing = false;
            this.update();
        };

        this.cancelEditing = () => {
            this.editing = false;
            this._editable.innerHTML = this.content;
        };

        this.handleInput = (e) => {
            if (e.ctrlKey) {
                switch (e.keyCode) {
                    case 66: // B
                    case 73: // I
                    case 85: // U
                        return this.opts.allowHtml || false;
                }
            }
                
            switch (e.keyCode) {
                case keycode('enter'):
                    this.saveEditing();
                    return false;

                case keycode('esc'):
                    this.cancelEditing();
                    return false;
            }

            return true;
        };
    </script>
</editable-text>