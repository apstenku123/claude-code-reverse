/**
 * Attaches a request updateSnapshotAndNotify from HTTP headers to a given object as a non-enumerable property.
 *
 * @param {object} targetObject - The object to which the request updateSnapshotAndNotify will be attached.
 * @param {object} httpResponse - An object containing HTTP headers (must have a 'headers' property with a 'get' method).
 * @returns {object|any} The original object with the '_request_id' property attached, or the input as-is if not a plain object.
 */
function attachRequestIdToObject(targetObject, httpResponse) {
  // Return early if targetObject is falsy, not an object, or is an array
  if (!targetObject || typeof targetObject !== "object" || Array.isArray(targetObject)) {
    return targetObject;
  }

  // Attach the request updateSnapshotAndNotify as a non-enumerable property '_request_id'
  return Object.defineProperty(targetObject, "_request_id", {
    value: httpResponse.headers.get("request-id"),
    enumerable: false
  });
}

module.exports = attachRequestIdToObject;