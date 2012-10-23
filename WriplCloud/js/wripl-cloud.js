(function() {
  var WriplCloud = {};                   // defining a namespace
  window.WriplCloud = WriplCloud;     // exporting the namespace up to the window


  // the template method below is a helper for Handlebars
  var template = function(name) {
    return Handlebars.compile($('#'+name+'-template').html());
  };

  /*
   *******************************************
   */

  WriplCloud.Interest = Backbone.Model.extend({
    name: function() { return this.get('name'); },
    importance: function() { return this.get('importance'); },
    
  });


  WriplCloud.Interests = Backbone.Collection.extend({
    model: WriplCloud.Interest,
    localStorage: new Store("interests")

  });


  /*
   *******************************************
   */

  WriplCloud.Index = Backbone.View.extend({

    template: template('index'),
    events: {
      "click button#clear" : "clearInterests"
    },
    initialize: function() {
      
      this.interests = new WriplCloud.Interests();  
      this.interests.on('all', this.render, this);
      this.interests.on('all', function() {
        console.log('event on interests ', arguments);
      })
      this.interests.fetch();
    },
    render: function() {
      this.$el.html(this.template(this));
      var form = new WriplCloud.Index.Form({collection: this.interests}); 
      var interestList = new WriplCloud.Index.Interests({collection: this.interests});
      this.$('.interests').append(interestList.render().el);
      this.$('.interests').append(form.render().el);

      return this;
    },

    count: function() {
      return this.interests.length;
    },
    clearInterests: function() {
      this.interests.reset();
      localStorage.clear();
      console.log("delete the interests");
    }

  });

  WriplCloud.Index.Interests = Backbone.View.extend({
    tagName: 'ul',
    id: 'cloud',
    
    render: function() {
      this.collection.each(function(interest){
        var view = new WriplCloud.Index.Interest({model: interest});
        this.$el.append(view.render().el);
      }, this);
      return this
    }

  });


  WriplCloud.Index.Interest = Backbone.View.extend({
    template: template('index-interest'),
    tagName: 'li',
    events: {
      "click button" : "delete",
      "mouseenter" : "showDelete",
      "mouseleave" : "hideDelete"
    },
    render: function() {
      this.$el.empty();
      this.$el.html(this.template(this));
      this.$('.btn').hide();
      return this;
    },
    name: function() { return this.model.name(); },
    importance: function() { return this.model.importance(); },
    showDelete: function(event) { 
      this.$('.btn').show();
    },
    hideDelete: function() { 
      this.$('.btn').hide();
    },
    delete: function() { 
      this.model.destroy();
    },

    
  });


  WriplCloud.Index.Form = Backbone.View.extend({     // putting this view as an attribute on the previous view
    tagName: 'form',
    className: 'form',
    template: template('index-form'),
    events: {
      "submit": "submit"
    },
    initialize: function(options) {
      this.importancePlaceholder = "tag5";
    },
    render: function() {
      // this.$el.text('foo');
      this.$el.html(this.template(this));
      return this;
    },
    submit: function(event) {
      event.preventDefault();
      
      if (this.$('input#name').val()){
        console.log(this.$('input#name').val(), this.$('input#importance').val());
        this.collection.create({
          name: this.$('input#name').val(),
          importance: this.$('input#importance').val() || this.importancePlaceholder
        });
        
      } else {
        this.shakeit();
      }
    },
    shakeit: function () {
      $("input#name").effect('shake', {times: 2, distance: 5}, 300);
    },
    importancePlaceholder: function() {
      return this.importancePlaceholder;
    }


  });

  /*
   *******************************************
   *
   */

  WriplCloud.Router = Backbone.Router.extend({
    initialize: function(options) {
      this.el = options.el
    },
    routes: {
      "": "index"
    },
    index: function() {
      var view = new WriplCloud.Index();
      this.el.empty();
      this.el.append(view.render().el);
    }
  });

  WriplCloud.boot = function(container) {
    container = $(container);
    var router = new WriplCloud.Router({el: container})
    Backbone.history.start();
  }
})()
