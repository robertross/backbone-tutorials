define(["scripts/model/interest","backbonelocalStorage"], function(InterestModel, localStorage) {

    var InterestsCollection = Backbone.Collection.extend({

        model: InterestModel,
    	localStorage: new Store("interests"),
    	url :'index'
    });

    return InterestsCollection;

});