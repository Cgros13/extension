document.getElementById('loading').style.display = 'block';

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
      let last = data.length - 1
      const percentage = parseInt((data[last].cleaner_than * 100));
      const stat = `<span>${(parseInt((data[last].cleaner_than * 100)))}%</span>`
      if (percentage > 50) {
        document.getElementById('loading').style.display = 'none';

        document.getElementById('response').insertAdjacentHTML('beforeend', `Cleaner than ${stat} of webpages`); // FR
        document.getElementById('circle').dataset.percentage = percentage;
      }
      else {
        document.getElementById('loading').style.display = 'none';

        let stat2 = `<span>${100 - percentage} %</span>`
        document.getElementById('response').insertAdjacentHTML('beforeend', `Dirtier than ${stat2} of webpages`); // FR
        document.getElementById('circle').dataset.percentage = percentage;
      }
    })
  }



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



// Declare an array object for array of images
let perfectEmojis = [];
let goodEmojis = [];
let okEmojis = [];
let badEmojis = [];

// Push the URLs to the array of images
perfectEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/partying-face_1f973.png');

goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/star-struck_1f929.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/leaf-fluttering-in-wind_1f343.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/seedling_1f331.png');

okEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/slightly-smiling-face_1f642.png');
okEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/neutral-face_1f610.png');
okEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-without-mouth_1f636.png');

badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/woozy-face_1f974.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-screaming-in-fear_1f631.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/thumbs-down_1f44e.png');


// Popup emoji code
let progressCircles = document.querySelectorAll('.c-progress-circle');
let emoji = document.querySelector('#emoji');

setTimeout(function(){
  for(let i=0; i < progressCircles.length; i++) {
    let circle = progressCircles[i];
    let val = Number(circle.getAttribute('data-percentage'));
    let bar = circle.querySelectorAll('.c-progress-circle__bar')[0];

    if (val === 1) {
      bar.style.stroke = "#d00000";
      emoji.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-with-thermometer_1f912.png";
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
