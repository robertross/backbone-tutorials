define([
  "underscore", 
  "backbone",
  "scripts/view/Interest"
  ], 

  function( _, Backbone, InterestView){
       
    var View = Backbone.View.extend({

      tagName: 'ul',
      id: 'cloud',
      render: function() {
        this.collection.each(function(interest){
          var view = new InterestView({model: interest});
          this.$el.append(view.render().el);
        }, this);
        return this
      }

    }); 

    return View;
});
 

