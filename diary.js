const storageKey = 'random-access-entry';
const timerKey = 'random-access-entry-timer';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];


chrome.storage.sync.get([storageKey], function(result) {
    setupPage(result[storageKey]);
});

function setupPage(entries) {
    let element = document.getElementById("entry-holder");
    let newPostButton = document.getElementById("new-post");
    newPostButton.addEventListener('click', newPost);

    for(let log of entries) {
        let logElement = document.createElement("article");
        let date = new Date(log.timestamp);
        let month = monthNames[date.getMonth()];
        let day = date.getDate();
        let weekDay = weekDays[date.getDay()];
        let year = date.getFullYear();
        let options = { hour: 'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        logElement.innerHTML = `
            <header><span style="color: #36454F">${time}</span> <span style="font-size: 0.9em">${weekDay} ${day}${nth(day)} ${month} ${year}</span></header>
            <p>${log.entry}</p>
            <button id="delete-post">Delete</button>
            `
        element.appendChild(logElement);
        let deletePostButton = document.getElementById("delete-post")
        deletePostButton.addEventListener('click', deleteEntry(log.timestamp));
    }
}

function nth(day) {
    if (day > 3 && day < 21) return 'th';
    switch(day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function newPost() {
    initPage();
}
// Waiting for DOM to load since extension runs on document_start
document.addEventListener('DOMContentLoaded', initPage
, false);


function setupFrequency(frequency) {
    chrome.storage.sync.get([timerKey], function(result) {
        if (!result) {
            result[timerKey] = new Date().getDate();
        }
        console.log(result[timerKey]);

        // if (result[timerKey] !== new Date().getDate()) {
        //     initPage();
        // }
        if(result[timerKey]) {
            setInterval(function(){ // Set interval for checking
                if(result[timerKey].getHours() >= 8 && result[timerKey].getHours()  <= 24){ // Check the time if its within this range
                    console.log('its time')
                }
                else {
                    console.log('not time yet')
                }
            }, 1000*60*60*frequency); //itll check once every freq hours, then itll run the inside function
        }
        resetTime()
    });
}
function initPage() {
    console.log(document)
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
    <div tabindex="1" id="lit-writing-area" class="entry-writing-space" placeholder="Tell me about your day" contenteditable="true"></div>
    </div>
    <button class="submit-button" id="submit-entry-button"><span>Submit</span></button>
    </div>
    <div>
        <button class="close-button" id="close-entry-modal"></button>
    </div>

    `;
    shadowRoot.appendChild(modal)
    document.body.appendChild(container);

    const dialog = shadowRoot.querySelector("dialog");
    dialog.showModal();
    dialog.querySelector("#close-entry-modal").addEventListener("click", () => {
        dialog.close();
    });
    let submitButton = dialog.querySelector("#submit-entry-button")
    let inputSpace = shadowRoot.getElementById('lit-writing-area');
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
    //Remove all interfering events on host page. Must be done within this modal element instead of window to avoid conflicting with host website
    ['keydown', 'keypress', 'keyup'].forEach(event => modal.addEventListener(event, (e) => {
        e.stopImmediatePropagation()
    }, true));
}

function resetTime() {
    let date = new Date().getDate();
    chrome.storage.sync.set({[timerKey] : date}, function(){
    });
}

function saveEntry(input) {
    chrome.storage.sync.set({[storageKey] : input}, function(){
        if (chrome.runtime.lastError)
            alert("Error: unable to create post")
    });
}
function getEntries(callback) {
    chrome.storage.sync.get([storageKey], function(result) {
        callback(result[storageKey])
    })
}

function pushToEntries(entry) {
    getEntries(function(result) {
        if(!result) {
            result = []
        }
        result.push(entry);
        saveEntry(result);
    })
}

function deleteEntry(entry) {
    console.log('delet this')
    chrome.storage.sync.remove(entry, function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }});
}
// function deleteEntry() {
//     chrome.storage.sync.clear(function() {
//         var error = chrome.runtime.lastError;
//         if (error) {
//             console.error(error);
//         }
//     });
// }

