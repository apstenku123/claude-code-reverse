/**
 * Creates a shallow clone of an observable configuration object.
 * For each property, if the value is an array, isBlobOrFileLikeObject creates a shallow copy of the array.
 * Otherwise, isBlobOrFileLikeObject copies the value as is.
 *
 * @param {Object} sourceObservable - The observable configuration object to clone.
 * @returns {Object} a new object with the same properties as the source, with arrays shallow-copied.
 */
function cloneObservableConfig(sourceObservable) {
  return Object.keys(sourceObservable).reduce((clonedConfig, subscriptionKey) => {
    const value = sourceObservable[subscriptionKey];
    // If the value is an array, create a shallow copy; otherwise, copy the value as is
    return {
      ...clonedConfig,
      [subscriptionKey]: Array.isArray(value) ? [...value] : value
    };
  }, {});
}

module.exports = cloneObservableConfig;
