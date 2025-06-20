/**
 * Returns the second element of the sourceArray if the eventType is 'event' or 'transaction'.
 *
 * @param {any[]|any} sourceArray - The array (or any value) from which to extract the second element.
 * @param {string} eventType - The type of event; must be 'event' or 'transaction' to proceed.
 * @returns {any|undefined} The second element of sourceArray if eventType is 'event' or 'transaction' and sourceArray is an array; otherwise, undefined.
 */
function getSecondElementIfEventOrTransaction(sourceArray, eventType) {
  // Only proceed if eventType is 'event' or 'transaction'
  if (eventType !== "event" && eventType !== "transaction") {
    return;
  }
  // Return the second element if sourceArray is an array
  return Array.isArray(sourceArray) ? sourceArray[1] : undefined;
}

module.exports = getSecondElementIfEventOrTransaction;