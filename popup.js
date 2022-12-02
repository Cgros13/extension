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


// Declare an array object for array of images
let goodEmojis = [];
let okEmojis = [];
let badEmojis = [];

// Push the URLs to the array of images
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/star-struck_1f929.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-heart-eyes_1f60d.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-halo_1f607.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/partying-face_1f973.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/leaf-fluttering-in-wind_1f343.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/seedling_1f331.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/growing-heart_1f497.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/heart-hands_1faf6.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/hugging-face_1f917.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/partying-face_1f973.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/thumbs-up_1f44d.png');
goodEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/folded-hands_1f64f.png');


okEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-smiling-eyes_1f60a.png');
okEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/slightly-smiling-face_1f642.png');
okEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/neutral-face_1f610.png');
okEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-without-mouth_1f636.png');

badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/biohazard_2623-fe0f.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/350/radioactive_2622-fe0f.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/melting-face_1fae0.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-tear_1f972.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-with-peeking-eye_1fae3.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/grimacing-face_1f62c.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-with-medical-mask_1f637.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-with-thermometer_1f912.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-with-head-bandage_1f915.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/sneezing-face_1f927.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/exploding-head_1f92f.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/hot-face_1f975.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/cold-face_1f976.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/woozy-face_1f974.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/frowning-face_2639-fe0f.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/worried-face_1f61f.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/slightly-frowning-face_1f641.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/fearful-face_1f628.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/anxious-face-with-sweat_1f630.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-screaming-in-fear_1f631.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/mending-heart_2764-fe0f-200d-1fa79.png');
badEmojis.push('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/thumbs-down_1f44e.png');


// Popup emoji code
let progressCircles = document.querySelectorAll('.c-progress-circle');
let emoji = document.querySelector('#emoji');

setTimeout(function(){
  for(let i=0; i < progressCircles.length; i++) {
    let circle = progressCircles[i];
    let val = Number(circle.getAttribute('data-percentage'));
    let bar = circle.querySelectorAll('.c-progress-circle__bar')[0];

    if (val < 50) {
      bar.style.stroke = "#6A040F"
      //emoji bad
      let randomIndexBad = Math.floor(Math.random() * badEmojis.length);
      emoji.src = badEmojis[randomIndexBad];
    } else if (val < 51) {
      //emoji moyen
      bar.style.stroke = "#F9844A"
      let randomIndexOk = Math.floor(Math.random() * okEmojis.length);
      emoji.src = okEmojis[randomIndexOk];
    }else {
      // emoji cool
      bar.style.stroke = "#31572C"
      let randomIndexGood = Math.floor(Math.random() * goodEmojis.length);
      emoji.src = goodEmojis[randomIndexGood];
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
