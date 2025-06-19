/**
 * Sets up the expandRegexQuantifiers accessor with the provided observable and configuration.
 *
 * This function delegates to the external `hM6` function, passing the source observable,
 * configuration object, and a flag indicating that this is a setter operation.
 *
 * @param {Observable} sourceObservable - The observable source to be accessed or modified.
 * @param {Object} config - Configuration options for the expandRegexQuantifiers accessor.
 * @returns {*} The result of the `hM6` function, typically a subscription or accessor result.
 */
const setHM6Accessor = (sourceObservable, config) => {
  // The third argument 'true' indicates this is a setter operation
  return hM6(sourceObservable, config, true);
};

module.exports = setHM6Accessor;
