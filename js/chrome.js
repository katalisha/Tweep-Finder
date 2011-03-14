/**
 * Chrome Specific Utility Functions.
**/

//set up the namespace.
var tweepFinder = window.tweepFinder || {};

// open link in new tab
tweepFinder.openInNewTab = function(url)  {
  return 'javascript:chrome.tabs.create({url: \'' + encodeURI(url) + '\'})';
}

tweepFinder.updateCounter = function(count) {
	if(count > 0) {
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 255, 0, 255]});		
	}
	else {
    chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});		
	}
	chrome.browserAction.setBadgeText({text: '' + count});	
}