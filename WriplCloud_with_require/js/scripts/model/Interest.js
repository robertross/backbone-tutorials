define(["backbone"], function(Backbone) {

  var InterestModel = Backbone.Model.extend({
      
      name: function() { return this.get('name'); },
      importance: function() { return this.get('importance'); },

    
  });

  return InterestModel;
});