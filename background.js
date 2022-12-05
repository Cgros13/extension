chrome.tabs.onUpdated.addListener(function(tabId, ChangeInfo, tab) {
  if (tab.url?.startsWith("chrome://")) {
    return undefined;
  } else {
    if (ChangeInfo.status === 'complete') {
      sendVisitToRails(tab.url)
    }
  }
});

const sendVisitToRails = (url) => {
  // We retrieve the user token from the storage.
  chrome.cookies.get({url: "http://localhost:3000", name:'signed_id'}, function(cookie) {
    if (cookie) {
      fetch('http://localhost:3000/api/v1/visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Token': cookie.value,
        },
        body: JSON.stringify({
          visit: {
            url: url,
          }
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          chrome.runtime.sendMessage({message: "update", data: data});
          

        })
    }})
  }
