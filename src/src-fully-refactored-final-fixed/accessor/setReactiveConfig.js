/**
 * Sets a reactive configuration on the provided observable object.
 *
 * @param {Object} sourceObservable - The observable object to configure.
 * @returns {void}
 * @throws {TypeError} Throws if sourceObservable is not an object.
 */
function setReactiveConfig(sourceObservable) {
  // Validate that the input is an object
  if (typeof sourceObservable !== 'object' || sourceObservable === null) {
    throw new TypeError('sourceObservable must be a non-null object');
  }
  // Set the rc1 property to true to mark as reactive
  sourceObservable.rc1 = true;
}

module.exports = setReactiveConfig;