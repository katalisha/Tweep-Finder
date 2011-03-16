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
 * Info Interface - required function for information objects used by the popup html.
**/
tweepFinder.Info = new Interface('Info', ['getName', 'getFullName', 'getImageURL', 'getDescription', 'getURL']);

/**
 * Tweep class.
 * Represents a twitter account.
**/
tweepFinder.Tweep = function(name, frequency) {
	this._name;
	this._frequency = frequency;
	this._data = null;
	var me = this;
	
	this.setName(name);
	
	//make sure the twitter object implements the connector interface.
	Interface.ensureImplements(this, tweepFinder.Info);	
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

// retreives the data from twitter. The data and the given callback will be passed
// on to the update function.
tweepFinder.Tweep.method('retrieveData', function(callback) {
	if(this._data != null)
	{
		callback(this);	
	}
	else
	{
		// create closure for so callback function has access to this.
		var me = this;
		tweepFinder.Twitter.lookUp(this._name,
			function(response) {
				me.update(response);
				callback(me);
			}
		);
	}
});

// updates the tweep data and executes the given callback.
tweepFinder.Tweep.method('update', function(data, callback) {
	this._data = data;
});

tweepFinder.Tweep.method('getFullName', function() {
	return this._data.name || 'Unknown';
});

tweepFinder.Tweep.method('getImageURL', function() {
	return this._data.profile_image_url || 'images/noTwitterImg.png';
});

tweepFinder.Tweep.method('getDescription', function() {
	return this._data.description || '';	
});

tweepFinder.Tweep.method('getURL', function() {
	return 'http://twitter.com/' + this._name;
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
	 var _failure;
	return {
		// return the regex for this connector.
		getRegex: function() {
			return _regex;
		},
		setAjaxFailureCallback: function(callback) {
			_failure = callback;
		},
		
		// look up a match from the regex.
		lookUp: function(regexMatch, callback) {
			$.ajax({
				url: 'http://api.twitter.com/1/users/show.json?screen_name=' + regexMatch,
				dataType: 'json',
				success: function(response) {
					callback(response);	
				},
				// the callback will not be called.
				error: function(jqXHR, textStatus, errorThrown) {
					if(jqXHR.status == '400') {
						if(typeof(_failure) == 'function') {
							_failure();	
						}
					}
				}
			});
		}
	}
})();

//make sure the twitter object implements the connector interface.
Interface.ensureImplements(tweepFinder.Twitter, tweepFinder.Connector);