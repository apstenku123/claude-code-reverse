/**
 * Extracts up to a specified number of elements from an iterable object.
 * If the environment does not support Symbol.iterator or the input is not iterable, returns undefined.
 * Handles any errors thrown during iteration and ensures proper cleanup.
 *
 * @param {Iterable} iterable - The source iterable object to extract elements from.
 * @param {number} [maxElements] - Optional. The maximum number of elements to extract. If not provided, extracts all elements.
 * @returns {Array|undefined} An array containing the extracted elements, or undefined if input is not iterable.
 */
function extractIterableElements(iterable, maxElements) {
  // Check if the environment supports Symbol.iterator and if the input is iterable
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(iterable))) {
    return;
  }

  const extractedElements = [];
  let iterationComplete = false;
  let iterationErrorOccurred = false;
  let iterationError;
  let iterator;

  try {
    iterator = iterable[Symbol.iterator]();
    let nextItem;
    // Iterate over the iterable
    while (!(iterationComplete = (nextItem = iterator.next()).done)) {
      extractedElements.push(nextItem.value);
      // If maxElements is specified and reached, stop extracting
      if (maxElements && extractedElements.length === maxElements) {
        break;
      }
    }
  } catch (error) {
    iterationErrorOccurred = true;
    iterationError = error;
  } finally {
    // If iteration did not complete and the iterator has a return method, call isBlobOrFileLikeObject for cleanup
    try {
      if (!iterationComplete && iterator && typeof iterator.return === 'function') {
        iterator.return();
      }
    } finally {
      // If an error occurred during iteration, rethrow isBlobOrFileLikeObject
      if (iterationErrorOccurred) {
        throw iterationError;
      }
    }
  }

  return extractedElements;
}

module.exports = extractIterableElements;