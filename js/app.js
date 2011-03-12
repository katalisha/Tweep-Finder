/**
 * Tweeps Specific Applications and Classes.
**/

/**
 * Search class.
 * Searches the page for any twitter accounts.
**/
var Search = function() { 
	this._results;
};

// Run the search.
Search.method('processResults', function(results) {
	var tweep;
	this._results = new Array();
	
	for(var i in results)
	{
		tweep = new Tweep(i, results[i]);
		this._results.push(tweep);
	}
	console.log(this._results);
	this._results.sort(tweepSort);
});

// Get the number of results.
Search.method('getResultCount', function() {
	return this._results.length;
});

// Get the array of results.
Search.method('getResults', function() {
	return this._results;
});

/**
 * Tweep class.
 * Represents a twitter account.
**/
var Tweep = function(name, frequency) {
	this._name;
	this._frequency = frequency;

	this.setName(name);
}

// set the twitter name
Tweep.method('setName', function(name) {
	this._name = name;
});

// get the twitter name
Tweep.method('getName', function() {
	return this._name;	
});

Tweep.method('getFrequency', function() {
	return this._frequency;
});

/**
 * Sort Tweep objects according to frequency descending, if same frequency leave in order.
**/
var tweepSort = function(a, b) {
	return -(a.getFrequency() - b.getFrequency());
}