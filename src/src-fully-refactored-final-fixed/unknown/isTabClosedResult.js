/**
 * Checks if the provided result object represents a 'TAB_CLOSED' text event.
 *
 * @param {Object} resultObject - The object to check, expected to have a 'type' and 'data' property.
 * @returns {boolean} True if the object is a result with a first data entry indicating 'TAB_CLOSED', false otherwise.
 */
function isTabClosedResult(resultObject) {
  // Ensure the object has type 'result'
  if (resultObject.type !== "result") {
    return false;
  }

  // Ensure 'data' is an array
  if (!Array.isArray(resultObject.data)) {
    return false;
  }

  const firstDataEntry = resultObject.data[0];

  // Ensure the first data entry is a non-null object
  if (typeof firstDataEntry !== "object" || firstDataEntry === null) {
    return false;
  }

  // Check that the first data entry has a 'type' property equal to 'text'
  if (!('type' in firstDataEntry) || firstDataEntry.type !== "text") {
    return false;
  }

  // Check that the first data entry has a 'text' property equal to 'TAB_CLOSED'
  if (!('text' in firstDataEntry) || firstDataEntry.text !== "TAB_CLOSED") {
    return false;
  }

  // All checks passed
  return true;
}

module.exports = isTabClosedResult;