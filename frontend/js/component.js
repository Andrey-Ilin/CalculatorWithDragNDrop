/**
 * Created by andrej on 3/22/16.
 */
'use strict';

class Component {
    constructor(options) {
        this._el = options.element;
        this._el.onmousedown = this._onMouseDown.bind(this);
        this._onDocumentMouseMove = this._onDocumentMouseMove.bind(this);
        this._onDocumentMouseUp = this._onDocumentMouseUp.bind(this);
    }

    _onMouseDown() {
        document.addEventListener('mousemove', this._onDocumentMouseMove);
    }

    _onDocumentMouseMove(event) {
        this._el.style.left = event.clientX - this._el.offsetWidth / 2 +  'px';
        this._el.style.top = event.clientY - this._el.offsetHeight / 2 + 'px';
        document.addEventListener('mouseup', this._onDocumentMouseUp);
    }

    _onDocumentMouseUp() {
        document.removeEventListener('mousemove', this._onDocumentMouseMove);
        document.removeEventListener('mousedown', this._onMouseDown);
    }

}

module.exports = Component;
