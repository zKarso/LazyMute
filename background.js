function findMeetTab(callback) {
    chrome.tabs.query({}, (tabs) => {
        let meetTab = tabs.find(tab => tab.url && tab.url.includes("https://meet.google.com/"));
        
        if (meetTab) {
            callback(meetTab.id);
        } else {
            console.log("⚠️ No active Google Meet tab found!");
        }
    });
}

function toggleMute(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
            let muteButton = document.querySelector('button[jsname="hw0c9"]');

            if (muteButton) {
                muteButton.click(); // Click to toggle mute
            } else {
                console.log("⚠️ Mute button not found!");
            }
        }
    });
}

function updateMeetMuteStatus(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
            let muteButton = document.querySelector('button[jsname="hw0c9"]');

            if (muteButton) {
                let isMuted = muteButton.getAttribute("aria-pressed") === "true";
                chrome.runtime.sendMessage({ muted: isMuted });
            } else {
                chrome.runtime.sendMessage({ muted: null });
            }
        }
    });
}

chrome.runtime.onMessage.addListener((message) => {
    let iconPath = message.muted ? "icons/icon-muted.png" : "icons/icon.png";
    
    chrome.action.setIcon({ path: iconPath }, () => {
        console.log("✅ Icon updated to:", iconPath);
    });
});

// When user clicks extension icon, find Meet tab & toggle mute
chrome.action.onClicked.addListener(() => {
    findMeetTab((tabId) => {
        toggleMute(tabId);
        setTimeout(() => updateMeetMuteStatus(tabId), 500);
    });
});

// Periodically check mute status (in case user mutes manually)
setInterval(() => {
    findMeetTab(updateMeetMuteStatus);
}, 1000);