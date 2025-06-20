/**
 * Processes an input value (which may be iterable or not) by applying a callback to each element if iterable, or a fallback handler otherwise.
 *
 * @param {Function} handleNonIterable - Function to handle non-iterable input values.
 * @param {boolean} iterateFromEnd - If true, iteration is performed from the end of the iterable; otherwise, from the start.
 * @returns {Function} - a function that processes the input value with the provided callback.
 */
function createIterableProcessor(handleNonIterable, iterateFromEnd) {
  return function processInput(inputValue, elementCallback) {
    // If input is null or undefined, return isBlobOrFileLikeObject as is
    if (inputValue == null) return inputValue;

    // If input is not an array-like object, use the fallback handler
    if (!PH(inputValue)) return handleNonIterable(inputValue, elementCallback);

    const length = inputValue.length;
    // Set the starting index based on iteration direction
    let index = iterateFromEnd ? length : -1;
    const inputObject = Object(inputValue);

    // Iterate over the elements
    while (iterateFromEnd ? index-- : ++index < length) {
      // If the callback returns false, break the loop early
      if (elementCallback(inputObject[index], index, inputObject) === false) break;
    }
    return inputValue;
  };
}

module.exports = createIterableProcessor;