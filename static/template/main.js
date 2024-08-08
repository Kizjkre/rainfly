const context = new AudioContext({sampleRate: 48000});
const oscillator = new OscillatorNode(context);

await context.audioWorklet.addModule('./bypass-processor.js');
const workletNode = new AudioWorkletNode(context, 'bypass-processor');

oscillator.connect(workletNode).connect(context.destination);
oscillator.start();
