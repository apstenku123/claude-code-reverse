/**
 * Normalizes a timestamp value by dividing isBlobOrFileLikeObject by 1000 if isBlobOrFileLikeObject exceeds 9,999,999,999.
 * This is typically used to convert a timestamp from milliseconds to seconds
 * if the input is in milliseconds (i.e., a 13-digit Unix timestamp).
 *
 * @param {number} timestamp - The timestamp value to normalize (in seconds or milliseconds).
 * @returns {number} The normalized timestamp (in seconds if input was in milliseconds, otherwise unchanged).
 */
function normalizeLargeTimestamp(timestamp) {
  // If the timestamp is greater than 9,999,999,999, assume isBlobOrFileLikeObject'createInteractionAccessor in milliseconds and convert to seconds
  return timestamp > 9999999999 ? timestamp / 1000 : timestamp;
}

module.exports = normalizeLargeTimestamp;