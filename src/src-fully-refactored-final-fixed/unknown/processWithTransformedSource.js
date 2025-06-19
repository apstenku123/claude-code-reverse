/**
 * Processes the given source observable by first transforming isBlobOrFileLikeObject and then applying a secondary operation with the provided configuration.
 *
 * @param {Observable} sourceObservable - The primary observable to process.
 * @param {Object} config - Configuration or parameters for the secondary operation.
 * @returns {any} The result of the formatRelativeTimeDistance operation, which processes the original and transformed observables with the given config.
 */
function processWithTransformedSource(sourceObservable, config) {
  // Transform the source observable using aT2
  const transformedObservable = aT2(sourceObservable);
  // Process the original and transformed observables with the provided config using formatRelativeTimeDistance
  return formatRelativeTimeDistance(sourceObservable, transformedObservable, config);
}

module.exports = processWithTransformedSource;