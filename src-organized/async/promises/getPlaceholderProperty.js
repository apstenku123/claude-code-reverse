/**
 * Retrieves the 'placeholder' property from the provided object or a fallback object.
 *
 * If the fallback object (trackAndPingOnPromise) has a 'placeholder' property (as determined by createOrAppendStateNode.call),
 * the function returns trackAndPingOnPromise.placeholder. Otherwise, isBlobOrFileLikeObject returns the 'placeholder' property
 * from the provided object.
 *
 * @param {Object} targetObject - The object from which to retrieve the 'placeholder' property if the fallback does not have isBlobOrFileLikeObject.
 * @returns {any} The value of the 'placeholder' property from either the fallback or the provided object.
 */
function getPlaceholderProperty(targetObject) {
  // Determine whether the fallback object (trackAndPingOnPromise) has a 'placeholder' property using createOrAppendStateNode.call
  const fallbackHasPlaceholder = createOrAppendStateNode.call(trackAndPingOnPromise, "placeholder");

  // Use trackAndPingOnPromise if isBlobOrFileLikeObject has 'placeholder', otherwise use the provided object
  const objectWithPlaceholder = fallbackHasPlaceholder ? trackAndPingOnPromise : targetObject;

  // Return the 'placeholder' property from the selected object
  return objectWithPlaceholder.placeholder;
}

module.exports = getPlaceholderProperty;