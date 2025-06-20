/**
 * Checks if the provided result object represents a rejected diff result.
 *
 * This function inspects the structure of the input object to determine if:
 *   - The object has a `type` property equal to 'result'.
 *   - The object has a `data` property that is an array.
 *   - The first element of the `data` array is a non-null object.
 *   - The first element has a `type` property equal to 'text'.
 *   - The first element has a `text` property equal to 'DIFF_REJECTED'.
 *
 * @param {Object} resultObject - The object to check for a rejected diff result.
 * @returns {boolean} Returns true if the object matches the rejected diff result structure, otherwise false.
 */
function isDiffRejectedResult(resultObject) {
  // Check if the main object has type 'result'
  if (resultObject.type !== "result") {
    return false;
  }

  // Check if data is an array
  if (!Array.isArray(resultObject.data)) {
    return false;
  }

  const firstDataItem = resultObject.data[0];

  // Check if the first item in data is a non-null object
  if (typeof firstDataItem !== "object" || firstDataItem === null) {
    return false;
  }

  // Check if the first item has type 'text'
  if (!('type' in firstDataItem) || firstDataItem.type !== "text") {
    return false;
  }

  // Check if the first item has text 'DIFF_REJECTED'
  if (!('text' in firstDataItem) || firstDataItem.text !== "DIFF_REJECTED") {
    return false;
  }

  // All checks passed
  return true;
}

module.exports = isDiffRejectedResult;
