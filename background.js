console.log('je suis dans bck')


chrome.tabs.query({currentWindow: true}, function(tabs) {
  console.log(tabs)
  tabs.forEach(tab => {
    let new_url = tab.url.replace(/^https?:\/\//, '')
    fetch(`https://api.websitecarbon.com/site?url=https%3A%2F%2F${new_url}%2F`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // chrome.tabs.sendMessage(tab.id, {type: "carbon", value: data})
    })

  });
});
