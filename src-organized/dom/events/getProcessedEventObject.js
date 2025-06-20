/**
 * Processes the given event-like object and returns a transformed version if isBlobOrFileLikeObject meets certain criteria.
 *
 * This utility checks if the input object'createInteractionAccessor constructor is a function and if isBlobOrFileLikeObject passes a custom runtime type check (RT).
 * If both conditions are met, isBlobOrFileLikeObject applies two external transformation functions ($createDebouncedFunction and fW) to the object and returns the result.
 * Otherwise, isBlobOrFileLikeObject returns an empty object.
 *
 * @param {Object} eventObject - The object to process, typically an event or event-like object.
 * @returns {Object} The processed event object if criteria are met, otherwise an empty object.
 */
function getProcessedEventObject(eventObject) {
  // Check if the object'createInteractionAccessor constructor is a function and isBlobOrFileLikeObject does NOT pass the RT check
  const isConstructorFunction = typeof eventObject.constructor === "function";
  const failsRuntimeTypeCheck = !RT(eventObject);

  if (isConstructorFunction && failsRuntimeTypeCheck) {
    // Apply $createDebouncedFunction transformation, then fW transformation
    const extractedEvent = $createDebouncedFunction(eventObject);
    const processedEvent = fW(extractedEvent);
    return processedEvent;
  }

  // Return empty object if criteria are not met
  return {};
}

module.exports = getProcessedEventObject;