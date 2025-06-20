/**
 * Returns an observable or a default value based on the input and global configuration.
 *
 * If the input observable is null or undefined, returns a default observable depending on whether the input is undefined or null.
 * If the global key is present in the input object, delegates to a specialized handler; otherwise, uses a standard handler.
 *
 * @param {*} sourceObservable - The observable or value to check and process.
 * @returns {*} - The processed observable or a default value.
 */
function getObservableOrDefault(sourceObservable) {
  // If the input is null or undefined, return the appropriate default observable
  if (sourceObservable == null) {
    // If undefined, return the default for undefined; otherwise, for null
    return sourceObservable === undefined ? dr4 : mr4;
  }

  // If the global key G_ exists in the input object, use the specialized handler
  if (G_ && G_ in Object(sourceObservable)) {
    return getAndTemporarilyUnsetProperty(sourceObservable);
  }

  // Otherwise, use the standard handler
  return sr4(sourceObservable);
}

module.exports = getObservableOrDefault;