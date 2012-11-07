require.config({
  baseUrl: "/js/",
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    'backbonelocalStorage': 'lib/backbonelocalStorage',
    jqueryui:"lib/jqueryui",
    text: "lib/text"
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery','jqueryui'],
      exports: 'Backbone'
    },
    'backbonelocalStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    }
  }
});

require([
    'jquery',
    'backbone',
    'wriplCloud'
  ], function($, Backbone, WriplCloud) {
    WriplCloud.boot();
  });