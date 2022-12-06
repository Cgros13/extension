// document.getElementById('loading').style.display = 'block';
logIn();
displayEmoji();

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
      if (data.length > 0) {
        var last = data.length - 1
      } else {
        var last = 0
      }
      console.log(data[last])

      const percentage = parseInt((data[last].cleaner_than * 100));
      const stat = `<span>${(percentage)}%</span>`
      console.log(percentage);

      if (percentage > 50) {
        document.getElementById('loading').style.display = 'none';

        document.getElementById('response').insertAdjacentHTML('beforeend', `Cleaner than ${stat} of webpages`); // FR
        document.getElementById('circle').dataset.percentage = percentage;
      }
      else {
        document.getElementById('loading').style.display = 'none';

        const stat2 = `<span>${100 - percentage} %</span>`
        document.getElementById('response').insertAdjacentHTML('beforeend', `Dirtier than ${stat2} of webpages`); // FR
        document.getElementById('circle').dataset.percentage = percentage;
      }
      displayEmoji();
    })
  }
// Declare an array object for array of images
// Push the URLs to the array of images
let perfectEmojis = [];
perfectEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/partying-face_1f973.png');

let goodEmojis = [];
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/star-struck_1f929.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/leaf-fluttering-in-wind_1f343.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/seedling_1f331.png');

let okEmojis = [];
okEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/slightly-smiling-face_1f642.png');
okEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/neutral-face_1f610.png');
okEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-without-mouth_1f636.png');

let badEmojis = [];

badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/woozy-face_1f974.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-screaming-in-fear_1f631.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/thumbs-down_1f44e.png');

let loading = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/hourglass-not-done_23f3.png";


// Popup emoji code
let progressCircles = document.querySelectorAll('.c-progress-circle');
let emoji = document.querySelector('#emoji');

function displayEmoji() {
  setTimeout(function(){
    for(let i=0; i < progressCircles.length; i++) {
      let circle = progressCircles[i];
      let val = Number(circle.getAttribute('data-percentage'));
      let bar = circle.querySelectorAll('.c-progress-circle__bar')[0];

      if (val === 0) {
        emoji.src = "https://www.jimphicdesigns.com/downloads/imgs-mockup/blue-hourglass.gif";
      } else if (val < 30) {
        bar.style.stroke = "#d00000"
        //emoji bad
        let randomIndexBad = Math.floor(Math.random() * badEmojis.length);
        emoji.src = badEmojis[randomIndexBad];
      } else if (val < 60) {
        //emoji moyen
        bar.style.stroke = "#e3d400"
        let randomIndexOk = Math.floor(Math.random() * okEmojis.length);
        emoji.src = okEmojis[randomIndexOk];
      } else if (val < 90) {
        //emoji bon
        bar.style.stroke = "#31c200"
        let randomIndexGood = Math.floor(Math.random() * goodEmojis.length);
        emoji.src = goodEmojis[randomIndexGood];
      } else {
        // emoji perfect
        bar.style.stroke = "#00ffee"
        let randomIndexGood = Math.floor(Math.random() * goodEmojis.length);
        emoji.src = perfectEmojis[randomIndexGood];
      }

      if (isNaN(val)) {
        val = 100;
      }
      else {
        let r = bar.getAttribute('r');
        let c = Math.PI*(r*2);
        if (val < 0) {
          val = 0;
        } else if(val > 100) {
        val = 100;
        }
        let pct = ((100-val)/100)*c;
        bar.style.strokeDashoffset = pct;
        bar.setAttribute('data-percentage', val);
      }
    }
  }, 500);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == "update") {
    logIn();
  }
});

function logIn() {
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
}
