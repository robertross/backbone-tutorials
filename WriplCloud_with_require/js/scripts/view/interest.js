define([
  "underscore", 
  "backbone",
  "text!scripts/templates/index-interest.html"
  ], 

  function( _, Backbone, Template){
       
    var View = Backbone.View.extend({

      template: _.template(Template), 
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
        //this.$('.btn').show();
      },
      hideDelete: function() { 
        //this.$('.btn').hide();
      },
      delete: function() { 
        this.model.destroy();
      }

    }); 

    return View;
});