/**
 * Updates the interaction mapping or activity stack based on the provided config type.
 *
 * Depending on the configType, this function either increments the first element of the interactionMapping array
 * or pushes a new subscription to the specified sub-array within interactionMapping. The result is then processed
 * by the external getArrayOrBufferLength function and returned.
 *
 * @param {Array} interactionMapping - The main array representing user interaction mappings or activity stacks.
 * @param {number} configType - Determines the update operation:
 *   - 0: Increments the first element of interactionMapping by the subscription value.
 *   - 1 or 2: Pushes the subscription value into the corresponding sub-array of interactionMapping.
 * @param {*} subscription - The value to add or push, typically a generated random number or activity object.
 * @returns {*} The result of passing the updated element to the getArrayOrBufferLength function.
 */
function updateInteractionMapping(interactionMapping, configType, subscription) {
  switch (configType) {
    case 0:
      // Increment the first element by subscription and process with getArrayOrBufferLength
      interactionMapping[0] += subscription;
      return getArrayOrBufferLength(interactionMapping[0]);
    case 1:
    case 2:
      // Push subscription into the specified sub-array and process with getArrayOrBufferLength
      interactionMapping[configType].push(subscription);
      return getArrayOrBufferLength(interactionMapping[configType]);
    default:
      // Optionally handle unexpected configType values
      throw new Error(`Invalid configType: ${configType}`);
  }
}

module.exports = updateInteractionMapping;