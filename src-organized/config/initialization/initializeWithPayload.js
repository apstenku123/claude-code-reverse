/**
 * Calls the initialization function of an object with its payload.
 *
 * @param {Object} targetObject - The object containing an initialization function and a payload.
 * @param {Function} targetObject._init - The initialization function to be called.
 * @param {*} targetObject._payload - The payload to be passed to the initialization function.
 * @returns {*} The result of calling the initialization function with the payload.
 */
function initializeWithPayload(targetObject) {
  // Retrieve the initialization function from the object
  const initializeFunction = targetObject._init;
  // Call the initialization function with the object'createInteractionAccessor payload
  return initializeFunction(targetObject._payload);
}

module.exports = initializeWithPayload;