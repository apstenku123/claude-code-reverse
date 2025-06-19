/**
 * Returns an array of own enumerable property names of the given object, excluding the 'constructor' property.
 * If the input is not an object (as determined by isObjectLike), delegates to handleNonObjectInput.
 *
 * @param {any} input - The value whose own property keys are to be retrieved.
 * @returns {string[]|any} An array of property names, or the result of handleNonObjectInput if input is not object-like.
 */
function getOwnPropertyKeysExcludingConstructor(input) {
  // If input is not object-like, delegate to handleNonObjectInput
  if (!isObjectLike(input)) return handleNonObjectInput(input);

  const ownPropertyKeys = [];
  // Iterate over all enumerable properties of the object
  for (const propertyKey in Object(input)) {
    // Check if property is an own property and not 'constructor'
    if (hasOwnProperty.call(input, propertyKey) && propertyKey !== "constructor") {
      ownPropertyKeys.push(propertyKey);
    }
  }
  return ownPropertyKeys;
}

// Export the function for use in other modules
module.exports = getOwnPropertyKeysExcludingConstructor;