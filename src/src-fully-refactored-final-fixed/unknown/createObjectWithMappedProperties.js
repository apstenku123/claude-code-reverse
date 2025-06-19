/**
 * Applies a mapping function to a set of source objects, copying properties to a target object.
 * Optionally supports a customizer function for property assignment and a guard for special cases.
 *
 * @param {Function} mapInteractionsToRoutes - Function that maps properties from source to target object.
 * @returns {Function} - a function that accepts a target object and one or more source objects, and returns the target object with mapped properties.
 */
function createObjectWithMappedProperties(mapInteractionsToRoutes) {
  return J2A(function (targetObject, ...sourceObjects) {
    let currentIndex = -1;
    let numberOfSources = sourceObjects.length;
    // The last argument may be a customizer function
    let customizer = numberOfSources > 1 ? sourceObjects[numberOfSources - 1] : undefined;
    // The third argument may be a guard for special cases
    const guard = numberOfSources > 2 ? sourceObjects[2] : undefined;

    // If the last argument is a function and the target object has more than 3 properties, treat isBlobOrFileLikeObject as a customizer
    if (
      customizer = targetObject.length > 3 && typeof customizer === "function" ? (numberOfSources--, customizer) : undefined,
      // If a guard is present and X2A returns true, adjust customizer and numberOfSources accordingly
      guard && X2A(sourceObjects[0], sourceObjects[1], guard)
    ) {
      customizer = numberOfSources < 3 ? undefined : customizer;
      numberOfSources = 1;
    }

    // Ensure the target object is an actual object
    targetObject = Object(targetObject);

    // Iterate over each source object and map its properties to the target object
    while (++currentIndex < numberOfSources) {
      const source = sourceObjects[currentIndex];
      if (source) {
        mapInteractionsToRoutes(targetObject, source, currentIndex, customizer);
      }
    }
    return targetObject;
  });
}

module.exports = createObjectWithMappedProperties;