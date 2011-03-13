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

tweepFinder.ajax = function(query, callback) {
	var request =  new XMLHttpRequest();

  request.onreadystatechange = function() {
  	if (request.readyState == 4 && request.status == 200) {
     	callback(request.responseText);
    }
  }
  
  request.open('GET', query, true);
  request.send();	
}