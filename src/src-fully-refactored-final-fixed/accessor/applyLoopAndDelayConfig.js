/**
 * Applies 'loop' and 'delay' configuration from a source object to a target config object.
 *
 * Validates that 'loop' is an integer between 0 and 65535, and that 'delay' is either a single integer in the same range
 * or an array of such integers. Throws an error if validation fails.
 *
 * @param {Object} sourceConfig - The object containing potential 'loop' and 'delay' properties to apply.
 * @param {Object} targetConfig - The object to which validated 'loop' and 'delay' properties will be assigned.
 * @throws {Error} Throws if 'loop' or 'delay' are present but invalid.
 */
function applyLoopAndDelayConfig(sourceConfig, targetConfig) {
  // Validate and assign 'loop' property if present
  if (x1.object(sourceConfig) && x1.defined(sourceConfig.loop)) {
    if (
      x1.integer(sourceConfig.loop) &&
      x1.inRange(sourceConfig.loop, 0, 65535)
    ) {
      targetConfig.loop = sourceConfig.loop;
    } else {
      throw x1.invalidParameterError(
        "loop",
        "integer between 0 and 65535",
        sourceConfig.loop
      );
    }
  }

  // Validate and assign 'delay' property if present
  if (x1.object(sourceConfig) && x1.defined(sourceConfig.delay)) {
    // Case 1: delay is a single integer
    if (
      x1.integer(sourceConfig.delay) &&
      x1.inRange(sourceConfig.delay, 0, 65535)
    ) {
      // Wrap single integer in an array
      targetConfig.delay = [sourceConfig.delay];
    }
    // Case 2: delay is an array of integers
    else if (
      Array.isArray(sourceConfig.delay) &&
      sourceConfig.delay.every(x1.integer) &&
      sourceConfig.delay.every((delayValue) => x1.inRange(delayValue, 0, 65535))
    ) {
      targetConfig.delay = sourceConfig.delay;
    }
    // Invalid delay value
    else {
      throw x1.invalidParameterError(
        "delay",
        "integer or an array of integers between 0 and 65535",
        sourceConfig.delay
      );
    }
  }
}

module.exports = applyLoopAndDelayConfig;