(function() {
  var WriplCloud = {};                   // defining a namespace
  window.WriplCloud = WriplCloud;     // exporting the namespace up to the window


  // the template method below is a helper for Handlebars
  var template = function(name) {
    return Handlebars.compile($('#'+name+'-template').html());
  };

  /*
   ********************* Model **********************
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
   ********************* View **********************
   */

  WriplCloud.Index = Backbone.View.extend({

    template: template('index'),

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
      
      // The 2 following variables are NEW Views made ON the BreakfastRoll.index View.
      // One is the form, the other the lists of recipes.
      var form = new WriplCloud.Index.Form({collection: this.interests}); 
      var interestList = new WriplCloud.Index.Interests({collection: this.interests});
      this.$('.interests').append(interestList.render().el);
      this.$('.interests').append(form.render().el);

      return this;
    },

    count: function() {
      return this.interests.length;
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


  // will be InterestView.js

  WriplCloud.Index.Interest = Backbone.View.extend({
    template: template('index-interest'),
    tagName: 'li',
    events: {
      "click button" : "delete",
      "mouseenter" : "showDelete",
      "mouseleave" : "hideDelete"
    },
    render: function() {
       //this.$el.text(this.name());      // RR: This was used before started using a handlebars template
       this.$el.empty();
       this.$el.html(this.template(this));
       this.$('.btn').hide();
       

      return this;
    },
    name: function() { return this.model.name(); },
    importance: function() { return this.model.importance(); },
    showDelete: function(event) { 
      console.log("Show Delete on Hover!!!!!" +event);
      this.$('.btn').show();
    },
    hideDelete: function() { 
      this.$('.btn').hide();
    },
    delete: function() { 
      this.model.destroy();
    }
    
  });


  WriplCloud.Index.Form = Backbone.View.extend({     // putting this view as an attribute on the previous view
    tagName: 'form',
    className: 'form',
    template: template('index-form'),
    events: {
      "submit": "submit"
    },
    initialize: function(options) {

    },
    render: function() {
      // this.$el.text('foo');
      this.$el.html(this.template(this));
      return this;
    },
    submit: function(event) {
      event.preventDefault();
      console.log(this.$('input#name').val(), this.$('input#importance').val());
      this.collection.create({
        name: this.$('input#name').val(),
        importance: this.$('input#importance').val() || 'tag5'
      });
    }


  });

  /*
   ********************* Controller **********************
   * 
   *
   * including the router and boot function
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
