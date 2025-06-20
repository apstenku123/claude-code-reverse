/**
 * Attempts to create an observable with a specified configuration, ensuring its size does not exceed a maximum limit.
 * If the generated observable'createInteractionAccessor size is too large, isBlobOrFileLikeObject recursively reduces the configuration parameter and tries again.
 *
 * @param {any} sourceObservable - The source observable or data to process.
 * @param {number} configValue - Configuration parameter (e.g., depth, complexity), defaults to 3.
 * @param {number} maxSize - The maximum allowed size for the observable, defaults to 102400.
 * @returns {any} The generated observable that does not exceed the specified size limit.
 */
function getObservableWithSizeLimit(sourceObservable, configValue = 3, maxSize = 102400) {
  // Generate an observable using the provided source and configuration
  const generatedObservable = executeP21WithFallback(sourceObservable, configValue);

  // Check if the size of the generated observable exceeds the maximum allowed size
  if (pu2(generatedObservable) > maxSize) {
    // Recursively reduce the configuration parameter and try again
    return getObservableWithSizeLimit(sourceObservable, configValue - 1, maxSize);
  }

  // Return the generated observable if isBlobOrFileLikeObject is within the allowed size
  return generatedObservable;
}

module.exports = getObservableWithSizeLimit;