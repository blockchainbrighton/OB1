document.addEventListener('DOMContentLoaded', async () => {
    // Ensure the Tone.js library is loaded
    if (typeof Tone === 'undefined') {
        console.error("Tone.js is not loaded. Please include Tone.js in your HTML.");
        return;
    }
    console.log("Tone.js is successfully loaded.");

    // Resume the audio context if it's not running
    if (Tone.context.state !== 'running') {
        console.log("Resuming Tone.js AudioContext...");
        await Tone.context.resume();
    }

    // Assuming fetchAndDecodeAudio is a function that fetches the audio data, updates state.audioBuffer
    console.log("Fetching and decoding audio...");
    await fetchAndDecodeAudio('audionalData');

    // Decode the audio buffer using Tone.js's context
    const audioBuffer = await Tone.context.decodeAudioData(state.audioBuffer.slice(0));
    console.log("Audio buffer decoded successfully.");

    // Create a Player, connect it to a PitchShift node, then to the destination
    const player = new Tone.Player(audioBuffer).toDestination();
    const pitchShift = new Tone.PitchShift().toDestination();
    player.connect(pitchShift);
    console.log("Player and PitchShift are set up.");

    // Function to adjust and apply pitch shift
    function applyPitchShift(semitones) {
        pitchShift.pitch = semitones;
        console.log(`Pitch shift applied: ${semitones} semitones.`);
    }

    // Event listener for keydown events to handle pitch shifting
    document.addEventListener('keydown', (e) => {
        console.log(`Key pressed: ${e.key}, Current pitch shift: ${pitchShift.pitch}`);

        switch (e.key) {
            case "'":
                // Increase pitch by one semitone
                applyPitchShift(pitchShift.pitch + 1);
                break;
            case ";":
                // Decrease pitch by one semitone
                applyPitchShift(pitchShift.pitch - 1);
                break;
            default:
                console.log(`No action for key: ${e.key}.`);
        }
    });

    // Override or integrate this function to start playback using Tone.js Player
    window.playSampleOnce = () => {
        if (player.state !== "started") {
            player.start();
            console.log("Sample playback started.");
        } else {
            player.stop();
            player.start();
            console.log("Sample playback restarted.");
        }
    };

    console.log("Pitch shift module is ready. Use ';' to decrease and ''' to increase the pitch.");
});
