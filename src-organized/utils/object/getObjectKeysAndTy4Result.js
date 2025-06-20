/**
 * Combines the own enumerable property names of the given object with the result of the ty4 function.
 *
 * @param {Object} sourceObject - The object whose keys will be extracted and passed to ty4.
 * @returns {Array} An array containing the object'createInteractionAccessor own keys concatenated with the result of ty4(sourceObject).
 */
function getObjectKeysAndTy4Result(sourceObject) {
  // Get the object'createInteractionAccessor own enumerable property names
  const objectKeys = Object.keys(sourceObject);
  // Call ty4 with the object (external function, assumed to return an array)
  const ty4Result = ty4(sourceObject);
  // Concatenate the keys and ty4'createInteractionAccessor result into a single array
  return objectKeys.concat(ty4Result);
}

module.exports = getObjectKeysAndTy4Result;