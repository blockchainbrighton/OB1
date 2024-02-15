// OB1_ActiveTab_Hotkeys_2.js

document.addEventListener('keydown', (event) => {
    const bpmEvent = new CustomEvent('bpmChange', { detail: { adjustment: 0 } });
    const multiplierEvent = new CustomEvent('multiplierChange', { detail: { multiplier: 1 } });

    // Adjust scheduling multiplier
    if ((event.key === '=' || event.key === '-') && !event.shiftKey && !event.ctrlKey) {
        multiplierEvent.detail.multiplier = (event.key === '=') ? 2 : 0.5;
        console.log(`Dispatching multiplierChange event, multiplier: ${multiplierEvent.detail.multiplier}`);
        document.dispatchEvent(multiplierEvent);
    }

    // BPM Adjustment
    // Adjust for "+" (Shift + "=") and "-" directly
    if (event.key === '+' && event.shiftKey && !event.ctrlKey) {
        bpmEvent.detail.adjustment = 1; // BPM +1
    } else if (event.key === '_' && event.shiftKey && !event.ctrlKey) {
        bpmEvent.detail.adjustment = -1; // BPM -1
    }

    // Adjust for Control + Shift + "=" and Control + Shift + "-"
    if (event.key === '=' && event.shiftKey && event.ctrlKey) {
        bpmEvent.detail.adjustment = 10; // BPM +10
    } else if (event.key === '_' && event.shiftKey && event.ctrlKey) {
        bpmEvent.detail.adjustment = -10; // BPM -10
    }

    // Dispatch BPM event if adjustment is not zero
    if (bpmEvent.detail.adjustment !== 0) {
        console.log(`Dispatching bpmChange event, adjustment: ${bpmEvent.detail.adjustment}`);
        document.dispatchEvent(bpmEvent);
    }

    // Reset scheduling multiplier with '0'
    if (event.key === '0' && !event.shiftKey && !event.ctrlKey) {
        console.log(`Resetting multiplier to initial value: 1`);
        document.dispatchEvent(new CustomEvent('multiplierChange', { detail: { multiplier: 1 } }));
    }
    
});
