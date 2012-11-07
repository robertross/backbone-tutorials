// This set's up the module paths for underscore and backbone
require.config({ 
    paths: { 
		jquery:"jquery",
		jqueryui:"jquery-ui-1.9.0.custom.min",
		underscore: "underscore", 
		backbone: "backbone",
		handlebars: "handlebars",
		localstorage:"backbone-localstorage",
		text: "text"
	},
	shim: 
	{
		underscore:
  		{
  			exports: "_"
  		},
		backbone: {
			deps: ['underscore', 'jquery','localstorage','jqueryui'],
			exports: 'Backbone'
		},

	}
	,urlArgs: "bust=" +  (new Date()).getTime()	
}); 


require([
'underscore',
'jquery',
'Backbone',
'wriplCloud'
], 
function( _, $, Backbone, wriplCloud){
	wriplCloud.boot();
});

