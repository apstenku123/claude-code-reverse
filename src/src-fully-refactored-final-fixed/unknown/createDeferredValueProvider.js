/**
 * Returns a function that, when called, provides a deferred value based on the given source.
 * If the underlying value cannot be derived (i.e., is null or undefined), returns undefined.
 *
 * @param {any} sourceObservable - The source from which to derive the value. Typically an observable or similar object.
 * @returns {Function|undefined} a function that returns the derived value, or undefined if the value could not be derived.
 */
function createDeferredValueProvider(sourceObservable) {
  // Attempt to derive a value from the source using getOtelOtlpHeadersMetadata
  const derivedValue = getOtelOtlpHeadersMetadata(sourceObservable);
  // If the derived value is null or undefined, return undefined
  if (derivedValue == null) return;
  // Otherwise, return a function that provides the derived value when called
  return () => derivedValue;
}

module.exports = createDeferredValueProvider;