var event = Object.create(null);
event.Bus = function() {
    var events = Object.create(null);
    var o = Object.create(null);
    
    o.subscribe = function(event, f) {
        if (!events[event]) {
            events[event] = [];
        }
        events[event].push(f);
    };
    var count = 1;
    o.publish = function(event, payload) {
        if (!events[event]) {
            console.warn("No event handler for " + event);
            return;
        }
        var id = count++;
        new Promise(function(res, rej) {
            console.log("Promise " + id + " started")
            var i;
            var listeners = events[event];
            for (i = 0; i < listeners.length; i++) {
                try {
                    listeners[i](payload);
                } catch (e) {
                    rej(e);
                }
            }
            res("done");
        }).then(function(p) {
            console.log("Promise "  + id + " done");
        }).catch(function(e) {
            console.log("Promise "  + id + " error " + e);
        });
    };
  
    return o;
};
