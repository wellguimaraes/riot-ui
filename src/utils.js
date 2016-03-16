module.exports = {
    offset: function(elem, options) {
        var docElem;
        var rect;
        var doc;

        if (!elem) {
            return;
        }

        rect = elem.getBoundingClientRect();

        // Make sure element is not hidden (display: none) or disconnected
        if (rect.width || rect.height || elem.getClientRects().length) {
            doc = elem.ownerDocument;
            docElem = doc.documentElement;

            return {
                top: rect.top + window.pageYOffset - docElem.clientTop,
                left: rect.left + window.pageXOffset - docElem.clientLeft
            };
        }
    },
    
    latinMap: {
        "À": "A",
        "Á": "A",
        "Ã": "A",
        "Â": "A",
        "Ä": "A",
        
        "É": "E",
        "È": "E",
        "Ê": "E",
        "Ë": "E",
        
        "Í": "I",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        
        "Ó": "O",
        "Ò": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "O",
        
        "Ú": "U",
        "Ù": "U",
        "Û": "U",
        "Ü": "U",
        
        "Ç": "C",
        "Ñ": "N",
        
        "à": "a",
        "á": "a",
        "ã": "a",
        "â": "a",
        "ä": "a",
        
        "é": "e",
        "è": "e",
        "ê": "e",
        "ë": "e",
        
        "í": "i",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        
        "ó": "o",
        "ò": "o",
        "ô": "o",
        "õ": "o",
        "ö": "o",
        
        "ú": "u",
        "ù": "u",
        "û": "u",
        "ü": "u",
        
        "ç": "c",
        "ñ": "n"
    }
};