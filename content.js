const retrieveAllVisitsRails = (cookie) => {
  fetch(`http://localhost:3000/api/v1/visits`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': cookie,
    },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById('result').insertAdjacentHTML('beforeend', data);
    })
  }
if (chrome.cookies) {
  chrome.cookies.get({url: "http://localhost:3000", name:'signed_id'}, function(cookie) {
    if (cookie) {
      // we want to retrieve the url of the current tab
      retrieveAllVisitsRails(cookie.value);
    } else {
      console.log('no cookie') // HTML sign in to rails app here
    }
  })
}
