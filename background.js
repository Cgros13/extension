console.log('je suis dans bck')


chrome.tabs.query({currentWindow: true}, function(tabs) {
  tabs.forEach(tab => {
    let new_url = tab.url.replace(':', '%3A').replaceAll('/', '%2F')
    fetch(`https://api.websitecarbon.com/site?url=${new_url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.url)
      console.log(data.cleanerThan)
      const stat = `<li>${data.cleanerThan}</li>`
      document.querySelector('ul').insertAdjacentHTML('beforeend', stat);
    })
  });
});
