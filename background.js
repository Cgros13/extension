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
  if (removeInfo) {
    console.log("discarded");
    // find in tabs tab with tabId and send time to api
    const foundTab = tabs.find((tabItem) => {
      return tabItem.tabId === tabId;
    });
    if (foundTab) {
      console.log("found");
      return new Promise((resolve, reject) => {
        chrome.cookies.get(
          {url: "http://localhost:3000", name:'signed_id'},
          function(cookie) {
            if (cookie) {
            fetch(`http://localhost:3000/api/v1/visits/${foundTab.visitId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'X-User-Token': cookie.value,
              },
              body: JSON.stringify({
                visit: {
                  end_time: Date.now(),
                }
              })
            })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              resolve(data);
              console.log(end_time)
            })
          }
        })
      })
    }
  }
});

const sendVisitToRails = (url) => {
  // We retrieve the user token from the storage.
  console.log("sendVisitToRails", url);
  return new Promise((resolve, reject) => {
    chrome.cookies.get(
      {
        url: "http://localhost:3000",
        name:'signed_id'
      },
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
              console.log("je send le message avant runtime");
              chrome.runtime.sendMessage({message: "update", data: data});
              console.log("je send le message apres runtime");
              resolve(data)
            })
        }
      }
    )
  })
}
