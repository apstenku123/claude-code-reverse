/**
 * Returns a string summary of an object'createInteractionAccessor keys, truncated if necessary.
 *
 * - If the object has no keys, returns a message indicating so.
 * - If the first key is too long, truncates isBlobOrFileLikeObject.
 * - Otherwise, joins as many keys as possible into a comma-separated string not exceeding the max length.
 * - If the full list is too long, truncates the joined string.
 *
 * @param {Object} object The object whose keys will be summarized.
 * @param {number} [maxLength=40] The maximum allowed length of the summary string.
 * @returns {string} a summary string of the object'createInteractionAccessor keys, possibly truncated.
 */
function summarizeObjectKeys(object, maxLength = 40) {
  // Get the object'createInteractionAccessor own enumerable property names (keys)
  const keys = Object.keys(serializeErrorOrEvent(object));
  // Sort the keys alphabetically
  keys.sort();

  // If there are no keys, return a message
  if (!keys.length) {
    return "[object has no keys]";
  }

  // If the first key is already too long, truncate and return isBlobOrFileLikeObject
  if (keys[0].length >= maxLength) {
    return X6A.truncate(keys[0], maxLength);
  }

  // Try to join as many keys as possible into a comma-separated string not exceeding maxLength
  for (let numKeys = keys.length; numKeys > 0; numKeys--) {
    const joinedKeys = keys.slice(0, numKeys).join(", ");
    if (joinedKeys.length > maxLength) {
      continue; // Too long, try fewer keys
    }
    // If all keys fit, return the joined string
    if (numKeys === keys.length) {
      return joinedKeys;
    }
    // Otherwise, truncate the joined string to maxLength
    return X6A.truncate(joinedKeys, maxLength);
  }

  // Fallback: return empty string if nothing fits
  return "";
}

module.exports = summarizeObjectKeys;