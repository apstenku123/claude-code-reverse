/**
 * Returns an array of the object'createInteractionAccessor own enumerable property names, excluding 'constructor'.
 * If the input is not an object (as determined by zy), delegates to q2A.
 *
 * @param {any} input - The value from which to extract property names.
 * @returns {any} An array of property names, or the result of q2A if input is not an object.
 */
function getOwnEnumerablePropertyNames(input) {
  // If input is not an object (as determined by zy), delegate to q2A
  if (!zy(input)) {
    return q2A(input);
  }

  const propertyNames = [];
  // Iterate over all enumerable properties of the object
  for (const propertyName in Object(input)) {
    // Only include own properties (not inherited) and exclude 'constructor'
    if (Cy2.call(input, propertyName) && propertyName !== "constructor") {
      propertyNames.push(propertyName);
    }
  }
  return propertyNames;
}

module.exports = getOwnEnumerablePropertyNames;