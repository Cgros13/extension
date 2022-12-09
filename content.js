const retrieveAllVisitsRails = (cookie) => {
  fetch(`https://www.c0-de.tech/api/v1/visits`, {
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
  chrome.cookies.get({url: "https://www.c0-de.tech", name:'signed_id'}, function(cookie) {
    if (cookie) {
      // we want to retrieve the url of the current tab
      retrieveAllVisitsRails(cookie.value);
    } else {
      console.log('no cookie') // HTML sign in to rails app here
    }
  })
}
