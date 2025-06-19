/**
 * Determines if the result of the getValueByKeyOrAllOrDefault function, given the provided source and configuration,
 * is greater than the specified timestamp (defaults to the current time).
 *
 * @param {any} sourceObservable - The source object or value to be passed to getValueByKeyOrAllOrDefault.
 * @param {any} config - The configuration object or value to be passed to getValueByKeyOrAllOrDefault.
 * @param {number} [timestamp=Date.now()] - The timestamp to compare against. Defaults to the current time in milliseconds.
 * @returns {boolean} True if getValueByKeyOrAllOrDefault(sourceObservable, config) is greater than the timestamp; otherwise, false.
 */
function isA8AGreaterThanTimestamp(sourceObservable, config, timestamp = Date.now()) {
  // Call the external getValueByKeyOrAllOrDefault function with the provided source and config
  const a8aResult = getValueByKeyOrAllOrDefault(sourceObservable, config);
  // Compare the result to the timestamp
  return a8aResult > timestamp;
}

module.exports = isA8AGreaterThanTimestamp;