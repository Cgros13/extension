chrome.tabs.onUpdated.addListener(function(tabId, ChangeInfo, tab) {
  if (tab.url?.startsWith("chrome://")) {
    return undefined;
  } else {
    console.log('je suis dans le else')
    if (ChangeInfo.status === 'complete') {
      console.log('je suis dans le complet if')
      sendVisitToRails(tab.url)
    }
  }
});

const sendVisitToRails = (url) => {
  // We retrieve the user token from the storage.
  chrome.cookies.get({url: "http://localhost:3000", name:'signed_id'}, function(cookie) {
    if (cookie) {
      console.log(cookie);
      console.log(cookie.value);
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
    }})
  }



// const messageFunctionMapper = {
//   fetch: sendVisitToRails,
// }

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if (request.msg in messageFunctionMapper) {
//       console.log(request)
//       messageFunctionMapper[request.msg](request, sender, sendResponse)
//     }
//   }
// );



// // chrome.tabs.query({currentWindow: true}, function(tabs) {
// //   tabs.forEach(tab => {
// //     // let new_url = tab.url.replace(':', '%3A').replaceAll('/', '%2F')
// //     console.log(tab)
// //     fetch(`http://localhost:3000/api/v1/visits`,
// //     {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json'
// //         },
// //       body: JSON.stringify({
// //         url: tab.url
// //         })
// //     })
// //     .then(response => response.json())
// //     .then(data => {
// //       console.log(data)
// //       // console.log(data.cleanerThan)
// //       // const stat = `<li>${data.cleanerThan}</li>`
// //       // document.querySelector('ul').insertAdjacentHTML('beforeend', stat);
// //       // chrome.scripting.executeScript({
// //       //   target: {tabId: tab.id},
// //       //   files: ['content.js']
// //       // });
// //     })
// //   });
// // });



// // // we are goind to retreive the cookie value in the chrome local storage
// // chrome.storage.sync.get(['signed_id'], function(result) {
// //   console.log('Value currently is ' + result.signed_id);
// // });
