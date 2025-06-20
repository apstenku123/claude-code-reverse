/**
 * Returns an array of own enumerable property names of the given object, excluding the 'constructor' property.
 * If the input is not an object (as determined by zy), delegates to q2A for fallback processing.
 *
 * @param {any} inputObject - The object whose own property names are to be retrieved.
 * @returns {string[]|any} An array of property names (excluding 'constructor'), or the result of q2A if input is not an object.
 */
function getOwnPropertyNamesExcludingConstructor(inputObject) {
  // If input is not an object (as determined by zy), delegate to q2A
  if (!zy(inputObject)) {
    return q2A(inputObject);
  }

  const propertyNames = [];
  // Iterate over all enumerable properties of the object
  for (const propertyName in Object(inputObject)) {
    // Only include own properties (not inherited) and exclude 'constructor'
    if (Cy2.call(inputObject, propertyName) && propertyName !== "constructor") {
      propertyNames.push(propertyName);
    }
  }
  return propertyNames;
}

module.exports = getOwnPropertyNamesExcludingConstructor;