define(["backbone", "AppView"], function(Backbone, AppView) {

  var WriplCloud = {};                    // defining a namespace
  //window.WriplCloud = WriplCloud;         // exporting the namespace up to the window

  var view;

  WriplCloud.Router = Backbone.Router.extend({
    initialize: function(options) {
      console.log('WriplCloud.Router initialising...');
      this.el = options.el
    },
    routes: {
      "": "index"
    },
    index: function() {
      console.log('WriplCloud.Router index route.');
      view = new AppView();
    },
    interests: function() {
      console.log('WriplCloud.Router INTERESTS route.');
      view = new AppView();
    }
  });

  WriplCloud.boot = function(container) {
    console.log('WriplCloud booting...');
    container = $(container);
    var router = new WriplCloud.Router({el: container})
    Backbone.history.start();
  }

  return WriplCloud;
});
