console.log("hello popup")

if (chrome.cookies) {
console.log("cookies are enabled")

  chrome.cookies.get({url: "http://localhost:3000", name:'signed_id'}, function(cookie) {
    if (cookie) {
      chrome.storage.sync.set({signed_id: cookie.value}, function() {
        console.log('Value is set to ' + cookie.value);
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
