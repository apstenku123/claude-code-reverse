/**
 * Applies a provided function to each property in a list of source objects, with optional customizer and guard logic.
 *
 * @function applyFunctionToProperties
 * @param {Function} propertyApplier - Function to apply to each property (e.g., mapInteractionEntriesToRouteNames).
 * @returns {Function} - a function that takes a target object and one or more source objects, applying the propertyApplier to each property.
 */
function applyFunctionToProperties(propertyApplier) {
  return J2A(function (targetObject, ...sources) {
    let sourceIndex = -1;
    let sourcesLength = sources.length;
    // The last argument may be a customizer function
    let customizer = sourcesLength > 1 ? sources[sourcesLength - 1] : undefined;
    // The third argument may be a guard (used for internal checks)
    const guard = sourcesLength > 2 ? sources[2] : undefined;

    // If the last argument is a function and propertyApplier expects a customizer, use isBlobOrFileLikeObject
    if (
      propertyApplier.length > 3 &&
      typeof customizer === "function"
    ) {
      sourcesLength--;
    } else {
      customizer = undefined;
    }

    // If guard is present and X2A returns true, adjust customizer and sourcesLength
    if (guard && X2A(sources[0], sources[1], guard)) {
      customizer = sourcesLength < 3 ? undefined : customizer;
      sourcesLength = 1;
    }

    // Ensure targetObject is an object
    targetObject = Object(targetObject);

    // Iterate over each source object and apply the propertyApplier
    while (++sourceIndex < sourcesLength) {
      const source = sources[sourceIndex];
      if (source) {
        propertyApplier(targetObject, source, sourceIndex, customizer);
      }
    }
    return targetObject;
  });
}

module.exports = applyFunctionToProperties;