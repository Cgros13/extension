const tabs = [];

chrome.tabs.onUpdated.addListener(function (tabId, ChangeInfo, tab) {
  if (
    tab.url?.startsWith("chrome://") ||
    tab.url?.startsWith("https://www.google.com/search?") ||
    tab.url?.startsWith("https://www.c0-de.tech") ||
    tab.url?.startsWith("https://c0-de.tech") ||
    tab.url?.startsWith("http://localhost:3000")
  ) {
    return undefined;
  } else {
    if (ChangeInfo.status === "complete") {
      // find if tab exists in tabs
      const foundTab = tabs.find((tabItem) => {
        return tabItem.tabId === tabId;
      });

      // if yes, update
      if (foundTab) {
        sendEndTimeToRails(foundTab);
        foundTab.url = tab.url;
        foundTab.visitId = undefined;
        // if no, add
      }
      sendVisitToRails(tab.url).then((tabData) => {
        console.log(tabData);
        const tabObject = {
          tabId: tabId,
          url: tab.url,
          visitId: tabData.id,
        };
        tabs.push(tabObject);
      });
    }
  }
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  console.log(removeInfo);
  if (removeInfo) {
    console.log("discarded");
    // find in tabs tab with tabId and send time to api
    const foundTab = tabs.find((tabItem) => {
      return tabItem.tabId === tabId;
    });
    if (foundTab) {
      console.log("found");
      sendEndTimeToRails(foundTab);
      const index = tabs.findIndex((tabItem) => {
        return tabItem.tabId === tabId;
      });
      tabs.splice(index, 1);
    }
  }
});

const sendVisitToRails = (url) => {
  // We retrieve the user token from the storage.
  console.log("sendVisitToRails", url);
  return new Promise((resolve, reject) => {
    chrome.cookies.get(
      {
        url: "https://www.c0-de.tech/",
        name: "signed_id",
      },
      function (cookie) {
        if (cookie) {
          fetch("https://www.c0-de.tech/api/v1/visits", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-User-Token": cookie.value,
            },
            body: JSON.stringify({
              visit: {
                url: url,
              },
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("je send le message avant runtime");
              chrome.runtime.sendMessage({ message: "update", data: data });
              console.log("je send le message apres runtime");
              resolve(data);
            });
        }
      }
    );
  });
};

const sendEndTimeToRails = (tab) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.get(
      { url: "https://www.c0-de.tech", name: "signed_id" },
      function (cookie) {
        if (cookie) {
          fetch(`https://www.c0-de.tech/api/v1/visits/${tab.visitId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "X-User-Token": cookie.value,
            },
            body: JSON.stringify({
              visit: {
                end_time: Date.now(),
              },
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              resolve(data);
              console.log(end_time);
            });
        }
      }
    );
  });
};
