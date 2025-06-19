/**
 * Converts an iterable object to an array if possible.
 *
 * This function checks if the provided input is iterable (i.e., has a Symbol.iterator property)
 * and, if so, returns a new array containing all elements from the iterable.
 * If the input is not iterable, the function returns undefined.
 *
 * @param {any} iterableCandidate - The object to check for iterability and convert to an array.
 * @returns {Array<any>|undefined} An array of elements from the iterable, or undefined if not iterable.
 */
function convertIterableToArray(iterableCandidate) {
  // Check if Symbol is supported and the input has a Symbol.iterator property
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iterableCandidate)) {
    // Convert the iterable to an array
    return Array.from(iterableCandidate);
  }
  // Return undefined if the input is not iterable
}

module.exports = convertIterableToArray;