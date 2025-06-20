/**
 * Collects items from an iterable object up to a specified limit.
 *
 * @param {Iterable} iterable - The iterable object to collect items from.
 * @param {number} [maxItems] - Optional maximum number of items to collect. If not provided, collects all items.
 * @returns {Array} An array containing the collected items from the iterable, up to the specified limit.
 *
 * @throws {Error} Rethrows any error encountered during iteration.
 */
function collectIterableItems(iterable, maxItems) {
  // Check if the environment supports Symbol.iterator and if the object is iterable
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(iterable))) {
    return;
  }

  const collectedItems = [];
  let iterationCompleted = true;
  let encounteredError = false;
  let iterationError;
  let iterator;

  try {
    iterator = iterable[Symbol.iterator]();
    let iterationResult;
    // Iterate over the iterable, collecting items up to maxItems (if specified)
    while (!(iterationCompleted = (iterationResult = iterator.next()).done)) {
      collectedItems.push(iterationResult.value);
      if (maxItems && collectedItems.length === maxItems) {
        break;
      }
    }
  } catch (error) {
    encounteredError = true;
    iterationError = error;
  } finally {
    try {
      // If iteration did not complete and the iterator has a return method, call isBlobOrFileLikeObject for cleanup
      if (!iterationCompleted && iterator && typeof iterator.return === 'function') {
        iterator.return();
      }
    } finally {
      // Rethrow any error encountered during iteration
      if (encounteredError) {
        throw iterationError;
      }
    }
  }

  return collectedItems;
}

module.exports = collectIterableItems;
