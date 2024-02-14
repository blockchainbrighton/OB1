// OB1_CommsAndHotkeys.js

// Initialize the BroadcastChannel
const channel = new BroadcastChannel('obi_one_channel');

// Generate and store a unique tab identifier
const tabID = sessionStorage.getItem('tabID') || generateTabID();
sessionStorage.setItem('tabID', tabID);

function generateTabID() {
  const uniqueID = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  console.log(`Generated unique ID for tab: ${uniqueID}`);
  return uniqueID;
}

// Log the tab's unique ID for debugging purposes
console.log(`This tab's unique ID: ${tabID}`);

// Function to post message to channel
function postMessage(action, targetTabID) {
  console.log(`Posting message to channel. Action: ${action}, Target Tab ID: ${targetTabID}`);
  channel.postMessage({ action, targetTabID });
}

// Function to handle incoming messages
channel.onmessage = (event) => {
  const { action, targetTabID } = event.data;
  console.log(`Received message. Action: ${action}, Target Tab ID: ${targetTabID}`);

  if (targetTabID === tabID) {
    console.log(`This tab (${tabID}) is the target for action: ${action}`);
    switch (action) {
      case 'play':
        console.log('Triggering play audio sample.');
        // Trigger play audio sample
        break;
      case 'mute':
        console.log('Muting audio sample.');
        // Mute audio sample
        break;
      case 'doubleTime':
        console.log('Doubling the tempo.');
        // Double the tempo
        break;
      case 'halfTime':
        console.log('Halving the tempo.');
        // Half the tempo
        break;
      default:
        console.log('Unknown action received.');
    }
  }
};

// Event listener for hotkeys
document.addEventListener('keydown', (event) => {
  if (!event.ctrlKey && !event.shiftKey) {
    // Number keys for playback
    if (event.key >= 0 && event.key <= 9) {
      postMessage('play', `tab${event.key}`);
    }
  } else if (event.ctrlKey && !event.shiftKey) {
    // Ctrl + Number keys for mute
    if (event.key >= 0 && event.key <= 9) {
      postMessage('mute', `tab${event.key}`);
    }
  } else if (event.ctrlKey && event.shiftKey) {
    // Ctrl + Shift + Number keys for tempo control
    if (event.key >= 0 && event.key <= 9) {
      const action = prompt('Enter "d" to double time, "h" to half time:');
      if (action === 'd') {
        postMessage('doubleTime', `tab${event.key}`);
      } else if (action === 'h') {
        postMessage('halfTime', `tab${event.key}`);
      }
    }
  }
});

console.log(`Tab ID: ${tabID} - Ready for commands.`);
