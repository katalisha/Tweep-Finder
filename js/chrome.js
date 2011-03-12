/**
 * Chrome Specific Utility Functions.
**/

// open link in new tab
function openInNewTab(url)  {
  return 'javascript:chrome.tabs.create({url: \'' + encodeURI(url) + '\'})';
}

function updateCounter(count) {
	if(count > 0) {
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 255, 0, 255]});		
	}
	else {
    chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});		
	}
	chrome.browserAction.setBadgeText({text: '' + count});	
}