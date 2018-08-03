var pie = Object.create(null);


pie.ObservableList = function() {
    var o = Object.create(null);
    var elements = [];
    var listeners = [];
    o.add = function(e) {
        elements.push(e);
        notify(e);
    };
    
    o.addAll = function(array) {
        var i = 0;
        for (; i < array.length; i++) {
            elements.push(array[i]);
        }
        notify(array);
    };
    
    o.set = function(e) {
        elements = e;
        notifiy(e);
    };
    
    o.clear = function() {
        elements = [];
        notify(elements);
    };
    
    o.addListener = function(l) {
        listeners.push(l);
        console.log("listeners", listeners);
    };
    
    o.forEach = function(f) {
        elements.forEach(f);
    };
    
    o.reduce = function(initial, f) {
        var i;
        var x = initial;
        for (i = 0; i < elements.length; i++) {
            x = f(x, elements[i]);
        }
        return x;
    };
    
    function notify(payload) {
        var i;
        for (i = 0; i < listeners.length; i++) {
            listeners[i](payload);
        }
    };
    
    return o;
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

pie.Chart = function() {
    var o = Object.create(null);
    var model = pie.ObservableList();
    const THREE_SIXTY = Math.PI*2;
    
    o.getModel = function() {
        return model;
    };
    
    const sum = function(x, y) {
        return x + y;
    };
    const colors = ['red','blue','green','yellow','orange','purple','black'];
    var RADIUS = 120;
    o.setRadius = function(v) {
        RADIUS = v;
    };
    o.render = function() {
        console.log("render");
        var total = model.reduce(0, sum);
        console.log("Total", total);
        var offset = 0;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        model.forEach(function(x, i) {
            ctx.beginPath();
            ctx.fillStyle = colors[i%colors.length];
            var size = x * THREE_SIXTY / total;
            var end = offset + size;
            console.log("Radius + " + RADIUS + " offset " + offset + " End " + end + " Size " + size + " Color " + colors[i%colors.length]);
            ctx.arc(200, 200, RADIUS, offset, end);
            ctx.lineTo(200, 200);
            offset = end;
            ctx.fill();
        });
    };
    
    model.addListener(o.render);

    return o;
};


c = pie.Chart();
m = c.getModel();
m.add(1);

pie.slider = document.getElementById("slider-date");
pie.sliderOut = document.getElementById("slider-out");
pie.slider.oninput = function(e) {
    console.log(e);
    var value = parseInt(pie.slider.value);
    console.log("Value", value);
    console.log("ART", (value + 1000));
    pie.sliderOut.innerText = value;
    var other = parseInt(pie.sliderEnd.value);
    if (value > other) {
        pie.sliderEnd.value = value;
    }
    c.setRadius(value)
    c.render();
};

pie.sliderEnd = document.getElementById("slider-end");
pie.sliderEnd.oninput = function(e) {
    console.log(e);
    var value = parseInt(pie.sliderEnd.value);
    var other = parseInt(pie.slider.value);
    if (value < other) {
        pie.slider.value = value;
    };
};
