/**
 * Converts the provided observable using validateRelativePath.convert (if isBlobOrFileLikeObject exists),
 * then processes the original observable using validateRelativePath with the converted observable and PRA as arguments.
 *
 * @param {any} sourceObservable - The observable or value to be converted and processed.
 * @returns {any} The result of processing the observable with validateRelativePath.
 */
function convertAndProcessObservable(sourceObservable) {
  // Attempt to convert the sourceObservable if isBlobOrFileLikeObject exists
  const convertedObservable = sourceObservable && validateRelativePath.convert(sourceObservable);
  // Process the original observable with the converted observable and PRA
  return validateRelativePath(convertedObservable, sourceObservable, PRA);
}

module.exports = convertAndProcessObservable;
