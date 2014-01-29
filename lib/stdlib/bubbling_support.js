if(typeof exports !== 'undefined') {
    // assume we are in Node
    var Module = require('../neon.js').Module;
    var CustomEventSupport = require('./custom_event_support.js').CustomEventSupport;
}

(function(global) {

    BubblingSupport = Module('BubblingSupport')({
        dispatch : function (type, data) {
            data = data || {};
            var event = CustomEventSupport.prototype.dispatch.call(this, type, data);
            if (event.isPropagationStopped === false) {
                if (this.parent && this.parent.dispatch) {
                    data.target = event.target;
                    data.currentTarget = this.parent;
                    this.parent.dispatch(event.type, data);
                }
            }
            return event;
        },

        prototype : {
            dispatch : function (type, data) {
                data = data || {};

                var event = CustomEventSupport.prototype.dispatch.call(this, type, data);

                if (event.isPropagationStopped === false && event.bubbles === true) {
                    if (this.parent && this.parent.dispatch) {
                        data.target = event.target;
                        data.currentTarget = this.parent;
                        this.parent.dispatch(event.type, data);
                    }
                }

                return event;
            }
        }
    });

    if (typeof define === 'function') {
        define(function() {
            return BubblingSupport;
        });
    } else {
        global.BubblingSupport = BubblingSupport;
    }

}(typeof window !== 'undefined' ? window : (typeof exports !== 'undefined' ? exports : null)));