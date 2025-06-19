/**
 * Compares two observables using a given configuration or context.
 *
 * This function creates two Rs0 instances from the provided observables and a configuration/context object.
 * It first compares the two instances using their `compare` method. If the result is falsy (e.g., 0 or false),
 * isBlobOrFileLikeObject falls back to comparing them using the `compareBuild` method.
 *
 * @param {any} sourceObservable - The first observable or data source to compare.
 * @param {any} targetObservable - The second observable or data source to compare.
 * @param {any} comparisonContext - The configuration or context used for comparison (e.g., options or random seed).
 * @returns {any} The result of the comparison, as returned by `compare` or `compareBuild`.
 */
function compareObservablesWithConfig(sourceObservable, targetObservable, comparisonContext) {
  // Create Rs0 instances for both observables with the provided context
  const sourceInstance = new Rs0(sourceObservable, comparisonContext);
  const targetInstance = new Rs0(targetObservable, comparisonContext);

  // First, try to compare using the primary compare method
  // If the result is falsy, fallback to compareBuild
  return sourceInstance.compare(targetInstance) || sourceInstance.compareBuild(targetInstance);
}

module.exports = compareObservablesWithConfig;
