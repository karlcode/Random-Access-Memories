
let entries = [];
const storageKey = 'random-access-entry';
const timerKey = 'random-access-entry-timer';

// Remove all interfering events on host page
['keydown', 'keypress', 'keyup'].forEach(event => window.addEventListener(event, (e) => {
    e.stopImmediatePropagation();
}, true));

// Waiting for DOM to load since extension runs on document_start
document.addEventListener('DOMContentLoaded', setupFrequency, false);

function setupFrequency() {
    chrome.storage.sync.get([timerKey], function(result) {
    if (!result) {
        result[timerKey] = new Date().getDate();
    }
    if (result[timerKey] !== new Date().getDate()) {
        initPage();
    }
    resetTime()
    });
}
function initPage() {
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.documentElement.style.width = "100%";
    document.body.style.width = "100%";
    
    const container = document.createElement("div")
    const shadowRoot = container.attachShadow({mode: 'open'})
    shadowRoot.innerHTML = styles;
    
    const modal = document.createElement("dialog");
    const currentTime = new Date();
    let options = { hour: 'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    modal.innerHTML = `
    <div class="flex-container">
    <span class="time-heading">${currentTime.toLocaleDateString("en-US", options)}</span>
    <div class="input-wrap">
    <div id="lit" class="writing-space" placeholder="Tell me about your day" contenteditable="true"></div>
    </div>
    <button class="submit-button" id="submit"><span>Submit</span></button>
    </div>
    <div>  
        <button class="close-button" id="close"></button>
    </div>
    
    `;
    shadowRoot.appendChild(modal)
    document.body.appendChild(container);
    
    const dialog = shadowRoot.querySelector("dialog");
    dialog.showModal();
    dialog.querySelector("#close").addEventListener("click", () => {
        dialog.close();
    });
    let submitButton = dialog.querySelector("#submit")
    let inputSpace = shadowRoot.getElementById('lit');
    inputSpace.oninput = (e) => {
        if(inputSpace.innerHTML.length > 300) {
            inputSpace.style.color = 'tomato';
            submitButton.setAttribute("disabled", true)
        } else {
            inputSpace.style.color = '#1c1e29';
            submitButton.disabled = false;
        }
    };
    submitButton.addEventListener("click", () => {
        dialog.close();
        let object = {timestamp: currentTime.toLocaleDateString("en-US", options), entry: inputSpace.innerHTML};
        pushToEntries(object);
    });
}

function resetTime() {
    let date = new Date().getDate();
    chrome.storage.sync.set({[timerKey] : date}, function(){
        console.log("timez out")
    });
}

function saveEntry(input) {
    chrome.storage.sync.set({[storageKey] : input}, function(){
        if (chrome.runtime.lastError)
            alert("Error: unable to create post")
    });
}
function getEntries(callback) {
    chrome.storage.sync.get([storageKey], function(result) { //not returning a valid value for some reason
        callback(result[storageKey])
    })
}

function pushToEntries(entry) {
    getEntries(function(result) {
        if(!result) {
            result = []
        }
        result.push(entry);
        entries = result;
        saveEntry(entries);
    })
}

function deleteEntry() {

}