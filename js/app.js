/**
 * Tweeps Specific Applications and Classes.
**/

// set up the namespace.
var tweepFinder = window.tweepFinder || {};

/**
 * Search class.
 * Searches the page for any twitter accounts.
**/
tweepFinder.Search = function() { 
	this._results;
};

// Run the search.
tweepFinder.Search.method('processResults', function(results) {
	var tweep;
	this._results = new Array();
	
	for(var i in results)
	{
		tweep = new tweepFinder.Tweep(i, results[i]);
		this._results.push(tweep);
	}
	this._results.sort(tweepFinder.tweepSort);
});

// Get the number of results.
tweepFinder.Search.method('getResultCount', function() {
	return this._results.length;
});

// Get the array of results.
tweepFinder.Search.method('getResults', function() {
	return this._results;
});

/**
 * Tweep class.
 * Represents a twitter account.
**/
tweepFinder.Tweep = function(name, frequency) {
	this._name;
	this._frequency = frequency;
	this._data;
	var me = this;
	
	this.setName(name);
	
	this.render = function(data) {
		me._data = data;
		console.log(me);
	}	
}

// set the twitter name
tweepFinder.Tweep.method('setName', function(name) {
	this._name = name;
});

// get the twitter name
tweepFinder.Tweep.method('getName', function() {
	return this._name;	
});

tweepFinder.Tweep.method('getFrequency', function() {
	return this._frequency;
});

tweepFinder.Tweep.method('retrieveData', function() {
	tweepFinder.Twitter.lookUp(this._name, this.render);
});


/**
 * Sort Tweep objects according to frequency descending, if same frequency leave in order.
**/
tweepFinder.tweepSort = function(a, b) {
	return -(a.getFrequency() - b.getFrequency());
}

/**
 * Connections to third party apps. Just Twitter at the moment.
**/

// define the interface for connectors.
tweepFinder.Connector = new Interface('Connector', ['getRegex', 'lookUp']);

// Twitter Singleton
tweepFinder.Twitter = (function() {
	 var _regex = /twitter\.com\/(\w{1,15})($|[^\w?])/i;

	return {
		// return the regex for this connector.
		getRegex: function() {
			return _regex;
		},
		
		// look up a match from the regex.
		lookUp: function(regexMatch, callback) {
			tweepFinder.ajax(
				'http://api.twitter.com/1/users/show.json?screen_name=' + regexMatch,
				callback
			);
		}
	}
})();

//make sure the twitter object implements the connector interface.
Interface.ensureImplements(tweepFinder.Twitter, tweepFinder.Connector);