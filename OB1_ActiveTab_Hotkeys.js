// OB1_ActiveTab_Hotkeys.js

document.addEventListener('keydown', (event) => {
    // Dispatch custom events for BPM and scheduling multiplier adjustments
    const bpmEvent = new CustomEvent('bpmChange', {
        detail: { adjustment: 0, multiplierChange: false }
    });

    const multiplierEvent = new CustomEvent('multiplierChange', {
        detail: { multiplier: 1 }
    });

    // Increase BPM by 1
    if (event.key === '=' && !event.shiftKey && !event.ctrlKey) {
        bpmEvent.detail.adjustment = 1;
        console.log(`Dispatching bpmChange event, adjustment: ${bpmEvent.detail.adjustment}`);
        document.dispatchEvent(bpmEvent);
    }

    // Decrease BPM by 1
    if (event.key === '-' && !event.shiftKey && !event.ctrlKey) {
        bpmEvent.detail.adjustment = -1;
        console.log(`Dispatching bpmChange event, adjustment: ${bpmEvent.detail.adjustment}`);
        document.dispatchEvent(bpmEvent);
    }

    // Increase BPM by 10 (Shift + "=" or Shift + "+")
    if ((event.key === '=' || event.key === '+') && event.shiftKey && !event.ctrlKey) {
        bpmEvent.detail.adjustment = 10;
        console.log(`Dispatching bpmChange event, adjustment: ${bpmEvent.detail.adjustment}`);
        document.dispatchEvent(bpmEvent);
    }

    // Decrease BPM by 10 (Shift + "-" or Shift + "_")
    if ((event.key === '-' || event.key === '_') && event.shiftKey && !event.ctrlKey) {
        bpmEvent.detail.adjustment = -10;
        console.log(`Dispatching bpmChange event, adjustment: ${bpmEvent.detail.adjustment}`);
        document.dispatchEvent(bpmEvent);
    }

    // Double the scheduling of playback (Control + "=" or Control + "+")
    if ((event.key === '=' || event.key === '+') && !event.shiftKey && event.ctrlKey) {
        multiplierEvent.detail.multiplier = 2;
        document.dispatchEvent(multiplierEvent);
    }

    // Halve the scheduling of playback (Control + "-" or Control + "_")
    if ((event.key === '-' || event.key === '_') && !event.shiftKey && event.ctrlKey) {
        multiplierEvent.detail.multiplier = 0.5;
        document.dispatchEvent(multiplierEvent);
    }
});
