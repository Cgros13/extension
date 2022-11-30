if (chrome.cookies) {
  chrome.cookies.get({url: "http://localhost:3000", name:'signed_id'}, function(cookie) {
    if (cookie) {
      // we want to set in chrome storage the cookie value
      chrome.storage.sync.set({signed_id: cookie.value}, function() {
        console.log('Value is set to ' + cookie.value);
      });
    } else {
      console.log('no cookie') // HTML sign in to rails app here
    }
  })
}
