/**
 * Creates a function that merges properties from one or more source objects into a target object.
 * Optionally, a customizer function can be provided to customize the merging behavior.
 *
 * @param {Function} mergeFunction - The function that defines how properties are merged from source to target.
 * @returns {Function} - a function that takes a target object and one or more source objects, and merges their properties.
 */
function createObjectMerger(mergeFunction) {
  return J2A(function (targetObject, ...sourcesAndCustomizer) {
    let sourceIndex = -1;
    let sourcesLength = sourcesAndCustomizer.length;
    // The last argument may be a customizer function
    let customizer = sourcesLength > 1 ? sourcesAndCustomizer[sourcesLength - 1] : undefined;
    // The third argument may be a guard (used internally for iteratee shorthands)
    const guard = sourcesLength > 2 ? sourcesAndCustomizer[2] : undefined;

    // If the last argument is a function and there are more than 3 arguments, treat isBlobOrFileLikeObject as a customizer
    if (
      mergeFunction.length > 3 &&
      typeof customizer === "function"
    ) {
      sourcesLength--;
    } else {
      customizer = undefined;
    }

    // If a guard is present and X2A returns true, ignore the customizer
    if (guard && X2A(sourcesAndCustomizer[0], sourcesAndCustomizer[1], guard)) {
      customizer = sourcesLength < 3 ? undefined : customizer;
      sourcesLength = 1;
    }

    // Ensure the target is an object
    targetObject = Object(targetObject);

    // Iterate over each source object and merge its properties
    while (++sourceIndex < sourcesLength) {
      const source = sourcesAndCustomizer[sourceIndex];
      if (source) {
        mergeFunction(targetObject, source, sourceIndex, customizer);
      }
    }
    return targetObject;
  });
}

module.exports = createObjectMerger;