/**
 * Chrome Specific Utility Functions.
**/

//set up the namespace.
var tweepFinder = window.tweepFinder || {};

// open link in new tab
tweepFinder.openInNewTab = function(url)  {
  return 'javascript:chrome.tabs.create({url: \'' + encodeURI(url) + '\'})';
}

tweepFinder.updateCounter = function(count, verified) {
	if(verified) {
  	chrome.browserAction.setBadgeBackgroundColor({color: [0, 200, 0, 255]});	
	}
	else {
		chrome.browserAction.setBadgeBackgroundColor({color: [200, 200, 200, 255]});			
	}
	chrome.browserAction.setBadgeText({text: '' + count});	
}