/**
 * Returns an array of enumerable property names for the given object, excluding the 'constructor' property
 * in certain prototype cases.
 *
 * @param {object} targetObject - The object whose enumerable property names are to be retrieved.
 * @returns {string[]|any} An array of enumerable property names, or the result of L2A(targetObject) if vB(targetObject) is false.
 */
function getEnumerablePropertyNames(targetObject) {
  // If the object is not valid for property enumeration, delegate to L2A
  if (!vB(targetObject)) {
    return L2A(targetObject);
  }

  // Determine if the object is a prototype
  const isPrototype = zy(targetObject);
  const propertyNames = [];

  // Iterate over all enumerable properties
  for (const propertyName in targetObject) {
    // Exclude 'constructor' if:
    //   - The object is a prototype, or
    //   - The object does not have 'constructor' as its own property
    if (
      !(propertyName === "constructor" && (isPrototype || !wy2.call(targetObject, propertyName)))
    ) {
      propertyNames.push(propertyName);
    }
  }

  return propertyNames;
}

module.exports = getEnumerablePropertyNames;