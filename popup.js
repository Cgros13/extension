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

let perfect = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/partying-face_1f973.png';

const body = document.querySelector('body')
const container = document.querySelector('.container')

const notLoginHtml =
`
<div class="response-popup-api">
  <div class="popup-text" id="response">
    <div class="notlogged" id="login">
      <h3>Sorry, you need to log in first</h3>
      <a href="http://localhost:3000/users/sign_in" target="_blank" class="login-btn">Log in</a>
    </div>
  </div>
</div>
`

const loadingHtml =
`
<div class="loading-content" id="loading">
  <div class="loading-animation">
    <div class="load-9">
      <div class="spinner">
        <div class="bubble-1"></div>
        <div class="bubble-2"></div>
      </div>
    </div>
  </div>
  <div class="loading-text">
    <h3>Calculating Carbon footprint ...</h3>
  </div>
</div>
`

function logIn() {
  if (chrome.cookies) {
    chrome.cookies.get({url: "http://localhost:3000", name:'signed_id'}, function(cookie) {
      if (cookie) {
        setTimeout(() => {
          console.log(!document.body.contains(document.getElementById('response-api')));
          if (!document.body.contains(document.getElementById('response-api'))) {
            container.innerHTML = loadingHtml;
          }
        }, 100);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          let url = tabs[0].url;
          console.log("je me login", url);
          retrieveVisitsRails(url, cookie.value);
        });
      }
      else {
        container.innerHTML = notLoginHtml;
      }
    })
  }
}

logIn();

const retrieveVisitsRails = (url, cookie) => {
  console.log("retrieveVisitsRails", url);
  fetch(`http://localhost:3000/api/v1/visits?url=${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': cookie,
    },
  })
  .then(response => response.json())
  .then(data => {
    let last = 0
    if (data.length > 0) {
      last = data.length - 1
    }

    var percentage = parseInt((data[last].cleaner_than * 100));

    const stat = `<span>${(percentage)}%</span>`
    const stat2 = `<span>${100 - percentage} %</span>`
    if (percentage > 90) {
      console.log("perfect");
      var responseHtml = `<strong>Wow !! Cleaner</strong> than <strong>${stat}</strong> of webpages`;
      var stroke = "#31572C"
      var emojiSrc = perfect;
      var backgroundColor = '#CFE1B9;';
    } else if (percentage > 60) {
      console.log("good");
      var responseHtml = `<strong>Cleaner</strong> than <strong>${stat}</strong> of webpages`;
      var stroke = "#31572C"
      let randomIndexGood = Math.floor(Math.random() * goodEmojis.length);
      var emojiSrc = goodEmojis[randomIndexGood];
      var backgroundColor = '#CFE1B9;';
    }
    else if (percentage > 30) {
      console.log("ok");
      var responseHtml = `<strong>Cleaner</strong> than <strong>${stat}</strong> of webpages`;
      var responseColor = '#A14F03';
      var backgroundColor = '#F6DDB8;';
      var stroke = "#A14F03"
      let randomIndexOk = Math.floor(Math.random() * okEmojis.length);
      var emojiSrc = okEmojis[randomIndexOk];
    }
    else {
      console.log("bad");
      var responseHtml = `<strong>Dirtier</strong> than <strong>${stat2}</strong> of webpages`;
      var responseColor = '#9E2A2B';
      var backgroundColor = '#eac3c3;';
      var stroke = "#9E2A2B"
      let randomIndexBad = Math.floor(Math.random() * badEmojis.length);
      var emojiSrc = badEmojis[randomIndexBad];
    }

    console.log(backgroundColor);

    body.style.cssText += `background-color: ${backgroundColor};`;

    if (isNaN(percentage)) {
      percentage = 100;
    }
    else {
      if (percentage < 0) {
        percentage = 0;
      } else if(percentage > 100) {
        percentage = 100;
      }
      let c = Math.PI * 40;
      var pct = ((100 - percentage) / 100) * c;
    }

    const goodHtml =
    `
    <div id="response-api" class="response-popup-api">
      <div class="c-progress-circle" id="circle" data-percentage="${percentage}">
        <img id="emoji" alt="emoji" src="${emojiSrc}">
        <svg class="c-progress-circle__svg">
          <circle class="c-progress-circle__bar" r="20" cx="50%" cy="50%" stroke="${stroke}"></circle>
        </svg>
      </div>
      <div class="popup-text" id="response" style="color:${responseColor}">
        ${responseHtml}
      </div>
    </div>
    `

    container.innerHTML = goodHtml;
    const bar = document.querySelector('.c-progress-circle__bar');
    setTimeout(() => {
      bar.style.strokeDashoffset = pct;
      bar.setAttribute('data-percentage', percentage)
    }, 500);
  })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == "update") {
    logIn();
  }
});
