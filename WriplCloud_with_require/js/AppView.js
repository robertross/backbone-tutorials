define([
  "underscore", 
  "backbone",
  "scripts/model/interest",
  "scripts/collection/interests", 
  "scripts/view/interestForm",
  "scripts/view/interests", 
  "text!scripts/templates/index.html"], 

  function( _, Backbone, InterestModel, InterestsCollection, InterestFormView, InterestsView, Template){
    
    var View = Backbone.View.extend({

        template: _.template(Template), 
        events: {
          "click button#clear" : "clearInterests"
        },
        el: "div#interestsApp",
        
        initialize: function() {
          this.interests = new InterestsCollection();

          this.interests.on('all', this.render, this);

          this.interests.on('add remove', function() {
            console.log('event on interests ', arguments, event);
          })

          this.interests.fetch();
        },
        
        render: function() {
          this.$el.html(this.template(this));

          var form = new InterestFormView({collection: this.interests}); 
          var interestsList = new InterestsView({collection: this.interests});

          this.$('.interests').append(interestsList.render().el);
          this.$('.interests').append(form.render().el);
        },

        count: function() {
          return this.interests.length;
        },
        clearInterests: function() {
          this.interests.reset();
          localStorage.clear();
        }

    }); 



    return View;

});