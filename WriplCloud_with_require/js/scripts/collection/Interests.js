define(["scripts/model/Interest"], function(InterestModel) {

    var InterestsCollection = Backbone.Collection.extend({

        model: InterestModel,
    	localStorage: new Store("interests"),
    	url :'http://wriplcloud.rob/'
    });

    return InterestsCollection;

});