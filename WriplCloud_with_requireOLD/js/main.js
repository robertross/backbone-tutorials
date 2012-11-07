
// This set's up the module paths for underscore and backbone

require.config({ 
    paths: { 
		underscore: "underscore", 
		jquery:"jquery",
		jqueryui:"jquery-ui-1.9.0.custom.min",
		backbone: "backbone",
		localstorage:"backbone-localstorage",
		text: "text"
	},
	shim: 
	{
		underscore: {
        	exports: '_' //the exported symbol
      	},
		backbone: {
			deps: ['underscore','jquery','localstorage','jqueryui'],
			exports: 'Backbone'
		},

	}
	//,urlArgs: "bust=" +  (new Date()).getTime()	
}); 


require([
'wriplCloud',
'underscore',
'jquery'], 
function(wriplCloud, _, $ ){
	console.log("wriplCloud "+wriplCloud);
	console.log("underscore "+_);
	console.log("jquery "+$);
	console.log("Backbone "+Backbone);
	wriplCloud.boot();
});
