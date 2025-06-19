/**
 * Removes the 'agent' property from the provided object and returns the rest of the properties.
 *
 * @param {Object} inputObject - The object from which to omit the 'agent' property.
 * @returns {Object|undefined} a new object without the 'agent' property, or undefined if input is falsy.
 */
function omitAgentProperty(inputObject) {
  if (inputObject) {
    // Destructure 'agent' out of the object and collect the rest of the properties
    const { agent, ...objectWithoutAgent } = inputObject;
    return objectWithoutAgent;
  }
}

module.exports = omitAgentProperty;