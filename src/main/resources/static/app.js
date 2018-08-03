var app = Object.create(null);
app.eventbus = (function() {
    var events = Object.create(null);
    var o = Object.create(null);
    o.subscribe = function(event, f) {
        if (!events[event]) {
            events[event] = [];
        }
        events[event].push(f);
    };
    o.publish = function(event, payload) {
        events[event].forEach(function(f) {
            f(payload);
        });
    };
    return o;
})();

app.ProjectView = Backbone.View.extend({
    tagName: 'li',
    className: 'project',
    template: _.template('<%= name %>  (<%= dateCreated %>)'),
    
    render: function() {
        var $el = this.$el;
        $el.html(this.template(this.model.toJSON()));
        return this;
    }
});

app.ProjectsView = Backbone.View.extend({
    tagName: 'ul',
    className: 'projects',
    
    render: function() {
        var $el = this.$el;
        $el.html('');
        this.collection.forEach(function(e) {
            $el.append(new app.ProjectView({model:e}).render().el);
        });
        return this;
    }
});

app.model = Object.create(null);

app.model.Project = Backbone.Model.extend({
    urlRoot: '/project'
});
app.model.ProjectCollection = Backbone.Collection.extend({
    model: app.model.Project,
    url: '/project',
    events: {
        'change': 'change'
    },
    change: function() {
        
    }
});
projects = new app.model.ProjectCollection();

app.view = Object.create(null);
app.view.Table = Backbone.View.extend({
    template: $("#template-table").html(),
    
    render: function() {
        this.el = this.template(this.model.toJSON());
        return this;
    }
});

p = new app.ProjectsView({collection:projects});

app.bus = Object.create(null);
_.extend(app.bus, Backbone.Events);
app.bus.on("testevent", function(msg) {
    alert("Triggered: " + msg);
});

app.eventbus.subscribe("new", function(msg) {
    console.log("new event trigger: ", msg);
    alert("new event trigger " + msg);
});

app.loadBtn = document.querySelector("#load-button").onclick = function(e) {
    console.log(e);
    document.getElementById("projects-area").setAttribute("disabled", "disabled");
    app.refreshProjects();
};

app.renderProjects = function(projects) {
    var s = document.querySelector("#projects");
    s.innerHTML = "";
    var li;
    projects.forEach(function(p) {
        li = document.createElement('li');
        li.innerText = p.name;
        li.onclick = function(e) {
            app.loadProject(p);
        };
        s.appendChild(li);
    });
    document.getElementById("projects-area").removeAttribute("disabled");
};

app.refreshProjects = function() {
    $.get("/project", app.renderProjects);
};

app.pView = document.querySelector("#project-view");
app.loadProject = function(project) {
    var el = app.pView;
    el.innerHTML = "<table><tr><th>Name</th><td>"+project.name+"</td></tr></table>";
    el.ondblclick = function(e) {
        console.log("dblclick", e);
        app.editProject(project);
    };
};

app.editProject = function(project) {
    app.pView.innerHTML = app.form(project);
};

app.form = function(e) {
    var f = app.ProjectForm(e);
    return f.toHTML();
};

app.ProjectForm = function(p) {
    var f = document.createElement("form");
    f.method = "POST";
    f.action = "/project";
    var k;
    var i;
    var wrap;
    var label;
    for (k in p) {
        i = document.createElement('input');
        i.setAttribute("name", k);
        i.setAttribute("type", "text");
        i.setAttribute("value", p[k]);
        label = document.createElement('label');
        label.appendChild(document.createTextNode(k));
        label.appendChild(i);
        wrap = document.createElement("div");
        wrap.appendChild(label)
        
        
        f.appendChild(wrap);
    };
    var o = Object.create(null);
    var w = document.createElement("div");
    w.appendChild(f);
    o.toHTML = function() {
        return w.innerHTML;
    };
    return o;
};
