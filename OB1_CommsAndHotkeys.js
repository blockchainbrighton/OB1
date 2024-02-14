// OB1_CommsAndHotkeys.js

// Initialize the BroadcastChannel
const channel = new BroadcastChannel('obi_one_channel');

// Use a shared key to track the count of program-related tabs in sessionStorage
if (!sessionStorage.getItem('programTabCount')) {
    sessionStorage.setItem('programTabCount', '0'); // Initialize if not present
}
let currentTabOrder = parseInt(sessionStorage.getItem('programTabCount'), 10) + 1;
sessionStorage.setItem('programTabCount', currentTabOrder.toString());


// Corrected postMessage function to reflect accurate tab indexing
function postMessage(action, keyNumber) {
    const targetTabID = tabsMap.get(keyNumber);
    console.log(`Key Number Received: ${keyNumber}`);
    console.log(`Attempting to post message: Action: ${action}, Target Tab ID: ${targetTabID}`);
    if (targetTabID) {
        channel.postMessage({ action, targetTabID });
        console.log(`Message posted successfully to Tab ID: ${targetTabID}.`);
    } else {
        console.error(`Error: Tab ID not found for the given key number: ${keyNumber}. Ensure tabs are indexed correctly.`);
    }
}

// Event listener for hotkeys
document.addEventListener('keydown', (event) => {
    console.log(`Current tabsMap:`, Array.from(tabsMap.entries()));

    let keyNumber = parseInt(event.key, 10);
    keyNumber = isNaN(keyNumber) ? -1 : keyNumber === 0 ? 10 : keyNumber; // Adjust for '0' key to map to 10th tab directly
    console.log(`Key pressed: ${event.key}, interpreted as key number: ${keyNumber}`);
    
    // Check if the pressed key corresponds to a mapped tab action
    if (tabsMap.has(keyNumber)) {
        postMessage('play', keyNumber);
    } else {
        console.log(`Invalid key: ${event.key}. No associated action.`);
    }
});


// Map to maintain tabs order and their IDs
let tabsMap = new Map();

// Generate and store a unique tab identifier
const tabID = sessionStorage.getItem('tabID') || generateTabID();
sessionStorage.setItem('tabID', tabID);


function generateTabID() {
    console.log("generateTabID called");
    const uniqueID = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    console.log(`Generated unique ID for tab: ${uniqueID}`);
    updateTabsMap(uniqueID, currentTabOrder);
    return uniqueID;
}

function updateTabsMap(uniqueID, order) {
    console.log(`Attempting to update tabsMap with: Order=${order}, ID=${uniqueID}`);
    tabsMap.set(order, uniqueID);
    console.log(`tabsMap now contains:`, Array.from(tabsMap.entries()));
}

// Temporarily force a map update for debugging
updateTabsMap("debugID", 1);

console.log(`Tab ID: ${currentTabOrder} - Ready for commands.`);


