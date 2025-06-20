/**
 * Determines and returns a function or value that accesses the 'shouldCreateSpanForRequest' property
 * from either the provided config or subscription objects, depending on the presence of the sourceObservable.
 *
 * @param {boolean} sourceObservable - Indicates if the source observable is present and should be processed.
 * @param {Object} config - The configuration object that may contain 'shouldCreateSpanForRequest'.
 * @param {Object} subscription - The subscription object that may contain 'shouldCreateSpanForRequest'.
 * @returns {Function|any} Returns the result of accessing 'shouldCreateSpanForRequest' from config or subscription,
 *                        or a function that always returns false if sourceObservable is falsy.
 */
function getShouldCreateSpanForRequestAccessor(sourceObservable, config, subscription) {
  // If sourceObservable is truthy, attempt to access 'shouldCreateSpanForRequest' from config or subscription
  if (sourceObservable) {
    // Try to access 'shouldCreateSpanForRequest' from config first
    const configResult = Dx([
      config,
      "optionalAccess",
      obj => obj.shouldCreateSpanForRequest
    ]);
    // If configResult is falsy, try subscription
    if (configResult) {
      return configResult;
    }
    return Dx([
      subscription,
      "optionalAccess",
      obj => obj.shouldCreateSpanForRequest
    ]);
  }
  // If sourceObservable is falsy, return a function that always returns false
  return () => false;
}

module.exports = getShouldCreateSpanForRequestAccessor;