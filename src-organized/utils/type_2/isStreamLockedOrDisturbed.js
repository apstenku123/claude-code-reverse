/**
 * Checks if the stream associated with the given object is either locked or disturbed.
 *
 * @param {Object} targetObject - The object containing a property (referenced by 'wh') with a 'body' property.
 * @returns {boolean} Returns true if the stream is locked or disturbed; otherwise, false.
 */
function isStreamLockedOrDisturbed(targetObject) {
  // Access the 'body' property from the object referenced by 'wh' on the targetObject
  const body = targetObject[wh].body;

  // If 'body' exists, check if its stream is locked or disturbed
  if (body != null) {
    // 'body.stream.locked' checks if the stream is currently locked
    // 'Dr.isDisturbed(body.stream)' checks if the stream is disturbed
    return body.stream.locked || Dr.isDisturbed(body.stream);
  }

  // If 'body' is null or undefined, return false
  return false;
}

module.exports = isStreamLockedOrDisturbed;