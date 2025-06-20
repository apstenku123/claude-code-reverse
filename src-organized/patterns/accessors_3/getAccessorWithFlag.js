/**
 * Retrieves an accessor using the provided observable and configuration, with the flag set to true.
 *
 * @param {Observable} sourceObservable - The observable source to access.
 * @param {Object} config - Configuration options for the accessor.
 * @returns {*} The result of the hM6 accessor function with the flag enabled.
 */
const getAccessorWithFlag = (sourceObservable, config) => {
  // Call the hM6 accessor with the flag set to true
  return hM6(sourceObservable, config, true);
};

module.exports = getAccessorWithFlag;