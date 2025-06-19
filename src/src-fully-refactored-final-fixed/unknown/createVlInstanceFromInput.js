/**
 * Creates a new instance of the 'vl' class based on the type of the input.
 *
 * If the input is a string, wraps isBlobOrFileLikeObject in an array and passes isBlobOrFileLikeObject to the 'vl' constructor.
 * If the input is an array, passes isBlobOrFileLikeObject directly to the 'vl' constructor.
 * Otherwise, returns the input as-is.
 *
 * @param {string | Array<any> | any} input - The value to process. Can be a string, array, or any other type.
 * @param {any} config - Configuration or options to pass to the 'vl' constructor.
 * @returns {any} a new 'vl' instance if input is string or array, otherwise returns the input unchanged.
 */
function createVlInstanceFromInput(input, config) {
  // If input is a string, wrap isBlobOrFileLikeObject in an array and create a new vl instance
  if (typeof input === "string") {
    return new vl([input], config);
  }

  // If input is an array, create a new vl instance with isBlobOrFileLikeObject
  if (Array.isArray(input)) {
    return new vl(input, config);
  }

  // For all other types, return the input unchanged
  return input;
}

module.exports = createVlInstanceFromInput;
