/**
 * @class ColorModel
 * @description
 * Represents a color in a specific color model (e.g., rgb, hsl, etc.), supporting multiple input types (string, array, number, object, or another ColorModel instance).
 * Handles parsing, validation, normalization, and immutability of color data.
 *
 * @param {string|number|Array|Object|ColorModel|null} colorInput - The color value to initialize with. Can be a string (e.g., '#fff'), a number (e.g., 0xffffff), an array of channel values, an object with channel keys, or another ColorModel instance.
 * @param {string|null} [modelName] - Optional color model name (e.g., 'rgb', 'hsl'). Used when colorInput is an array.
 * @returns {ColorModel} a new instance of ColorModel.
 */
function ColorModel(colorInput, modelName) {
  // Allow function to be called without 'new'
  if (!(this instanceof ColorModel)) {
    return new ColorModel(colorInput, modelName);
  }

  // If modelName is a reserved model, ignore isBlobOrFileLikeObject
  if (modelName && modelName in CH2) {
    modelName = null;
  }

  // Validate modelName if provided
  if (modelName && !(modelName in mF)) {
    throw new Error("Unknown model: " + modelName);
  }

  let channelCount, channelLabels;

  // Handle null/undefined input: default to black RGB
  if (colorInput == null) {
    this.model = "rgb";
    this.color = [0, 0, 0];
    this.valpha = 1;
  }
  // Copy constructor: clone from another ColorModel
  else if (colorInput instanceof ColorModel) {
    this.model = colorInput.model;
    this.color = [...colorInput.color];
    this.valpha = colorInput.valpha;
  }
  // Parse from string (e.g., '#fff', 'rgb(255,0,0)')
  else if (typeof colorInput === "string") {
    const parsed = ud.get(colorInput);
    if (parsed === null) {
      throw new Error("Unable to parse color from string: " + colorInput);
    }
    this.model = parsed.model;
    channelCount = mF[this.model].channels;
    this.color = parsed.value.slice(0, channelCount);
    this.valpha = typeof parsed.value[channelCount] === "number" ? parsed.value[channelCount] : 1;
  }
  // Parse from array (e.g., [255, 0, 0], [255, 0, 0, 0.5])
  else if (Array.isArray(colorInput) && colorInput.length > 0) {
    this.model = modelName || "rgb";
    channelCount = mF[this.model].channels;
    // Copy only the needed number of channels
    const channelArray = Array.prototype.slice.call(colorInput, 0, channelCount);
    this.color = initializeArrayNumbers(channelArray, channelCount);
    this.valpha = typeof colorInput[channelCount] === "number" ? colorInput[channelCount] : 1;
  }
  // Parse from number (e.g., 0xff0000)
  else if (typeof colorInput === "number") {
    this.model = "rgb";
    this.color = [
      (colorInput >> 16) & 255, // Red
      (colorInput >> 8) & 255,  // Green
      colorInput & 255          // Blue
    ];
    this.valpha = 1;
  }
  // Parse from object with channel keys (e.g., {r:255, g:0, b:0, alpha:0.5})
  else {
    this.valpha = 1;
    const keys = Object.keys(colorInput);
    // Remove 'alpha' key if present and set valpha
    if ("alpha" in colorInput) {
      keys.splice(keys.indexOf("alpha"), 1);
      this.valpha = typeof colorInput.alpha === "number" ? colorInput.alpha : 0;
    }
    // Sort keys to form a signature for model lookup
    const keySignature = keys.sort().join("");
    if (!(keySignature in Ao1)) {
      throw new Error("Unable to parse color from object: " + JSON.stringify(colorInput));
    }
    this.model = Ao1[keySignature];
    ({ labels: channelLabels } = mF[this.model]);
    const channelValues = [];
    for (let i = 0; i < channelLabels.length; i++) {
      channelValues.push(colorInput[channelLabels[i]]);
    }
    this.color = initializeArrayNumbers(channelValues);
  }

  // Clamp/normalize channel values if needed
  if (bV1[this.model]) {
    channelCount = mF[this.model].channels;
    for (let i = 0; i < channelCount; i++) {
      const clampFn = bV1[this.model][i];
      if (clampFn) {
        this.color[i] = clampFn(this.color[i]);
      }
    }
  }

  // Clamp alpha to [0, 1]
  this.valpha = Math.max(0, Math.min(1, this.valpha));

  // Make instance immutable if possible
  if (Object.freeze) {
    Object.freeze(this);
  }
}

module.exports = ColorModel;