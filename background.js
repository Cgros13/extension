

chrome.tabs.onUpdated.addListener(function(tabId, ChangeInfo, tab) {
  if (ChangeInfo.status === 'complete') {


    chrome.cookies.get({url: "http://localhost:3000", name:'signed_id'}, function(cookie) {
      if (cookie) {
        visit_url = tab.url


        fetch(`http://localhost:3000/api/v1/visits`,
        {
          method: 'POST',
          headers: {
            'X-User-Token': cookie.value,
            'Content-Type': 'application/json'
            },
          body: JSON.stringify({
            url: tab.url
            })
        })


        // .then(response => {
        //   console.log(response)
        //   response.json()
        // })
        .then(data => {
          if (data.status === 'done') {
            console.log("done")

            chrome.runtime.sendMessage({
              msg: "created_visit",
              content: {
                subject: "success",
                content: data["message"]
              }
            })
          }
          //erreurs eventuelles
        })
      }
    })
  }
});


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
