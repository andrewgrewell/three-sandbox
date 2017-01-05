import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';

class KeyboardResponder {
    constructor(opts) {
        this._eventListeners = {
            onKeyDown: {},
            onKeyPress: {},
            onKeyUp: {}
        };
        document.addEventListener('keydown',this._handleKeyDown.bind(this));
        return this;
    }

    _handleKeyDown(e) {
        let keyCode = e.keyCode;
        let listeners = this._eventListeners.onKeyDown[keyCode];

        if (listeners) {
            e.preventDefault();
            listeners.forEach(cb => cb());
        }
    }

    _handleKeyPress() {
        //
    }

    _handleKeyUp() {
        //
    }

    onKeyDown(keyCode, callback) {
        let listeners = this._eventListeners.onKeyDown[keyCode];
        if (isArray(listeners)) {
            listeners.push(callback);
        }
        else {
            this._eventListeners.onKeyDown[keyCode] = [callback];
        }
    }

    removeOnKeyDown(keyCode, callback) {
        // TODO: this needs to remove the listener from the document
        let listeners = this._eventListeners.onKeyDown[keyCode];
        if (listeners) {
            this._eventListeners.onKeyDown[keyCode] =
                this._removeListener(listeners, callback);
        }
    }

    _removeListener(listeners, callbackToRemove) {
        return reduce(listeners, (result, listener) => {
            if (listener !== callbackToRemove) {
                result.push(listener);
            }
            return result;
        }, []);
    }
}

export default KeyboardResponder;