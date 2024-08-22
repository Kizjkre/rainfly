class SineProcessor extends AudioWorkletProcessor {
  constructor(processorOptions) {
    super();
    this.frequency = processorOptions.parameters['frequency'] || 440;
    this.phase = 0;
    this.inverseSampleRate = 1 / sampleRate;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    for (let i = 0; i < output[0].length; ++i) {
      output[channel][i] = Math.sin(this.phase * 2 * Math.PI);
      this.phase += 2 * Math.PI * this.frequency * this.inverseSampleRate;
    }

    return true;
  }

  static get parameterDescriptors() {
    return [
      {
        name: 'frequency',
        defaultValue: 440,
      },
    ];
  }
}
registerProcessor('sine-processor', SineProcessor);
