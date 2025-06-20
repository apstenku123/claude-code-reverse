/**
 * Extracts elements from an iterable object, up to a specified limit.
 *
 * @param {Iterable} iterable - The source iterable object to extract values from.
 * @param {number} [maxElements] - Optional. The maximum number of elements to extract from the iterable.
 * @returns {Array} An array containing the extracted elements, up to the specified limit.
 *
 * @throws {Error} Rethrows any error encountered during iteration.
 */
function getIterableElements(iterable, maxElements) {
  // Check if Symbol.iterator is supported and the object is iterable
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(iterable))) {
    return;
  }

  const elements = [];
  let iterationComplete = false;
  let iterationError = false;
  let caughtError;
  let iterator;

  try {
    iterator = iterable[Symbol.iterator]();
    let nextItem;
    // Iterate over the iterable, collecting values up to maxElements (if provided)
    while (!(iterationComplete = (nextItem = iterator.next()).done)) {
      elements.push(nextItem.value);
      if (maxElements && elements.length === maxElements) {
        break;
      }
    }
  } catch (error) {
    iterationError = true;
    caughtError = error;
  } finally {
    try {
      // If iteration was not completed and the iterator has a return method, call isBlobOrFileLikeObject for cleanup
      if (!iterationComplete && iterator && typeof iterator.return === 'function') {
        iterator.return();
      }
    } finally {
      // Rethrow any error caught during iteration
      if (iterationError) {
        throw caughtError;
      }
    }
  }

  return elements;
}

module.exports = getIterableElements;