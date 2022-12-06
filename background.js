const tabs = [];

chrome.tabs.onUpdated.addListener(function(tabId, ChangeInfo, tab) {
  if (tab.url?.startsWith("chrome://")) {
    return undefined;
  } else {
    if (ChangeInfo.status === 'complete') {
      // find if tab exists in tabs
      const foundTab = tabs.find((tabItem) => {
        return tabItem.tabId === tabId;
      });

      // if yes, update
      if (foundTab) {
        console.log("lqlqlqlql")
        // if no, add
      } else {
        sendVisitToRails(tab.url)
        .then((tabData) => {
          console.log(tabData);
          const tabObject = {
            tabId: tabId,
            url: tab.url,
            visitId: tabData.id,
          };
          tabs.push(tabObject);
        })
      }
    }
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  console.log(removeInfo);
  // find in tabs tab with tabId
  // if found, send time to api

  if (removeInfo) {
    console.log("discarded");

  }
});

  const sendVisitToRails = (url) => {
  // We retrieve the user token from the storage.
  return new Promise((resolve, reject) => {
    chrome.cookies.get(
      {url: "http://localhost:3000", name:'signed_id'},
      function(cookie) {
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
              chrome.runtime.sendMessage({message: "update", data: data});
              resolve(data)
            })
      }})
  })
  }
