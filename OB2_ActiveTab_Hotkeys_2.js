// OB1_ActiveTab_Hotkeys.js

let initialMultiplier = 1; // Assuming 1 is the default multiplier


document.addEventListener('keydown', (event) => {
    // Dispatch custom events for BPM and scheduling multiplier adjustments
    const bpmEvent = new CustomEvent('bpmChange', {
        detail: { adjustment: 0 }
    });

    const multiplierEvent = new CustomEvent('multiplierChange', {
        detail: { multiplier: initialMultiplier } // Use initialMultiplier for resetting
    });

    // Adjust scheduling multipliers directly with '+' and '-'
    if (event.key === '=' && !event.shiftKey && !event.ctrlKey) {
        multiplierEvent.detail.multiplier = 2; // Double the multiplier
        console.log(`Dispatching multiplierChange event, multiplier: ${multiplierEvent.detail.multiplier}`);
        document.dispatchEvent(multiplierEvent);
    } else if (event.key === '-' && !event.shiftKey && !event.ctrlKey) {
        multiplierEvent.detail.multiplier = 0.5; // Halve the multiplier
        console.log(`Dispatching multiplierChange event, multiplier: ${multiplierEvent.detail.multiplier}`);
        document.dispatchEvent(multiplierEvent);
    }

    // Reset scheduling multiplier to the initial value with '0'
    if (event.key === '0' && !event.shiftKey && !event.ctrlKey) {
        // Reset the multiplier to its initial value
        multiplierEvent.detail.multiplier = initialMultiplier;
        console.log(`Resetting multiplier to initial value: ${multiplierEvent.detail.multiplier}`);
        document.dispatchEvent(multiplierEvent);
    }

    // Use Shift + '=' for a single BPM increase to align with common key event handling
    if (event.key === '=' && event.shiftKey && !event.ctrlKey) {
        bpmEvent.detail.adjustment = 1;
        console.log(`Dispatching bpmChange event, adjustment: ${bpmEvent.detail.adjustment}`);
        document.dispatchEvent(bpmEvent);
    }

    // Decrease BPM by 1 with Shift + '-'
    if (event.key === '-' && event.shiftKey && !event.ctrlKey) {
        bpmEvent.detail.adjustment = -1;
        console.log(`Dispatching bpmChange event, adjustment: ${bpmEvent.detail.adjustment}`);
        document.dispatchEvent(bpmEvent);
    }

    // Increase BPM by 10 with Control + Shift + '='
    if (event.key === '=' && event.shiftKey && event.ctrlKey) {
        bpmEvent.detail.adjustment = 10;
        console.log(`Dispatching bpmChange event, adjustment: ${bpmEvent.detail.adjustment}`);
        document.dispatchEvent(bpmEvent);
    }

    // Decrease BPM by 10 with Control + Shift + '-'
    if (event.key === '-' && event.shiftKey && event.ctrlKey) {
        bpmEvent.detail.adjustment = -10;
        console.log(`Dispatching bpmChange event, adjustment: ${bpmEvent.detail.adjustment}`);
        document.dispatchEvent(bpmEvent);
    }
});
