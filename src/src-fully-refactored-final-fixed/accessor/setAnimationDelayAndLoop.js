/**
 * Sets the 'loop' and 'delay' properties on the target configuration object based on the provided source object.
 *
 * Validates that 'loop' is an integer between 0 and 65535, and that 'delay' is either a single integer in the same range or an array of such integers.
 * Throws an error if validation fails.
 *
 * @param {Object} sourceOptions - The object containing 'loop' and/or 'delay' properties to set.
 * @param {Object} targetConfig - The object to which validated 'loop' and 'delay' properties will be assigned.
 * @throws {Error} If 'loop' or 'delay' are invalid according to the validation rules.
 */
function setAnimationDelayAndLoop(sourceOptions, targetConfig) {
  // Validate and set the 'loop' property if present
  if (x1.object(sourceOptions) && x1.defined(sourceOptions.loop)) {
    if (x1.integer(sourceOptions.loop) && x1.inRange(sourceOptions.loop, 0, 65535)) {
      targetConfig.loop = sourceOptions.loop;
    } else {
      throw x1.invalidParameterError(
        "loop",
        "integer between 0 and 65535",
        sourceOptions.loop
      );
    }
  }

  // Validate and set the 'delay' property if present
  if (x1.object(sourceOptions) && x1.defined(sourceOptions.delay)) {
    // Case 1: delay is a single integer
    if (
      x1.integer(sourceOptions.delay) &&
      x1.inRange(sourceOptions.delay, 0, 65535)
    ) {
      targetConfig.delay = [sourceOptions.delay];
    }
    // Case 2: delay is an array of integers
    else if (
      Array.isArray(sourceOptions.delay) &&
      sourceOptions.delay.every(x1.integer) &&
      sourceOptions.delay.every((delayValue) => x1.inRange(delayValue, 0, 65535))
    ) {
      targetConfig.delay = sourceOptions.delay;
    }
    // Case 3: delay is invalid
    else {
      throw x1.invalidParameterError(
        "delay",
        "integer or an array of integers between 0 and 65535",
        sourceOptions.delay
      );
    }
  }
}

module.exports = setAnimationDelayAndLoop;
