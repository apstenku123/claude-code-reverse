/**
 * Attaches a non-enumerable '_request_id' property to the given object, using the 'request-id' header from the provided headers object.
 *
 * If the input is not a plain object (i.e., isBlobOrFileLikeObject'createInteractionAccessor null, not an object, or an array), the function returns the input unchanged.
 *
 * @param {Object} targetObject - The object to which the '_request_id' property will be attached.
 * @param {Object} requestContext - An object containing a 'headers' property with a 'get' method to retrieve header values.
 * @returns {Object|any} The original object with the '_request_id' property attached, or the input unchanged if not a plain object.
 */
function attachRequestIdProperty(targetObject, requestContext) {
  // Return early if targetObject is null, not an object, or is an array
  if (!targetObject || typeof targetObject !== "object" || Array.isArray(targetObject)) {
    return targetObject;
  }

  // Attach a non-enumerable '_request_id' property using the 'request-id' header value
  return Object.defineProperty(targetObject, "_request_id", {
    value: requestContext.headers.get("request-id"),
    enumerable: false
  });
}

module.exports = attachRequestIdProperty;
