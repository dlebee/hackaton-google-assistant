function upgrade() {
  alert('Please upgrade to Google Chrome for best possible experience.');
}

if (!(window.webkitSpeechRecognition) && !(window.speechRecognition)) {
  upgrade();
} else {

  navigator.webkitGetUserMedia({
      audio: true,
  }, function(stream) {

    var speech = new webkitSpeechRecognition() || speechRecognition();
    speech.lang = 'en-US';
    speech.continuous = true;
    speech.interimResults = true;
  
    var recognizing;
  
    function reset() {
      recognizing = false;
    }
  
    document.onkeydown = function (e) {
      if (e.key === "q") {
        if (!recognizing) {
          speech.start();
        }
      }
    };
  
    document.onkeyup = function (e) {
      if (e.key === "q") {
        if (recognizing) {
          //speech.stop();
          //reset();
        }
      }
    };
  
    speech.onstart = function () {
      // When recognition begins
      recognizing = true;
      console.log("Speaking!");
    };
  
    speech.onresult = function (event) {
  
      var final_transcript = '';
      var interim_transcript = '';
  
      // main for loop for final and interim results
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
  
      console.log(final_transcript);
      console.log(interim_transcript);


   
      // transcription.innerHTML = final_transcript;
      // interim_span.innerHTML = interim_transcript;
  
      // var makeArray = final_transcript.split(' ');
      // var bColor = makeArray.splice(-3);
      // // change background color
      // if ((/^change /g.test(final_transcript)) && (/background color/g.test(final_transcript))) {
      //   if (bColor[0] === 'to') {
      //     document.body.style.backgroundColor = bColor[1] + bColor[2];
      //   } else if (bColor[1] === 'to') {
      //     document.body.style.backgroundColor = bColor[2];
      //   } else {
      //     document.body.style.backgroundColor = bColor[0] + bColor[1] + bColor[2];
      //   }
      // }
    };
  
    speech.onerror = function (event) {
      // When recognition fails or error occurs
      console.error(event.error);
    };
  
    speech.onend = function () {
      // When recognition ends
      console.log("Hold 'Q' to begin speech.");
      reset();
    };
      // Now you know that you have audio permission. Do whatever you want...
  }, function() {
      // Aw. No permission (or no microphone available).
  });
}