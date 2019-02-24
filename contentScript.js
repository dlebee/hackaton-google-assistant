function setRecordingState(isRecording) {
    chrome.runtime.sendMessage({
        type: 'recordingState',
        enabled: isRecording
    }, function(response) {
        console.log(response);
    });
}

document.addEventListener('keypress', function(e) {
    if (e.altKey == true && e.keyCode == 160)
    {
        setRecordingState(true);
    }
});