(function() {
  var BreakfastRoll = {};                   // defining a namespace
  window.BreakfastRoll = BreakfastRoll;     // exporting the namespace up to the window


  // the template method below is a helper for Handlebars
  var template = function(name) {
    return Handlebars.compile($('#'+name+'-template').html());
  };

  BreakfastRoll.Recipe = Backbone.Model.extend({
    name: function() { return this.get('name'); },
    ingredients: function() { return this.get('ingredients'); }
  });

  BreakfastRoll.Recipes = Backbone.Collection.extend({
    // url: '/recipes'    // if I was using a server instead of the local store
                          // fetch() would do an Ajax call to get the recipes
    model: BreakfastRoll.Recipe,
    localStorage: new Store("recipes")
  });

  BreakfastRoll.Index = Backbone.View.extend({
    template: template('index'),
    initialize: function() {
      this.recipes = new BreakfastRoll.Recipes();  
      this.recipes.on('all', this.render, this);
      this.recipes.on('all', function() {
        console.log('event on recipes (trad)', arguments);
      })
      this.recipes.fetch();
    },
    render: function() {
      this.$el.html(this.template(this));
      
      // The 2 following variables are NEW Views made ON the BreakfastRoll.index View.
      // One is the form, the other the lists of recipes.
      var form = new BreakfastRoll.Index.Form({collection: this.recipes}); // RR: This 'new' was missing for ages. Gah.
      var recipesList = new BreakfastRoll.Index.Recipes({collection: this.recipes});
      

      this.$('.recipes').append(recipesList.render().el);
      this.$('.recipes').append(form.render().el);
      return this;
    },
    count: function() {
      return this.recipes.length;
    }
  });

  BreakfastRoll.Index.Recipes = Backbone.View.extend({
    render: function() {
      this.collection.each(function(recipe){
        // make a subview
        var view = new BreakfastRoll.Index.Recipe({model: recipe});
        this.$el.append(view.render().el);
      }, this);
      //this.$el.text('recipes go here!!!');
      return this
    }
  });

  BreakfastRoll.Index.Recipe = Backbone.View.extend({
    template: template('index-recipe'),
    events: {
      "click button" : "delete"
    },
    render: function() {
      // this.$el.text(this.name());      // RR: This was used before we started using a handlebars template
      this.$el.html(this.template(this));
      return this;
    },
    name: function() { return this.model.name(); },
    ingredients: function() { return this.model.ingredients(); },
    delete: function() { 
      this.model.destroy();
    }
    
  });

  BreakfastRoll.Index.Form = Backbone.View.extend({     // putting this view as an attribute on the
    tagName: 'form',
    className: 'form',
    template: template('index-form'),
    events: {
      "submit": "submit"
    },
    initialize: function(options) {

    },
    render: function() {
      this.$el.text('foo');
      this.$el.html(this.template(this));
      return this;
    },
    submit: function(event) {
      event.preventDefault();
      console.log("Hey Rob! I should do things");
      console.log(this.$('input#name').val(), this.$('input#ingredients').val());
      
      this.collection.create({
        name: this.$('input#name').val(),
        ingredients: this.$('input#ingredients').val()
      });
    }
  });                                                   // on the previous view. A nice way to namespace.

  /*
   * To do:
   *
   * * BreakfastRoll.Index.Form
   *   A view that renders a form which can be submitted
   *   to create a new recipe
   * * BreakfastRoll.Index should add a subview for each
   *   recipe in the database
   * * BreakfastRoll.Recipe
   *   A view that renders an individual recipe
   *   Also, a delete button to remove it
   */

  BreakfastRoll.Router = Backbone.Router.extend({
    initialize: function(options) {
      this.el = options.el
    },
    routes: {
      "": "index"
    },
    index: function() {
      var view = new BreakfastRoll.Index();
      this.el.empty();
      this.el.append(view.render().el);
    }
  });

  BreakfastRoll.boot = function(container) {
    container = $(container);
    var router = new BreakfastRoll.Router({el: container})
    Backbone.history.start();
  }
})()
