/**
 * content script called from the background page.
**/

// Listen for the background page's request, run findTweeps and send back the result.
if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    sendResponse(findTweeps());
  });
}

// Search the a tags for twitter.com/<name> and return the matches in an array.
// rules out search?... links by requiring the last character not be a ?
var findTweeps = function() {
  var found = new Object();
  var re = tweepFinder.Twitter.getRegex();
  var tName;

	// search all the links for twitter names.
	links = document.getElementsByTagName('a');
	for(i = 0; i < links.length; i++)
	{
		if(result = links[i].href.match(re))
		{
			tName = result[1].toLowerCase();
			
			if(found[tName])
			{
				found[tName] ++;
			}
			else
			{
				found[tName] = 1;
			}
		}
	}
	return found;
}

