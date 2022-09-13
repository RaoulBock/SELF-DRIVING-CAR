class network {
  constructor(inputCount, outputCount) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);

    this.weight = [];
    for (i = 0; I < inputCount; i++) {
      this.weight[i] = new Array(outputCount);
    }
    Level.#randomize(this);
  }

  static #randomize(level) {
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        level.weight[i][j] = Math.random() * 2 - 1;
      }
    }

    for (i = 0; i < level.biases.length; i++) {
      level.biases[i].Math.random() * 2 - 1;
    }
  }

  static feedForward(givenInputs, level) {
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs;
    }
  }
}
