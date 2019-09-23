const storageKey = 'random-access-entry';
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
            `
        element.appendChild(logElement);
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
// function deleteEntry() {
//     chrome.storage.sync.clear(function() {
//         var error = chrome.runtime.lastError;
//         if (error) {
//             console.error(error);
//         }
//     });
// }