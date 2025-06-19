/**
 * Determines if the provided value is a Node.js stream-like object.
 *
 * a Node.js stream is typically an object that implements both the `.pipe` and `.on` methods.
 * This function checks if the input is a non-null object and has both `.pipe` and `.on` methods.
 *
 * @param {any} possibleStream - The value to check for stream-like characteristics.
 * @returns {boolean} True if the value is a Node.js stream-like object, otherwise false.
 */
function isNodeStream(possibleStream) {
  // Ensure the value is an object and not null
  // Check for the presence of 'pipe' and 'on' methods
  return (
    possibleStream &&
    typeof possibleStream === "object" &&
    typeof possibleStream.pipe === "function" &&
    typeof possibleStream.on === "function"
  );
}

module.exports = isNodeStream;
