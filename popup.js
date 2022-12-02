const retrieveVisitsRails = (url, cookie) => {
  fetch(`http://localhost:3000/api/v1/visits?url=${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': cookie,
    },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const stat = `<li>${data.cleanerThan}</li>`
      document.querySelector('ul').insertAdjacentHTML('beforeend', stat);
      // we want to store in local storage the visit id and the url
      // chrome.storage.sync.set({results: [}, function() {
      //   console.log('Value is set to ' + data);
      // });
      // chrome.runtime.sendMessage({
      //   message: "created_visit",
      //   cleanerThan: data.cleaner_than,
      //   url: url

      // });
    })
  }



if (chrome.cookies) {

  chrome.cookies.get({url: "http://localhost:3000", name:'signed_id'}, function(cookie) {
    if (cookie) {
      // we want to retrieve the url of the current tab
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let url = tabs[0].url;
        retrieveVisitsRails(url, cookie.value);
      });
    } else {
      console.log('no cookie') // HTML sign in to rails app here
    }
  })
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "created_visit") {
      console.log("created visit")
      console.log(request)
      const stat = `<li>${request.cleanerThan}</li>`
      document.querySelector('ul').insertAdjacentHTML('beforeend', stat);
    }
  }
);
