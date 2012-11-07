define([
  "underscore", 
  "backbone",
  "text!scripts/Templates/index-form.html"], 

  function( _, Backbone, Template){
       
    var View = Backbone.View.extend({

      tagName: 'form',
      className: 'form',
      template: _.template(Template),      
      events: {
        "submit": "submit"
      },
      initialize: function(options) {
        this.importancePlaceholder = "tag5";
      },
      render: function() {
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
        this.$("input#name").effect('shake', {times: 2, distance: 5}, 300);
      },
      importancePlaceholder: function() {
        return this.importancePlaceholder;
      }

    }); 



    return View;

});








