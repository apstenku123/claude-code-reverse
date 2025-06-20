/**
 * Sets the delay and loop configuration properties on the provided config object.
 *
 * Validates that the 'loop' property (if present) is an integer between 0 and 65535.
 * Validates that the 'delay' property (if present) is either:
 *   - a single integer between 0 and 65535, or
 *   - an array of integers, each between 0 and 65535.
 *
 * Throws an error if validation fails.
 *
 * @param {Object} sourceObservable - The object containing delay and/or loop configuration.
 * @param {Object} config - The object to which validated delay and loop values will be assigned.
 * @throws {Error} If validation fails for 'loop' or 'delay'.
 */
function setDelayConfig(sourceObservable, config) {
  // Validate and set the 'loop' property if defined
  if (x1.object(sourceObservable) && x1.defined(sourceObservable.loop)) {
    if (
      x1.integer(sourceObservable.loop) &&
      x1.inRange(sourceObservable.loop, 0, 65535)
    ) {
      config.loop = sourceObservable.loop;
    } else {
      throw x1.invalidParameterError(
        "loop",
        "integer between 0 and 65535",
        sourceObservable.loop
      );
    }
  }

  // Validate and set the 'delay' property if defined
  if (x1.object(sourceObservable) && x1.defined(sourceObservable.delay)) {
    // Case 1: delay is a single integer
    if (
      x1.integer(sourceObservable.delay) &&
      x1.inRange(sourceObservable.delay, 0, 65535)
    ) {
      config.delay = [sourceObservable.delay];
    }
    // Case 2: delay is an array of integers
    else if (
      Array.isArray(sourceObservable.delay) &&
      sourceObservable.delay.every(x1.integer) &&
      sourceObservable.delay.every((subscription) =>
        x1.inRange(subscription, 0, 65535)
      )
    ) {
      config.delay = sourceObservable.delay;
    }
    // Invalid delay value
    else {
      throw x1.invalidParameterError(
        "delay",
        "integer or an array of integers between 0 and 65535",
        sourceObservable.delay
      );
    }
  }
}

module.exports = setDelayConfig;
