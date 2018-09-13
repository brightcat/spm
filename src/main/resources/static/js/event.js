(function(doc, win) {
    var node = doc.getElementById("output");
    var clicks = 0;
    var btnClicks = 0;
    var btn = doc.getElementById("btn");
    doc.addEventListener("click", function(e) {
        e.stopPropagation();
        console.log("doc", e);
        node.innerHTML = "Click " + clicks++;
    });
    var map = {
        "ArrowRight": 1,
        "ArrowLeft": -1,
    };
    var direction = 0;
    var countNode = doc.getElementById("count");
    var value = 0;
    setInterval(function() {
        value += direction;
        countNode.innerHTML = "" + value;
    }, 100);
    doc.addEventListener("keydown", function(e) {
        console.log("doc key", e);
        var action = map[e.key];
        if (action) {
            direction = action * (direction + action); 
        }
    });
    doc.addEventListener("keyup", function(e) {
        if (map[e.key]) {
            direction = 0;
        };
    });
    btn.addEventListener("click", function(e) {
        console.log("btn event", e);
        btn.value = "Btn Clicks " + btnClicks++;
    });
    btn.onclick = function(e) {
        console.log("btn", e);
        btn.innerHTML = "On click " + btnClicks++;
    };
    var a = doc.getElementById("aclick");
    a.onclick = function(e) {
        console.log("a href", e, win.location);
    };
})(document, window);
