var view = Object.create(null);
view.Auth = function(el, template, model) {
    var o = Object.create(null);
    o.render = function() {
        console.log("el", el);
       
        el.innerHTML = template.render(model);
        console.log("after", el);
        return el;
    };
    
    return o;
};

view.Template = function(el) {
    var o = Object.create(null);
//    var parts = el.split("<%=");
   
    o.render = function(data) {
        console.log("Template el", el);
        return el.innerHTML;
    };
    
    return o;
};

var controller = Object.create(null);
controller.App = function(_bus, node, unauthedView, authedView) {
    var o = Object.create(null);
    
    o.unauthenticated = function() {
        node.innerHTML = unauthedView.render().el;
        _bus.publish("app:unauthed");
    };
    
    o.authed = function() {
        node.innerHTML = authedView.render().el;
        _bus.publish("app:authed");
    };
    
    return o;
};


var nodeContent = document.getElementById("content");
var nodeTemplate = document.getElementById("test");
console.log('next', document.getElementById("next"));
console.log("tmpl", document.getElementById("test").innerHTML);
console.log("nodeTemplate", nodeTemplate);
var templateAuth = view.Template(nodeTemplate);
var authView = view.Auth(nodeContent, templateAuth, {username:"testuser", password:"password"});

var bus = event.Bus();
const UNAUTHORIZED = 1;
//bus.subscribe(UNAUTHORIZED, authView.render);
//bus.subscribe(UNAUTHORIZED, console.log);
var app = controller.App(bus, nodeContent, authView, { render: function() {
        return {
            el: "<h2>Projects</h2>"
        };
}
});
bus.subscribe(UNAUTHORIZED, app.unauthenticated);

$.ajax({
    url: "/project",
    contentType: "application/json",
    dataType: "json",
    headers: {
//        "auth-token": "abc"
    },
    success: function(data) {
        console.log("SUCCESS", data);
    },
    error: function(xhr, type) {
        console.log(xhr);
        if (xhr.status === 403) {
            bus.publish(UNAUTHORIZED, "/project");
        }
        console.log("ERR", type);
    }
});
