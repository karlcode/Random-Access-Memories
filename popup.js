function clickMeHandler(e) {
    chrome.runtime.sendMessage({directive: "popup-click"}, function (response) {
        alert("yeet")
        this.close(); // close the popup when the background finishes processing request
    });
}

function openBackgroundPage() {
    chrome.tabs.create({url: chrome.extension.getURL("diary.html")})
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('click-me').addEventListener('click', clickMeHandler);
    document.getElementById('open-entries').addEventListener('click', openBackgroundPage);
})