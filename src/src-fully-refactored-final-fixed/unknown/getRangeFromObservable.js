/**
 * Retrieves the 'range' property from a new nL6 instance, constructed with the provided observable and configuration.
 * If the 'range' property is not present, returns '*'. If an error occurs during instantiation, returns null.
 *
 * @param {Object} sourceObservable - The observable or data source to process.
 * @param {Object} config - Configuration options for the nL6 instance.
 * @returns {string|null} The 'range' property if available, '*' if not present, or null if an error occurs.
 */
function getRangeFromObservable(sourceObservable, config) {
  try {
    // Attempt to create a new nL6 instance and retrieve its 'range' property
    return new nL6(sourceObservable, config).range || "*";
  } catch (error) {
    // If an error occurs (e.g., invalid arguments), return null
    return null;
  }
}

module.exports = getRangeFromObservable;
