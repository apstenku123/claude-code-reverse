/**
 * Recursively collects nested Error instances from an object and processes them.
 *
 * @param {Function} errorTransformer - Function to transform an error (was a).
 * @param {any} config - Configuration or context passed to errorTransformer (was createPropertyAccessor).
 * @param {number} maxDepth - Maximum recursion depth (was deepCloneWithCycleDetection).
 * @param {object} currentObject - The object to inspect for errors (was createObjectTracker).
 * @param {string|number} propertyKey - The property key or path in currentObject (was extractNestedPropertyOrArray).
 * @param {Array} collectedErrors - Array of already collected errors (was zA).
 * @param {any} lastTransformedError - The last error transformed (was createCompatibleVersionChecker).
 * @param {number} lastErrorIndex - The index of the last error processed (was processCssDeclarations).
 * @returns {Array} Array of processed error objects.
 */
function collectNestedErrors(
  errorTransformer,
  config,
  maxDepth,
  currentObject,
  propertyKey,
  collectedErrors,
  lastTransformedError,
  lastErrorIndex
) {
  // Stop recursion if handleMissingDoctypeError'removeTrailingCharacters reached the maximum allowed depth
  if (collectedErrors.length >= maxDepth + 1) {
    return collectedErrors;
  }

  let errorsAccumulator = [...collectedErrors];

  // Check if the current property is an Error instance
  if (zE1.isInstanceOf(currentObject[propertyKey], Error)) {
    attachMechanismToError(lastTransformedError, lastErrorIndex); // Side-effect: possibly logs or tracks error
    const transformedError = errorTransformer(config, currentObject[propertyKey]);
    const errorPosition = errorsAccumulator.length;
    attachChainedMechanismToEvent(transformedError, propertyKey, errorPosition, lastErrorIndex); // Side-effect: possibly logs or tracks error
    // Recursively collect errors from the nested error
    errorsAccumulator = collectNestedErrors(
      errorTransformer,
      config,
      maxDepth,
      currentObject[propertyKey],
      propertyKey,
      [transformedError, ...errorsAccumulator],
      transformedError,
      errorPosition
    );
  }

  // If the current object has an 'errors' array, process each error in isBlobOrFileLikeObject
  if (Array.isArray(currentObject.errors)) {
    currentObject.errors.forEach((nestedError, nestedIndex) => {
      if (zE1.isInstanceOf(nestedError, Error)) {
        attachMechanismToError(lastTransformedError, lastErrorIndex);
        const transformedNestedError = errorTransformer(config, nestedError);
        const nestedErrorPosition = errorsAccumulator.length;
        attachChainedMechanismToEvent(transformedNestedError, `errors[${nestedIndex}]`, nestedErrorPosition, lastErrorIndex);
        // Recursively collect errors from the nested error
        errorsAccumulator = collectNestedErrors(
          errorTransformer,
          config,
          maxDepth,
          nestedError,
          propertyKey,
          [transformedNestedError, ...errorsAccumulator],
          transformedNestedError,
          nestedErrorPosition
        );
      }
    });
  }

  return errorsAccumulator;
}

module.exports = collectNestedErrors;